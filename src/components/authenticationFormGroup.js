import React from 'react';

const formGroup = ({input, placeholder, wrapperClassName, inputClassName, errorClassName, type, id, showLabel, labelText, labelClass, meta: {touched, error}}) => (
  <div className={wrapperClassName}>
    <input {...input} placeholder={placeholder} id={id || ''} className={inputClassName} type={type}/>
    {showLabel && <label className={labelClass} htmlFor={id || ''}>{ labelText }</label>}
    {touched && ((error && <div className={errorClassName}>{error}</div>))}
  </div>
);

export default formGroup;
