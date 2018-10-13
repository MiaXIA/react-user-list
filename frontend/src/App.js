import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './containers/Home';
import Users from './containers/Users';
import Create from './containers/Create';
import Edit from './containers/Edit';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path='/' component={Home} />
                    <Route exact={true} path='/users' component={Users} />
                    <Route exact={true} path='/create' component={Create} />
                    <Route path='/users/:username' component={Edit} />
                </div>
            </BrowserRouter>
        );
    };
}

export default App;