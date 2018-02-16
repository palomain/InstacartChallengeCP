import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx';
import BackgroundCheck from './components/BackgroundCheck.jsx';
import {Switch, Route, HashRouter} from 'react-router-dom';

const App = () => {
    <Switch >
        <Route path='/' component={Main}/>
        <Route path='/background' component={BackgroundCheck} />
    </Switch>
};

window.onload = function() {
    ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById("main"));
};

