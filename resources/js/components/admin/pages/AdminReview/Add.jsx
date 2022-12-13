import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import FormReview from './FormReview';

const Add = ({ addReview }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" className='mb-3' onClick={showModal}>
                Add Review
            </Button>
            <Modal title="Add Review"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <FormReview
                    handleCancel={handleCancel}
                    addReview={addReview}
                />
            </Modal>
        </>
    );
}

export default Add;
