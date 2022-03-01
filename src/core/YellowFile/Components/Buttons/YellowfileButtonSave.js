import React from 'react';
import { faSave, faBan, faShareSquare, faSync, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createNewYellowFile, reviceYellowFile } from '../../apicalls';
import { isAuthenticated } from '../../../../auth/helper'



const YellowfileButtonSave = ({ data, editStatus, show }) => {
  const his = useHistory()
  const yellowfileid = window.location.pathname.split('/')

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const onSaveClose = (btnMode) => (event) => {
    event.preventDefault();
    createNewYellowFile(userId, token, data)
        .then((res) => {
            if (res.error === false) {
                return (
                  btnMode === "SaveClose"? 
                    his.goBack()
                    :
                    window.location.reload(false)
                )
            }
        })
        .catch((e) => console.log(e))
  }

  const onDelete = (i) => {
    // i.preventDefault()
    data['id'] = Number(yellowfileid[yellowfileid.length - 1])

    show({show: true,
      title: "Confirm Deletion",
      data: i,
      mode: "DELETE" })
  }

  const onRevice = (event) => {
    event.preventDefault()

    data['id'] = Number(yellowfileid[yellowfileid.length - 1])
    reviceYellowFile(userId, token, data)
    .then((res) => {
      if (res.error === false) {
          return (
            his.goBack()
          )
      }
  })
  .catch((e) => console.log(e))
  }

  const onGoBack = () => {
    his.goBack()
  }
  
  return (
      <div>
        { editStatus === false?
        <div>
          <button type="button" class="btn btn-info yellowfile-save-button" onClick={ onSaveClose("SaveClose") } ><FontAwesomeIcon className="mx-2" icon={ faSave } />SAVE & Close</button>
          <button type="button" class="btn btn-info yellowfile-save-button ml-2" onClick={ onSaveClose("SaveNext") }><FontAwesomeIcon className="mx-2" icon={ faShareSquare } />SAVE & New</button>
          <button type="button" class="btn btn-secondary yellowfile-save-button ml-2" onClick={ onGoBack }><FontAwesomeIcon className="mx-2" icon={ faBan } />Cancel & Close</button>
        </div>
        :
        <div>
          <button type="button" class="btn btn-warning yellowfile-save-button" onClick={ onSaveClose("SaveClose") } ><FontAwesomeIcon className="mx-2" icon={ faSync } />Update Ver</button>
          <button type="button" class="btn btn-warning yellowfile-save-button ml-2" onClick={ onRevice }><FontAwesomeIcon className="mx-2" icon={ faEdit } />Revice</button>
          <button type="button" class="btn btn-danger yellowfile-save-button ml-2" onClick={ () => onDelete(data) }><FontAwesomeIcon className="mx-2" icon={ faTrash } />Delete</button>
        </div>
        }
     </div> 
  )
}

export default YellowfileButtonSave;
