import React from 'react';
import { HashRouter, Route, hashHistory } from 'react-router-dom';
import MainView from './components/Main/MainView';

export default (
    <HashRouter history={hashHistory}>
        <div>
            <Route path='/' component={MainView} />
        </div>
    </HashRouter>
);