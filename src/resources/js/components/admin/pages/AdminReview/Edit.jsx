import React from 'react';
import { Modal } from 'antd';
import FormReview from './FormReview';

const Edit = ({ isEditModalOpen, setIsEditModalOpen, editedReview, editReview }) => {

    const handleCancel = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div>
            <Modal title="Edit Review"
                open={isEditModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <FormReview
                    handleCancel={handleCancel}
                    addProduct={null}
                    editedReview={editedReview}
                    editReview={editReview}
                />
            </Modal>
        </div>
    );
}

export default Edit;
