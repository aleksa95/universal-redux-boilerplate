import React from 'react';

const formGroup = ({input, placeholder, wrapperClassName, inputClassName, errorClassName, type, meta: {touched, error}}) => (
  <div className={wrapperClassName}>
    <input {...input} placeholder={placeholder} className={inputClassName} type={type}/>
    {touched && ((error && <div className={errorClassName}>{error}</div>))}
  </div>
);

export default formGroup;
