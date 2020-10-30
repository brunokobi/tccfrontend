import styled ,{keyframes}from 'styled-components';
import { shade } from 'polished';
import fundo from '../../assets/fundo1.jpg';

export const Container = styled.div`
 height:100%; 
 min-height:100vh;
 background: #0053c7;
`;

const appearFromLeft = keyframes`
from {
  opacity: 0;
  transform: translateY(-50px);
}
to {
  opacity: 1;
  transform: translateY(0px);
}
`;


export const Header = styled.header`
  padding: 32px 0;
  background:url(${fundo}) no-repeat center;
  background-size:cover;
  height:150px;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 120px;
  }

  button {
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
      width: 20px;
      height: 20px;
    }
    
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  

  img {    
    height: 150px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #0053c7;      
    }

    a {
      text-decoration: none;
      color:  #0053c7;

      
      }
    }  
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 8px auto;
  display: flex;  
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #fff;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }

  button {
    margin-left: 12px;
    background: #0053c7;
    border-radius:25px;
    border: 2px solid #fff;
    padding:10px;
    
    
    &:hover {       
        background: ${shade(0.2, '#0023c7')};
      }  

    svg {
      color:#fff;
      width: 16px;
      height: 16px;
    }
  }
`;



export const Section = styled.section`
  margin-top: 20px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;
  animation: ${appearFromLeft} 1s;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 15px;
      margin-right: auto;
      color: #fff;
      font-size: 20px;
    }
  }
`;




