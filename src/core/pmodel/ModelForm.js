import React, {useState, useEffect} from 'react'
import { CSVLink } from "react-csv";
import ReactTooltip from "react-tooltip";

import { faFileDownload, faSave, faSync, faEdit, faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getCustomer, createNewModel, reviceModel, updateModel } from '../helper/coreapicalls';
import { isAuthenticated } from '../../auth/helper';
import moment from 'moment';


const ModelForm = ({ selectModel, pmodels, dataSearch, searchMode }) => {
    const dataList = [...pmodels]

    const [statusUpdate, setStatus] = useState(false);
    const onUpdate = () => setStatus(true);

    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(false);

    const [dataCSV, setDataCSV] = useState([])
    const [filename, setFilename] = useState([])


    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const [values, setValues] = useState({
        ModelCode: "-",
        ModelName: "",
        UpStreamCustCode: "1",
        MPSchedule: "",
        EOLSchedule: "",
        MonthlyProductionQty: 0,
        ModelRemark: "",
        EOLFlg: false,
    });

    const { ModelCode, ModelName, UpStreamCustCode, MPSchedule, EOLSchedule, MonthlyProductionQty, ModelRemark, EOLFlg } = values;

    function claerData() {
        window.location.reload(false);
        setValues({
            ...values,
            ModelCode: "-",
            ModelName: "",
            UpStreamCustCode: '1',
            MPSchedule: "",
            EOLSchedule: "",
            MonthlyProductionQty: 0,
            EOLFlg: false
        });
        setStatus(false);
      }

    const onSaveNew = (event) => {
        event.preventDefault();
        setValues({ ...values });
        // console.log(values);
        createNewModel(userId, token, values)
        .then((res) => {
            if (res.error === false) {
                return (
                    // console.log(values)
                    claerData()
                )
            }
        })
        .catch((e) => console.log(e))
    }

    const onReviceModel = (event) => {
        event.preventDefault();
        setValues({ ...values });
        reviceModel(userId, token, values)
        .then((res) => {
            if (res.error === false) {
                return (
                    claerData()
                )
            }
        })
        .catch((e) => console.log(e))
    }

    const onUpdateModel = (event) => {
        event.preventDefault();
        setValues({ ...values });
        updateModel(userId, token, values)
        .then((res) => {
            if (res.error === false) {
                return (
                    claerData()
                )
            }
        })
        .catch((e) => console.log(e))
    }

    const exportCSV = () => {
        // const data = []
        // console.log(pmodels);
        
        const data = dataList.filter(p => String(p[searchMode]).toLowerCase().includes(dataSearch)).map(p => {
            if (typeof(p.UpStreamCustCode) === 'string') {
                return p
            } else {
                
                p['UpStreamCustCode'] = `${p.UpStreamCustCode.CustomerCode} : ${p.UpStreamCustCode.CustomerName}`
                p['RegUserCode'] = p.RegUserCode.name
                p['UpUserCode'] = p.UpUserCode.name

                p['MPSchedule'] = moment(p.MPSchedule).format("YYYY-MM-DD HH:mm")
                p['EOLSchedule'] = moment(p.EOLSchedule).format("YYYY-MM-DD HH:mm")
                p['RegDate'] = moment(p.RegDate).format("YYYY-MM-DD HH:mm")
                p['UpDate'] = moment(p.UpDate).format("YYYY-MM-DD HH:mm")

                return p
            }
        })

        setFilename(`${moment(Date.now()).format("YYMMDDHHmm")}_CSV-MODEL-DATA.csv`)
        setDataCSV(data)

        window.location.reload(false);
    }

    const handleChange = (name) =>
    (event) => {
        if(name === "EOLFlg") {
            setValues({ ...values, error: false, EOLFlg: !EOLFlg });
        } else {
            setValues({ ...values, error: false, [name]: event.target.value });
        }
    };

    const modelToForm = (event) => {
        setValues({
            ...values,
            ModelCode: selectModel.ModelCode,
            ModelName: selectModel.ModelName,
            UpStreamCustCode: selectModel.UpStreamCustCode && selectModel.UpStreamCustCode.id,
            MPSchedule: moment(selectModel.UpStreamCustCode).format("YYYY-MM-DD"),
            EOLSchedule: moment(selectModel.EOLSchedule).format("YYYY-MM-DD"),
            MonthlyProductionQty: selectModel.MonthlyProductionQty,
            ModelRemark: selectModel.Description,
            EOLFlg: selectModel.EOLFlg
        })
    }

    const loadAllCustomers = () => {
        getCustomer()
        .then(data => {
            if (data.error) {
                setError(data.error);
                console.log(data.error);
            } else {
                setCustomers(data);
                // console.log(data);
            }
        })
    }

    useEffect(() => {
        return (
            loadAllCustomers(),
            modelToForm(),
            onUpdate
        )
    }, [selectModel])

    return (
        <form className="container-fluid">
            <div className="row col-6">
                <div className="col-6">
                    <label htmlFor="modelCode">
                        Model Code :
                        <input readOnly className="form-control" type="text" name="modelCode" value={ModelCode} />
                    </label>
                    { !statusUpdate ? 
                        <label htmlFor="modelName">
                            Model Name :
                            <input className="form-control" type="text" name="modelName" value={ModelName} onChange={handleChange("ModelName")} />
                        </label> :
                            <label htmlFor="modelName">
                            Model Name :
                            <input readOnly className="form-control" type="text" name="modelName" value={ModelName} onChange={handleChange("ModelName")} />
                        </label>
                    }
                    <label htmlFor="upStreamCus">
                        Upstream Customer :
                        <select className="form-control" name="upStreamCus" id="upStreamCus" value={UpStreamCustCode} onChange={handleChange("UpStreamCustCode")}>
                            {customers.map((cus) => {
                                return <option value={cus.id}>{cus.CustomerCode} : {cus.CustomerName}</option>
                            })}
                        </select>
                    </label>
                    <label htmlFor="eolCheck">
                        <input className="eolCheck mr-2" type="checkbox" name="eolCheck" checked={ EOLFlg } onChange={handleChange("EOLFlg")} />
                        EOL
                    </label>
                </div>
                <div className="col-6">
                    <label htmlFor="mpSchedule">
                        MP Schedule :
                        <input className="form-control" type="date" name="mpSchedule" value={MPSchedule} onChange={handleChange("MPSchedule")} />
                    </label>
                    <label htmlFor="eolSchedule">
                        EOL Schedule :
                        <input className="form-control" type="date" name="eolSchedule" value={EOLSchedule} onChange={handleChange("EOLSchedule")} />
                    </label>
                    <label htmlFor="qtyMonth">
                        Production Qty/Month :
                        <input className="form-control" type="number" name="qtyMonth" value={MonthlyProductionQty} onChange={handleChange("MonthlyProductionQty")} />
                    </label>
                </div>
            </div>
            <div className="row col-6 mb-2">
                <div className="col">
                    <label for="modelRemark">Remark :</label>
                    <textarea className="form-control" id="modelRemark" rows="3" name='ModelRemark' value={ModelRemark} onChange={handleChange("ModelRemark")}></textarea>
                </div>
            </div>
            { !statusUpdate ?
                <div className="row col-6">
                    <div className="col">
                        <button type="button" className="btn btn-info btn-block" onClick={ onSaveNew }><FontAwesomeIcon className="mx-2" icon={ faSave } />Create New Model</button>
                    </div>
                </div>
                :
                <div className="row col-6">
                    <div className="col">
                        <button data-tip data-for="updateModelTip" type="button" className="btn btn-warning btn-block" onClick={ onUpdateModel }><FontAwesomeIcon className="mx-2" icon={ faSync } />Update Model</button>
                        <ReactTooltip id="updateModelTip" place="bottom" effect="solid">
                            <b>* Update Model = อัพเดทข้อมูล Model (ในกรณีที่มีการแก้ไขอัพเดทข้อมูลใหม่)</b><br />
                            <u><b>ยกตัวอย่างเช่น</b></u><br />
                            Model A4-00000-01 เคยเป็นของลูกค้า SONY มาก่อน<br />
                            หลังจากนั้นเปลี่ยนไปเป็นงานของลูกค้า NIKON<br />
                            จึงทำการอัพเดทข้อมูลใหม่ โดยข้อมูลเก่าจะไม่ถูกลบสามารถสืบย้อนกลับได้<br />
                        </ReactTooltip>
                    </div>
                    <div className="col">
                        <button data-tip data-for="reviceModelTip" type="button" className="btn btn-warning btn-block" onClick={ onReviceModel }><FontAwesomeIcon className="mx-2" icon={ faEdit } />Revise Model Data</button>
                        <ReactTooltip id="reviceModelTip" place="bottom" effect="solid">
                            <b>** Revise Model Data = แก้ไขข้อมูล Model (ในกรณีที่ข้อมูลไม่ถูกต้อง)</b><br />
                            <u><b>ยกตัวอย่างเช่น</b></u><br />
                            Model A4-00000-01 เป็นของลูกค้า SONY<br />
                            แต่ข้อมูลถูกบันทึกเป็นของ NIKON<br />
                            ดังนั้น ถือว่าข้อมูลผิดพลาด จึงต้องทำการแก้ไขข้อมูลให้ถูกต้อง
                        </ReactTooltip>
                    </div>
                </div>
            }
            <div className="row col-6">
                <div className="col mt-2">
                    <CSVLink
                    data={dataCSV}
                    filename={filename}
                    className="btn btn-primary"
                    target="_blank"
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={ exportCSV }>
                        <FontAwesomeIcon className="mx-2" icon={ faFileDownload } />Export To CSV File
                    </CSVLink>
                </div>
                <div className="col mt-2">
                    <button type="button" className="btn btn-secondary btn-block" onClick={claerData}><FontAwesomeIcon className="mx-2" icon={ faChalkboard } />Clear</button>
                </div>
            </div>
        </form>
    )
}

export default ModelForm;
