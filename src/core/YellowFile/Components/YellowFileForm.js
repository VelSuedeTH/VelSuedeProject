import React, { useState, useEffect } from 'react';
import Base from '../../Base'
import { getYellowFileCategory, getYellowFileTypeChange, getYellowFileTypeEffect,
        getYellowFileStorage, getProductProcess, getUsage, getYellowFileIndex } from '../apicalls';

import { getModel } from '../../helper/coreapicalls'

import '../yellowfile.style.css'
import YellowFileButtonGoback from './Buttons/YellowFileButtonGoback';
import YellowfileButtonSave from './Buttons/YellowfileButtonSave';
import YellowFileDropdown from './Dropdowns/YellowFileDropdown';



const YellowFileForm = () => {

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

  const [values, setValues ] = useState({
    Customer: "",
    FCode: "",
    ItemNum: "",
    ItemName: "",
    Model: "",
    PPThai : '1',
    PCode: 1,
    RegisEffect: '',
    RegisType: '',
    UsageQty: 0,
    SeqID: 0,
    YellowFileRemark: '',
    APQStorage: '',
    C1: 0,
    C2: 0,
    C3: 0,
    C4: 0,
    C5: 0,
    C6: 0,
    C7: 0,
    category1: '',
    category2: '',
    category3: '',
    pp1: '',
    pp2: '',
    status: '',
    YFStorage: '',
  })

  const { FCode, ItemNum, ItemName, Model, Customer,
          UsageQty, YellowFileRemark, PCode, SeqID } = values;

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
    
    const subpp = allPPValue.filter(pp => pp.PPThaiCode === event).map(pp => ({id: pp.id, name: `${pp.PP1Code} : ${pp.PP1Name}`}))
          setSubPP([{key: 'pp1', titleName: 'PP 1 :', cateList: subpp},
                    {key: 'pp2', titleName: 'PP 2 :', cateList: subpp}])
  }


  const selected = (name) => (event) => {
    setValues({...values, [name]: event })
  }


  const checkLists = () => {
    const checkCode = [...Array(6)].map((e, i) => ({id: i, name : i}))
    setChecks([...Array(7)].map((e, i) => ({ key: `C${i + 1}`, titleName: `C${i + 1} :`, cateList: checkCode })))
  }


  const yellowfileStatus = () => {
    const yfstatus = [{id: 'Continue', name : 'Continue'},
                      {id: 'Something1', name : 'Something1'},
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
        loadYellowFile()
    )
  }, [])

  useEffect(() => {
    return (
      setValues({...values,
      Model: Model,
      PCode: usages? usages.PCode : 0,
      UsageQty: usages? usages.Usage : 0
      })
    )
  }, [usages])

  useEffect(() => {
    const seq = yellowFile.filter(s => s.PCode.PCode === PCode).map(s => Number(s.SeqCode))
    return (
      setValues({...values,
        SeqID: !seq ? 1 : Math.max([...seq]) + 1
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
              <h3>Creact New Yellow File</h3>
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
                        <YellowFileDropdown key='yellowfile-model' titleName={ models['titleName'] } cateList={ models['cateList'] } selected={ selectedModel } />
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
                          <YellowFileDropdown key={ c['key'] } titleName={ c['titleName'] } cateList={ c['cateList'] } selected={ selected(c['key']) } />
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
                        <YellowFileDropdown key={ ppThai['key'] } titleName={ ppThai['titleName'] } cateList={ ppThai['cateList'] } selected={ selectPPThai } />
                      </div>
                    </div>
                    <div className="row">
                      { subPP.map(pp => (
                        <div className="col">
                          <YellowFileDropdown key={ pp['key'] } titleName={ pp['titleName'] } cateList={ pp['cateList'] } selected={ selected(pp['key']) } />
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
                          <YellowFileDropdown key={ c['key'] } titleName={ c['titleName'] } cateList={ c['cateList'] } selected={ selected(c['key']) } />
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
                            <YellowFileDropdown key={ s['key'] } titleName={ s['titleName'] } cateList={ s['cateList'] } selected={ selected(s['key']) } />
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
                            <YellowFileDropdown key='regis-type' titleName={ yellowfileTypeChange['titleName'] } cateList={ yellowfileTypeChange['cateList'] } selected={ selected('RegisType') } />
                          </div>
                          <div className="col-6">
                            <YellowFileDropdown key='regis-effect' titleName={ yellowfileTypeEffect['titleName'] } cateList={ yellowfileTypeEffect['cateList'] } selected={ selected('RegisEffect') } />
                          </div>
                          <div className="col-6">
                            <label htmlFor="registration-reflect-date">
                              Registration Reflect Date
                              <input className="form-control" type="date" name="registration-reflect-date" />
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
                      <YellowFileDropdown key='yellowfile-status' titleName={ status['titleName'] } cateList={ status['cateList'] } selected={ selected('status') } />
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                <div className="col padding-group-group">
                      <label for="YellowFileRemark">Remark :</label>
                      <textarea className="form-control" id="modelRemark" rows="4" name='YellowFileRemark' value={ YellowFileRemark } onChange={ handleChange("YellowFileRemark") }></textarea>
                  </div>
                </div>
              <hr className='mt-5' />
              <div className="row justify-content-end">
                <div className="col text-right">
                  <YellowfileButtonSave data={ values } gobackpath={ '/yellowfile' } />
                </div>
              </div>
            </div>
          </form>
        </div>
    </Base>
  )
}

export default YellowFileForm;
