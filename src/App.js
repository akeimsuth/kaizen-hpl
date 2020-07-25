import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { InputField } from './components/FormComponents';
import styled from '@emotion/styled'
import Requirements from './components/Requirements';
import Menu from './components/Menu';
import Upload from './components/Upload';

const Wrapper = styled.div`
  padding: 24px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr 1fr;
  grid-template-rows: 35rem 35rem 5rem;
`;

const Header = styled.div`
  /* background-color: var(--color-blue-300); */
  grid-column: 1 / span 3;

  .title{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: var(--space-40);
    font-weight: 500;
    line-height: var(--space-52);
    color: var(--color-gray-700);
  }
`;

const Sidebar = styled.aside`
  /* background-color: var(--color-green-300); */
  grid-column: 1;
`;

const MainContent = styled.div`
  /* background-color: var(--color-red-300); */
  grid-column: 2 / span 3;
`;

const Footer = styled.div`
  /* background-color: var(--color-indigo-300); */
  grid-column: 1 / span 3;

  .text{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: var(--font-20);
    font-weight: 500;
    line-height: var(--space-20);
    color: var(--color-gray-400);

    display: flex;
    justify-content: center;
  }
`;

const FormContainer = styled.div`
  position: relative;
  padding: var(--space-18);
  display: flex;
  flex-direction: column;
  animation: fade-in ease-in 1s;

  .row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  @keyframes fade-in {
    0%{
      top: 2rem;
      opacity: 0;
    }
    100%{
      top: 0;
      opacity: 1;
    }
  }

`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  .label{
    font-size: var(--font-14);
    font-weight: 500;
    line-height: var(--space-20);
    color: var(--color-gray-900);
  }
  .text-input{
    height: 2rem;
    width: 15rem;
    outline: 0;
    border: 0;
    border-radius: var(--space-6);
    border: 2px solid var(--color-gray-200);
    color: var(--color-gray-700);
    background-color: var(--color-white);

    :focus{
      border: 2px solid var(--color-blue-200);
    }
  }
`;

const FileContainer = styled.div`
    height: 10rem;
    width: 15rem;
    outline: 0;
    border: 0;
    border-radius: var(--space-6);
    border: 2px solid var(--color-gray-200);
    color: var(--color-gray-700);
    background-color: var(--color-white);
`;

const DropdownContainer = styled.select`
    height: 2.4rem;
    width: 15rem;
    outline: 0;
    border: 0;
    border-radius: var(--space-6);
    border: 2px solid var(--color-gray-200);
    color: var(--color-gray-700);
    background-color: var(--color-white);

    :focus{
      border: 2px solid var(--color-blue-200);
    }
`;

function App() {

  const [application, setApplication] = useState(true);
  const [product, setProduct] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [gross, setGross] = useState(false);
  const [expense, setExpense] = useState(false);
  const [reference, setReference] = useState(false);
  const [agreement, setAgreement] = useState(false);

  return (
      <Wrapper>
        <Container>
         <Header>
           <h1>Webdealsja Hire Purchase Loan Application</h1>
           <Requirements/>
         </Header>
         <Sidebar>
           <Menu application={application} setApplication={setApplication} 
           product={product} setProduct={setProduct}
           employment={employment} setEmployment={setEmployment}
           gross={gross} setGross={setGross}
           expense={expense} setExpense={setExpense}
           reference={reference} setReference={setReference}
           agreement={agreement} setAgreement={setAgreement}/>
         </Sidebar>

         <MainContent>
           {application && 
            <ApplicantForm/>
          }
          {product &&
            <ProductForm/>
          }
          {employment &&
            <EmploymentForm/>
          }
         </MainContent>
         <Footer>
        <p className="text">{"Webdealsja Higher Purchase Form "+new Date().getFullYear()}</p>
         </Footer>
        </Container>
      </Wrapper>
  );
}

export default App;

function ApplicantForm() {
  return (
      <React.Fragment>
        <FormContainer>
          <div className="row">
            <InputContainer>
              <p className="label">First Name</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Middle Initial</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Last Name</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Tax Registration Number(TRN)</p>
              <input className="text-input" required type="number"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Date of Birth</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Street Address</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Address Cont..</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">City</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Parish</p>
              <DropdownContainer>
                <option></option>
                <option>{"Kingston & St Andrew"}</option>
                <option>{"St Catherine"}</option>
                <option>{"Clarendon"}</option>
                <option>{"Manchester"}</option>
                <option>{"St Elizabeth"}</option>
                <option>{"Westmoreland"}</option>
                <option>{"Hanover"}</option>
                <option>{"St James"}</option>
                <option>{"Trelawny"}</option>
                <option>{"St Mary"}</option>
                <option>{"St Ann"}</option>
                <option>{"Portland"}</option>
                <option>{"St Thomas"}</option>
              </DropdownContainer>
            </InputContainer>

            <InputContainer>
              <p className="label">Home Number</p>
              <input className="text-input" type="number"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Mobile Number</p>
              <input className="text-input" type="number"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Email Address</p>
              <input className="text-input" type="email"/>
            </InputContainer>

            <InputContainer>
              <p className="label">National ID Type</p>
              <DropdownContainer>
                <option></option>
                <option>{"Driver's License"}</option>
                <option>{"Passport"}</option>
                <option>{"National ID"}</option>
              </DropdownContainer>
            </InputContainer>

            <InputContainer>
              <p className="label">ID Number</p>
              <input className="text-input" type="number"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Marital Status</p>
              <DropdownContainer>
                <option></option>
                <option>{"Married"}</option>
                <option>{"Separated"}</option>
                <option>{"Unmarried (single, divorced, widowed)"}</option>
              </DropdownContainer>
            </InputContainer>

            <InputContainer>
              <p className="label">Upload copies of National ID, Proof of Address, and TRN</p>
              <input className="text-input" type="file" multiple/>
            </InputContainer>
          </div>
        </FormContainer>
      </React.Fragment>
  )
}

function ProductForm() {
  return (
    <React.Fragment>
      <FormContainer>
      <div className="row">
            <InputContainer>
              <p className="label">Product Name</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">SKU # (Where applicable)</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Value (Dollars) </p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Deposit (Dollars) </p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Number of Months </p>
              <input className="text-input"/>
            </InputContainer>
      </div>
      </FormContainer>
    </React.Fragment>
  )
}

function EmploymentForm() {
  return (
    <React.Fragment>
      <FormContainer>
      <div className="row">
          <InputContainer>
              <p className="label">Self Employed?</p>
              <DropdownContainer>
                <option></option>
                <option>{"Yes"}</option>
                <option>{"No"}</option>
              </DropdownContainer>
            </InputContainer>
            <InputContainer>
              <p className="label">Name of Employer</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Phone</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Address</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Address 2 </p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">City</p>
              <input className="text-input"/>
            </InputContainer>
            <InputContainer>
              <p className="label">Parish</p>
              <DropdownContainer>
                <option></option>
                <option>{"Kingston & St Andrew"}</option>
                <option>{"St Catherine"}</option>
                <option>{"Clarendon"}</option>
                <option>{"Manchester"}</option>
                <option>{"St Elizabeth"}</option>
                <option>{"Westmoreland"}</option>
                <option>{"Hanover"}</option>
                <option>{"St James"}</option>
                <option>{"Trelawny"}</option>
                <option>{"St Mary"}</option>
                <option>{"St Ann"}</option>
                <option>{"Portland"}</option>
                <option>{"St Thomas"}</option>
              </DropdownContainer>
            </InputContainer>

            <InputContainer>
              <p className="label">Position/Title</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Years at Job</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Employment Status</p>
              <DropdownContainer>
                <option></option>
                <option>{"Permanent"}</option>
                <option>{"Part-time"}</option>
                <option>{"Contractual"}</option>
              </DropdownContainer>
            </InputContainer>

            <InputContainer>
              <p className="label">Name of Manager or Supervisor</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Contact Position/Title</p>
              <input className="text-input"/>
            </InputContainer>

            <InputContainer>
              <p className="label">Upload copies of Job Letter, Pay Slips, Other Employment Verification</p>
              <input className="text-input" type="file" multiple/>
            </InputContainer>
      </div>
      </FormContainer>
    </React.Fragment>
  )
}
