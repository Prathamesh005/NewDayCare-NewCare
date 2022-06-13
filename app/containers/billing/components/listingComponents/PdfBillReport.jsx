import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react'
import { PdfHeaderLogoName, PdfTable } from '../../../../components'
import { getFromLocalStorage } from '../../../../utils/localStorageUtils';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        paddingTop: 20,
        paddingBottom: 50,
        paddingHorizontal: 10,
        // marginHorizontal: 15,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontStyle: 'bold',
        width: '100%',
        marginTop: 20,
    },
    tableLabel: {
        fontSize: 10,
        paddingBottom: 10,
    },
});
function PdfBillReport(props) {
    const orgLogo = getFromLocalStorage('data').userDetails.organizationDetails[0]['organizationLogo'];
    const org = getFromLocalStorage('ORG');
    const orgName = org !== null ? org.split('|')[1].split('/')[0] : null;
    const { date } = props
    return (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    <PdfHeaderLogoName
                        logoUrl={"data:image/*;base64," + orgLogo.split('|')[1]}
                        organization={orgName}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.tableLabel}>Date : {date}</Text>
                    </View>
                    <PdfTable
                        headCells={props.headCellSummary}
                        rows={props.summaryContent}
                        tableTitle="Bill Summary"
                        hideSrNumber={true}
                    />
                    <PdfTable
                        headCells={props.tableHeaders}
                        rows={props.tableContents}
                        tableTitle="Bill Reports"
                    />
                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} fixed />
                </Page>
            </Document>
        </>
    )
}

export default PdfBillReport