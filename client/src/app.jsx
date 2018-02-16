import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx';
import BackgroundCheck from './components/BackgroundCheck.jsx';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

const App = () =>
    <BrowserRouter>
        <Switch >
            <Route exact path="/" component={Main}/>
            <Route path="/background" component={BackgroundCheck} />
        </Switch>
    </BrowserRouter>
;

window.onload = function() {
    ReactDOM.render(<App />, document.getElementById("main"));
};

