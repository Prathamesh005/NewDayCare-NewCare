export const GET_INVOICES_FROM_DATE = `
    query
    PatientDataQuery($toDate: String!, $fromDate: String!){
     data:invoiceSearch(invoiceSearchCriteria:{
    nextResultUrl:"",
    sortOrder:"",
    fromDate:$fromDate,
    toDate:$toDate,
    resourceId:null,
    description:null,
    additionalParams:[
        {
            patientSearchParamType:"Name",
            patientSearchParamValue:null
        },
         {
            patientSearchParamType:"Invoice",
            patientSearchParamValue:null
        }
     ]
    })
     {  
         recordCount,
         nextResultUrl,
         billingInvoices
         {
            billingInvoice
            {
                resourceId,
                note,
                invoiceNumber,
                status,
                paymentTerms,
                date,
                cancelledReason,
                totalGross,
                totalNet,
                document
             {
               resourceId,
               resourceType,
               resourceReference,
               display
            },
                cancerPatientResourceReference
                {
                    resourceId,
                   resourceType,
                   resourceReference,
                   display
                },
                issuer
                {
                     resourceId,
                   resourceType,
                   resourceReference,
                   display
                },
                account
                {
                   resourceId,
                   resourceType,
                   resourceReference,
                   display
                },
                recipient
                 {
                   resourceId,
                   resourceType,
                   resourceReference,
                   display
                },
                type
                {
                    codeableSystem,
                    code,
                    text,
                    display
                },
                participants
                {
                     actor
                     {
                         resourceId,
                        resourceType,
                        resourceReference,
                        display
                     }
                },
                invoiceLineItem
                {
                    sequence,
                    chargeItemCodeableConcept
                    {
                         codeableSystem,
                            code,
                            text,
                            display
                    },
                    priceComponent
                    {
                         type,
                         code
                         {
                             codeableSystem,
                            code,
                            text,
                            display
                         },
                         factor,
                         amount
                    }
                },
                totalPriceComponent
                    {
                         type,
                         code
                         {
                             codeableSystem,
                            code,
                            text,
                            display
                         },
                         factor,
                         amount
                    }
            }
         }
      
     }
    }`
export const GET_INVOICES_FROM_SEARCH = `
query
PatientDataQuery($toDate: String!, $fromDate: String!, $input: String!){
 data:invoiceSearch(invoiceSearchCriteria:{
nextResultUrl:"",
sortOrder:"",
fromDate:$fromDate,
toDate:$toDate,
resourceId:null,
description:null,
additionalParams:[
    {
        patientSearchParamType:"Name",
        patientSearchParamValue:$input
    },
     {
        patientSearchParamType:"Invoice",
        patientSearchParamValue:$input
    }
 ]
})
 {  
     recordCount,
     nextResultUrl,
     billingInvoices
     {
        billingInvoice
        {
            resourceId,
            note,
            invoiceNumber,
            status,
            paymentTerms,
            date,
            cancelledReason,
            totalGross,
            totalNet,
            document
             {
               resourceId,
               resourceType,
               resourceReference,
               display
            },
            cancerPatientResourceReference
            {
                resourceId,
               resourceType,
               resourceReference,
               display
            },
            issuer
            {
                 resourceId,
               resourceType,
               resourceReference,
               display
            },
            account
            {
               resourceId,
               resourceType,
               resourceReference,
               display
            },
            recipient
             {
               resourceId,
               resourceType,
               resourceReference,
               display
            },
            type
            {
                codeableSystem,
                code,
                text,
                display
            },
            participants
            {
                 actor
                 {
                     resourceId,
                    resourceType,
                    resourceReference,
                    display
                 }
            },
            invoiceLineItem
            {
                sequence,
                chargeItemCodeableConcept
                {
                     codeableSystem,
                        code,
                        text,
                        display
                },
                priceComponent
                {
                     type,
                     code
                     {
                         codeableSystem,
                        code,
                        text,
                        display
                     },
                     factor,
                     amount
                }
            },
            totalPriceComponent
                {
                     type,
                     code
                     {
                         codeableSystem,
                        code,
                        text,
                        display
                     },
                     factor,
                     amount
                }
        }
     }
  
 }
}`
export const GET_NEWSERVICE_VALUESET = `
query
PatientDataQuery{
data:chargeItemSearch(chargeItemSearchCriteria:{
})
{
    recordCount,
    nextResultUrl,
    chargeItemDefinitionGroups
    { 
       chargeItemDefinitionGroup
       {
         resourceId,
         title,
         status,
         description,
         publisher,
         url,
         start,
         end,
         date,
         partOf,
         code
         {
            code,
            display,
            text
         },
         propertyComponents
         {
            subItem,
            priceComponents
            {
                type,
                factor,
                amount,
                code{
                    code,
                    display,
                    text
                }
            }
         }
      }
  }
}
}`
export const GET_BILL_SUMMARY_FROM_DATE = `
query
PatientDataQuery($fromDate: String!, $toDate: String!){
 data:invoiceReport(invoiceReportCriteria:{
nextResultUrl: null,
sortOrder:"",
fromDate:$fromDate,
toDate:$toDate,
 })
 {
    totalINVTransaction,
    totalINVAmount,
    totalINVAmountPaid,
    totalINVAmountUnPaid,
    totalINVUnPaidTrans
 }
}`