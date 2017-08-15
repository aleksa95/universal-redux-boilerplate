import React from 'react';

const formGroup = ({input, placeholder, wrapperClassName, inputClassName, errorClassName, type, id, showLabel, labelText, labelClass, meta: {touched, error}}) => (
    <div className={wrapperClassName}>
        <input {...input} placeholder={placeholder} id={id || ''} className={inputClassName} type={type}/>
        {showLabel && <label className={labelClass} htmlFor={id || ''}>{labelText}</label>}
        {touched && ((error && <div className={errorClassName}>{error}</div>))}
    </div>
);

const formGroupTextarea = ({input, placeholder, wrapperClassName, inputClassName, errorClassName, id, showLabel, labelText, labelClass, meta: {touched, error}}) => (
  <div className={wrapperClassName}>
    <textarea {...input} placeholder={placeholder} id={id || ''} className={inputClassName}/>
    {showLabel && <label className={labelClass} htmlFor={id || ''}>{labelText}</label>}
    {touched && ((error && <div className={errorClassName}>{error}</div>))}
  </div>
);

export { formGroupTextarea, formGroup };
