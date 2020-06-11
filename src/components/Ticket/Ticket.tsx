import React from 'react';
import { iTicket } from 'services/aviasales';
import styled from 'styled-components';
import { Segment } from 'components/Segment';

interface TicketProps {
    ticket: iTicket,
};

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;

    background-color: var(--ticket-bg-color);

    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

    border-radius: 5px;

    margin-top: 20px;
    padding: 20px;
`;

const Title = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    width: 100%;
    padding-bottom: 20px;
`;

const Price = styled.div`
    color: var(--ticket-price-color);

    font-style: normal;
    font-weight: 600;
    font-size: 24px;

    line-height: 24px;
`;

const Img = styled.img`
    display: block;

    grid-column-start: 3;
`;

export const Ticket: React.FC<TicketProps> = props => {

    const {price, carrier, segments} = props.ticket;

    return (
        <Container>
            <Title>
                <Price> {price} P </Price>
                <Img src={`http://pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
            </Title>

            {
                segments.map( (segment, i) => (
                    <Segment key={i} segment={segment} />
                ) )
            }

        </Container>
    );
};
