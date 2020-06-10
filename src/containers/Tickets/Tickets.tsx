import React, { useState, useEffect } from 'react';
import { SearchId } from 'App';
import { aviaSales, tTickets } from 'services/aviasales';
import { toast } from 'react-toastify';

interface TicketsProps {
    searchId: SearchId,
};


export const Tickets: React.FC<TicketsProps> = props => {
    const [tickets, setTickets] = useState<tTickets>(null);

    const {searchId} = props;

    useEffect( () => {

        if( !searchId ) return;

        (async() => {
            try {
                const response = await aviaSales.searchTickets(searchId);
                setTickets(response.tickets);
            } catch(e) {
                toast("Произошла ошибка во время запроса к серверу! Попробуйте позже!", {type: "error"});
            }
        })()

    }, [searchId] )

    return (
        <div>
            {
                tickets
                    ? <ul>
                        {
                            tickets.map( ticket => {
                                const { price, carrier, segments } = ticket;
                                const { date, destination } = segments[0];
                                const id = price + carrier + date + destination + origin;

                                return (
                                    <li key={id} >
                                        <div>{price}</div>
                                        <div>{date}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    : <div>Loading</div>
            }
        </div>
    );
};
