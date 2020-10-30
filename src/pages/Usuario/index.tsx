import React,{useCallback,useRef} from 'react';
import{FiLock,FiUser,FiEdit} from 'react-icons/fi';
import {Container,Content,Background,AnimationContainer,Link1} from './styles';
import logo from '../../assets/now.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import validacaoErros from '../../utils/validacaoErros';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface request{
    nome:string;
    login:string;
    senha:string;
}

const Usuario:React.FC =()=>{
    const formRef =useRef<FormHandles>(null);    
    const { addToast } = useToast();
    const history = useHistory();

   

    const handleSubmit= useCallback(async(data:request)=>{
        try {          

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                nome:Yup.string().required('Nome obrigatório'),
                login:Yup.string().required('Login obrigatório'),
                senha:Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data,{
                abortEarly:false,
            });
            
            await api.post('/usuarios', data);

            history.push('/');
    
            addToast({
              type: 'success',
              title: 'Cadastro realizado!',
              description: 'Você já pode fazer seu login na Usisales!',
            });

        } catch (error) {  
            if (error instanceof Yup.ValidationError) {
                const errors = validacaoErros(error);
      
                formRef.current?.setErrors(errors);
      
                return;
              } 
           
            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
              });
        }
    },[addToast, history]);
return(
    <Container>
         <Background/>

        <Content>
        <AnimationContainer>
            <img src={logo} alt= "PresenceNow" width="300"/>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Cadastrar Usuário</h1>
                <Input name="nome" icon={FiEdit} placeholder="Nome" />

                <Input name="login" icon={FiUser} placeholder="Login" />

                <Input name="senha" icon={FiLock} placeholder="Senha" type="password"/>

                <Button type="submit">Cadastrar</Button>

            </Form>
            <Link1>
                <Link to="/usuario">
                    <button>                    
                     Voltar
                    </button>                    
                </Link>
            </Link1>
            
          </AnimationContainer>
        </Content>

       

    </Container>
)
};


export default Usuario;