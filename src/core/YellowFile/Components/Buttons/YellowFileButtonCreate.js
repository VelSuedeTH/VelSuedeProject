import React from 'react';
import { Link, withRouter } from 'react-router-dom'

import '../Buttons/yellowfile.button.styles.css'
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const YellowFileCreateButton = () => {
  return (
    <Link to="/yellowfile-form1" className="btn btn-info yellowfile-create-button">Create<FontAwesomeIcon className="mx-2" icon={ faPlusSquare } /></Link>
  )
}

export default withRouter(YellowFileCreateButton);
