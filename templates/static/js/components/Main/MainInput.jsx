import React from 'react'
import './css/MainInput.css'

const MainInput = () => {
    const handleSubmit = (e) => {
        console.log(e)
    }
    return (
        <div className="main-input">
            <input type="text" placeholder="뭐 먹을까?" onSubmit={handleSubmit} />
        </div>
    )
}

export { MainInput }