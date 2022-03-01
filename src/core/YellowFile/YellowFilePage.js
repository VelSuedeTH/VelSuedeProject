import React, {useState, useEffect} from 'react'
import Base from '../Base'
import { getYellowFileIndex } from './apicalls'
import YellowFileButtonCreate from './Components/Buttons/YellowFileButtonCreate'
import YellowFileButtonExportCsv from './Components/Buttons/YellowFileButtonExportCsv'
import YellowFileTable from './Components/YellowFileTable'



import './yellowfile.style.css'


const YellowFilePage = () => {
    const [ yellowfiles, setYellowFiles ] = useState([])
    const [ yellowfile, setYellowFile ] = useState([])
    

    const loadYellowFile = () => {
        getYellowFileIndex()
        .then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
              console.log(data)
              setYellowFiles(data)
              setYellowFile(data)
            }
        })
      }


    const [yellowfileSearchChoice, setChoice] = useState([
        'FCode',
        'ItemNum',
        'Model'
    ])

    const [ dataSearch, setDataSearch ] = useState({
        choice: 'FCode',
        data_search: ''
    })

    const { choice, data_search } = dataSearch


    const onSearch = (name) => (event) => {
        setDataSearch({...dataSearch,
            [name]: event.target.value
        })
    }


    const callbackdata = (event) => {
        setYellowFile(event)
    }

    useEffect(() => {
        loadYellowFile()
    }, [])

    return (
        <Base title="Yellow File Index" desc="Vel-Suede Yellow File System">
            <div className="row justify-content-between mb-2">
                <div className="col">
                    <YellowFileButtonCreate />
                </div>
                <div className="col">
                    <div className="row justify-content-end">
                        <div className="col-3">
                            <YellowFileButtonExportCsv data={ yellowfile } fileName="YellowFileIndex" />
                        </div>
                        <div className="col-3 datasearch">
                                <select className="form-control" name="choice" id="searchMode" onChange={ onSearch('choice') } value={ choice }>
                                    { yellowfileSearchChoice.map(s => {
                                        return <option value={ s }> { s } </option>
                                    })}
                                </select>
                        </div>
                        <div className="col-4 datasearch">
                            <input className="form-control" type="search" name="Search" onChange={ onSearch('data_search') } placeholder="Search..." value={ data_search } />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <YellowFileTable data={ yellowfiles } search={ dataSearch } callbackdata={ callbackdata } />
            </div>
        </Base>
    )
}

export default YellowFilePage;

