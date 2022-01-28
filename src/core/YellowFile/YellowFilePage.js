import React, {useState, useEffect} from 'react'
import Base from '../Base'
import YellowFileButtonCreate from './Components/Buttons/YellowFileButtonCreate'



import './yellowfile.style.css'


const YellowFilePage = () => {
    const [yellowfileSearchChoice, setChoice] = useState([
        'Item Num.',
        'FCode',
        'Model'
    ])

    return (
        <Base title="Yellow File Index" desc="Vel-Suede Yellow File System">
            <div className="row justify-content-between mb-2">
                <div className="col">
                    <YellowFileButtonCreate />
                </div>
                <div className="col">
                    <div className="row justify-content-end">
                        <div className="col-3 datasearch">
                                <select className="form-control" name="searchMode" id="searchMode" onChange={ () => {} } value={ yellowfileSearchChoice }>
                                    { yellowfileSearchChoice.map(s => {
                                        return <option value={ s }> { s } </option>
                                    })}
                                </select>
                        </div>
                        <div className="col-4 datasearch">
                            <input className="form-control" type="search" name="Search" onChange={ () => {} } placeholder="Search..." />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </Base>
    )
}

export default YellowFilePage;
