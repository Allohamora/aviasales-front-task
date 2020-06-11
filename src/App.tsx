import React, { useState, useEffect } from 'react';
import { aviaSales, tTickets } from 'services/aviasales';
import { Tickets } from 'containers/Tickets';
import styled from 'styled-components';
import { Logo } from 'components/Logo';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wrap = styled.div`
  max-width: 754px;

  margin-left: auto;
  margin-right: auto;
`;

const Header = styled(Wrap)`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 45px;
  padding-bottom: 30px;
`;

const Container = styled.div`
  background-color: var(--app-bg-color);

  min-height: 100vh;
  
  padding-left: 5px;
  padding-right: 5px;

  padding-bottom: 100px;
`;

export const App = () => {
  const [tickets, setTickets] = useState<tTickets | null>(null);

  useEffect( () => {
    const inner = async() => {
      try{
        const searchId = await aviaSales.getSearchId();
        const response = await aviaSales.searchTickets(searchId);

        setTickets(response.tickets.slice(0, 15));
      } catch(e) {
        console.error(e);
        toast("Ошибка при подключении к серверу! Повторная попытка через 30 секунд.", { type: "error" });
        setTimeout( inner, 30000 );
      }
    }

    inner();
  }, [] );

  return (
    <Container>

      <Header>
        <Logo />
      </Header>

      <Wrap>
        {
          tickets 
            ? <Tickets tickets={tickets} />
            : <div>loading...</div>
        }
      </Wrap>

      <ToastContainer />

    </Container>
  )
}