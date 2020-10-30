import styled from 'styled-components';
import {shade} from 'polished';

export const Container = styled.button `
    font-size:24px;
    background:#0053c7;
    height:56px;
    border-radius:25px;
    border:2px solid #000;
    padding:0 16px;
    color:#f4ede8;
    width:100%;
    font-weight:700;
    margin-top:16px;
    transition:background-color 0.2s;

    &:hover{
        background:${shade(0.2,'#0033c7')};
        border:3px solid #000;
    } 
`;
