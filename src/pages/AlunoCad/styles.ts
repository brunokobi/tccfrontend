import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import usuarioBackground from '../../assets/usuario-background.jpg';
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
    margin-bottom:24px;   
}   

  a {
    margin-bottom:84px; 
    color: #0053c7;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#0053c7')};
    }
  }
}

> a {
    color: #0053c7;
    display: block;
    margin-top: 0px;
    margin-bottom: 32px;
    padding-right:4px;
    background:#fff;
    font-weight:500;
    border-radius:10px;
    border: 2px solid #0053c7;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

  svg {
    margin-right: 16px;
    margin-left: 16px;
  }

  &:hover {
    color: ${shade(0.2, '#0053c7')};

  }
}
`; 

export const Background = styled.div`
    flex:1;
    background:url(${usuarioBackground}) no-repeat center;
    background-size:cover; 
`; 

export const Link1 = styled.div`
 max-width: 1120px;
  margin-bottom:auto;
  display: flex;
  align-items: center;
  > img {
    height: 120px;
  }

  button {
    color:#fff;
    border-radius:10px;
    margin-left: auto;
    background: #0053c7;   
    padding:10px;
    margin-right:20px;
    box-shadow:3px 5px 0 #0033c7;
    
    &:hover {       
        background: ${shade(0.2, '#0043c7')};
        box-shadow:3px 5px 0 #0003c0;        
      } 
      &:active{
        position:relative;
        top:5px;
        box-shadow:none;
      } 

    svg {     
      color:#fff;
      width: 25px;
      height: 25px;
    }
    
  }
`;


export const Avatar = styled.div`
width: 355px;
padding:5px;
color:#0053c7;
background:#fff; 
border-radius:10px;
border: 3px solid #0053c7;
margin-top:24px;
margin-bottom:auto; 
font-size:24px; 


    svg {
      position:relative;
      margin-top:0px;
      margin-right:20px;    
      color:#0053c7;
      width: 30px;
      height: 30px;
    } 
`;
