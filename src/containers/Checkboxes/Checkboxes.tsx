import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'components/Checkbox';

export interface iCheckboxes {
    [name: string]: {
        text: string,
        checked: boolean,
    }
};

interface CheckboxesProps {
    title: string,
    checkboxes: iCheckboxes,
    checkboxHandler: (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Container = styled.div`
    display: flex;

    flex-direction: column;

    background: var(--white);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    min-width: 232px;

    padding-bottom: 10px;
`;

const Title = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 12px;

    line-height: 12px;

    letter-spacing: 0.5px;
    text-transform: uppercase;

    color: var(--black);
    padding: 20px 20px 10px 20px;
`;

export const Checkboxes: React.FC<CheckboxesProps> = props => {

    const {checkboxes, title, checkboxHandler} = props;

    return (
        <div>
            <Container>
                <Title>
                    {title}
                </Title>
                    {
                        Object.entries( checkboxes ).map( ([name, checkbox]) => {
                            const {text, checked} = checkbox;
                            
                            return (
                                <Checkbox 
                                    key={text} 
                                    text={text} 
                                    checked={checked}
                                    onChange={checkboxHandler(name)}
                                />
                            );
                        } )
                    }
            </Container>
        </div>
    );
};
