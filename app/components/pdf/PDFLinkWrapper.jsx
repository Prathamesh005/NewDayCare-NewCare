import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import printJS from 'print-js';

//NEW
// export default function PDFLinkWrapper(props) {
//   const { document, loadingString, handleHandleConfig, ...etc } = props;
//   return (
//     <PDFDownloadLink document={document} {...etc}>
//       {({ url, loading, blob, error }) => {
//         if (loading) {
//           loadingString || 'Loading document...';
//         } else {
//           handleHandleConfig &&
//             handleHandleConfig({ url, loading, blob, error });
//         }
//       }}
//     </PDFDownloadLink>
//   );
// }

// OLD
export default function PDFLinkWrapper(props) {
  const { onClose, document, loadingString, ...etc } = props;
  return (
    <PDFDownloadLink document={document} {...etc}>
      {({ url, loading }) => {
        loading
          ? loadingString || 'Loading document...'
          : printJS({
              printable: url,
              onPrintDialogClose: onClose,
            });
      }}
    </PDFDownloadLink>
  );
}
