import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import loginBackground from '../../assets/login-background.jpg';
import fundo from '../../assets/fundo1.jpg';

export const Container = styled.div`
    height:100vh;
    display:flex;
    align-items:stretch;
`; 

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:url(${fundo}) no-repeat center;
    background-size:cover;
    width:100%;
    height:'auto';
    max-width:500px;
    `;

const appearFromLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(-50px);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

animation: ${appearFromLeft} 1s;

form {
  margin: 80px 0;
  width: 340px;
  text-align: center;

h1{
    background:#312e38;
    border-radius:10px;
    border: 2px solid #0053c7;
    margin-top:70px;
    margin-bottom:20px;
}   

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
}

> a {
  color: #0053c7;
  display: block;
  margin-top: 8px;
  padding-right:4px;
  text-decoration: none;
  background:#fff;
  font-weight:500;
border-radius:10px;
border: 2px solid #0053c7;
  transition: color 0.2s;

  display: flex;
  align-items: center;

  svg {
    margin-right: 16px;
  }

  &:hover {
    color: ${shade(0.2, '#0053c7')};

  }
}
`; 

export const Background = styled.div`
    flex:1;
    background:url(${loginBackground}) no-repeat center;
    background-size:cover;
    max-width:100%;
    height:auto;
     
`; 