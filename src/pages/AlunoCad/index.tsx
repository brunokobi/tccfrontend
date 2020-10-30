import React,{useCallback,useRef} from 'react';
import{FaCamera,FaGraduationCap,FaRegAddressCard} from 'react-icons/fa';
import {Container,Content,Background,AnimationContainer,Link1,Avatar} from './styles';
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
    matricula:string;  
}


const AlunoCad:React.FC =()=>{   
    const formRef =useRef<FormHandles>(null);    
    const { addToast } = useToast();
    const history = useHistory();  
    const fileInput = useRef<HTMLInputElement>(null);    
   

    const handleSubmit= useCallback(async(data:request)=>{
        try {  

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                nome:Yup.string().required('Nome obrigatório'),
                matricula:Yup.string().required('Matrícula obrigatória'),                          
            });

            await schema.validate(data,{
                abortEarly:false,
            });         
        
            console.log(fileInput.current.files[0]);
            const data1 = new FormData();            
            data1.set('nome',data.nome);
            data1.set('matricula',data.matricula);
            data1.set('avatar',fileInput.current.files[0]);
          
           
            await api.post('/alunos', data1);

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
                <h1>Cadastrar Aluno</h1>
                <Input name="nome" icon={FaGraduationCap} placeholder="Nome" />

                <Input name="matricula" icon={FaRegAddressCard} placeholder="Matricula" />
 
            
                <Avatar>                    
                        <FaCamera />
                        Foto do Aluno
                        <input type="file" id="avatar" name="avatar " ref={fileInput} required/>                                         
                </Avatar>

                <Button type="submit">Cadastrar</Button>

            </Form>
            <Link1>
                <Link to="/aluno">
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


export default AlunoCad;