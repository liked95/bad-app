import { Button, FormLayout, Modal, Select, Stack, TextContainer, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function CreateLinkModal({ isCreateLinkModalOpen, setIsCreateLinkModalOpen }) {
    const [link, setLink] = useState("")

    const handleClose = () => {
        setIsCreateLinkModalOpen(false)
        setLink("")
    }

    const handleInsertLink = () => {
        RTE.document.execCommand("createLink", false, link.trim())
        handleClose()
    }
    return (
        <Modal
            activator={() => { }}
            open={isCreateLinkModalOpen}
            onClose={handleClose}
            title="Insert link"
            primaryAction={{
                content: 'Insert Link',
                disabled: !link.trim(),
                onAction: handleInsertLink
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
                                label="Link to"
                                placeholder='https://'
                                helpText="http:// is required for external links"
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