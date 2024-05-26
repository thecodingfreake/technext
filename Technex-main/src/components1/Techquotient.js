import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import Checkoutques from '../components/Checkoutques';
import axios from 'axios';

const Techquotient = ({ company }) => {
    const navigate=useNavigate()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [questionDuration, setQuestionDuration] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [apt, setApt] = useState("");
    const [verb, setVerb] = useState("");
    const [tech, setTech] = useState("");
    const checkoutRef = useRef(null);
    const [questions,setQuestions]=useState([])
    const [companya,setCompanya]=useState("all")
    const [testName, setTestName] = useState("");
    console.log(company)
    
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleQuestionDurationChange = (event) => {
        const durationInSeconds = parseInt(event.target.value);
        setQuestionDuration(durationInSeconds);
    };
    const handleCompanyChange = (event) => {
        setCompanya(event.target.value); 
        console.log(companya)// Update selected company state
    };
    const schedule=()=>{
        const generateRandomId = () => {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
        const uniqueId = generateRandomId();
        const tech=questions.tech.map(item=>item.id)
        const apt=questions.apt.map(item=>item.id)
        const verb=questions.verb.map(item=>item.id)
        const nitem={
          "testid":uniqueId,
          "tech":tech,
          "apt":apt,
            "verb":verb,
            "testname":testName,
            "start":startDate,
            "end":endDate,
            "duration":questionDuration

        }
        axios.post("http://localhost:5000/test/schedule",nitem).then(res=>{
            if(res.data=="ok"){
                alert("test schedule")
                navigate("/")
            }
        }).catch(err=>{
            alert("error occured check network connectivity")
        })
        console.log(startDate,endDate,questionDuration,questions)
        console.log(nitem)
    }
    const handleTestNameChange = (event) => {
        setTestName(event.target.value);
    };
  const handleCheckoutClick = async () => {
    const ni = {
        "comp":companya,
        "apt": parseInt(apt),
        "verb": parseInt(verb),
        "tech": parseInt(tech)
    };
    console.log(companya)
    try {
        const response = await axios.post("http://localhost:5000/questions/spec/tech", ni);
        setQuestions(response.data); // Update questions state with the fetched data
        setShowCheckout(true); // Set showCheckout to true to render Checkoutques component
    } catch (err) {
        console.log(err);
    }
    
    
};


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginTop: '30px' }}>
                <div style={{ marginRight: '20px' }}>
                    <label className="label" htmlFor="type">
                        Select company
                    </label>
                    <select className="select-field" name="type" onChange={handleCompanyChange} value={companya}>
                        <option value="all">all company</option>
                        {company.map(item => (
                            <option key={item.company} value={item.company}>{item.company}</option>
                        ))}
                        {/* <option value="worldline">Worldline Mock</option>
                        <option value="at">AT&T</option>
                        <option value="mrcooper">Mr Cooper</option>
                        <option value="tcs">TCS</option> */}
                    </select>
                </div>
                <div>
                <label className="label" htmlFor="testName">Test Name</label>
                <input type="text" style={{ width: '50%', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }}
                    value={testName} onChange={handleTestNameChange} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginBottom: '20px' }}>
                    <div style={{ marginRight: '20px' }}>
                        <label className='label' style={{ marginRight: '20px' }}>Start Date and Time</label>
                        <DatePicker className="form-datepicker" selected={startDate} onChange={handleStartDateChange}
                            />
                    </div>

                    <div style={{ marginRight: '20px' }}>
                        <label className='label' style={{ marginRight: '20px' }}>End Date and Time</label>
                        <DatePicker className="form-datepicker" selected={endDate} onChange={handleEndDateChange}
                            />
                    </div>
                </div>
            </div>

            </div>
            <div style={{ marginTop: '20px' }}>
                <label className='label' style={{ marginRight: '20px' }}>Total questions</label>
                <input style={{ width: 'auto', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }} type='number' />
            </div>

            <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginBottom: '20px' }}>
                    <div style={{ marginRight: '20px' }}>
                        <label className='label' style={{ marginRight: '20px' }}>Technical count</label>
                        <input style={{ width: 'auto', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }} type='number' onChange={(event)=>{setTech(event.target.value)}} />
                    </div>

                    <div style={{ marginRight: '20px' }}>
                        <div>
                            <label className='label' style={{ marginRight: '20px' }}>Aptitude count</label>
                            <input style={{ width: 'auto', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }} type='number' onChange={(event)=>{setApt(event.target.value)}} />
                        </div>
                    </div>

                    <div style={{ marginRight: '20px' }}>
                        <div>
                            <label className='label' style={{ marginRight: '20px' }}>Verbal count</label>
                            <input style={{ width: 'auto', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }} type='number' onChange={(event)=>{setVerb(event.target.value)}}/>
                        </div>
                    </div>
                </div>

               

            </div>


            <div>
                <label className="label" htmlFor="questionDuration">Question Duration (seconds)</label>
                <input type="number" style={{ width: '20%', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }}
                    value={questionDuration} onChange={handleQuestionDurationChange} />
            </div>

            <div style={{ clear: 'both', marginTop: '50px', textAlign: 'center' }}>
                <button className='button' onClick={handleCheckoutClick}>
                    <Link style={{ color: 'white', textDecoration: 'none' }}>
                        Set & Checkout
                    </Link>
                </button>
            </div>
            {showCheckout && (
                <div id="checkoutques" style={{ marginTop: '200px' }}>
                    <Checkoutques questions={questions}/>
                </div>
            )}
            <button onClick={schedule}>ok</button>
        </div>
    );
}

export default Techquotient;
