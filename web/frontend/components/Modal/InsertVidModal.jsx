import { Button, FormLayout, Modal, Select, Stack, TextContainer, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function InsertVidModal({ isInsertVidModalOpen, setIsInsertVidModalOpen }) {
    const [link, setLink] = useState("")

    const handleClose = () => {
        setIsInsertVidModalOpen(false)
        setLink("")
    }

    const handleInsertVideo = () => {
        RTE.document.execCommand("insertHTML", false, link.trim())
        handleClose()
    }

    return (
        <Modal
            activator={() => { }}
            open={isInsertVidModalOpen}
            onClose={handleClose}
            title="Insert video"
            primaryAction={{
                content: 'Insert Video',
                disabled: !link.trim(),
                onAction: handleInsertVideo
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleClose

                },
            ]}
        >
            <Modal.Section>
                <FormLayout>
                    <Stack>
                        <Stack.Item fill>
                            <TextField
                                label="Insert a video by pasting the embed snippet in the box below."
                                multiline={5}
                                placeholder='https://'
                                value={link}
                                onChange={value => setLink(value)}
                                helpText='The embed snippet usually starts with "<iframe …"'
                            />

                        </Stack.Item>
                    </Stack>
                </FormLayout>
            </Modal.Section>
        </Modal>
    );
}