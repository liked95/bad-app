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

function ResourceListWithFilter({ pageItems }) {
    let fetchApi = useAuthenticatedFetch()
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [pages, setPages] = useState(pageItems)
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
    const [queryValue, setQueryValue] = useState("");
    const [accountStatus, setAccountStatus] = useState(null);



    const handleAccountStatusChange = useCallback(
        (value) => setAccountStatus(value), [],
    );

    // DELETE PAGES
    const handleDeletePages = async () => {
        let pageItems = [...pages]
        setIsPageLoading(true)
        try {
            for (let id of selectedItems) {
                let res = await fetchApi(`/api/pages/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: 'application/json'
                    }
                })

                pageItems = pageItems.filter(page => page.id != id)
            }
            setPages(pageItems)
            setIsPageLoading(false)
            setSelectedItems([])
        } catch (error) {
            console.log(error)
        }
    }


    // HIDE PAGES
    const handleHidePages = async () => {
        let pageItems = [...pages]
        setIsPageLoading(true)
        try {
            for (let id of selectedItems) {
                let page = pageItems.find(page => page.id == id)
                page.published_at = null

                let res = await fetchApi(`/api/pages/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        isShown: false
                    })
                })
            }
            setPages(pageItems)
            setIsPageLoading(false)
            setSelectedItems([])
        } catch (error) {
            console.log(error)
        }
    }


    // SHOW PAGES
    const handleShowPages = async () => {
        let pageItems = [...pages]
        setIsPageLoading(true)
        try {
            for (let id of selectedItems) {
                let page = pageItems.find(page => page.id == id)
                page.published_at = new Date().toISOString()

                let res = await fetchApi(`/api/pages/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        isShown: true
                    })
                })
            }
            setPages(pageItems)
            setIsPageLoading(false)
            setSelectedItems([])
        } catch (error) {
            console.log(error)
        }
    }


    // FILTER PAGE
    const handleQueryChange = value => {
        setQueryValue(value)
        let filterPageItems = [...pageItems].filter(page => page.title.toLowerCase().includes(value.trim().toLowerCase()))
        setPages(filterPageItems)
    }





    const resourceName = {
        singular: 'page',
        plural: 'pages',
    };

    const items = [
        {
            id: 112,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            latestOrderUrl: 'orders/1456',
        },
        {
            id: 212,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            latestOrderUrl: 'orders/1457',
        },
    ];


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
            onAction: handleDeletePages,
        },


    ];

    const filters = [
        {
            key: 'visibility',
            label: 'Visibility',
            filter: (
                <ChoiceList
                    title="Account status"
                    titleHidden
                    choices={[
                        { label: 'Visible', value: 'visible' },
                        { label: 'Hidden', value: 'hidden' },
                    ]}
                    selected={accountStatus || []}
                    onChange={handleAccountStatusChange}

                />
            ),
            shortcut: true,
        },


    ];


    const filterControl = (
        <Filters
            queryValue={queryValue}
            onQueryChange={handleQueryChange}
            onQueryClear={() => {
                setQueryValue("")
                setPages(pageItems)
            }}
            filters={filters}

        >

            <div style={{ paddingLeft: '8px' }}>
                <Button onClick={() => console.log('New filter saved')}>Save</Button>
            </div>
        </Filters>
    );

    return (
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
            ]}
            onSortChange={(selected) => {
                setSortValue(selected);
                console.log(`Sort option changed to ${selected}.`);
            }}

            filterControl={filterControl}
        />
    );

    function renderPage(page) {
        const { id, title, body_html, created_at, published_at } = page;

        // const media = <Avatar customer size="medium" name={name} />;

        return (
            <ResourceItem
                id={id}
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
                        {body_html}
                    </TextStyle>
                </div>

                <TextStyle variant="heading4xl" as="h2" variation='subdued'>
                    {created_at}
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