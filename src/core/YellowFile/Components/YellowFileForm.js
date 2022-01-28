import React, { useState } from 'react';
import Base from '../../Base'


import '../yellowfile.style.css'
import YellowFileButtonGoback from './Buttons/YellowFileButtonGoback';
import YellowfileButtonSave from './Buttons/YellowfileButtonSave';
import YellowFileDropdown from './Dropdowns/YellowFileDropdown';


const YellowFileForm = () => {
  const [ categorys, setCategorys ] = useState([{ title: 'Category 1', list: ['Camera1', 'Camera2', 'Camera3']},
                                                { title: 'Category 2', list: ['DirectFlocky1', 'DirectFlocky2', 'DirectFlocky3']},
                                                { title: 'Category 3', list: ['Something1', 'Something2', 'Something3']}])

  const [ ProductProcess, setProductProcess ] = useState([{ title: 'PP Thai', list: ['200 : Kohyai-Zipper Hong Khong Limited', 'Something2', 'Something3']},
                                                { title: 'PP1', list: ['00 : VSTK SuperCut', 'Something2', 'Something3']},
                                                { title: 'PP2', list: ['0 : VSTK Check', 'Something2', 'Something3']}])

  const [ checks, setChecks ] = useState([{ title: 'C1', list: [0, 1, 2, 3, 4, 5]},
                                          { title: 'C2', list: [0, 1, 2, 3, 4, 5]},
                                          { title: 'C3', list: [0, 1, 2, 3, 4, 5]},
                                          { title: 'C4', list: [0, 1, 2, 3, 4, 5]},
                                          { title: 'C5', list: [0, 1, 2, 3, 4, 5]},
                                          { title: 'C6', list: [0, 1, 2, 3, 4, 5]},
                                          { title: 'C7', list: [0, 1, 2, 3, 4, 5]},])

  const [ YellowFile, setYellowFile ] = useState({

  })

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
                    <YellowFileDropdown title="Customer :" list={ ["700 : NIKON", "702 : ASIAN", "703 : SONY"] } />
                  </div>
                </div>
                <div className='col'>
                  <h5 className='yellowfile-header-form'>Model</h5>
                  <hr />
                  <div className="padding-group-group">
                    <div className="row">
                      <div className="col">
                        <YellowFileDropdown title="Model :" list={ ["1 : A4-40221-01", "2 : Q1990", "3 : Q5991"] } />
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
                    {/* Category Dropdown */}
                    {categorys.map(c => (
                      <YellowFileDropdown title={ c['title'] } list={ c['list'] } />
                    ))}
                  </div>
                </div>
                <div className='col'>
                  <h5 className='yellowfile-header-form'>Produce Process</h5>
                  <hr />
                  <div className="padding-group-group">
                    {/* Product Process Dropdown */}
                    {ProductProcess.map(pp => (
                      <YellowFileDropdown title={ pp['title'] } list={ pp['list'] } />
                    ))}
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-6">
                  <h5 className='yellowfile-header-form'>-</h5>
                  <hr />
                  <div className='padding-group-group'>
                    <div className="row">
                      {/* C# Dropdown */}
                      {checks.map(c => (
                        <div className="col-6">
                          <YellowFileDropdown title={ c['title'] } list={ c['list'] } />
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
                          <div className="col">
                            <YellowFileDropdown title="Yellow File Storage" list={ ["A-1", "A-2", "A-3"] } />
                          </div>
                          <div className="col">
                            <YellowFileDropdown title="APQ File Storage" list={ ["APQ-1", "APQ-2", "APQ-3"] } />
                          </div>
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
                            <YellowFileDropdown title="Registration Type" list={ ["NewRegistration", "Something", "Something2"] } />
                          </div>
                          <div className="col-6">
                            <YellowFileDropdown title="Registration Reflect Method" list={ ["Immediately", "Something", "Something2"] } />
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
                      <YellowFileDropdown title="Status :" list={ ["Continue", "Something", "Something2"] } />
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
