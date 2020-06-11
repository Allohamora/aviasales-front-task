import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    selected?: boolean,
    text: string,
};

const Container = styled.button<{selected?: boolean}>`
    padding: 15px 60px;

    outline: none;
    cursor: pointer;

    border: 1px solid #DFE5EC;
    color: var(--black);
    background-color: var(--white);

    flex-grow: 1;

    ${props => props.selected && css`
        background-color: var(--blue);
        color: var(--white);
        border-color: transparent;
    `}

    font-style: normal;
    font-weight: 600;
    font-size: 12px;

    line-height: 20px;

    letter-spacing: 0.5px;
    text-transform: uppercase;

    &:nth-child(odd) {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    &:nth-child(even) {
        border-top-right-radius: 5px;
        border-top-right-radius: 5px;
    }
`;

export const Button: React.FC<ButtonProps> = props => {

    const {onClick, selected, text} = props;

    return (
        <Container onClick={onClick} selected={selected} >
            {text}
        </Container>
    );
};
