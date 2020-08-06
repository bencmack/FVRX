import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Main from './Components/Main';

const App = () => {
  return (
    <HashRouter>
      <Route exact path='/' component={Main}/>
      <Route path='/:rxId' component={Main}/>
    </HashRouter>
  );
};

export default App;
