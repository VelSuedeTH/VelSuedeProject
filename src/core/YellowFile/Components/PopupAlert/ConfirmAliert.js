import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import { isAuthenticated } from '../../../../auth/helper';
import { removeYellowFile } from '../../apicalls';


const ConfirmAlert = ({ show, close }) => {

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;
    const his = useHistory()

    const handleClose = (event) => {
        close(false)
    }

    const onClickConfirm = (event) => {
        event.preventDefault();
        onRemove()
        close(false)
    }

    const onRemove = () => {
        // console.log(show.data);
        removeYellowFile(userId, token, show.data)
        .then((res) => {
            if (res.error === false) {
                return (
                    console.log(show.data),
                    his.goBack()
                )
            }
        })
        .catch((e) => console.log(e))
    }

    return (
        <div>
            <Modal
                show={show.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>{ show.title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { show.data ?
                        <pre>
                            {
                            `You want to delete the yellow file number :
FCode : ${show.data.FCode}
ItemNum : ${show.data.ItemNum}
ItemName : ${show.data.ItemName}
Usage Qty : ${show.data.UsageQty} PCS/Roll`}
                        </pre>
                        :
                        "NO DATA"
                    }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={ onClickConfirm } >Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ConfirmAlert;
