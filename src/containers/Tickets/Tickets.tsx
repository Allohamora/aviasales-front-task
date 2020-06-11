import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from "components/Button";
import { tTickets } from 'services/aviasales';
import { Checkboxes, iCheckboxes } from 'containers/Checkboxes';

interface TicketsProps {
    tickets: tTickets,
    searchHandler: () => Promise<void>,
};

const Container = styled.div`
    display: flex;
`;

const Wrap = styled.div`
    padding-left: 20px;

    flex-grow: 1;
`;

const Buttons = styled.div`
    display: flex;
`;

const initSideFilter: iCheckboxes = {
    all: {
        text: "Все",
        checked: false
    },
    none: {
        text: "Без пересадок",
        checked: false
    },
    one: {
        text: "1 пересадка",
        checked: false
    },
    two: {
        text: "2 пересадки",
        checked: false
    },
    three: {
        text: "3 пересадки",
        checked: false
    }
};

interface MainFilter {
    [name: string]: {
        text: string,
        selected: boolean,
    }
}

const initMainFilter: MainFilter = {
    speed: {
        text: "Самый дешевый",
        selected: false
    },
    price: {
        text: "Самый быстрый",
        selected: false
    }
}

export const Tickets: React.FC<TicketsProps> = props => {
    const { tickets, searchHandler } = props;

    const [ sideFilter, setSideFilter ] = useState<iCheckboxes>(initSideFilter);
    const [ mainFilter, setMainFilter ] = useState<MainFilter>(initMainFilter);

    const checkboxHandler = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const copy = {...sideFilter[name]};
        copy.checked = e.target.checked;
        setSideFilter({...sideFilter, [name]: copy});

        // TODO filter tickets
    };

    const selectHandler = (name: string) => (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        const entries = Object.entries(mainFilter);

        entries.forEach( ([iName, select]) => {
            if( iName === name ) return select.selected = true;

            return select.selected = false;
        } );

        setMainFilter(Object.fromEntries(entries));

        // TODO filter tickets
    }

    return (
        <Container>
            
            <Checkboxes 
                checkboxes={sideFilter} 
                checkboxHandler={checkboxHandler}
                title="Количество пересадок"    
            />

            <Wrap>
                
                <Buttons>
                    {
                        Object.entries(mainFilter).map( ([name, select]) => (
                            <Button
                                key={select.text}
                                selected={select.selected}
                                text={select.text}
                                onClick={selectHandler(name)}
                            />
                        ) )
                    }
                </Buttons>

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

            </Wrap>

        </Container>
    );
};
