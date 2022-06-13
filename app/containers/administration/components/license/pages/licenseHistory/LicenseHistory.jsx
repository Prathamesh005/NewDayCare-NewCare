import React,{Fragment} from 'react'
import { useHistory } from 'react-router-dom'
import HistoryTable from '../../component/HistoryTable'
import { OuterBoxPaper } from '../../../../../../components'

const LicenseHistory = () => {
    const history=useHistory()

    
    const Close=()=>{
        history.goBack()
    }
    return (

        <Fragment>

            <OuterBoxPaper title={'License History'}
                handleClose={Close}
                bottomComponent={<HistoryTable />} 
                bottomHeight={'75vh'}
                />

        </Fragment >


    )
}

export default LicenseHistory
