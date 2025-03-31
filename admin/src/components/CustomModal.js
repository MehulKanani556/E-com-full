import React from 'react'
import { Modal } from 'antd';
export default function CustomModal({title,open,hideModal,performAction}) {
    return (
        <Modal
            title="Modal"
            open={open}
            onOk={performAction}
            onCancel={hideModal}
            okText="Ok"
            cancelText="Cancel"
        >
            <p>{title}</p>
           
        </Modal>
    )
}
