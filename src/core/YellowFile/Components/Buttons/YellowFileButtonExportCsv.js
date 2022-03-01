import React, { useState } from 'react'
import { CSVLink } from "react-csv";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from 'moment';

const YellowFileButtonExportCsv = ({ data, fileName }) => {
  const [filename, setFilename] = useState([])
  const [ yellowfiledata, setYellowFile ] = useState([])


  const exportCSV = () => {
  
    const yfdata = data.map(y => {
      y['PCode'] = y.PCode.PCode

      y['Cate1'] = y.Cate1.CateName
      y['Cate2'] = y.Cate2.CateName
      y['Cate3'] = y.Cate3.CateName

      y['PPThai'] = `${y.PPThai.PPThaiCode} : ${y.PPThai.PPThaiName}`
      y['PP1'] = `${y.PP1.PP1Code} : ${y.PP1.PP1Name}`
      y['PP2'] = `${y.PP2.PP1Code} : ${y.PP2.PP1Name}`

      y['YFStorage'] = y.YFStorage.StorageName
      y['APQStorage'] = y.APQStorage.StorageName
      y['YFCngType'] = y.YFCngType.YFCngTypeName
      y['YFCngEffectType'] = y.YFCngEffectType.YFCngEffectTypeName

      y['RegUserCode'] = y.RegUserCode.name
      y['UpUserCode'] = y.UpUserCode.name
    })

    setFilename(`${moment(Date.now()).format("YYMMDDHHmm")}_${fileName}.csv`)
    setYellowFile(data, console.log(yfdata))

    window.location.reload(false);
  }

  return (
    <div>
      <div>
        <CSVLink
          uFEFF={true}
          data={ yellowfiledata }
          filename={filename}
          className="btn btn-primary"
          target="_blank"
          type="button"
          className="btn btn-secondary btn-block"
          onClick={ exportCSV }
          >
              <FontAwesomeIcon className="mx-2" icon={ faFileDownload } />Export To CSV File
          </CSVLink>
      </div>
    </div>
  )
}


export default YellowFileButtonExportCsv;

