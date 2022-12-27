import { Button, FormLayout, Modal, Select, Stack, TextContainer, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function InsertImgModal({ isInsertImageModalOpen, setIsInsertImageModalOpen }) {
    const [link, setLink] = useState("")

    const handleClose = () => {
        setIsInsertImageModalOpen(false)
        setLink("")
    }

    const handleInsertImage = () => {
        RTE.document.execCommand("insertImage", false, link.trim())
        handleClose()
    }
    return (
        <Modal
            activator={() => { }}
            open={isInsertImageModalOpen}
            onClose={handleClose}
            title="Insert image"
            primaryAction={{
                content: 'Insert Image',
                disabled: !link.trim(),
                onAction: handleInsertImage
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
                                label="Paste image URL"
                                placeholder='https://'
                                value={link}
                                onChange={value => setLink(value)}
                            />

                        </Stack.Item>
                    </Stack>
                </FormLayout>
            </Modal.Section>
        </Modal>
    );
}