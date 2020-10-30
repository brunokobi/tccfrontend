import React, { useState,  useEffect, useMemo,useRef,useCallback } from 'react';
import { isToday, format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import {FaUserGraduate,FaRegAddressCard,FaPlus,FaTrashAlt,FaEdit,FaArrowLeft} from 'react-icons/fa';
import {RiUserAddFill} from 'react-icons/ri';
import { Link,useHistory } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule, 
  Section,
  Appointment, 
} from './styles';

import logoImg from '../../assets/now.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}
interface Aluno{
    id:string;
    matricula:string;
    nome:string;
    foto:string;    
}

interface request{
  nome:string;
  matricula:string;  
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const formRef =useRef<FormHandles>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());   
  const [alunos,setAlunos]= useState<Aluno[]>([]);
  // const history = useHistory();
  // const fileInput = useRef<HTMLInputElement>(null);

  const handleSubmit= useCallback(async(data)=>{
    try {  
      
      console.log(formRef.current);
       console.log(data);

    } catch (error) {  
        
    }
},[]);
  



  useEffect(() => {
    api.get<Aluno[]>('/alunos', { })
    // .then(response => {        
    //     setRegistros(response.data);
    .then(response => {
      const registrosFormatted = response.data.map(appointment => {
        return {
          ...appointment,
        };
      });
        setAlunos(registrosFormatted);
        // console.log(registros);
      });
  }, [selectedDate]);

  

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]); 

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Presence Now" height="100%" />

          <Profile>            
            <div>
              {/* <span>Bem-vindo,</span>
              <Link to="/profile">              
                <strong> <FaRegUserCircle/>      {user.nome}</strong>
              </Link> */}
            </div>
          
        <div>
          <span>

            <Link to="/alunocad">
            <button type="button" title="Adicionar Aluno">          
              <RiUserAddFill/>   
            </button>
          </Link> 

          <Link  to="/alunocad">
              <button type="button" title="Alterar aluno" >                  
                 <FaEdit/> 
              </button>
          </Link>

          <Link  to="/alunocad">
            <button type="button" title="Excluir aluno" >
              <FaTrashAlt/>
            </button>
          </Link>        

          <Link to="/dashboard">
            <button type="button" title="Voltar">         
              <FaArrowLeft/>        
            </button>
          </Link>

          </span>
        
        </div>
        </Profile>
          
        
         
          
        </HeaderContent>
      </Header>

      <Content>

        <Schedule>
          <h1>Lista de Alunos</h1>
          <p>
            {isToday(selectedDate) && <span> Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>         


        <Section>
        <Form ref={formRef} onSubmit={handleSubmit}>          
            {alunos.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}
           
            {alunos.map(alunos => (
              <Appointment key={alunos.id}>               
                <div>                              
                  <FaRegAddressCard />
                  <strong>{alunos.matricula}</strong>
                  <FaUserGraduate/>
                  <strong>{alunos.nome}</strong>

                  <strong>
                  

                    <button type="submit" title={alunos.nome} id="alt" value={alunos.matricula}>                  
                      <FaEdit/> 
                    </button>
                
                  <Link  to="/alunocad">
                    <button type="button" title="Excluir aluno" >
                      <FaTrashAlt/>
                    </button>
                  </Link>

                  </strong>

                </div>                
              </Appointment>              
            ))}
            </Form>
          </Section>          
        </Schedule>
       
      </Content>
    </Container>
  );
};

export default Dashboard;
