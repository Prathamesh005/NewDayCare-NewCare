import moment from 'moment';
import { DATE_FIRST_FORMAT } from './constants';

export const getValueSetObj = dataObj => {
  return dataObj&&dataObj.valueSets&& dataObj.valueSets[0]
    ? dataObj.valueSets[0] && dataObj.valueSets[0]['valueSet']
    : {};
};

export const getValueSetList = dataObj => {
    if(!dataObj) return []
  const valueObj = getValueSetObj(dataObj);

    return valueObj
      ? valueObj['compose']['include'][0]['concept']
      : []
};


export const getDateDayFirst = (dateString,formatString) => {
  if(!dateString) return ''
 return  moment(dateString).format(formatString||DATE_FIRST_FORMAT)
};

export const getTodayDate = (string) => {
  const formatString = string || DATE_FIRST_FORMAT
   return moment().format(formatString);
};
