import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import styled from 'styled-components'
import { react, useRef, useState, useEffect } from 'react'
import {
    Badge,
    Banner,
    Card,
    FormLayout,
    Icon,
    Layout,
    Page,
    PageActions,
    Stack,
    TextField,
    ButtonGroup,
    Button,
    ChoiceList,
    ColorPicker
} from "@shopify/polaris";

import { BsTypeItalic, BsTypeUnderline, BsTypeBold, BsListOl, BsListUl, BsTextIndentLeft, BsTextIndentRight, BsCardImage, BsCodeSlash } from "react-icons/bs";
import { AiOutlineBgColors, AiOutlineLink, AiOutlineStop, AiOutlineVideoCamera, AiOutlineVideoCameraAdd } from 'react-icons/ai'
import StylePopover from "../Popover/StylePopover";
import AlignPopover from "../Popover/AlignPopover";
import ColorPickerPopover from "../Popover/ColorPickerPopover";

const ContentWrapper = styled.div`
 margin-top: 5px;
 border: 1px solid #c8cdcd;
 border-radius: 5px;
 overflow: hidden;
`

const ToolWrapper = styled.div`
 padding: 8px;
 background-color: #fafbfb;
 border-bottom: 1px solid #c8cdcd;
`

const IframeWrapper = styled.div`
 margin-top: 5px;
 min-height: 150px;
`

function TextEditor({ title, bodyHTML, setTitle, setBodyHTML }) {
    const iframeRef = useRef()
    const [style, setStyle] = useState("para")
    const [align, setAlign] = useState("left")

    useEffect(() => {
        iframeRef.current.contentDocument.designMode = "on"
        iframeRef.current.contentDocument.body.innerHTML = bodyHTML
        iframeRef.current.contentDocument.body.style.fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif"

    }, []);

    const handleSetStyle = value => {
        setStyle(value)
    }

    const handleSetAlign = value => {
        setAlign(value)
    }

   


    return (
        <Card sectioned>
            <FormLayout>
                <TextField
                    label="Title"
                    value={title}
                    onChange={value => setTitle(value)}
                    autoComplete="off" />


                <div>
                    <p> Content</p>
                    <ContentWrapper>
                        <ToolWrapper>
                            <Stack wrap={false}>

                                <Stack.Item fill>
                                    <Stack spacing="tight">
                                        <Stack.Item>
                                            <ButtonGroup segmented>
                                                <StylePopover onSetStyle={handleSetStyle} />

                                                <Button size="medium" onClick={() => RTE.document.execCommand("bold")}>
                                                    <BsTypeBold />
                                                </Button>


                                                <Button size="medium">
                                                    <BsTypeItalic />
                                                </Button>

                                                <Button size="medium">
                                                    <BsTypeUnderline />
                                                </Button>
                                            </ButtonGroup>
                                        </Stack.Item>

                                        <Stack.Item>
                                            <ButtonGroup segmented>
                                                <Button size="medium">
                                                    <BsListUl />
                                                </Button>

                                                <Button size="medium">
                                                    <BsListOl />
                                                </Button>

                                                <Button size="medium">
                                                    <BsTextIndentRight />
                                                </Button>

                                                <Button size="medium">
                                                    <BsTextIndentLeft />
                                                </Button>


                                            </ButtonGroup>
                                        </Stack.Item>

                                        <Stack.Item>
                                            <ButtonGroup segmented>
                                                <AlignPopover onSetAlign={handleSetAlign} />
                                                <ColorPickerPopover />
                                            </ButtonGroup>
                                        </Stack.Item>

                                        <Stack.Item>
                                            <ButtonGroup segmented>

                                                <Button size="medium">
                                                    <AiOutlineLink />
                                                </Button>

                                                <Button size="medium">
                                                    <BsCardImage />
                                                </Button>

                                                <Button size="medium">
                                                    <AiOutlineVideoCameraAdd />
                                                </Button>

                                                <Button size="medium">
                                                    <AiOutlineStop />
                                                </Button>
                                            </ButtonGroup>
                                        </Stack.Item>
                                    </Stack>
                                </Stack.Item>


                                <Stack.Item >
                                    <Button size="medium">
                                        <BsCodeSlash />
                                    </Button>
                                </Stack.Item>

                            </Stack>
                        </ToolWrapper>

                        <IframeWrapper >
                            <iframe style={{ width: "100%", height: "100%", border: 'none' }}
                                id="shopify-editor"
                                name="RTE"
                                ref={iframeRef}>
                            </iframe>
                        </IframeWrapper>
                    </ContentWrapper>
                </div>


            </FormLayout >
        </Card >
    )
}



export default TextEditor