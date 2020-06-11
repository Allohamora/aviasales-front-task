import React, { useState, useEffect } from 'react';
import { aviaSales, tTickets } from 'services/aviasales';
import { Tickets } from 'containers/Tickets';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import { Logo } from 'components/Logo';

export type SearchId = string | null;

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
`;

export const App = () => {
  const [searchId, setSearchId] = useState<SearchId>(null);
  const [tickets, setTickets] = useState<tTickets>(null);

  useEffect( () => {
    const inner = async() => {
      try{
        const searchId = await aviaSales.getSearchId();
        const tickets = await aviaSales.searchTickets(searchId);

        setSearchId(searchId);
        setTickets(tickets.tickets);
      } catch(e) {
        console.error(e);
        toast("Ошибка при подключении к серверу! Повторная попытка через 30 секунд.", { type: "error" });
        setTimeout( inner, 30000 );
      }
    }

    inner();
  }, [] );

  const searchHandler = async() => {
    try{
      const iTickets = await aviaSales.searchTickets(searchId);

      if(  iTickets.tickets === null || tickets === null ) return;

      setTickets([...tickets, ...iTickets.tickets]);
    } catch(e) {
      console.error(e);
      toast("Ошибка во время загрузки новых билетов! Попробуйте позже!", {type: "error"});
    }
  }

  return (
    <Container>

      <Header>
        <Logo />
      </Header>

      <Wrap>
        <Tickets tickets={tickets} searchHandler={searchHandler} />
      </Wrap>

      <ToastContainer />

    </Container>
  )
}