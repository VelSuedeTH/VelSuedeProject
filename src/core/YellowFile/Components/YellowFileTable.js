import React, { useState, useEffect } from 'react';
import { getYellowFileIndex } from '../apicalls';
import Moment from 'moment';

import '../yellowfile.style.css'


const YellowFileTable = () => {
  const [yellowfiles, setYellowFiles] = useState([])

  const loadYellowFile = () => {
    getYellowFileIndex()
    .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data)
          setYellowFiles(data)
        }
    })
  }

  useEffect(() => {
    loadYellowFile()
  }, [])

  return (
      <div>
        <table className="table table-responsive table-bordered bg-white">
        <thead className='thead-light'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">PCode</th>
              <th scope="col">SeqID</th>
              <th scope="col">FCode</th>
              <th scope="col">Customer</th>
              <th >Model</th>
              <th scope="col">ItemNum</th>
              <th scope="col">ItemName</th>
              <th scope="col">Status</th>
              <th scope="col">Cate1</th>
              <th scope="col">Cate2</th>
              <th scope="col">Cate3</th>
              <th scope="col">PPThai</th>
              <th scope="col">PP1</th>
              <th scope="col">PP2</th>
              <th scope="col">C1</th>
              <th scope="col">C2</th>
              <th scope="col">C3</th>
              <th scope="col">C4</th>
              <th scope="col">C5</th>
              <th scope="col">C6</th>
              <th scope="col">C7</th>
              <th scope="col">YFStorage</th>
              <th scope="col">APQStorage</th>
              <th scope="col">RegisterationType</th>
              <th scope="col">RegEffectType</th>
              <th scope="col">RegUser</th>
              <th scope="col">RegDate</th>
              <th scope="col">UpdateUser</th>
              <th scope="col">UpdateDate</th>
              <th scope="col">Ramark</th>
            </tr>
        </thead>
        <tbody>
            { yellowfiles.map((yellowfile, index) => {
              return (
                <tr key={index}>
                  <td scope="row">{ index + 1}</td>
                  <td className="text-center">{ yellowfile.PCode.PCode }</td>
                  <td className="text-center">{ yellowfile.SeqCode }</td>
                  <td>{ yellowfile.FCode }</td>
                  <td>{ yellowfile.PCode.ModelCode.UpStreamCustCode.CustomerName }</td>
                  <td>{ yellowfile.PCode.ModelCode.ModelName }</td>
                  <td>{ yellowfile.ItemNum }</td>
                  <td>{ yellowfile.ItemName }</td>
                  <td>{ yellowfile.Status }</td>
                  <td>{ yellowfile.Cate1.CateName }</td>
                  <td>{ yellowfile.Cate2.CateName }</td>
                  <td>{ yellowfile.Cate3.CateName }</td>
                  <td>{ yellowfile.PPThai.PPThaiName }</td>
                  <td>{ `${yellowfile.PP1.PP1Code} : ${yellowfile.PP1.PP1Name}` }</td>
                  <td>{ `${yellowfile.PP2.PP1Code} : ${yellowfile.PP2.PP1Name}` }</td>
                  <td className="text-center">{ yellowfile.C1 }</td>
                  <td className="text-center">{ yellowfile.C2 }</td>
                  <td className="text-center">{ yellowfile.C3 }</td>
                  <td className="text-center">{ yellowfile.C4 }</td>
                  <td className="text-center">{ yellowfile.C5 }</td>
                  <td className="text-center">{ yellowfile.C6 }</td>
                  <td className="text-center">{ yellowfile.C7 }</td>
                  <td className="text-center">{ yellowfile.YFStorage.StorageName }</td>
                  <td className="text-center">{ yellowfile.APQStorage.StorageName }</td>
                  <td>{ yellowfile.YFCngType.YFCngTypeName }</td>
                  <td>{ yellowfile.YFCngEffectType.YFCngEffectTypeName }</td>
                  <td>{ yellowfile.RegUserCode.name }</td>
                  <td>{ Moment(yellowfile.RegDate).format('YYYY/MM/DD HH:mm') }</td>
                  <td>{ yellowfile.UpUserCode.name }</td>
                  <td>{ Moment(yellowfile.UpDate).format('YYYY/MM/DD HH:mm') }</td>
                  <td>{ yellowfile.Remarks }</td>
                </tr>
            )})}
        </tbody>
        </table>
      </div>
  )
}


export default YellowFileTable;
