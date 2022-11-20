import React from 'react';
import { Modal } from 'antd';
import FormProduct from './FormProduct';

const Edit = ({ isEditModalOpen, setIsEditModalOpen, editedProduct, editProduct }) => {

    const handleCancel = () => {
        setIsEditModalOpen(false);
    };


    return (
        <div>
            <Modal title="Edit Product"
                open={isEditModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <FormProduct
                    handleCancel={handleCancel}
                    addProduct={null}
                    editedProduct={editedProduct}
                    editProduct={editProduct}
                />
            </Modal>
        </div>
    );
}

export default Edit;
