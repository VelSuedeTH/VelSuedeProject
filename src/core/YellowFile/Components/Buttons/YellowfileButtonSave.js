import React from 'react';
import { faSave, faBan, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const YellowfileButtonSave = () => {
  return (
      <div>
        <button type="button" class="btn btn-info yellowfile-save-button">SAVE & Close<FontAwesomeIcon className="mx-2" icon={ faSave } /></button>
        <button type="button" class="btn btn-info yellowfile-save-button ml-2">SAVE & New<FontAwesomeIcon className="mx-2" icon={ faShareSquare } /></button>
        <button type="button" class="btn btn-secondary yellowfile-save-button ml-2">Cancel & Close<FontAwesomeIcon className="mx-2" icon={ faBan } /></button>
      </div>    
  )
}

export default YellowfileButtonSave;
