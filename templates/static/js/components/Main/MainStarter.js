import React from 'react'
import {MainInput} from "./MainInput";

const MainStarter = (props) => {
    const handlers = props.handlers;
    return (
        <div className="main-view--stage-1--title">
            <img src="public/ladder.png" style={{width: '20vw'}}/>
            <MainInput title="장소" type="location" placeholder="어디에서 먹을까요" handlers={handlers}/>
            <MainInput title="음식" type="query" placeholder="뭐 먹을까요" handlers={handlers}/>
        </div>
    )
};

export {MainStarter}