import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Moment from 'moment';

import { isAuthenticated } from '../../auth/helper';
import { removeModel } from '../helper/coreapicalls';



const ConfirmAlert = ({ show, close }) => {

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const handleClose = (event) => {
        close(false)
    }

    const onClickConfirm = (event) => {
        event.preventDefault();

        if (show.mode === "DELETE") {
            onRemove()
        } else if (show.mode === "SAVE") {
            console.log(show.data.ModelCode);
        } else if (show.mode === "REVICE") {
            console.log(show.data.ModelCode);
        } else if (show.mode === "UPDATE") {
            console.log(show.data.ModelCode);
        // } else if (show.mode === "CANCEL") {
        //     onCancel()
        }

        close(false)
    }

    const onRemove = () => {
        removeModel(userId, token, show.data)
        .then((res) => {
            if (res.error === false) {
                return (
                    console.log(show.data),
                    window.location.reload(false)
                )
            }
        })
        .catch((e) => console.log(e))
    }

    // const onCancel = () => {
    //     cancelModel(userId, token, show.data)
    //     .then((res) => {
    //         if (res.error === false) {
    //             return (
    //                 console.log(show.data),
    //                 window.location.reload(false)
    //             )
    //         }
    //     })
    //     .catch((e) => console.log(e))
    // }

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
                            `Model Name : ${show.data.ModelName}
Customer : ${show.data.UpStreamCustCode.CustomerCode} : ${show.data.UpStreamCustCode.CustomerName}
EOL Flg : ${show.data.EOLFlg}
MP Schedule : ${Moment(show.data.MPSchedule).format('YYYY/MM/DD')}
EOL Schedule : ${Moment(show.data.EOLSchedule).format('YYYY/MM/DD')}
Monthly/Qty : ${show.data.MonthlyProductionQty}
Register By : ${show.data.RegUserCode.name}   Update By : ${show.data.UpUserCode.name}
Register Date : ${Moment(show.data.RegDate).format('YYYY/MM/DD')}   Update Date : ${Moment(show.data.MPSchedule).format('YYYY/MM/DD')}`}
                        </pre>
                        :
                        "NO DATA"
                    }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={onClickConfirm} >Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ConfirmAlert;
