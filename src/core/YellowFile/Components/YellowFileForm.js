import React, { useState, useEffect } from 'react';
import Base from '../../Base'
import { getYellowFileCategory, getYellowFileTypeChange, getYellowFileTypeEffect,
        getYellowFileStorage, getProductProcess, getUsage, getYellowFileIndex } from '../apicalls';

import { getModel } from '../../helper/coreapicalls'

import '../yellowfile.style.css'
import YellowFileButtonGoback from './Buttons/YellowFileButtonGoback';
import YellowfileButtonSave from './Buttons/YellowfileButtonSave';
import YellowFileDropdown from './Dropdowns/YellowFileDropdown';
import Moment from 'moment';
import ConfirmAlert from './PopupAlert/ConfirmAliert';



const YellowFileForm = (props) => {

  const [ categorys, setCategorys ] = useState([])
  const [ customers, setCustomers ] = useState([])
  const [ models, setModels ] = useState([])
  const [ ppThai, setPPThai ] = useState([])
  const [ subPP, setSubPP ] = useState([])
  const [ allPPValue, setVllPPValue ] = useState([])
  const [ checks, setChecks ] = useState([])
  const [ status, setStatus ] = useState([])
  const [ usages, setUsages ] = useState()
  const [ yellowfileTypeChange, setYellowFileTyepChange ] = useState([])
  const [ yellowfileTypeEffect, setYellowFileTyepEffect ] = useState([])
  const [ yellowfileStorage, setYellowFileStorage ] = useState([])
  const [ yellowFile, setYellowFile] = useState([])
  const [ editStatus, setEditStatus ] = useState(false)

  const yellowdata = props.location.state
  // console.log(yellowdata);

  const [values, setValues ] = useState({
    Customer: yellowdata?`${yellowdata?.PCode.ModelCode.UpStreamCustCode.CustomerCode} : ${ yellowdata?.PCode.ModelCode.UpStreamCustCode.CustomerName }`: "",
    FCode: yellowdata?.FCode,
    ItemNum: yellowdata?.ItemNum,
    ItemName: yellowdata?.ItemName,
    Model: yellowdata?.PCode.ModelCode.ModelCode,
    PPThai : yellowdata?.PPThai.id,
    PCode: yellowdata?.PCode.PCode,
    RegisEffect: yellowdata?.YFCngEffectType.YFCngEffectTypeCode ,
    RegisType: yellowdata?.YFCngType.YFCngTypeCode,
    UsageQty: yellowdata?.PCode.Usage,
    SeqID: yellowdata?.SeqCode,
    YellowFileRemark: yellowdata?.Remarks,
    APQStorage: yellowdata?.APQStorage.StorageName,
    C1: yellowdata?.C1,
    C2: yellowdata?.C2,
    C3: yellowdata?.C3,
    C4: yellowdata?.C4,
    C5: yellowdata?.C5,
    C6: yellowdata?.C6,
    C7: yellowdata?.C7,
    category1: yellowdata?.Cate1.id,
    category2: yellowdata?.Cate2.id,
    category3: yellowdata?.Cate3.id,
    pp1: yellowdata?.PP1.id,
    pp2: yellowdata?.PP2.id,
    YellowFileStatus: yellowdata?.Status,
    YFStorage: yellowdata?.YFStorage.StorageName,
    YFCngEffectDate: Moment(yellowdata?.YFCngEffectType.AbolishDate).format('yyyy-MM-DD')
  })

  const { FCode, ItemNum, ItemName, Model, Customer,
          UsageQty, YellowFileRemark, PCode, SeqID,
          category1, category2, category3,
          PPThai, pp1, pp2, C1, C2, C3, C4, C5, C6, C7,
          YFStorage, APQStorage, RegisEffect, RegisType,
          YellowFileStatus, YFCngEffectDate } = values;

  const [modalDialog, setModalDialog] = useState({
                                                    show: false,
                                                    title: "",
                                                    data: [],
                                                    mode: ""
                                                })


  const confirmDialog = (event) => {
      setModalDialog({show: event})
  }


  const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };


  const selectedModel = (modelcode) => {
    loadUsage(modelcode)
    const cus = customers.filter(c => c.ModelID === Number(modelcode))

    setValues({...values,
      Model: modelcode,
      PCode: usages?.PCode,
      UsageQty: usages?.Usage,
      Customer: cus[0].Cus}, console.log(cus))
  }
  

  const selectPPThai = (event) => {
    setValues({...values, PPThai: event})
    console.log(subPP)
    
    const subpp = allPPValue.filter(pp => pp.PPThaiCode === event).map(pp => ({id: pp.id, name: `${pp.PP1Code} : ${pp.PP1Name}`}))
          setSubPP([{key: 'pp1', titleName: 'PP 1 :', cateList: subpp},
                    {key: 'pp2', titleName: 'PP 2 :', cateList: subpp}])
  }


  const selected = (name) => (event) => {
    console.log(name, event);
    setValues({...values, [name]: event })
  }


  const checkLists = () => {
    const checkCode = [...Array(6)].map((e, i) => ({id: i, name : i}))
    setChecks([...Array(7)].map((e, i) => ({ key: `C${i + 1}`, titleName: `C${i + 1} :`, cateList: checkCode })))
  }


  const yellowfileStatus = () => {
    const yfstatus = [{id: 'Continue', name : 'Continue'},
                      {id: 'Discontinue', name : 'Discontinue'},
                      {id: 'Something2', name : 'Something2'}]
    setStatus({ key: `yellowfile-status`, titleName: `Status`, cateList: yfstatus })
  }


  const loadUsage = (mCode) => {
    getUsage()
    .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          const usage = data.filter(u => u.ModelCode.ModelCode === Number(mCode))
          setUsages(usage[0])
        }
    })
  }


  const loadYellowFile = () => {
    getYellowFileIndex()
    .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setYellowFile(data)
        }
    })
  }


  const loadCate = () => {
    getYellowFileCategory()
    .then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
          const [cateName, cateName2, cateName3] = [data.filter(v => v.CateGroup === '1').map(v => ({id: v.id, name : v.CateName})),
                                                    data.filter(v => v.CateGroup === '2').map(v => ({id: v.id, name : v.CateName})),
                                                    data.filter(v => v.CateGroup === '3').map(v => ({id: v.id, name : v.CateName}))]
          setCategorys([{key: 'category1', titleName: 'Category 1 :', cateList: cateName},
                        {key: 'category2', titleName: 'Category 2 :', cateList: cateName2},
                        {key: 'category3', titleName: 'Category 3 :', cateList: cateName3}])
        }
    })
  }


  const loadYFTypeChange = () => {
    getYellowFileTypeChange()
    .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          const typeChange = data.map(t => ({id: t.YFCngTypeCode, name: t.YFCngTypeName}))
          setYellowFileTyepChange({titleName: 'Registration Type :', cateList: typeChange})
        }
    })
  }


  const loadProductProcess = () => {
    getProductProcess()
    .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          const ppth = data.map(pp => ({id: pp.id, name: `${pp.PPThaiCode} : ${pp.PPThaiName}`}))
          setPPThai({key: 'ppthai', titleName: 'PP Thai :', cateList: ppth})

          const subpp = data.filter(pp => pp.PPThaiCode === values.PPThai).map(pp => ({id: pp.id, name: `${pp.PP1Code} : ${pp.PP1Name}`}))
          setSubPP([{key: 'pp1', titleName: 'PP 1 :', cateList: subpp},
                    {key: 'pp2', titleName: 'PP 2 :', cateList: subpp}])

          setVllPPValue(data)
        }
    })
  }

  
  const loadYFTypeEffect = () => {
    getYellowFileTypeEffect()
    .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          const typeEffect = data.map(t => ({id: t.YFCngEffectTypeCode, name: t.YFCngEffectTypeName}))
          setYellowFileTyepEffect({titleName: 'Registration reflect Method :', cateList: typeEffect})
        }
    })
  }


  const loadYFStorage = () => {
    getYellowFileStorage()
    .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          const [ yfStorage, apqfStorage] = [data.filter(s => s.StorageType === 'YellowFile').map(s => ({id: s.StorageName, name: s.StorageName})),
                                            data.filter(s => s.StorageType === 'APQFile').map(s => ({id: s.StorageName, name: s.StorageName}))]
          setYellowFileStorage([{key: 'YFStorage', titleName: 'Yellow File Storage :', cateList: yfStorage},
                                  {key: 'APQStorage', titleName: 'APQ File Storage :', cateList: apqfStorage}])
        }
    })
  }

  const loadModel = () => {
    getModel()
    .then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        const model = data.map(m => ({id: m.ModelCode, name : `${m.ModelCode} : ${m.ModelName}`}))
        setModels({titleName: 'Model :', cateList: model})

        const modelCus = data.map(c => ({ ModelID: c.ModelCode, Cus: `${c.UpStreamCustCode.CustomerCode} : ${c.UpStreamCustCode.CustomerName}`}))
        setCustomers(modelCus)
      }
    })
  }

  useEffect(() => {

    return (
        checkLists(),
        loadCate(),
        loadYFTypeChange(),
        loadYFTypeEffect(),
        loadYFStorage(),
        loadModel(),
        loadProductProcess(),
        yellowfileStatus(),
        loadYellowFile(),
        setEditStatus( yellowdata? true : false)
        // YellowfileToForm()
    )
  }, [])

  useEffect(() => {
    return (
      !yellowFile.length? console.log(true)
      :
      setValues({...values,
      Model: Model,
      PCode: usages? usages.PCode : 0,
      UsageQty: usages? usages.Usage : 0
      })
    )
  }, [usages])

  useEffect(() => {
    const seq = yellowFile.filter(s => s.PCode.PCode === PCode).map(s => Number(s.SeqCode))
    // console.log(yellowFile);
    return (
      // console.log(yellowFile.length),
      yellowdata? 
        yellowdata.PCode.id === Number(PCode)?
        setValues({...values,
          SeqID: yellowdata.SeqCode
          })
          :
          setValues({...values,
            SeqID: !seq ? 1 : Math.max(...seq) + 1
            })
      :
      setValues({...values,
        SeqID: !seq ? 1 : Math.max(...seq) + 1
        })
    )
  }, [PCode])


  return (
    <Base title="Yellow File Index" desc="Vel-Suede Yellow File System">
        <div className='mx-5'>
          <YellowFileButtonGoback gobackpath='/yellowfile' />
        </div>
        
        <div className="card mx-5">
          <form>
            <div className="card-body card-yellowfile-form">
              { !yellowdata?
                <h3>Creact New Yellow File</h3>
              :
                <h3>{ `FCode : ${yellowdata?.FCode} (Item Name : ${ yellowdata?.ItemName })` }</h3>
              }
              <hr />
              <div className="row mt-5">
                <div className="col">
                  <h5 className='yellowfile-header-form'>Yellow File</h5>
                  <hr />
                  <div className='padding-group-group'>
                    <div className="row">
                      <div className="col-2">
                        <label htmlFor="modelName">
                            FCode :
                            <input className="form-control" type="text" name="FCode" value={ FCode } onChange={ handleChange("FCode") } />
                        </label>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                          <label htmlFor="modelName">
                            Item Num :
                            <input className="form-control" type="text" name="ItemNum" value={ ItemNum } onChange={ handleChange("ItemNum") } />
                          </label>
                        </div>
                        <div className="col-5">
                          <label htmlFor="modelName">
                            Item Name :
                            <input className="form-control" type="text" name="ItemName" value={ ItemName } onChange={ handleChange("ItemName") } />
                          </label>
                        </div>
                        <div className="col">
                          <label htmlFor="modelName">
                            Usage Qty (PCS.) :
                            <input readOnly className="form-control" type="text" name="UsageQty" value={ UsageQty } />
                          </label>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className='col'>
                  <h5 className='yellowfile-header-form'>Customer</h5>
                  <hr />
                  <div className="padding-group-group">
                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="Customer">
                          Customer :
                          <input readOnly className="form-control" type="text" name="Customer" value={ Customer } onChange={ handleChange("Customer") } />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <h5 className='yellowfile-header-form'>Model</h5>
                  <hr />
                  <div className="padding-group-group">
                    <div className="row">
                      <div className="col">
                        <YellowFileDropdown key='yellowfile-model' titleName={ models['titleName'] } cateList={ models['cateList'] } selected={ selectedModel } value={ Model } />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="modelName">
                          PCode :
                          <input readOnly className="form-control" type="text" name="pCode" value={ PCode } />
                        </label>
                      </div>
                      <div className="col">
                        <label htmlFor="modelName">
                          Sequential ID :
                          <input readOnly className="form-control" type="text" name="SeqID" value={ SeqID } />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className='col'>
                  <h5 className='yellowfile-header-form'>Category</h5>
                  <hr />
                  <div className="padding-group-group">
                  <div className="row">
                    { categorys.map(c => (
                        <div className="col-6">
                          <YellowFileDropdown key={ c['key'] } titleName={ c['titleName'] } cateList={ c['cateList'] } selected={ selected(c['key']) }
                          value={ c['key'] === 'category1'? category1
                          : c['key'] === 'category2'? category2
                          : category3} />
                        </div>
                    ))}
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <h5 className='yellowfile-header-form'>Produce Process</h5>
                  <hr />
                  <div className="padding-group-group">
                    <div className="row">
                      <div className="col">
                        <YellowFileDropdown key={ ppThai['key'] } titleName={ ppThai['titleName'] } cateList={ ppThai['cateList'] } selected={ selectPPThai }
                        value={ PPThai } />
                      </div>
                    </div>
                    <div className="row">
                      { subPP.map(pp => (
                        <div className="col">
                          <YellowFileDropdown key={ pp['key'] } titleName={ pp['titleName'] } cateList={ pp['cateList'] } selected={ selected(pp['key']) }
                          value={ pp['key'] === 'pp1'? pp1 : pp2 } />
                        </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <h5 className='yellowfile-header-form'>-</h5>
                  <hr />
                  <div className='padding-group-group'>
                    <div className="row">
                        { checks.map( c => (
                          <div className="col-3">
                          <YellowFileDropdown key={ c['key'] } titleName={ c['titleName'] } cateList={ c['cateList'] } selected={ selected(c['key']) }
                          value={ c['key'] === 'C1'? C1
                          :c['key'] === 'C2'? C2
                          :c['key'] === 'C3'? C3
                          :c['key'] === 'C4'? C4
                          :c['key'] === 'C5'? C5
                          :c['key'] === 'C6'? C6
                          :C7 } />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col">
                      <h5 className='yellowfile-header-form'>Storage</h5>
                      <hr />
                      <div className='padding-group-group'>
                        <div className="row">
                        { yellowfileStorage.map( s => (
                          <div className="col-6">
                            <YellowFileDropdown key={ s['key'] } titleName={ s['titleName'] } cateList={ s['cateList'] } selected={ selected(s['key']) }
                            value={ s['key'] === 'YFStorage'? YFStorage : APQStorage } />
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col">
                      <h5 className='yellowfile-header-form'>Registration</h5>
                      <hr />
                      <div className='padding-group-group'>
                        <div className="row">
                          <div className="col-6">
                            <YellowFileDropdown key='regis-type' titleName={ yellowfileTypeChange['titleName'] } cateList={ yellowfileTypeChange['cateList'] } selected={ selected('RegisType') } value={ RegisType } />
                          </div>
                          <div className="col-6">
                            <YellowFileDropdown key='regis-effect' titleName={ yellowfileTypeEffect['titleName'] } cateList={ yellowfileTypeEffect['cateList'] } selected={ selected('RegisEffect') } value={ RegisEffect } />
                          </div>
                          <div className="col-6">
                            <label htmlFor="registration-reflect-date">
                              Registration Reflect Date
                              <input className="form-control" type="date" name="YFCngEffectDate" value={ YFCngEffectDate } onChange={ handleChange("YFCngEffectDate") } />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col">
                  <h5 className='yellowfile-header-form'>Status</h5>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <YellowFileDropdown key='yellowfile-status' titleName={ status['titleName'] } cateList={ status['cateList'] } selected={ selected('YellowFileStatus') } value={ YellowFileStatus } />
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                <div className="col">
                  <h5 className='yellowfile-header-form'>Remark</h5>
                  <hr />
                  <div className="col padding-group-group">
                    <label for="YellowFileRemark">Remark :</label>
                    <textarea className="form-control" id="modelRemark" rows="4" name='YellowFileRemark' value={ YellowFileRemark } onChange={ handleChange("YellowFileRemark") }></textarea>
                  </div>
                </div>
              </div>
              <hr className='mt-5' />
              <div className="row justify-content-end">
                <div className="col text-right">
                  <YellowfileButtonSave data={ values } editStatus={ editStatus } show={ confirmDialog } />
                </div>
              </div>
            </div>
          </form>
          <ConfirmAlert show={ modalDialog.show } close={ confirmDialog } />
        </div>
    </Base>
  )
}

export default YellowFileForm;
