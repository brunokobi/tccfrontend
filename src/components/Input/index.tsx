import React,{InputHTMLAttributes,useEffect,useRef,useState,useCallback} from 'react';
import {IconBaseProps} from 'react-icons';
import {FiAlertCircle} from 'react-icons/fi'
import {Container,Error} from './styles';
import {useField} from '@unform/core'


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string;
    icon?:React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> =({name,icon:Icon,...rest}) =>{
    const inputRef = useRef<HTMLInputElement>(null);
    //focus do input 
    const [isFocused,setIsFocused] = useState(false);

    //manter foco com texto 
    const [isFilled,setIsFilled] = useState(false);

    
    //configuração do unform
    const {fieldName,defaultValue,error,registerField} = useField(name);

    //usecallback para chamar a função uma vez
    const handleInputBlur= useCallback(() =>{
        setIsFocused(false);
        
        setIsFilled(!!inputRef.current?.value);        

    },[]);

     //usecallback para chamar a função uma vez
     const handleInputFocus= useCallback(() =>{
        setIsFocused(true);        
    },[]);

    useEffect(()=>{
        registerField({
            name:fieldName,
            ref:inputRef.current,
            path:'value',
        });
    },[fieldName,registerField]);

    return (
        <Container isErrored={!!error} 
        isFilled={isFilled} 
        isFocused={isFocused}>
            {Icon && <Icon size={20}/>}       
            <input 
            onFocus={handleInputFocus} 
            onBlur={handleInputBlur}
            defaultValue={defaultValue} 
            ref={inputRef} 
            {...rest}/>
            {error && (
                <Error title={error}>
                <FiAlertCircle color="#c53030" size={20}/>
                </Error>)
                }
        </Container>    
    )
};

export default Input;