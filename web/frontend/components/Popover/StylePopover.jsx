import { Button, Popover, ActionList } from '@shopify/polaris';
import { useState, useCallback, forwardRef } from 'react';
import { BsType } from 'react-icons/bs';

const StylePopover = () => {
    const [popoverActive, setPopoverActive] = useState(false);


    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            <BsType />
        </Button>
    );

    const items = [
        {
            content: 'Paragraph',
            id: 'P',

        },
        {
            content: 'Heading 1',
            id: 'H1',
        },
        {
            content: 'Heading 2',
            id: 'H2',
        },
        {
            content: 'Heading 3',
            id: 'H3',
        },
        {
            content: 'Heading 4',
            id: 'H4',
        },
        {
            content: 'Heading 5',
            id: 'H5',
        },
        // {
        //     content: 'Heading 6',
        //     id: 'H6',
        // },
    ]

    return (
        <div>
            <Popover
                active={popoverActive}
                activator={activator}
                onClose={togglePopoverActive}
            >
                <ActionList
                    actionRole="menuitem"
                    items={items.map(item => {
                        return {
                            ...item, onAction: () => {
                                RTE.document.execCommand("formatBlock", false, item.id)
                                setPopoverActive(false)
                            }
                        }
                    })}
                />
            </Popover>
        </div >
    );
}


export default StylePopover;