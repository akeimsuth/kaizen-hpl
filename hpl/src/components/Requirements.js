import React from 'react'
import styled from '@emotion/styled'

const Title = styled.h1`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: var(--space-16);
    color: var(--color-gray-700);
`;

const Points = styled.ul`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: var(--space-14);
    color: var(--color-gray-600);
`;

const Requirements = () => {
    return (
        <React.Fragment>
            <Title>Requirements</Title>
            <Points>
                <li>Must be permanently employed for at least 3 months</li>
                <li>Must be able to pay by either: Salary Deduction or Pre-Authorised Payment/Standing Order (Scotiabank)</li>
                <li>Name and Contact Information of two (2) references</li>
                <li>Credit Report/Assessment Report</li>
            </Points>
            <Title>Documents to be submitted by individual applicants</Title>
            <Points>
                <li>Job Letter (new clients and every new employer change) stating position, salary, and length of employment</li>
                <li>Valid Proof of Address (Recent utility bill, bank statement, valid or current lease or rent agreement)</li>
                <li>Three last payslips (showing full monthly income)</li>
                <li>Valid and Unexpired National Photo ID (Passport, Driver's Licence, Voter's ID)</li>
                <li>Valid TRN</li>
            </Points>
            <Title>Additional documents to be submitted by self-employed applicants</Title>
            <Points>
                <li>Business Registration or License</li>
                <li>Income Documents (Last 6 month's bank statements and one year's Annual Returns</li>
            </Points>
        </React.Fragment>

    )
}

export default Requirements
