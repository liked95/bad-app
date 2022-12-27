import { ColorPicker, Tabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { hsvToHex } from '../../util';


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

    console.log(color)

    const [bgColor, setBgColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
    });

    const handleChangeColor = (value) => {
        setColor(value)
        const { hue, saturation, brightness } = value
        const hexColor = hsvToHex(hue, saturation * 100, brightness * 100)
        RTE.document.execCommand("foreColor", false, hexColor)
    }

    const handleChangeBgColor = (value) => {
        setBgColor(value)
        const { hue, saturation, brightness } = value
        const hexColor = hsvToHex(hue, saturation * 100, brightness * 100)
        RTE.document.execCommand("backColor", false, hexColor)
    }


    const tabs = [
        {
            id: 'text-color',
            content: 'Text',
            item: <ColorPicker onChange={handleChangeColor} color={color} />
        },
        {
            id: 'background-color',
            content: 'Background',
            item: <ColorPicker onChange={handleChangeBgColor} color={bgColor} />
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