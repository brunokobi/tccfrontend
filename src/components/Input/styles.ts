import styled,{css} from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps{
    isFocused:boolean;
    isFilled:boolean;
    isErrored:boolean;
}

export const Container = styled.div<ContainerProps> `
    background:#fff;
    border-radius:10px;
    border: 2px solid #666360;
    padding:16px;
    width:100%;    
    display:flex;
    align-items:center;
    color:#666360;

    & + div{
               margin-top:8px;
            }

            ${props=>props.isErrored && css`
            /* cor do erro do input */           
            border-color:#c53030;
            border-width:4px;            
            `}

            ${props=>props.isFocused && css`
            /* cor do foco do input */
            color:#0053c7;
            border-color:#0053c7;
            border-width:4px;
            `}

            ${props=>props.isFilled && css`
            /* cor  do input preenchido*/
            color:#0053c7;
            border-color:#0053c7;
            border-width:4px;            
            `}
            
    
        input{
            flex:1;
            background:transparent;
            border:0;
            color:#000;
            
            & ::placeholder{
                color:#666360;
            }

           
        }

        svg{
            margin-right:16px;
        }
`;

export const Error = styled(Tooltip)`
    height:20px;
    margin-left:16px;
    svg{
        margin:0;
    } 

    span{
        background:#c53030;
        color:#fff;

        &::before{
            border-color:#c53030 transparent;
        }
    }
`;
