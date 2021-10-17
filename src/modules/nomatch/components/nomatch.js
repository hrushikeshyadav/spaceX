import React from 'react';
import { useLocation } from 'react-router-dom';

const NoMatch = () => {
  const location = useLocation();
  return <h1>No match found for : {location.pathname}</h1>;
};

export default NoMatch;
