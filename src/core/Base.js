import React from 'react'
import Menu from './Menu';



const Base = ({
    title="My Title",
    desc="My Description",
    className="bg-dark text-white p-4",
    children
}) => {
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{ title }</h2>
                    <p className="lead">{ desc }</p>
                </div>
                <div className={ className }>{ children }</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="con-footer container-fluid text-white text-center py-3">
                    <h5>If you got any questions Tel.123 IT Support.</h5>
                    <div className="container">
                        <span className="text-warning">
                            An Amazing Django React FullStack Course.
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Base;
