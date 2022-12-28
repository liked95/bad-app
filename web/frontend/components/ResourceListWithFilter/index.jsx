import { useState, useCallback } from 'react';
import {
    TextField,
    Filters,
    Button,
    Card,
    ResourceList,
    ResourceItem,
    ChoiceList,
    TextStyle,
    Badge,
} from '@shopify/polaris';
import { useAuthenticatedFetch } from '../../hooks';
import { useEffect } from 'react';
import { formatDate, stripHTML } from '../../util';
import { useNavigate } from '@shopify/app-bridge-react';
import ToastMessage from '../ToastMessage';
import DeletePageModal from '../Modal/DeletePageModal';


function ResourceListWithFilter({ pageItems }) {
    const navigate = useNavigate()

    let fetchApi = useAuthenticatedFetch()
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [pages, setPages] = useState(pageItems)
    const [selectedItems, setSelectedItems] = useState([]);
    const [queryValue, setQueryValue] = useState("");
    const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
    const [option, setOption] = useState(null);


    // toast 
    const [toastActive, setToastActive] = useState(false)
    const [toastContent, setToastContent] = useState("")

    // Delete modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)




    useEffect(() => {
        // copy the value of the origin pageItem arr
        let copiedPages = [...pageItems]

        // radio filter by visibility
        if (option && option[0] == "visible") {
            copiedPages = copiedPages.filter(page => page.published_at != null)
        }

        if (option && option[0] == "hidden") {
            copiedPages = copiedPages.filter(page => page.published_at == null)
        }

        // filter by title 
        copiedPages = copiedPages.filter(page => page.title.toLowerCase().includes(queryValue.trim().toLowerCase()))

        // sort by params
        if (sortValue == "DATE_MODIFIED_DESC") copiedPages.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        if (sortValue == "DATE_MODIFIED_ASC") copiedPages.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))
        if (sortValue == "TITLE_DESC") copiedPages.sort((a, b) => a.title.localeCompare(b.title))
        if (sortValue == "TITLE_DESC") copiedPages.sort((a, b) => b.title.localeCompare(a.title))



        setPages(copiedPages)

    }, [option, queryValue, sortValue])



    // DELETE PAGES
    const handleDeletePages = async () => {
        let pageItems = [...pages]


        const promises = selectedItems.map(async (id) => {
            await fetchApi(`/api/pages/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                }
            })
            pageItems = pageItems.filter(page => page.id != id)
        })

        try {
            setIsPageLoading(true)
            let res = await Promise.all(promises)
            setIsPageLoading(false)
            setPages(pageItems)
            setSelectedItems([])

            setToastActive(true)
            setToastContent("Pages deleted")
        } catch (error) {
            console.log(error)
        }
    }

    // HIDE PAGES
    const handleHidePages = async () => {
        let pageItems = [...pages]

        const promises = selectedItems.map(async (id) => {
            await fetchApi(`/api/pages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    isShown: false
                })
            })

            let page = pageItems.find(page => page.id == id)
            page.published_at = null
        })


        try {
            setIsPageLoading(true)
            let res = await Promise.all(promises)
            setIsPageLoading(false)
            setPages(pageItems)
            setSelectedItems([])

            setToastActive(true)
            setToastContent("Pages hidden")
        } catch (error) {
            console.log(error)
        }
    }

    // SHOW PAGES
    const handleShowPages = async () => {
        let pageItems = [...pages]

        const promises = selectedItems.map(async (id) => {
            await fetchApi(`/api/pages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    isShown: true
                })
            })

            let page = pageItems.find(page => page.id == id)
            page.published_at = new Date().toISOString()
        })

        try {
            setIsPageLoading(true)
            let res = await Promise.all(promises)
            setIsPageLoading(false)
            setPages(pageItems)
            setSelectedItems([])

            setToastActive(true)
            setToastContent("Pages shown")
        } catch (error) {
            console.log(error)
        }
    }


    // CHOICE LIST FILTER RADIO
    const handleRemoveTag = () => {
        console.log("tag remove")
        setOption(null)
    }

    const appliedFilters = []
    if (option && option.length > 0) {
        const key = 'visibilityOption'
        appliedFilters.push({
            key,
            label: `Visiblity is ${option[0]}`,
            onRemove: handleRemoveTag
        })
    }

    console.log(appliedFilters)



    const handleChangeOption = useCallback(
        (value) => setOption(value), [],
    );

    const handleClearAll = () => {
        console.log("Clear all")
    }





    const resourceName = {
        singular: 'page',
        plural: 'pages',
    };

    const bulkActions = [
        {
            content: 'Make selected pages visible',
            onAction: handleShowPages
        },
        {
            content: 'Hide selected pages',
            onAction: handleHidePages,
        },
        {

            content: 'Delete pages',
            destructive: true,
            onAction: () => setIsDeleteModalOpen(true),
        },


    ];

    const filters = [
        {
            key: 'visibility',
            label: 'Visibility',
            filter: (
                <ChoiceList

                    titleHidden
                    choices={[
                        { label: 'Visible', value: 'visible' },
                        { label: 'Hidden', value: 'hidden' },
                    ]}
                    selected={option || []}
                    onChange={handleChangeOption}

                />
            ),
            shortcut: true,
        },


    ];


    const filterControl = (
        <>
            <Filters
                queryValue={queryValue}
                onQueryChange={value => setQueryValue(value)}
                onQueryClear={() => {
                    setQueryValue("")
                    setPages(pageItems)
                }}
                filters={filters}
                onClearAll={handleClearAll}
                appliedFilters={appliedFilters}


            >

                <div style={{ paddingLeft: '8px' }}>
                    <Button onClick={() => console.log('New filter saved')}>Save</Button>
                </div>
            </Filters>

            <ToastMessage
                toastActive={toastActive}
                toastContent={toastContent}
                setToastActive={setToastActive}
            />
        </>
    );

    return (
        <>
            <ResourceList
                resourceName={resourceName}
                items={pages}
                renderItem={renderPage}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                bulkActions={bulkActions}
                sortValue={sortValue}
                loading={isPageLoading}
                sortOptions={[
                    { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
                    { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
                    { label: 'Title A-Z', value: 'TITLE_ASC' },
                    { label: 'Title Z-A', value: 'TITLE_DESC' },
                ]}
                onSortChange={(selected) => {
                    setSortValue(selected);
                    console.log(`Sort option changed to ${selected}.`);
                }}

                filterControl={filterControl}
            />
            <DeletePageModal
                type='multi'
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                handleDeletePages={handleDeletePages}
            />
        </>
    );

    function renderPage(page) {
        const { id, title, body_html, created_at, published_at, updated_at } = page;

        // const media = <Avatar customer size="medium" name={name} />;

        return (
            <ResourceItem
                id={id}
                onClick={() => navigate(`/edit/?id=${id}`)}
            >
                <h3>
                    <TextStyle variant="heading4xl" as="h1" variation='strong'>
                        {title}
                    </TextStyle>
                    &nbsp;
                    {!published_at && <Badge>Hidden</Badge>}
                </h3>

                <div>
                    <TextStyle variant="heading4xl" as="h2" variation='subdued'>
                        {stripHTML(body_html)}
                    </TextStyle>
                </div>

                <TextStyle variant="heading4xl" as="h2" variation='subdued'>
                    {formatDate(updated_at)}
                </TextStyle>
            </ResourceItem>
        );
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
}


export default ResourceListWithFilter;