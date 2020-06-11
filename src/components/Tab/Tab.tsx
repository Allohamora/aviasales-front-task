import React from 'react';
import styled, { css } from 'styled-components';

interface TabProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void,
    selected?: boolean,
    text: string,
};

const Container = styled.button<{selected?: boolean}>`
    padding: 15px 60px;

    outline: none;
    cursor: pointer;

    border: 1px solid var(--tab-border-color);
    color: var(--tab-color);
    background-color: var(--tab-bg-color);

    flex-grow: 1;

    ${props => props.selected && css`
        background-color: var(--tab-selected-bg-color);
        color: var(--tab-selected-color);
        border-color: var(--tab-selected-border-color);
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

export const Tab: React.FC<TabProps> = props => {

    const {onClick, selected, text} = props;

    return (
        <Container onClick={onClick} selected={selected} >
            {text}
        </Container>
    );
};
