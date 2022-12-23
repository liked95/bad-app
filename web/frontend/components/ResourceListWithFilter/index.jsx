import { useState, useCallback } from 'react';
import {
    TextField,
    Filters,
    Button,
    Card,
    ResourceList,
    Avatar,
    ResourceItem,
    ChoiceList,

} from '@shopify/polaris';

function ResourceListWithFilter({ query }) {
    console.log(query)
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
    const [queryValue, setQueryValue] = useState(query);

    const [accountStatus, setAccountStatus] = useState(null);
    
    const handleAccountStatusChange = useCallback(
        (value) => setAccountStatus(value),
        [],
    );




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
            onAction: () => console.log('Todo: implement bulk add tags'),
        },
        {
            content: 'Hide selected pages',
            onAction: () => console.log('Todo: implement bulk remove tags'),
        },
        {

            content: 'Delete pages',
            onAction: () => console.log('Todo: implement bulk delete'),
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
            onQueryChange={value => setQueryValue(value)}
            onQueryClear={() => setQueryValue("")}
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
            items={items}
            renderItem={renderItem}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            bulkActions={bulkActions}
            sortValue={sortValue}

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

    function renderItem(item) {
        const { id, url, name, location } = item;
        const media = <Avatar customer size="medium" name={name} />;

        return (
            <ResourceItem
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
                persistActions
            >

                <div>{name}</div>
                <div>{location}</div>
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