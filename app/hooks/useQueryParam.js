import { useState } from 'react';

// A custom hook that builds on useLocation to parse
// the query string for you.
export const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

export const getQueryStringValByKey = key => {
  return getQuery().get(key);
};

export const useQueryParam = (key, defaultVal) => {
  const [query, setQuery] = useState(getQueryStringValByKey(key) || defaultVal);

  const updateUrl = newVal => {
    setQuery(newVal);

    const query = getQuery();

    if (newVal.trim() !== '') {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }
  };

  return [query, updateUrl];
};
