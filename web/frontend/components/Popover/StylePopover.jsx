import { Button, Popover, ActionList } from '@shopify/polaris';
import { useState, useCallback, forwardRef } from 'react';
import { BsType } from 'react-icons/bs';

const StylePopover = ({ onSetStyle }) => {
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



    return (
        <div>
            <Popover
                active={popoverActive}
                activator={activator}
                onClose={togglePopoverActive}
            >
                <ActionList
                    actionRole="menuitem"
                    items={[
                        {
                            content: 'Paragraph',
                            id: 'para',
                            onAction: () => {
                                onSetStyle("para")
                                togglePopoverActive()
                            }
                        },
                        {
                            content: 'Heading 1',
                            id: 'h1',
                            onAction: () => {
                                onSetStyle("h1")
                                togglePopoverActive()
                            }

                        },
                        {
                            content: 'Heading 2',
                            id: 'h2',
                            onAction: () => onSetStyle("h2")

                        },
                        {
                            content: 'Heading 3',
                            id: 'h3',
                            onAction: () => onSetStyle("h3")

                        },
                        {
                            content: 'Heading 4',
                            id: 'h4',
                            onAction: () => onSetStyle("h4")

                        },
                        {
                            content: 'Heading 5',
                            id: 'h5',
                            onAction: () => onSetStyle("h5")
                        },
                    ]}
                />
            </Popover>
        </div>
    );
}


export default StylePopover;