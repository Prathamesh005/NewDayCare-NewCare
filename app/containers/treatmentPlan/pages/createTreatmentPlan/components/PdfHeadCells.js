







export const  premedicationsHeadCells=[
    {
      id: 'drugName',
      label: 'Drug Name',
    
    },
    {
    
      id: 'patientDose',
      label: 'Patient Dose', 
    },
    {
      id: 'administrationDetail',
      label: 'Administration Details',
     
    },
    {
      id: 'comment',
      label: 'Comment',
    
    },
];


export const  chemotherapyOrdersHeadCells=[
    {
      id: 'drugName',
      label: 'Drug Name',
    },
    {
    
      id: 'protocolDose',
      label: 'Protocol Dose',
      format: ({ value, row }) => `${value.value || ''} ${value.unit || ''}`,
    },
    {
      id: 'doseReduction',
      label: 'Dose Modification',
      format: ({ value }) => {
        const isPercent = value && value.unit === '%' ? true : false;
        return value
          ? ` ${value.value ? value.value : ''} ${value.unit || ''} ${
              isPercent ? 'Reduction' : ''
            } `
          : '';
      },


    },
    {
      id: 'patientDose',
      label: 'Patient Dose',
      // align:'right',
      format: ({ value }) =>
      value ? `${value.value || ''}  ${value.unit || ''}` : '',
    
    },
    {
        id: 'administrationDetail',
        label: 'Admin Details',
      
      },
      {
        id: 'previousToxicity',
        label: 'Previous Toxicity',
      },
      {
        id: 'comment',
        label: 'Comment',
      },
      
];


export const  supportiveCareHeadCells=[
    {
      id: 'drugName',
      label: 'Drug Name',
    
    },
    {
    
      id: 'administrationDetail',
      label: 'Administration Details',
     
    },
   
      {
        id: 'comment',
        label: 'Comment',
      },
      
];


export const dischargeInstructionHeadCells = [
     {
      id: 'drugFrom',
      label: 'Drug From',
    },
    {
      id: 'drugName',
      label: 'Drug Name',
      
    },
    {
     id: 'frequency',
     label: 'Frequency',
    },
    {  
    id: 'administrationDetail',
    label: 'Instruction'
    },
    {
      id: 'duration',
      label: 'Duration',
      format:({value})=>`${value.value||''} ${value.unit||''}`
    },
    {
      id: 'comment',
      label: 'Comment',
    },
];



