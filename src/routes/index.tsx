import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Usuario from '../pages/Usuario';
import UsuarioCad from '../pages/UsuarioCad';
import Aluno from '../pages/Aluno';
import AlunoCad from '../pages/AlunoCad';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/signup" component={Usuario} isPrivate />
    <Route path="/aluno" component={Aluno} isPrivate />
    <Route path="/alunocad" component={AlunoCad} isPrivate />
    <Route path="/usuario" component={UsuarioCad} isPrivate />    
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
