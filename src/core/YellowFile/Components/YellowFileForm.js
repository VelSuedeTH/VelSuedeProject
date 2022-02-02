import React, { useState, useEffect } from 'react';
import Base from '../../Base'
import { getYellowFileCategory, getYellowFileTypeChange, getYellowFileTypeEffect,
        getYellowFileStorage, getProductProcess } from '../apicalls';

import { getCustomer, getModel } from '../../helper/coreapicalls'

import '../yellowfile.style.css'
import YellowFileButtonGoback from './Buttons/YellowFileButtonGoback';
import YellowfileButtonSave from './Buttons/YellowfileButtonSave';
import YellowFileDropdown from './Dropdowns/YellowFileDropdown';



const YellowFileForm = () => {

  const [ categorys, setCategorys ] = useState([])
  const [ customers, setCustomers ] = useState([])
  const [ models, setModels ] = useState([])
  const [ ppThai, setPPThai ] = useState([])
  const [ checks, setChecks ] = useState([])
  const [ yellowfileTypeChange, setYellowFileTyepChange ] = useState([])
  const [ yellowfileTypeEffect, setYellowFileTyepEffect ] = useState([])
  const [ yellowfileStorage, setYellowFileStorage ] = useState([])

  const [values, setValues ] = useState({
    PPThai : '1'
  })

  const { PPThai } = values;

  const selectPPThai = (event) => {
    setValues({...values, PPThai: event}, console.log(values))
  }


  const checkLists = () => {
    const checkCode = [...Array(6)].map((e, i) => ({id: i, name : i}))
    setChecks([...Array(7)].map((e, i) => ({ key: `c-${i + 1}`, titleName: `C${i + 1} :`, cateList: checkCode })))
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
          setPPThai({titleName: 'PP Thai :', cateList: ppth})
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
          setYellowFileStorage([{key: 'yellowfile-storage', titleName: 'Yellow File Storage :', cateList: yfStorage},
                                  {key: 'apq-storage', titleName: 'APQ File Storage :', cateList: apqfStorage}])
        }
    })
  }


  const loadCustomer = () => {
    getCustomer()
    .then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        const cus = data.map(c => ({id: c.id, name : `${c.CustomerCode} : ${c.CustomerName}`}))
        setCustomers([{titleName: 'Customer :', cateList: cus}])
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
      }
    })
  }

  useEffect(() => {
    return (
        checkLists(),
        loadCate(),
        loadCustomer(),
        loadYFTypeChange(),
        loadYFTypeEffect(),
        loadYFStorage(),
        loadModel(),
        loadProductProcess()
    )
  }, [])


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
                            <input className="form-control" type="text" name="fCode" value="" />
                        </label>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                          <label htmlFor="modelName">
                            Item Num :
                            <input className="form-control" type="text" name="item-num" value="" />
                          </label>
                        </div>
                        <div className="col-5">
                          <label htmlFor="modelName">
                            Item Name :
                            <input className="form-control" type="text" name="item-name" value="" />
                          </label>
                        </div>
                        <div className="col">
                          <label htmlFor="modelName">
                            Usage Qty (PCS.) :
                            <input readOnly className="form-control" type="text" name="use-qty" value="" />
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
                    { customers.map( c => (
                      <div className="col-6">
                        <YellowFileDropdown key='yellowfile-customers' titleName={ c['titleName'] } cateList={ c['cateList'] } />
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <h5 className='yellowfile-header-form'>Model</h5>
                  <hr />
                  <div className="padding-group-group">
                    <div className="row">
                      <div className="col">
                        <YellowFileDropdown key='yellowfile-model' titleName={ models['titleName'] } cateList={ models['cateList'] } />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label htmlFor="modelName">
                          PCode :
                          <input readOnly className="form-control" type="text" name="pCode" value="" />
                        </label>
                      </div>
                      <div className="col">
                        <label htmlFor="modelName">
                          Sequential ID :
                          <input readOnly className="form-control" type="text" name="sequentialID" value="" />
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
                          <YellowFileDropdown key={ c['key'] } titleName={ c['titleName'] } cateList={ c['cateList'] } />
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
                        <YellowFileDropdown key='yellowfile-model' titleName={ ppThai['titleName'] } cateList={ ppThai['cateList'] } selected={ selectPPThai } />
                      </div>
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
                          <YellowFileDropdown key={ c['key'] } titleName={ c['titleName'] } cateList={ c['cateList'] } />
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
                            <YellowFileDropdown key={ s['key'] } titleName={ s['titleName'] } cateList={ s['cateList'] } />
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
                            <YellowFileDropdown key='regis-type' titleName={ yellowfileTypeChange['titleName'] } cateList={ yellowfileTypeChange['cateList'] } />
                          </div>
                          <div className="col-6">
                            <YellowFileDropdown key='regis-effect' titleName={ yellowfileTypeEffect['titleName'] } cateList={ yellowfileTypeEffect['cateList'] } />
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
                      {/* <YellowFileDropdown title="Status :" list={ ["Continue", "Something", "Something2"] } /> */}
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                <div className="col padding-group-group">
                      <label for="YellowFileRemark">Remark :</label>
                      <textarea className="form-control" id="modelRemark" rows="4" name='YellowFileRemark' value=""></textarea>
                  </div>
                </div>
              <hr className='mt-5' />
              <div className="row justify-content-end">
                <div className="col text-right">
                  <YellowfileButtonSave />
                </div>
              </div>
            </div>
          </form>
        </div>
    </Base>
  )
}

export default YellowFileForm;
