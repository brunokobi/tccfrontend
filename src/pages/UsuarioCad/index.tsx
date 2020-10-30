import React, { useState,  useEffect, useMemo } from 'react';
import{RiUserAddFill} from 'react-icons/ri';
import { isToday, format} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import {FaUserGraduate,FaRegAddressCard,FaPlus,FaTrashAlt,FaEdit,FaArrowLeft} from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
interface Usuarios{
    id:string;
    login:string;
    nome:string;     
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());   
  const [alunos,setAlunos]= useState<Usuarios[]>([]);
  



  useEffect(() => {
    api.get<Usuarios[]>('/usuarios', { })
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
          <Link to="/signup">
            <button type="button" title="Adicionar Aluno" >         
              <RiUserAddFill/>
            </button>
          </Link>

          <Link to="/signup">
            <button type="button" title="Alterar Aluno"  >          
              <FaEdit/>
            </button>
          </Link> 

          <Link to="/signup">
            <button type="button" title="Excluir aluno"  >
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
          <h1>Lista de Usuários</h1>
          <p>
            {isToday(selectedDate) && <span> Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>         


        <Section>          
            {alunos.length === 0 && (
              <p>Nenhum Usuário Cadastrado</p>
            )}

            {alunos.map(alunos => (
              <Appointment key={alunos.id}>               
                <div>                              
                  <FaRegAddressCard />
                  <strong>{alunos.login}</strong>
                  <FaUserGraduate/>
                  <strong>{alunos.nome}</strong>

                  <strong>
                <Link to="/signup">
                  <button type="button" title="Alterar Aluno"  >          
                    <FaEdit/>
                  </button>
                </Link> 

                <Link to="/signup">
                  <button type="button" title="Excluir aluno"  >
                    <FaTrashAlt/>
                  </button>
                </Link>  

         
                  </strong>

                  
                </div>
                
              </Appointment>
            ))}
            
          </Section>          
        </Schedule>
       
      </Content>
    </Container>
  );
};

export default Dashboard;
