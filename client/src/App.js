import { Switch, Route, withRouter } from 'react-router-dom';

import logo from './logo.svg';
import './components/common/style/common.css';

import Home from './components/home';
import Login from './components/user/login';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>

      <Route path="/guild"></Route>
    </Switch>
  );
}

export default withRouter(App);
