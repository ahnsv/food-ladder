import React from 'react'

const MainInput = (props) => {
    const {submit, change} = props.handlers;
    return (
        <div className="main-input">
            <label>{props.title}</label>
            <input type="text" autoFocus={true} className={props.type} placeholder={props.placeholder} onKeyPress={submit} onChange={change}/>
        </div>
    )
};

MainInput.defaultProps = {};

export { MainInput }