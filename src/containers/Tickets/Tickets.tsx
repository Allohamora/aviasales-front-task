import React, { useState } from 'react';
import styled from 'styled-components';
import { Tab } from "components/Tab";
import { tTickets } from 'services/aviasales';
import { Ticket } from "components/Ticket";
import { Checkboxes, iCheckboxes } from 'containers/Checkboxes';

interface Tabs {
    [name: string]: {
        text: string,
        selected: boolean,
    }
}

const initTabs: Tabs = {
    price: {
        text: "Самый дешевый",
        selected: false
    },
    speed: {
        text: "Самый быстрый",
        selected: true,
    }
}

const initCheckboxes: iCheckboxes = {
    all: {
        text: "Все",
        checked: true
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
}

const Container = styled.div`
    display: flex;
`;

const Wrap = styled.div`
    padding-left: 20px;

    flex-grow: 1;
`;

const TabsWrap = styled.div`
    display: flex;
`;

interface TicketsProps {
    tickets: tTickets
};

export const Tickets: React.FC<TicketsProps> = props => {
    const { tickets } = props;

    const [ checkboxes, setCheckboxes ] = useState<iCheckboxes>(initCheckboxes)
    const [ tabs, setTabs ] = useState<Tabs>(initTabs);
    
    const checkboxHandler = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const copy = {...checkboxes};
        copy[name].checked = !copy[name].checked;

        setCheckboxes(copy);
    }

    const tabHandler = (name: string) => (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        const copy = {...tabs};
        const entries = Object.entries(copy);

        // inner name
        entries.forEach( ([iName, radio]) => {
            if( iName === name ) return radio.selected = true;
            return radio.selected = false;
        } );

        setTabs(Object.fromEntries(entries));
    }

    const filtered = tickets.filter( ticket => {
        const { all, none, one, two, three } = checkboxes;

        if( all.checked ) return true;

        const length = ticket.segments[0].stops.length + ticket.segments[1].stops.length;

        if( none.checked && length === 0 ) return true;
        if( one.checked && length === 1 ) return true;
        if( two.checked && length === 2 ) return true;
        if( three.checked && length === 3 ) return true;

        return false;
    } );

    const sorted = filtered.sort( (a, b) => {
        const { speed, price } = tabs;

        let first: number = 0;
        let second: number = 0;

        if( speed.selected ) {
            first = a.segments[0].duration + a.segments[1].duration
            second = b.segments[0].duration + b.segments[1].duration
        }

        if( price.selected ) {
            first = a.price;
            second = b.price;
        }

        return first - second;
    } );

    return (
        <Container>
            
            <Checkboxes 
                checkboxes={checkboxes} 
                checkboxHandler={checkboxHandler}
                title="Количество пересадок"    
            />

            <Wrap>
                
                <TabsWrap>
                    {
                        Object.entries(tabs).map( ([name, tab]) => {
                            const {text, selected} = tab;
                            return (
                                <Tab
                                    key={text}
                                    selected={selected}
                                    text={text}
                                    onClick={tabHandler(name)}
                                />
                            )
                        } )
                    }
                </TabsWrap>

                <div>
                    {
                        sorted.map( ticket => {
                            const { price, carrier, segments } = ticket;
                            const { date, destination } = segments[0];
                            const key = price + carrier + date + destination + origin;

                            return (
                                <Ticket key={key} ticket={ticket} />
                            )
                        })
                    }
                </div>

            </Wrap>

        </Container>
    );
};
