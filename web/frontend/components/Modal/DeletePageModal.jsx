import { Button, FormLayout, Modal, Select, Stack, TextContainer, TextField } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function DeletePageModal({ id, type, isDeleteModalOpen, setIsDeleteModalOpen, handleDeletePages, deleteSinglePage}) {
    const [link, setLink] = useState("")

    const handleClose = () => {
        setIsDeleteModalOpen(false)
        setLink("")
    }




    return (
        <Modal
            activator={() => { }}
            open={isDeleteModalOpen}
            onClose={handleClose}
            title="Delete "
            primaryAction={{
                content: type == 'multi' ? 'Delete' : 'Delete this page',
                destructive: true,
                onAction: () => {
                    type == 'multi' ? handleDeletePages() : deleteSinglePage(id)
                    handleClose()
                }


            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleClose
                },
            ]}
        >
            <Modal.Section>
                <TextContainer>
                    <p>
                        Deleted pages cannot be recovered. Do you still want to continue?
                    </p>
                </TextContainer>
            </Modal.Section>
        </Modal>
    );
}