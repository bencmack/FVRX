import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './Components/Main';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Main}/>
      <Route path='/:rxId' component={Main}/>
    </BrowserRouter>
  );
};

export default App;
