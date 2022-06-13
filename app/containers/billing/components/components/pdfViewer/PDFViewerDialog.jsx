import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import ReportPdfDesign from '../ReportPdfDesign';

function PDFViewerDialog(props) {
  const {
    open,
    handleClose,
    columnArray,
    filteredArray,
    orgLogo,
    orgName,
    locName,
    gstn,
    invoiceNum,
    invoiceDate,
    patientDetails,
    practitionerDetails,
    totalNetAmount,
    totalAmount,
    totalDiscount,
    comment,
    paymentVia,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="pdf-viewer"
      aria-describedby="pdf-viewer-description"
      maxWidth="lg"
    >
      <DialogContent dividers>
        <Grid contianer>
          <Grid item xs={12}>
            <PDFViewer width="1000px" height="600px" showToolbar="false">
              <ReportPdfDesign
                orgLogo={orgLogo}
                orgName={orgName}
                locName={locName}
                gstn={gstn}
                invoiceNum={invoiceNum}
                invoiceDate={invoiceDate}
                patientDetails={patientDetails}
                practitionerDetails={practitionerDetails}
                columnArray={columnArray}
                filteredArray={filteredArray}
                totalNetAmount={totalNetAmount}
                totalAmount={totalAmount}
                totalDiscount={totalDiscount}
                comment={comment}
                paymentVia={paymentVia}
              />
            </PDFViewer>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default PDFViewerDialog;
