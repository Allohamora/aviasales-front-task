import React from 'react';
import styled from 'styled-components';
import { iTicket } from 'services/aviasales';

interface SegmentProps {
    segment: iTicket["segments"][0]
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    padding-bottom: 10px;
`;

const Block = styled.div`
    display: flex;
    flex-flow: column wrap;
`;

const Title = styled.div`
    color: var(--segment-title-color);

    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    
    letter-spacing: 0.5px;
    text-transform: uppercase;

    line-height: 18px;
`;

const Text = styled.div`
    color: var(--segment-text-color);

    font-style: normal;
    font-weight: 600;
    font-size: 14px;

    line-height: 21px;
`;

const formatter = new Intl.DateTimeFormat("ru", {
    hour: "2-digit",
    minute: "2-digit"
})

export const Segment: React.FC<SegmentProps> = props => {

    const {
        origin, destination, date,
        duration, stops
    } = props.segment;

    const pureHours = duration / 60;
    const minutes = (pureHours % 1 * 60).toFixed();
    const hours = Math.trunc(pureHours);

    const gettedDate = new Date(date);
    const resultDate = new Date( gettedDate.getTime() + duration * 60 * 1000 );

    return (
        <Container>
            <Block>
                <Title>{origin} - {destination}</Title>
                <Text>{formatter.format(gettedDate)} - {formatter.format(resultDate)}</Text>
            </Block>

            <Block>
                <Title>в пути</Title>
                <Text>{hours}ч {minutes}м</Text>
            </Block>

            <Block>
                <Title>
                    {
                        stops.length === 0
                            ? "без пересадок"
                            : `${stops.length} пересадки`
                    }
                </Title>
                <Text>{stops.join(", ")}</Text>
            </Block>
        </Container>
    );
};
