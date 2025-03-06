import React from 'react';

const HocInputForm = (WrappedComponent, config) => {
  return (props) => {
    return <WrappedComponent {...props} {...config} />;
  };
};

export default HocInputForm
