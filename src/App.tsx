import React from 'react';
import {
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import Menu from './components/Menu';
import Details from './pages/Details';
import Home from './pages/Home';

function App() {
  return (
    <div className="container">
      <Menu/>
      <HashRouter>
        <Switch>
          <Route path="./">
            <Home />
          </Route>
          <Route path="./details/:id" children={<Details />} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
