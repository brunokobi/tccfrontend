// import React from 'react';
// import GlobalStyle from './styles/global';
// import Login from '../src/pages/Login';
// //import Usuario from './pages/Usuario';


// const App : React.FC=()=>(
// <>
//     <Login/>
//     <GlobalStyle/>

// </>
// );

// export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
