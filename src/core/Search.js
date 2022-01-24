import React, { useState } from 'react'
import '../styles.css'

const Search = (props) => {
    const { dataSearch, searchMode, selectMode } = props;
    const [ chooseMode, setChoose] = useState([])

    const searchValue = (event) => {
        event.preventDefault()
        dataSearch(event.target.value)
    }

    const modeChange = (event) => {
        event.preventDefault()
        setChoose(event.target.value)
        selectMode(event.target.value)
    }

    return (
       <div className="row justify-content-end mb-2">
           <div className="col-2 datasearch">
                <select className="form-control" name="searchMode" id="searchMode" onChange={ modeChange } value={ chooseMode }>
                    { searchMode.map(s => {
                        return <option value={ s }> { s } </option>
                    })}
                </select>
           </div>
            <div className="col-3 datasearch">
                <input className="form-control" type="text" name="Search" onChange={ searchValue } placeholder="Search..." />
            </div>
        </div>
    )
}

export default Search;
