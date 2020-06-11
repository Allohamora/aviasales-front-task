import React from 'react';
import styled from 'styled-components';
import { useId } from 'hooks/useId';
import shape from "./Shape.svg";

interface CheckboxProps {
    text?: string,
    checked?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

const Input = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;

    &:checked + div {
        border-color: var(--checkbox-checked-color);

        background-image: url(${shape});
        background-position: center;
        background-repeat: no-repeat;
    }
`;

const Label = styled.label`
    display: flex;
    align-items: center;

    cursor: pointer;

    padding: var(--checkbox-padding);

    &:hover {
        background: var(--checkbox-bg-hover);    
    }
`;

const Custom = styled.div`
    width: 20px;
    height: 20px;

    margin-right: 10px;

    border: 1px solid var(--checkbox-border-color);

    border-radius: 2px;
`;

const Text = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 13px;

    line-height: 20px;

    color: var(--black);
`;

export const Checkbox: React.FC<CheckboxProps> = props => {

    const {text, checked, onChange} = props;

    const id = useId("checkbox");

    return (
        <Label htmlFor={id} >

            <Input 
                type="checkbox" 
                id={id} 
                checked={checked}
                onChange={onChange}
            />
            
            <Custom  />

            <Text>
                {text}
            </Text>

        </Label>
    );
};
