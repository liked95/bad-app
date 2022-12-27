import { Button, ColorPicker, Popover } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { AiOutlineBgColors } from 'react-icons/ai';
import ColorPickerComponent from './ColorPickerInstance';



const ColorPickerPopover = ({ }) => {
    const [popoverActive, setPopoverActive] = useState(false);


    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        [],
    );

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            <AiOutlineBgColors />
        </Button>
    );



    return (
        <div>
            <Popover
                active={popoverActive}
                activator={activator}
                onClose={togglePopoverActive}
            >
                <ColorPickerComponent />

            </Popover>
        </div>
    );
}


export default ColorPickerPopover;