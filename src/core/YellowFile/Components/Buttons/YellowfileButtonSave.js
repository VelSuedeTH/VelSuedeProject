import React from 'react';
import { faSave, faBan, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createNewYellowFile } from '../../apicalls';
import { isAuthenticated } from '../../../../auth/helper'



const YellowfileButtonSave = ({ data, gobackpath }) => {
  const his = useHistory()

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

  const onGoBack = () => {
    his.goBack()
  }
  
  return (
      <div>
        <button type="button" class="btn btn-info yellowfile-save-button" onClick={ onSaveClose("SaveClose") } >SAVE & Close<FontAwesomeIcon className="mx-2" icon={ faSave } /></button>
        <button type="button" class="btn btn-info yellowfile-save-button ml-2" onClick={ onSaveClose("SaveNext") }>SAVE & New<FontAwesomeIcon className="mx-2" icon={ faShareSquare } /></button>
        <button type="button" class="btn btn-secondary yellowfile-save-button ml-2" onClick={ onGoBack }>Cancel & Close<FontAwesomeIcon className="mx-2" icon={ faBan } /></button>
      </div>
  )
}

export default YellowfileButtonSave;
