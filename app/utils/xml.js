import { currentApiUrlPrefix } from '../config/environmentConfig';

function setQueryParams(url, data) {
  const params = [];
  Object.keys(data).forEach(function(paramKey) {
    params.push(`${paramKey}=${data[paramKey]}`);
  });
  if (params.length > 0) url += `?${params.join('&')}`;
  return url;
}

function setXMLHeaders(xml, headers) {
  if (headers instanceof Object)
    Object.keys(headers).forEach(function(headerName) {
      xml.setRequestHeader(headerName, headers[headerName]);
    });
  else throw new Error('Headers can only be objects');
}

export const xml = function(method, url, data, options) {
  const xml = new XMLHttpRequest();
  if (method.toUpperCase() === 'GET' && data) url = setQueryParams(url, data);
  xml.open(method, `${currentApiUrlPrefix}${url}`, true);
  if (options && options.headers) setXMLHeaders(xml, options.headers);
  const promise = new Promise((res, rej) => {
    xml.onreadystatechange = function() {
      if (xml.readyState === 4 && [200, 201].includes(xml.status)) {
        res(xml.responseText);
      } else if (xml.readyState === 4 && xml.status === 401) {
        rej({ err: 'UnAuthorised', status: 401 });
      } else if (xml.readyState === 4) {
        rej({ err: 'Internal Server Error' });
      }
    };
  });
  if (method.toUpperCase() === 'GET') xml.send();
  else if (data && options.headers['content-type'] === 'application/json') {
    xml.send(JSON.stringify(data));
  } else if (data) xml.send(data);
  else xml.send();
  return promise;
};
