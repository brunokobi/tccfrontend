import React,{useCallback,useRef} from 'react';
import{FiLock,FiUser} from 'react-icons/fi'
import {Container,Content,Background,AnimationContainer} from './styles';
import logo from '../../assets/now.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import validacaoErros from '../../utils/validacaoErros';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import  {useHistory } from 'react-router-dom';


interface request{
    login:string;
    senha:string;
}

const Login:React.FC =()=>{
    const formRef =useRef<FormHandles>(null); 
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();   

    

    const handleSubmit= useCallback(async(data:request)=>{
        try {          

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                login:Yup.string().required('Login obrigatório'),
                senha:Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data,{
                abortEarly:false,
            });

            await signIn({
                login: data.login,
                 senha:data.senha,
              });
         
            setTimeout(() => {
                document.location.reload(true);  
            },300);          
                    
            
        } catch (error) { 
            if (error instanceof Yup.ValidationError) {
                const errors = validacaoErros(error);
      
                formRef.current?.setErrors(errors);
      
                return;
              } 
            
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
              });
        }
    },[signIn, addToast, history]);
return(
    <Container>
        <Content>
        <AnimationContainer>
            <img src={logo} alt= "PresenceNow" width="300"/>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu Login</h1>

                <Input name="login" icon={FiUser} placeholder="Login" />

                <Input name="senha" icon={FiLock} placeholder="Senha" type="password"/>

                <Button type="submit">Entrar</Button>

            </Form>           
            </AnimationContainer>
        </Content>

        <Background/>

    </Container>
)
};


export default Login;