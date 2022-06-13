import moment from "moment";

export function savePDFInvoiceService(field) {
    return {
        "resourceId": field.invoiceId,  //invoice id
        "cancerDocumentReference": {
            "resourceId": field.resourceId,
            "recordName": field.recordName,
            "labOrDoctorName": field.practitioner.name,
            "description": "Billing",
            "category": [
                {
                    "codeableSystem": "http://loinc.org",
                    "code": "Other",
                    "text": "Other",
                    "display": "Other"
                }
            ],
            "author": [{
                "resourceId": field.practitioner.fhirResourceId,
                "resourceType": "Practitioner",
                "resourceReference": `Practitioner/${field.practitioner.fhirResourceId}`,
                "display": field.practitioner.display
            }],
            "authenticator": {
                "resourceId": field.practitioner.fhirResourceId,
                "resourceType": "Practitioner",
                "resourceReference": `Practitioner/${field.practitioner.fhirResourceId}`,
                "display": field.practitioner.display
            },
            "cancerPatientResourceReference": {
                "resourceId": field.patientDetails.details.resourceId,
                "resourceType": "Patient",
                "resourceReference": `Patient/${field.patientDetails.details.resourceId}`,
                "display": field.patientDetails.details.display
            },
            "related": [
                {
                    "resourceId": field.invoiceId,
                    "resourceType": "Invoice",
                    "resourceReference": `Invoice/${field.invoiceId}`
                }
            ],
            "reportedDate": moment().format("YYYY-MM-DD"),
            "content": field.content
        },
        "expense": field.expense
    }
}

export function saveFinilizeBillService(data) {
    const field = {
        note: data.note,
        totalGross: parseFloat(data.totalGross).toFixed(2),
        totalNet: parseFloat(data.totalNet).toFixed(2),
        totalDiscount: parseFloat(data.totalDiscount).toFixed(2),
        columnArray: data.columnArray,
        filteredArray: data.filteredArray,
        invoiceDate: data.invoiceDate,
        patientDetails: data.patientDetails,
        practitionerDetails: data.practitionerDetails,
        organization: data.organization,
        paymentViaSystem: data.paymentViaSystem,
        paymentVia: data.paymentVia,
        loc: data.loc,
        serviceListSystemUrl: data.serviceListSystemUrl,
        status: data.status
    }
    return {
        "isFinalize": true,
        "status": field.status,
        "type": {
            "codeableSystem": field.paymentViaSystem,
            "code": field.paymentVia.code,
            "text": field.paymentVia.display,
            "display": field.paymentVia.display
        },
        "cancerPatientResourceReference":
        {
            "resourceId": field.patientDetails.details.resourceId,
            "resourceType": "Patient",
            "resourceReference": `Patient/${field.patientDetails.details.resourceId}`,
            "display": field.patientDetails.details.display
        },
        "recipient":
        {
            "resourceId": field.patientDetails.details.resourceId,
            "resourceType": "Patient",
            "resourceReference": `Patient/${field.patientDetails.details.resourceId}`,
            "display": field.patientDetails.details.display
        },
        "participants": [
            {
                "actor": {
                    "resourceId": field.practitionerDetails.fhirResourceId,
                    "resourceType": "Practitioner",
                    "resourceReference": `Practitioner/${field.practitionerDetails.fhirResourceId}`,
                    "display": field.practitionerDetails.display
                }
            },
            {
                "actor": {
                    "resourceId": field.patientDetails.details.resourceId,
                    "resourceType": "Patient",
                    "resourceReference": `Patient/${field.patientDetails.details.resourceId}`,
                    "display": field.patientDetails.details.display
                }
            },
        ],
        "invoiceLineItem": field.filteredArray.map((item, index) => {
            return {
                "sequence": parseFloat(index + 1),
                "chargeItemCodeableConcept":
                {
                    "codeableSystem": 'http://terminology.hl7.org/CodeSystem/custom-chargeitem-billingcodes-vs',
                    "code": item.service.code,
                    "display": item.service.display,
                    "text": item.service.display
                },
                "priceComponent": [
                    {
                        "type": "Base",
                        "code": {
                            "codeableSystem": "http://hl7.org/fhir/invoice-priceComponentType",
                            "code": "amount",
                            "display": "Amount",
                            "text": `${item.amount}`
                        },
                        // "factor": 1,
                        "amount": parseFloat(item.amount).toFixed(2) - 0
                    },
                    {
                        "type": "Discount",
                        "code": {
                            "codeableSystem": "http://hl7.org/fhir/invoice-priceComponentType",
                            "code": "discount",
                            "display": "Discount",
                            "text": `${item.discount ? item.discount : 0}`
                        },
                        // "factor": 1,
                        "amount": item.discount ? parseFloat(item.discount).toFixed(2) - 0 : 0
                    },
                    {
                        "type": "Informational",
                        "code": {
                            "codeableSystem": "http://hl7.org/fhir/invoice-priceComponentType",
                            "code": "total",
                            "display": "Total",
                            "text": `${item.discount ? (parseFloat(item.amount - 0).toFixed(2)) - (parseFloat(item.discount - 0).toFixed(2)) : 0}`
                        },
                        // "factor": 1,
                        "amount": item.discount ? (parseFloat(item.amount).toFixed(2)) - (parseFloat(item.discount).toFixed(2)) : parseFloat(item.amount).toFixed(2) - 0
                    }
                ]
            }
        }),
        "totalPriceComponent": [
            {
                "type": "Base",
                "code": {
                    "codeableSystem": "http://hl7.org/fhir/invoice-priceComponentType",
                    "code": "totalBilledAmount",
                    "display": "TotalBilledAmount",
                    "text": `${field.totalNet}`
                },
                // "factor": 1,
                "amount": (parseFloat(field.totalNet).toFixed(2)) - 0
            },
            {
                "type": "Discount",
                "code": {
                    "codeableSystem": "http://hl7.org/fhir/invoice-priceComponentType",
                    "code": "totalDiscount",
                    "display": "TotalDiscount",
                    "text": `${field.totalDiscount}`
                },
                // "factor": 1,
                "amount": parseFloat(field.totalDiscount).toFixed(2) - 0
            },
            {
                "type": "Informational",
                "code": {
                    "codeableSystem": "http://hl7.org/fhir/invoice-priceComponentType",
                    "code": "totalGross",
                    "display": "TotalGross",
                    "text": `${parseFloat(field.totalGross).toFixed(2)}`
                },
                // "factor": 1,
                "amount": parseFloat(field.totalGross).toFixed(2) - 0
            }],
        "totalNet": parseFloat(field.totalNet).toFixed(2) - 0,
        "totalGross": parseFloat(field.totalGross).toFixed(2) - 0,
        // "paymentTerms": "",
        "note": field.note
    }
}