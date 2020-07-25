import React from 'react'
import styled from '@emotion/styled'

const MenuContainer = styled.div`
    padding: var(--space-16);
    display: flex;
    flex-direction: column;
    border: 0;
    border-right: var(--space-2) solid var(--color-gray-200);
`;

const MenuButton = styled.button`
    background: transparent;
    border: 0;
    outline: 0;
    padding: var(--space-12);
    color: ${props => props.selected ? 'var(--color-indigo-400)' : 'var(--color-gray-500)'};
    font-size: var(--font-18);
    line-height: var(--space-40);
    font-weight: 500;
    transform: ${props => props.selected ? 'scale(1.3)' : 'scale(1)'};
    cursor: pointer;
    transition: all ease 1s;

    :hover{
        color: var(--color-gray-800);
        transform: ${props => props.selected ? 'scale(1.3)' : 'scale(1.2)'};
    }

`;

const Menu = (props) => {



    return (
        <MenuContainer>
            <MenuButton selected={props.application}>Applicant Information</MenuButton>
            <MenuButton selected={props.product}>Product Information</MenuButton>
            <MenuButton selected={props.employment}>Employment Information</MenuButton>
            <MenuButton selected={props.gross}>Gross Monthly Income</MenuButton>
            <MenuButton selected={props.expense}>Monthly Expense</MenuButton>
            <MenuButton selected={props.reference}>References</MenuButton>
            <MenuButton selected={props.agreement}>Acknowledgement and Agreement</MenuButton>
        </MenuContainer>
    )
}

export default Menu
