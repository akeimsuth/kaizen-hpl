import React,{useState,useRef,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { InputField } from './components/FormComponents';
import styled from '@emotion/styled'
import Requirements from './components/Requirements';
import Menu from './components/Menu';
import Upload from './components/Upload';
import axios from 'axios';
import emailjs from 'emailjs-com';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {formatCurrency} from './helper';

import DatePicker from '@bit/nexxtway.react-rainbow.date-picker';
import SignaturePad from 'react-signature-canvas';

const Wrapper = styled.div`
  padding: 24px;


`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr 1fr;
  grid-template-rows: 35rem 35rem 5rem;

  @media (max-width: 500px){
    grid-template-columns: 1fr;
    grid-template-rows: 30rem 50rem 5rem;
  }
`;

const BackgroundImage = styled.img`
  grid-column: 1 / span 2;
  border-radius: var(--space-16);
  width: 100%;
  height: 100%;
  @media (max-width: 1200px){
    grid-column: 1;
    
  }
  @media (max-width: 800px){
    display: none;
  }
`;

const Header = styled.div`
  /* background-color: var(--color-blue-300); */
  grid-column: 3;

  overflow-y: scroll;

&::-webkit-scrollbar {
      width: var(--space-6); 
      height:var(--space-6);
  }

  /* Track */
  ::-webkit-scrollbar-track {
      box-shadow: none;
      border-radius: var(--space-6);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
      background: var(--color-transparent);
      border-radius: var(--space-6);
  }
  
  .col{
      display: flex;
      flex-direction: column;
  }

  .title{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: var(--font-40);
    font-weight: 500;
    line-height: var(--space-52);
    color: var(--color-yellow-500);
  }
  @media (max-width: 1200px){
    grid-column: 2 / span 3;
  }

  @media (max-width: 800px){
    grid-column: 1 / span 2;
    .title{
      font-size: var(--font-28);
      font-weight: 500;
      color: var(--color-gray-700);
    }
   
  }
`;

const Sidebar = styled.aside`
  /* background-color: var(--color-green-300); */
  grid-column: 1;

  @media (max-width: 500px){
    display: none;
  }
`;

const MainContent = styled.div`
  /* background-color: var(--color-red-300); */
  grid-column: 2 / span 3;
  overflow-y: scroll;

  .heading{
    font-size: var(--font-20);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--color-gray-900);
    background-color: var(--color-yellow-400);
    text-align: center;
  }
  &::-webkit-scrollbar {
        width: var(--space-6); 
        height:var(--space-6);
    }

    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: none;
        border-radius: var(--space-6);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--color-transparent);
        border-radius: var(--space-6);
    }

    .submit{
      border:0;
      outline:0;
      padding: var(--space-12) var(--space-40);
      background-color: var(--color-blue-300);
      color: var(--color-white);
      font-size: var(--font-16);
      border-radius: var(--space-8);
      margin-left: 1rem;
      cursor: pointer;
      animation: fade-in ease-in 1s;

      :hover{
        background-color: var(--color-blue-500);
      }
    }

    @keyframes fade-in {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @media (max-width: 500px){
    grid-column: 1;
  }
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
  @media (max-width: 500px){
    .text{
      font-size: var(--font-16);
    }
  }

`;

const FormContainer = styled.div`
  position: relative;
  padding: var(--space-18);
  display: flex;
  flex-direction: column;
  animation: fade-in ease-in 1s;

  .header{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: var(--font-18);
    line-height: var(--space-20);
    color: var(--color-gray-700);
    font-weight: normal;
  }

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
  .upload{
    padding-top: 0.5rem;
    padding-left: 1rem;
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
  const [file, setFile] = useState(null);

  const changeApplication = () => {
    setApplication(true);
    setProduct(false);
    setEmployment(false);
    setGross(false);
    setExpense(false);
    setReference(false);
    setAgreement(false);
}
const changeProduct = () => {
    setApplication(false);
    setProduct(true);
    setEmployment(false);
    setGross(false);
    setExpense(false);
    setReference(false);
    setAgreement(false);
}
const changeEmployment = () => {
    setApplication(false);
    setProduct(false);
    setEmployment(true);
    setGross(false);
    setExpense(false);
    setReference(false);
    setAgreement(false);
}
const changeGross = () => {
    setApplication(false);
    setProduct(false);
    setEmployment(false);
    setGross(true);
    setExpense(false);
    setReference(false);
    setAgreement(false);
}
const changeExpense = () => {
    setApplication(false);
    setProduct(false);
    setEmployment(false);
    setGross(false);
    setExpense(true);
    setReference(false);
    setAgreement(false);
}
const changeReferences = () => {
    setApplication(false);
    setProduct(false);
    setEmployment(false);
    setGross(false);
    setExpense(false);
    setReference(true);
    setAgreement(false);
}
const changeAgreement = () => {
    setApplication(false);
    setProduct(false);
    setEmployment(false);
    setGross(false);
    setExpense(false);
    setReference(false);
    setAgreement(true);
}
const [firstName,setFirstName] = useState('Jason');
const [initial,setInitial] = useState('J');
const [lastName,setLastName] = useState('Statham');
const [trn,setTrn] = useState('383829292002');
const [date,setDate] = useState(new Date());
const [address,setAddress] = useState('Statham');
const [addressCont,setAddressCont] = useState('Statham');
const [city,setCity] = useState('Statham');
const [parish,setParish] = useState('Statham');
const [homeNumber,setHomeNumber] = useState('Statham');
const [mobileNumber,setMobileNumber] = useState('Statham');
const [email,setEmail] = useState('Statham');
const [id,setId] = useState('Statham');
const [idNumber,setIdNumber] = useState('Statham');
const [marital,setMarital] = useState('Statham');
const [productName,setProductName] = useState('Statham');
const [sku,setSKU] = useState('Statham');
const [value,setValue] = useState(0);
const [deposit,setDeposit] = useState(0);
const [months,setMonths] = useState(0);

//Employment
const [employed,setEmployed] = useState('');
const [employedEmployer,setEmployedEmployer] = useState('');
const [employedPhone,setEmployedPhone] = useState('');
const [employedAddress,setEmployedAddress] = useState('');
const [employedAddressCont,setEmployedAddressCont] = useState('');
const [employedCity,setEmployedCity] = useState('');
const [employedParish,setEmployedParish] = useState('');
const [employedPosition,setEmployedPosition] = useState('');
const [employedYears,setEmployedYears] = useState('');
const [employedStatus,setEmployedStatus] = useState('');
const [employedManager,setEmployedManager] = useState('');

//Gross
const [grossIncome,setGrossIncome] = useState(0);
const [grossOvertime,setGrossOvertime] = useState(0);
const [grossBonus,setGrossBonus] = useState(0);
const [grossCommission,setGrossCommission] = useState(0);
const [grossStipend,setGrossStipend] = useState(0);

//Expense
const [presentRent, setPresentRent] = useState(0);
const [previousRent, setPreviousRent] = useState(0);
const [electricity, setElectricity] = useState(0);
const [internet, setInternet] = useState(0);
const [water, setWater] = useState(0);
const [other1, setOther1] = useState(0);
const [bankLoan, setBankLoan] = useState(0);
const [hirePurchase, setHirePurchase] = useState(0);
const [creditCard, setCreditCard] = useState(0);
const [other2, setOther2] = useState(0);
const [food, setFood] = useState(0);
const [travel, setTravel] = useState(0);
const [dependents, setDependents] = useState(0);
const [other3, setOther3] = useState(0);

//Reference
const [firstName1,setFirstName1] = useState('');
const [lastName1,setLastName1] = useState('');
const [address1,setAddress1] = useState('');
const [addressCont1,setAddressCont1] = useState('');
const [city1,setCity1] = useState('');
const [parish1,setParish1] = useState('');
const [home1,setHome1] = useState('');
const [mobile1,setMobile1] = useState('');
const [relationship1,setRelationship1] = useState('');

const [firstName2,setFirstName2] = useState('');
const [lastName2,setLastName2] = useState('');
const [address2,setAddress2] = useState('');
const [addressCont2,setAddressCont2] = useState('');
const [city2,setCity2] = useState('');
const [parish2,setParish2] = useState('');
const [home2,setHome2] = useState('');
const [mobile2,setMobile2] = useState('');
const [relationship2,setRelationship2] = useState('');

//Agreement
const [borrower,setBorrower] = useState('');
const [agreementDate, setAgreementDate] = useState(new Date());
const [signature, setSignature] = useState(null);

const template_params = {
  "reply_to": "hpapplications@kaizengroupja.com",
  "from_name": firstName+" "+lastName,
  "to_name": "Webdealsja",
  "message_html": `
  
  <h1 style="color:var(--color-gray-500); font-size:2rem;">Application Information</h1>
  <br/>
  <p><strong>First Name:</strong> ${firstName}</p><p><strong>Middle Initial:</strong> ${initial}</p><p><strong>Last Name:</strong> ${lastName}</p>
  <p><strong>TRN:</strong> ${trn}</p>
  <p><strong>Date of Birth:</strong> ${date.toDateString()}</p>
  <p><strong>Address:</strong> ${address+" "+addressCont}</p>
  <p><strong>City:</strong> ${city}</p>
  <p><strong>Parish:</strong> ${parish}</p>
  <p><strong>Home Number:</strong> ${homeNumber}</p>
  <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>ID:</strong> ${id}</p>
  <p><strong>ID Number:</strong> ${idNumber}</p>
  <p><strong>Marital Status:</strong> ${marital}</p>
  <br/>
  <h1 style="color:var(--color-gray-500); font-size:2rem;">Product Information</h1>
  <br/>
  <p><strong>Product Name:</strong> ${productName}</p>
  <p><strong>SKU#:</strong> ${sku}</p>
  <p><strong>Value in Dollars:</strong> ${formatCurrency(value)}</p>
  <p><strong>Deposit in Dollars:</strong> ${formatCurrency(deposit)}</p>
  <p><strong>Number of Months:</strong> ${months}</p>
  <br/>
  <h1 style="color:var(--color-gray-500); font-size:2rem;">Employment Information</h1>
  <br/>
  <p><strong>Employed:</strong> ${employed}</p>
  <p><strong>Name of Employer:</strong> ${employedEmployer}</p>
  <p><strong>Address:</strong> ${employedAddress+" "+employedAddressCont}</p>
  <p><strong>City:</strong> ${employedCity}</p>
  <p><strong>Parish:</strong> ${employedParish}</p>
  <p><strong>Employer Number:</strong> ${employedPhone}</p>
  <p><strong>Position/Title:</strong> ${employedPosition}</p>
  <p><strong>Employed Years:</strong> ${employedYears}</p>
  <p><strong>Employment Status:</strong> ${employedStatus}</p>
  <p><strong>Manager:</strong> ${employedManager}</p>
  <br/>

  <h1 style="color:var(--color-gray-500); font-size:2rem;">Gross Monthly Income</h1>
  <br/>
  <p><strong>Net Monthly Income (Dollars):</strong> ${grossIncome}</p>
  <p><strong>Overtime (Dollars):</strong> ${grossOvertime}</p>
  <p><strong>Bonuses (Dollars):</strong> ${grossBonus}</p>
  <p><strong>Commissions (Dollars):</strong> ${grossCommission}</p>
  <p><strong>Stipends/Allowances (Dollars):</strong> ${grossStipend}</p>
  <br/>
  <h1 style="color:var(--color-gray-500); font-size:2rem;">Monthly Expense</h1>
  <br/>

  <h1 style="color:var(--color-gray-500); font-size:1rem;">Rent or Mortgage (Dollars)</h1>
  <br/>
  <p><strong>Present:</strong> ${presentRent}</p>
  <p><strong>Previous:</strong> ${previousRent}</p>
  <h1 style="color:var(--color-gray-500); font-size:1rem;">Utilities (Dollars)</h1>
  <br/>
  <p><strong>Electricity (Dollars):</strong> ${electricity}</p>
  <p><strong>Internet Service Providers (Dollars):</strong> ${internet}</p>
  <p><strong>Water (Dollars):</strong> ${water}</p>
  <p><strong>Other (Dollars):</strong> ${other1}</p>
  <br/>

  <h1 style="color:var(--color-gray-500); font-size:1rem;">Other Financing (Dollars)</h1>
  <br/>
  <p><strong>Bank Loans:</strong> ${bankLoan}</p>
  <p><strong>Other Hire Purchase:</strong> ${hirePurchase}</p>
  <p><strong>Credit Cards:</strong> ${creditCard}</p>
  <p><strong>Other:</strong> ${other2}</p>

  <h1 style="color:var(--color-gray-500); font-size:1rem;">Other Expenses (Dollars)</h1>
  <br/>
  <p><strong>Food and Groceries:</strong> ${food}</p>
  <p><strong>Transportation and Travel:</strong> ${travel}</p>
  <p><strong>Number of Dependents:</strong> ${dependents}</p>
  <p><strong>Other:</strong> ${other3}</p>
  <br/>
  <h1 style="color:var(--color-gray-500); font-size:2rem;">Reference Information</h1>
  <br/>
  <h1 style="color:var(--color-gray-500); font-size:1rem;">Reference 1</h1>
  <br/>
  <p><strong>First Name:</strong> ${firstName1}</p>
  <p><strong>Last Name:</strong> ${lastName1}</p>
  <p><strong>Street Address:</strong> ${address1}</p>
  <p><strong>Address Cont.:</strong> ${addressCont1}</p>
  <p><strong>City:</strong> ${city1}</p>
  <p><strong>Parish:</strong> ${parish1}</p>
  <p><strong>Home Phone Number:</strong> ${home1}</p>
  <p><strong>Mobile Phone Number:</strong> ${mobile1}</p>
  <p><strong>Relationship to Applicant:</strong> ${relationship1}</p>
  <br/>
  <h1 style="color:var(--color-gray-500); font-size:1rem;">Reference 2</h1>
  <br/>
  <p><strong>First Name:</strong> ${firstName2}</p>
  <p><strong>Last Name:</strong> ${lastName2}</p>
  <p><strong>Street Address:</strong> ${address2}</p>
  <p><strong>Address Cont.:</strong> ${addressCont2}</p>
  <p><strong>City:</strong> ${city2}</p>
  <p><strong>Parish:</strong> ${parish2}</p>
  <p><strong>Home Phone Number:</strong> ${home2}</p>
  <p><strong>Mobile Phone Number:</strong> ${mobile2}</p>
  <p><strong>Relationship to Applicant:</strong> ${relationship2}</p>

  <br/>
  <h1 style="color:var(--color-gray-500); font-size:2rem;">Agreement Information</h1>
  <br/>
  <p><strong>Borrower's Name:</strong> ${borrower}</p>
  <a href="${signature}">Signature</a>
  <p><strong>Agreement Date:</strong> ${agreementDate.toDateString()}</p>
  `
}

const service_id = "default_service";
const template_id = "template_UqjlfSWm";

const handleSubmit = () => {


emailjs.send(service_id, template_id, template_params,"user_2WLtdj8YcLEeotGGpmp4R");
 }


 useEffect(() => {
    
      axios.get("https://hpl-server.herokuapp.com/testAPI").then(res => console.log(res.data))
      // axios.post("https://hpl-server.herokuapp.com:8080/fileUpload",{
      //   name: "Akeim SUtherland",
      //   email:"fartnucks@gmail.com"
      // }).then(
      //   console.log("Sent "+signature)
      // )
      // .catch(error => console.log(error))
    

 },[])



  return (
      <Wrapper>
        <Container>
        <BackgroundImage src="banner.jpg"/>
         <Header>
           
           <div className="col">
              <h1 className="title">Webdealsja Hire Purchase Loan Application</h1>
              <Requirements/>
            </div>
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
           <React.Fragment>
             <h1 class="heading">Application Information</h1>
              <ApplicantForm setFile={setFile} setFirstName={setFirstName} setLastName={setLastName} setInitial={setInitial} date={date} setDate={setDate} setTrn={setTrn}
              setAddress={setAddress} setAddressCont={setAddressCont} setCity={setCity} setParish={setParish}
              setHomeNumber={setHomeNumber} setMobileNumber={setMobileNumber} setEmail={setEmail} setId={setId}
              setIdNumber={setIdNumber} setMarital={setMarital}/>

              <button className="submit" onClick={()=> changeProduct()}>Next</button>
            </React.Fragment>
          }
          {product &&
            <React.Fragment>
              <h1 class="heading">Product Information</h1>
              <ProductForm setProductName={setProductName} setSKU={setSKU} setValue={setValue} setDeposit={setDeposit} setMonths={setMonths}/>
              <button className="submit" onClick={()=> changeEmployment()}>Next</button>
          </React.Fragment>
          }
          {employment &&
            <React.Fragment>
              <h1 class="heading">Employment Information</h1>
              <EmploymentForm setEmployed={setEmployed} setEmployedPosition={setEmployedPosition} 
              setEmployedAddress={setEmployedAddress} setEmployedAddressCont={setEmployedAddressCont}
              setEmployedCity={setEmployedCity} setEmployedEmployer={setEmployedEmployer} setEmployedManager={setEmployedManager}
              setEmployedParish={setEmployedParish} setEmployedPhone={setEmployedPhone} setEmployedStatus={setEmployedStatus}
              setEmployedYears={setEmployedYears}/>
              <button className="submit" onClick={()=> changeGross()}>Next</button>
          </React.Fragment>
          }
          {gross &&
            <React.Fragment>
              <h1 class="heading">Gross Income</h1>
            <GrossForm setGross={setGross} setGrossBonus={setGrossBonus} setGrossCommission={setGrossCommission}
            setGrossIncome={setGrossIncome} setGrossOvertime={setGrossOvertime} setGrossStipend={setGrossStipend}/>
            <button className="submit" onClick={()=> changeExpense()}>Next</button>
          </React.Fragment>
          }
          {expense &&
            <React.Fragment>
              <h1 class="heading">Expense Information</h1>
            <ExpenseForm setPresentRent={setPresentRent} setPreviousRent={setPreviousRent} setElectricity={setElectricity} 
            setWater={setWater} setInternet={setInternet} setOther1={setOther1} setOther2={setOther2} setOther3={setOther3}
            setBankLoan={setBankLoan} setHirePurchase={setHirePurchase} setCreditCard={setCreditCard} setDependents={setDependents}
            setFood={setFood} setTravel={setTravel}/>
            <button className="submit" onClick={()=> changeReferences()}>Next</button>
          </React.Fragment>
          }
          {reference &&
            <React.Fragment>
              <h1 class="heading">Reference Information</h1>
            <ReferenceForm setFirstName1={setFirstName1} setLastName1={setLastName1} setAddress1={setAddress1} setAddressCont1={setAddressCont1}
            setCity1={setCity1} setParish1={setParish1} setHome1={setHome1} setMobile1={setMobile1} setRelationship1={setRelationship1}
            
            setFirstName2={setFirstName2} setLastName2={setLastName2} setAddress2={setAddress2} setAddressCont2={setAddressCont2}
            setCity2={setCity2} setParish2={setParish2} setHome2={setHome2} setMobile2={setMobile2} setRelationship2={setRelationship2}
            
            
            />
            <button className="submit" onClick={()=> changeAgreement()}>Next</button>
          </React.Fragment>
          }
          {agreement &&
            <React.Fragment>
              <h1 class="heading">Agreement Information</h1>
            <AgreementForm setBorrower={setBorrower} agreementDate={agreementDate} setAgreementDate={setAgreementDate} setSignature={setSignature}/>
            <button className="submit" onClick={()=> handleSubmit()}>Submit</button>
          </React.Fragment>
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

function ApplicantForm(props) {

  return (
      <React.Fragment>
        <FormContainer>
          <div className="row">
            <InputContainer>
              <p className="label">First Name</p>
              <input className="text-input" onChange={(e)=>props.setFirstName(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Middle Initial</p>
              <input className="text-input" onChange={(e)=>props.setInitial(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Last Name</p>
              <input className="text-input" onChange={(e)=>props.setLastName(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Tax Registration Number(TRN)</p>
              <input className="text-input" required type="number" onChange={(e)=>props.setTrn(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Date of Birth</p>
              <div className="day-input">
              <DatePicker
					      value={props.date}
					      onChange={value => props.setDate(value)} />
             </div>
            </InputContainer>

            <InputContainer>
              <p className="label">Street Address</p>
              <input className="text-input" onChange={(e)=>props.setAddress(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Address Cont..</p>
              <input className="text-input" onChange={(e)=>props.setAddressCont(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">City</p>
              <input className="text-input" onChange={(e)=>props.setCity(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Parish</p>
              <DropdownContainer onChange={(e)=>props.setParish(e.target.value)}>
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
              <input className="text-input" type="number" onChange={(e)=>props.setHomeNumber(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Mobile Number</p>
              <input className="text-input" type="number" onChange={(e)=>props.setMobileNumber(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Email Address</p>
              <input className="text-input" type="email" onChange={(e)=>props.setEmail(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">National ID Type</p>
              <DropdownContainer onChange={(e)=>props.setId(e.target.value)}>
                <option></option>
                <option>{"Driver's License"}</option>
                <option>{"Passport"}</option>
                <option>{"National ID"}</option>
              </DropdownContainer>
            </InputContainer>

            <InputContainer>
              <p className="label">ID Number</p>
              <input className="text-input" type="text" onChange={(e)=>props.setIdNumber(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Marital Status</p>
              <DropdownContainer onChange={(e)=>props.setMarital(e.target.value)}>
                <option></option>
                <option>{"Married"}</option>
                <option>{"Separated"}</option>
                <option>{"Unmarried (single, divorced, widowed)"}</option>
              </DropdownContainer>
            </InputContainer>

            {/* <InputContainer>
              <p className="label">Upload copies of National ID, Proof of Address, and TRN</p>
              <input className="upload" type="file" multiple onChange={(e)=>props.setFile(e.target.value)}/>
            </InputContainer> */}
          </div>
        </FormContainer>
      </React.Fragment>
  )
}

function ProductForm(props) {
  return (
    <React.Fragment>
      <FormContainer>
      <div className="row">
            <InputContainer>
              <p className="label">Product Name</p>
              <input className="text-input" onChange={(e)=>props.setProductName(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">SKU # (Where applicable)</p>
              <input className="text-input" onChange={(e)=>props.setSKU(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Value (Dollars) </p>
              <input className="text-input" onChange={(e)=>props.setValue(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Deposit (Dollars) </p>
              <input className="text-input" onChange={(e)=>props.setDeposit(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Number of Months </p>
              <input className="text-input" onChange={(e)=>props.setMonths(e.target.value)}/>
            </InputContainer>
      </div>
      </FormContainer>
    </React.Fragment>
  )
}

function EmploymentForm(props) {


  return (
    <React.Fragment>
      <FormContainer>
      <div className="row">
          <InputContainer>
              <p className="label">Self Employed?</p>
              <DropdownContainer onChange={(e)=>props.setEmployed(e.target.value)}>
                <option></option>
                <option>{"Yes"}</option>
                <option>{"No"}</option>
              </DropdownContainer>
            </InputContainer>
            <InputContainer>
              <p className="label">Name of Employer</p>
              <input className="text-input" onChange={(e)=>props.setEmployedEmployer(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Phone</p>
              <input className="text-input" onChange={(e)=>props.setEmployedPhone(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Address</p>
              <input className="text-input" onChange={(e)=>props.setEmployedAddress(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Address 2 </p>
              <input className="text-input" onChange={(e)=>props.setEmployedAddressCont(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">City</p>
              <input className="text-input" onChange={(e)=>props.setEmployedCity(e.target.value)}/>
            </InputContainer>
            <InputContainer>
              <p className="label">Parish</p>
              <DropdownContainer onChange={(e)=>props.setEmployedParish(e.target.value)}>
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
              <input className="text-input" onChange={(e)=>props.setEmployedPosition(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Years at Job</p>
              <input className="text-input" onChange={(e)=>props.setEmployedYears(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Employment Status</p>
              <DropdownContainer onChange={(e)=>props.setEmployedStatus(e.target.value)}>
                <option></option>
                <option>{"Permanent"}</option>
                <option>{"Part-time"}</option>
                <option>{"Contractual"}</option>
              </DropdownContainer>
            </InputContainer>

            <InputContainer>
              <p className="label">Name of Manager or Supervisor</p>
              <input className="text-input" onChange={(e)=>props.setEmployedManager(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Contact Position/Title</p>
              <input className="text-input" onChange={(e)=>props.setEmployedPosition(e.target.value)}/>
            </InputContainer>

            {/* <InputContainer>
              <p className="label">Upload copies of Job Letter, Pay Slips, Other Employment Verification</p>
              <input className="upload" type="file" multiple/>
            </InputContainer> */}
      </div>
      </FormContainer>
    </React.Fragment>
  )
}

function GrossForm(props) {


  return(
    <React.Fragment>
      <FormContainer>
      <div className="row">
            <InputContainer>
              <p className="label">Net Monthly Income (Dollars) </p>
              <input className="text-input" onChange={(e)=>props.setGrossIncome(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Overtime (Dollars)</p>
              <input className="text-input" onChange={(e)=>props.setGrossOvertime(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Bonuses (Dollars) </p>
              <input className="text-input" onChange={(e)=>props.setGrossBonus(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Commissions (Dollars) </p>
              <input className="text-input" onChange={(e)=>props.setGrossCommission(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Stipends/Allowances (Dollars) </p>
              <input className="text-input" onChange={(e)=>props.setGrossStipend(e.target.value)}/>
            </InputContainer>

            {/* <InputContainer>
                  <p className="label">Upload proof of income </p>
                  <input className="upload" type="file" multiple/>
                </InputContainer> */}
        </div>
      </FormContainer>
  </React.Fragment>
  )
}

function ExpenseForm(props) {



  return (
    <React.Fragment>
      <FormContainer>
        <h1 className="header">Rent or Mortgage (Dollars)</h1>
      <div className="row" style={{width:"40rem"}}>
            <InputContainer>
              <p className="label">Present</p>
              <input className="text-input" onChange={(e)=>props.setPresentRent(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Previous</p>
              <input className="text-input" onChange={(e)=>props.setPreviousRent(e.target.value)}/>
            </InputContainer>
        </div>
        <h1 className="header">Utilities (Dollars)</h1>
        <div className="row">
          
            <InputContainer>
              <p className="label">Electricity (Dollars) </p>
              <input className="text-input" onChange={(e)=>props.setElectricity(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Internet Service Providers (Dollars)</p>
              <input className="text-input" onChange={(e)=>props.setInternet(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Water (Dollars)</p>
              <input className="text-input" onChange={(e)=>props.setWater(e.target.value)}/>
            </InputContainer>

            <InputContainer>
                  <p className="label">Other (Dollars)</p>
                  <input className="text-input" onChange={(e)=>props.setOther1(e.target.value)}/>
                </InputContainer>
          </div>
          <h1 className="header">Other Financing (Dollars)</h1>
          <div className="row">
            
            <InputContainer>
              <p className="label">Bank Loans</p>
              <input className="text-input" onChange={(e)=>props.setBankLoan(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Other Hire Purchase</p>
              <input className="text-input" onChange={(e)=>props.setHirePurchase(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Credit Cards</p>
              <input className="text-input" onChange={(e)=>props.setCreditCard(e.target.value)}/>
            </InputContainer>

            <InputContainer>
                  <p className="label">Other</p>
                  <input className="text-input" onChange={(e)=>props.setOther2(e.target.value)}/>
                </InputContainer>
          </div>
          <h1 className="header">Other Expenses (Dollars)</h1>
          <div className="row">
            
            <InputContainer>
              <p className="label">Food and Groceries </p>
              <input className="text-input" onChange={(e)=>props.setFood(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Transportation and Travel</p>
              <input className="text-input" onChange={(e)=>props.setTravel(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Number of Dependents</p>
              <input className="text-input" onChange={(e)=>props.setDependents(e.target.value)}/>
            </InputContainer>

            <InputContainer>
                  <p className="label">Other</p>
                  <input className="text-input" onChange={(e)=>props.setOther3(e.target.value)}/>
                </InputContainer>
          </div>
      </FormContainer>
  </React.Fragment>
  )
}

function ReferenceForm(props) {

  return (
    <React.Fragment>
      <FormContainer>
        <h1 className="header">Reference 1</h1>
      <div className="row">
            <InputContainer>
              <p className="label">First Name </p>
              <input className="text-input" onChange={(e)=>props.setFirstName1(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Last Name </p>
              <input className="text-input" onChange={(e)=>props.setLastName1(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Street Address</p>
              <input className="text-input" onChange={(e)=>props.setAddress1(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Address Cont..</p>
              <input className="text-input" onChange={(e)=>props.setAddressCont1(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">City</p>
              <input className="text-input" onChange={(e)=>props.setCity1(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Parish</p>
              <DropdownContainer onChange={(e)=>props.setParish1(e.target.value)}>
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
              <p className="label">Home Phone Number</p>
              <input className="text-input" onChange={(e)=>props.setHome1(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Mobile Phone Number</p>
              <input className="text-input" onChange={(e)=>props.setMobile1(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Relationship to Applicant</p>
              <input className="text-input" onChange={(e)=>props.setRelationship1(e.target.value)}/>
            </InputContainer>
        </div>
        <h1 className="header">Reference 2</h1>
        <div className="row">
            <InputContainer>
              <p className="label">First Name </p>
              <input className="text-input" onChange={(e)=>props.setFirstName2(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Last Name </p>
              <input className="text-input" onChange={(e)=>props.setLastName2(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Street Address</p>
              <input className="text-input" onChange={(e)=>props.setAddress2(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Address Cont..</p>
              <input className="text-input" onChange={(e)=>props.setAddressCont2(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">City</p>
              <input className="text-input" onChange={(e)=>props.setCity2(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Parish</p>
              <DropdownContainer onChange={(e)=>props.setParish2(e.target.value)}>
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
              <p className="label">Home Phone Number</p>
              <input className="text-input" onChange={(e)=>props.setHome2(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Mobile Phone Number</p>
              <input className="text-input" onChange={(e)=>props.setMobile2(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Relationship to Applicant</p>
              <input className="text-input" onChange={(e)=>props.setRelationship2(e.target.value)}/>
            </InputContainer>
        </div>
      </FormContainer>
  </React.Fragment>
  )
}

function AgreementForm(props) {
  
  const sigCanvas = useRef(null);
  const clear = () => sigCanvas.current.clear();
  
  const save = () => props.setSignature(sigCanvas.current.toDataURL());
  
  return(
    <React.Fragment>
      <FormContainer>
      <h1 className="header">By signing below, you affirm that the information you have given on this Application form, where applicable,
       is true and complete and forms a part of this Application and that you have not withheld any information. 
       We will rely on the information you have given us to decide on your Application. 
       You authorise us to obtain further information about you and to check and verify the information you have given us. 
       You also agree to pay all fees and costs associated with the processing of this loan. 
       We can also obtain and/or give information about you to credit bureaus and other credit grantors as permitted by law.
        You also request and authorise us to send you information about other products and services of the Kaizen Group of Companies. </h1>
        <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
            <div style={{width:"5rem"}}>
              <button onClick={save}>save</button>
              <button onClick={clear}>clear</button>
            </div>
      <div className="row" style={{width:"40rem"}}>
         
            <InputContainer>
              <p className="label">Borrower's Name</p>
              <input className="text-input" onChange={(e)=>props.setBorrower(e.target.value)}/>
            </InputContainer>

            <InputContainer>
              <p className="label">Date (MM/DD/YYYY) </p>
              <div className="day-input">
              <DatePicker
					      value={props.agreementDate}
					      onChange={value => props.setAgreementDate(value)} />
             </div>
            </InputContainer>

        </div>
      </FormContainer>
  </React.Fragment>
  )
}
