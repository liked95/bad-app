import { ColorPicker, Tabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import styled from 'styled-components';


const TabPanelWrapper = styled.div`
    padding: 10px
`

export default function ColorPickerComponent() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const [color, setColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });

    const [bgColor, setBgColor] = useState({
        hue: 1,
        brightness: 1,
        saturation: 1,
    });

    const tabs = [
        {
            id: 'text-color',
            content: 'Text',
            item: <ColorPicker onChange={setColor} color={color} />
        },
        {
            id: 'background-color',
            content: 'Background',
            item: <ColorPicker onChange={setBgColor} color={bgColor} />
        },

    ];

    return (
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
            <TabPanelWrapper>
                {tabs[selected].item}
            </TabPanelWrapper>
        </Tabs>
    )
}