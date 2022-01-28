import React from 'react';
import { Link, withRouter } from 'react-router-dom'

import '../Buttons/yellowfile.button.styles.css'
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const YellowFileGoBackButton = ({ gobackpath }) => {
  return (
    <Link to={ gobackpath } className="btn btn-outline-warning yellowfile-goback-button">Go Back<FontAwesomeIcon className="mx-2" icon={ faUndo } /></Link>
  )
}

export default withRouter(YellowFileGoBackButton);
