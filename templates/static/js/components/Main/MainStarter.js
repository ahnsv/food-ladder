import React from 'react'
import {MainInput} from "./MainInput";

const MainStarter = (props) => {
    const handlers = props.handlers
    return (
        <div className="main-view--stage-1--title">
            <h1>맛집 사다리</h1>
            <MainInput title="장소" type="location" placeholder="어디에서 먹을까요" handlers={handlers}/>
            <MainInput title="음식" type="query" placeholder="어디에서 먹을까요" handlers={handlers}/>
        </div>
    )
}

export {MainStarter}