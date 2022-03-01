import React, {useState, useEffect} from 'react'
import { getModel} from '../helper/coreapicalls'
import Base from '../Base'


import "../../styles.css";
import ModelForm from './ModelForm';
import ModelTable from './ModelTable';
import Search from '../Search';
import ConfirmAlert from '../popup/ConfirmAlert'


export default function ModelPage() {
    const [pmodels, setModel] = useState([]);
    const [selectModel, setSelectedModel] = useState([]);
    const [ dataSearch, setSearch] = useState('')
    // const [dataCSV, setDataCSV] = useState([])
    const [modalDialog, setModalDialog] = useState({
        show: false,
        title: "",
        data: [],
        mode: ""
    })

    const [searchMode, setSearchMode] = useState("ModelName")

    const [error, setError] = useState("");

    const loadAllModel = () => {
        getModel()
        .then(data => {
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                setModel(data);
                // console.log(data);
            }
        })
        // console.log(pmodels);
    }


    const searchData = (event) => {
        setSearch(event)
    }

    const modeSearch = (event) => {
        setSearchMode(event)
    }

    const callbackModel = (event) => {
        setSelectedModel(event)
    }

    const confirmDialog = (event) => {
        setModalDialog({show: event})
    }

    
    // const exportCSV = (event) => {
    //     const headers = []
    //     const data = []

    //     if(event) {
    //         pmodels.filter(p => String(p[searchMode]).toLowerCase().includes(dataSearch)).map(p => {
    //             data.push(p)
    //         })

    //         Object.entries(data[0]).map(([key, value]) => headers.push({label: key, key: key}))
    //     }

    //     // setHeaderCSV(headers)
    //     setDataCSV(data)

    //     // console.log("headers : ", headers);
    //     console.log("data export : ", dataCSV);
    // }

    useEffect(() => {
        return (
            loadAllModel()
        )
    }, [])


    return (
        <Base title="Model" desc="Vel-Suede Model System">
            <div className="row mb-2">
                <ModelForm selectModel={ selectModel } pmodels={ pmodels } dataSearch={ dataSearch } searchMode={ searchMode } />
            </div>

            <hr style={{height: '1px', color: 'gray', backgroundColor: 'gray'}} />
            
            <Search key="search" dataSearch={ searchData } selectMode={ modeSearch } searchMode= {["ModelName", "ModelCode", "UpStreamCustCode"]} />

            <div className="row">
                <ModelTable data={ pmodels } callbackModel={ callbackModel } modelSearch={ dataSearch } chooseGroup={ searchMode } show={ confirmDialog } />
            </div>

            <ConfirmAlert show={ modalDialog.show } close={ confirmDialog } />
        </Base>
    )
}


