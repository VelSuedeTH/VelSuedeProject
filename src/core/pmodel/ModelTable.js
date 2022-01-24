import React, {useState} from 'react'
import Moment from 'moment';


import { faTrash, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ModelTable = ({data, callbackModel, modelSearch, chooseGroup, show}) => {
    const pmodels = data;
    const [ showAll, setShowAll ] = useState(false)

    const onSelectModel = (pmodel) => {
        callbackModel(pmodel)
    }


    const handleChange = (event) => {
        setShowAll(!showAll)
        if (showAll === true) {
            console.log('yes');
        } else {
            const output = [...new Map(pmodels.map(o => [o.ModelName, o])).values()]
            console.log(output);
        }
    };


    const onDelete = (i) => {
        // console.log("Delete : ",i);
        show({show: true,
            title: "Confirm Deletion",
            data: i,
            mode: "DELETE" })
    }


    return (
        <div className="container-fluid">
            <table className="table table table-success table-striped">
                <thead>
                    <tr>
                    <th scope="col">
                        <label htmlFor="showAllCheck">
                            <input className="showAllCheck mr-2" type="checkbox" name="showAllCheck" checked={ showAll } onChange={handleChange} />
                            All
                        </label>
                    </th>
                    {/* <th scope="col">Model ID</th> */}
                    <th scope="col">Model Name</th>
                    <th scope="col">UpStream Customer</th>
                    <th scope="col">MP Schedule</th>
                    <th scope="col">EOL Schedule</th>
                    <th scope="col">EOL Flg</th>
                    <th scope="col">Monthly/Qty</th>
                    <th scope="col">Register By</th>
                    <th scope="col">Register Date</th>
                    <th scope="col">Update By</th>
                    <th scope="col">Update Date</th>
                    <th scope="col">Remark</th>
                    {/* <th scope="col">Status</th> */}
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pmodels.filter(p => String(p[chooseGroup]).toLowerCase().includes(modelSearch)).map((pmodel, index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{ index+1 }</th>
                                {/* <td>{ pmodel.ModelCode }</td> */}
                                <td><a href="#" onClick={() => {onSelectModel(pmodel)}} >{ pmodel.ModelName }</a></td>
                                <td>{ pmodel.UpStreamCustCode.CustomerCode } : { pmodel.UpStreamCustCode.CustomerName }</td>
                                <td>{ Moment(pmodel.MPSchedule).format('YYYY/MM/DD') }</td>
                                <td>{ Moment(pmodel.EOLSchedule).format('YYYY/MM/DD') }</td>
                                { pmodel.EOLFlg === true ?
                                    <td><FontAwesomeIcon icon={ faCheckCircle } /></td>
                                    :
                                    <td><FontAwesomeIcon icon={ faTimesCircle } /></td>
                                }
                                <td>{ Number(pmodel.MonthlyProductionQty).toLocaleString() }</td>
                                <td>{ pmodel.RegUserCode.name }</td> 
                                <td>{ Moment(pmodel.RegDate).format('YYYY/MM/DD HH:mm') }</td>
                                <td>{ pmodel.UpUserCode.name }</td>
                                <td>{ Moment(pmodel.UpDate).format('YYYY/MM/DD HH:mm') }</td>
                                <td>{ pmodel.Description }</td>
                                <td>
                                    <a href="#" onClick={() => onDelete(pmodel)}><FontAwesomeIcon color="gray" icon={ faTrash } /></a>
                                </td>
                            </tr>
                    )})}
                </tbody>
            </table>
        </div>
    )
}

export default ModelTable;
