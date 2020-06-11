import React from 'react';
import styled from "styled-components";

import logo from "./Logo.svg";

interface LogoProps {

};

const Container = styled.img`
    display: block;
    width: 82px;
    height: 89px;

    object-fit: cover;
`;

export const Logo: React.FC<LogoProps> = props => {
    return (
        <Container src={logo} alt="logo" />
    );
};
