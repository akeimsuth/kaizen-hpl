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

    const changeApplication = () => {
        props.setApplication(true);
        props.setProduct(false);
        props.setEmployment(false);
        props.setGross(false);
        props.setExpense(false);
        props.setReference(false);
        props.setAgreement(false);
    }
    const changeProduct = () => {
        props.setApplication(false);
        props.setProduct(true);
        props.setEmployment(false);
        props.setGross(false);
        props.setExpense(false);
        props.setReference(false);
        props.setAgreement(false);
    }
    const changeEmployment = () => {
        props.setApplication(false);
        props.setProduct(false);
        props.setEmployment(true);
        props.setGross(false);
        props.setExpense(false);
        props.setReference(false);
        props.setAgreement(false);
    }
    const changeGross = () => {
        props.setApplication(false);
        props.setProduct(false);
        props.setEmployment(false);
        props.setGross(true);
        props.setExpense(false);
        props.setReference(false);
        props.setAgreement(false);
    }
    const changeExpense = () => {
        props.setApplication(false);
        props.setProduct(false);
        props.setEmployment(false);
        props.setGross(false);
        props.setExpense(true);
        props.setReference(false);
        props.setAgreement(false);
    }
    const changeReferences = () => {
        props.setApplication(false);
        props.setProduct(false);
        props.setEmployment(false);
        props.setGross(false);
        props.setExpense(false);
        props.setReference(true);
        props.setAgreement(false);
    }
    const changeAgreement = () => {
        props.setApplication(false);
        props.setProduct(false);
        props.setEmployment(false);
        props.setGross(false);
        props.setExpense(false);
        props.setReference(false);
        props.setAgreement(true);
    }

    return (
        <MenuContainer>
            <MenuButton selected={props.application} onClick={()=> changeApplication()}>Applicant Information</MenuButton>
            <MenuButton selected={props.product} onClick={()=> changeProduct()}>Product Information</MenuButton>
            <MenuButton selected={props.employment} onClick={()=> changeEmployment()}>Employment Information</MenuButton>
            <MenuButton selected={props.gross} onClick={()=> changeGross()}>Gross Monthly Income</MenuButton>
            <MenuButton selected={props.expense} onClick={()=> changeExpense()}>Monthly Expense</MenuButton>
            <MenuButton selected={props.reference} onClick={()=> changeReferences()}>References</MenuButton>
            <MenuButton selected={props.agreement} onClick={()=> changeAgreement()}>Acknowledgement and Agreement</MenuButton>
        </MenuContainer>
    )
}

export default Menu
