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
    ColorPicker,
    Modal,
    TextContainer,
    Tooltip
} from "@shopify/polaris";

import { BsTypeItalic, BsTypeUnderline, BsTypeBold, BsListOl, BsListUl, BsTextIndentLeft, BsTextIndentRight, BsCardImage, BsCodeSlash } from "react-icons/bs";
import { AiOutlineBgColors, AiOutlineLink, AiOutlineStop, AiOutlineVideoCamera, AiOutlineVideoCameraAdd } from 'react-icons/ai'
import StylePopover from "../Popover/StylePopover";
import AlignPopover from "../Popover/AlignPopover";
import ColorPickerPopover from "../Popover/ColorPickerPopover";
import "./Button.css"
import CreateLinkModal from "../Modal/CreateLinkModal";
import InsertImgModal from "../Modal/InsertImageModal";
import InsertVidModal from "../Modal/InsertVidModal";

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
 position: relative;
 min-height: 250px;
`

function TextEditor({ title, bodyHTML, setTitle, setBodyHTML }) {
    const defaultFont = 'Helvetica Neue, Helvetica, Arial, sans-serif'
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    const [isInsertImageModalOpen, setIsInsertImageModalOpen] = useState(false)
    const [isInsertVidModalOpen, setIsInsertVidModalOpen] = useState(false)
    const [isEditing, setShowIsEditing] = useState(true)

    const iframeRef = useRef()


    useEffect(() => {
        iframeRef.current.contentDocument.designMode = "on"
        iframeRef.current.contentDocument.body.innerHTML = bodyHTML
        iframeRef.current.contentDocument.body.style.fontFamily = defaultFont

    }, []);

    const handleToggleCode = () => {
        setShowIsEditing(prev => !prev)
        console.log(iframeRef.current.contentDocument.body.innerHTML)
        let textArea = iframeRef.current.contentDocument.body

        if (isEditing) {
            textArea.textContent = textArea.innerHTML

        } else {
            textArea.innerHTML = textArea.textContent
        }
    }



    useEffect(() => {
        // Select the node that will be observed for mutations
        const target = document.querySelector('#shopify-editor').contentDocument.body;


        const observer = new MutationObserver(function (mutations) {
            // console.log(target.innerHTML)
            setBodyHTML(target.innerHTML)
        });
        // Pass in the target node, as well as the observer options.
        observer.observe(target, {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true
        });

        return () => observer.disconnect()


    }, [])





    return (
        <>
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
                                <Stack wrap={false} distribution="trailing">

                                    {isEditing && <Stack.Item fill>
                                        <Stack spacing="tight">
                                            <Stack.Item>
                                                <ButtonGroup segmented>
                                                    <Tooltip content="Formatting" >
                                                        <StylePopover />
                                                    </Tooltip>

                                                    <Tooltip content="Bold" >
                                                        <Button size="medium" onClick={() => RTE.document.execCommand("bold")}>
                                                            <BsTypeBold />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Italic">
                                                        <Button size="medium" onClick={() => RTE.document.execCommand("italic")}>
                                                            <BsTypeItalic />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Underline">
                                                        <Button size="medium" onClick={() => RTE.document.execCommand("underline")}>
                                                            <BsTypeUnderline />
                                                        </Button>
                                                    </Tooltip>
                                                </ButtonGroup>
                                            </Stack.Item>

                                            <Stack.Item>
                                                <ButtonGroup segmented>
                                                    <Tooltip content="Bulleted List">
                                                        <Button size="medium" onClick={() => RTE.document.execCommand("insertUnorderedList")}>
                                                            <BsListUl />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Numbered List">
                                                        <Button size="medium" onClick={() => RTE.document.execCommand("insertOrderedList")}>
                                                            <BsListOl />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Outdent">
                                                        <Button size="medium" onClick={() => RTE.document.execCommand("outdent")}>
                                                            <BsTextIndentRight />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Indent">
                                                        <Button size="medium" onClick={() => RTE.document.execCommand("indent")}>
                                                            <BsTextIndentLeft />
                                                        </Button>
                                                    </Tooltip>

                                                </ButtonGroup>
                                            </Stack.Item>

                                            <Stack.Item>
                                                <ButtonGroup segmented>
                                                    <Tooltip content="Alignment">
                                                        <AlignPopover />
                                                    </Tooltip>

                                                    <Tooltip content="Color">
                                                        <ColorPickerPopover />
                                                    </Tooltip>
                                                </ButtonGroup>
                                            </Stack.Item>

                                            <Stack.Item>
                                                <ButtonGroup segmented>

                                                    <Tooltip content="Insert Link">
                                                        <Button size="medium" onClick={() => setIsCreateLinkModalOpen(true)}>
                                                            <AiOutlineLink />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Insert image">
                                                        <Button size="medium" onClick={() => setIsInsertImageModalOpen(true)}>
                                                            <BsCardImage />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Insert video">
                                                        <Button size="medium" onClick={() => setIsInsertVidModalOpen(true)}>
                                                            <AiOutlineVideoCameraAdd />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Clear formatting">
                                                        <Button size="medium" onClick={() => {
                                                            RTE.document.execCommand("removeFormat")
                                                            RTE.document.execCommand("fontName", false, defaultFont)
                                                        }}>
                                                            <AiOutlineStop />
                                                        </Button>
                                                    </Tooltip>
                                                </ButtonGroup>
                                            </Stack.Item>
                                        </Stack>
                                    </Stack.Item>}



                                    <Stack.Item >
                                        <Tooltip content={isEditing ? "Show editor" : "Show code"}>
                                            <Button size="medium" onClick={handleToggleCode}>
                                                <BsCodeSlash />
                                            </Button>
                                        </Tooltip>
                                    </Stack.Item>

                                </Stack>
                            </ToolWrapper>

                            <IframeWrapper >
                                <iframe style={{ width: "100%", height: 250, border: 'none', position: 'relative' }}
                                    id="shopify-editor"
                                    name="RTE"
                                    ref={iframeRef}>
                                </iframe>
                            </IframeWrapper>
                        </ContentWrapper>
                    </div>


                </FormLayout >
            </Card >

            <CreateLinkModal
                isCreateLinkModalOpen={isCreateLinkModalOpen}
                setIsCreateLinkModalOpen={setIsCreateLinkModalOpen}
            />

            <InsertImgModal
                isInsertImageModalOpen={isInsertImageModalOpen}
                setIsInsertImageModalOpen={setIsInsertImageModalOpen}
            />

            <InsertVidModal
                isInsertVidModalOpen={isInsertVidModalOpen}
                setIsInsertVidModalOpen={setIsInsertVidModalOpen}
            />
        </>
    )
}



export default TextEditor