import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout } from '../auth/helper'


const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#ffcc00", fontWeight: "bold"}
    } else {
        return {color: "#FFFFFF"}
    }
}

const Menu = ({ history, path }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/model")} className="nav-link" to="/model">Model</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Signin</Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link text-white" onClick={() => {signout(() => {
                        history.push("/"); 
                    })}}>
                        Signout
                    </span>
                </li>
            </ul>
        </div>
    )
}


export default withRouter(Menu);

