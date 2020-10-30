import React,{ButtonHTMLAttributes} from 'react';
import {Container} from './styles';

type ButtonPros = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonPros> = ({children,...rest}) =>(
<Container type="button" {...rest}>
    {children}
</Container>
);

export default Button;

