import React, { useState,  useEffect, useMemo } from 'react';
import { isToday, format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-day-picker/lib/style.css';
import { Link } from 'react-router-dom';
import {FiClock,FiMapPin} from 'react-icons/fi';
import {FaPowerOff,FaUserGraduate,FaUser,FaRegUserCircle,FaRegEye,FaGlobeAmericas} from 'react-icons/fa';

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



interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}
interface Registro{
    id:string;
    matricula:string;
    data:string;
    local:string; 
    hourFormatted?: string;
    diaFormatted?: string;
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  // eslint-disable-next-line
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [registros,setRegistros]= useState<Registro[]>([]);
  //const history = useHistory();
  



  useEffect(() => {
    api.get<Registro[]>('/registros', { })
    // .then(response => {        
    //     setRegistros(response.data);
    .then(response => {
      const registrosFormatted = response.data.map(appointment => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.data), "HH:mm:ss"),
          diaFormatted: format(parseISO(appointment.data), "dd/MM"),

        };
      });
        setRegistros(registrosFormatted);
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
              <span>Bem-vindo,</span>
              <Link to="/profile">              
                <strong> <FaRegUserCircle/>      {user.nome}</strong>
              </Link>
            </div>
          
        <div>
          <span>         
          <a href="http://127.0.0.1:8080/">
            <button type="button" title="Ativar" >
            <FaRegEye/> 
            </button>
          </a>

          <Link to="/usuario">
          <button type="button" title="Usuários">          
          <FaUser/> 
          </button>
          </Link>
          

          <Link to="/aluno">
          <button type="button" title="Alunos" >          
            <FaUserGraduate/>        
          </button>
          </Link>
         

          <button type="button" title="Sair" onClick={signOut} >
            <FaPowerOff/>
          </button>
          </span>
        
        </div>
        </Profile>
          
        
         
          
        </HeaderContent>
      </Header>

      <Content>

        <Schedule>
          <h1>Registros de Presença</h1>
          <p>
            {isToday(selectedDate) && <span> Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>         


        <Section>          
            {registros.length === 0 && (
              <p>Nenhum Registro</p>
            )}
              
            {registros.map(registros => (
              <Appointment key={registros.id} >               
                <div>
                <strong> <FaGlobeAmericas />   {registros.diaFormatted}</strong>
                  <strong> <FiClock />   {registros.hourFormatted}</strong>               
                  <strong><FaUserGraduate />   {registros.matricula}</strong>
                  <strong><FiMapPin/>   {registros.local}</strong>
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
