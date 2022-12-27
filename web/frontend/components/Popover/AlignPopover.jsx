import { Button, Popover, ActionList } from '@shopify/polaris';
import { useState, useCallback, forwardRef } from 'react';
import { BsBarChartSteps } from 'react-icons/bs';

const AlignPopover = () => {
    const [popoverActive, setPopoverActive] = useState(false);


    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            <BsBarChartSteps />
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
                            content: 'Left align',
                            id: 'left',
                            onAction: () => {
                                RTE.document.execCommand("justifyLeft")
                                togglePopoverActive()
                            }
                        },
                        {
                            content: 'Center align',
                            id: 'center',
                            onAction: () => {
                                RTE.document.execCommand("justifyCenter")
                                togglePopoverActive()
                            }
                        },
                        {
                            content: 'Right align',
                            id: 'right',
                            onAction: () => {
                                RTE.document.execCommand("justifyRight")
                                togglePopoverActive()
                            }
                        },
                    ]}
                />
            </Popover>
        </div>
    );
}


export default AlignPopover;