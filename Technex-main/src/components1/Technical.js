import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import Checkoutques from '../components/Checkoutques';
import axios from 'axios';

const Technical = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [questionDuration, setQuestionDuration] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [companyNames, setCompanyNames] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState([]);
  const checkoutRef = useRef(null);
  const [companyName, setCompanyName] = useState('all');
  const [programmingLanguage, setProgrammingLanguage] = useState('all');
  const [mcqCount, setMcqCount] = useState(0);
  const [msqCount, setMsqCount] = useState(0);
  const [fillUpsCount, setFillUpsCount] = useState(0);
  const [questions,setQuestions]=useState([])
  const [testName, setTestName] = useState("");

  const navigate=useNavigate()
  useEffect(() => {
    // Fetch company names from the backend
    axios.get("http://localhost:5000/questions/company")
      .then(response => {
        setCompanyNames(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching company names:", error);
      });
  
    // Fetch programming languages from the backend
    axios.get("http://localhost:5000/questions/lang")
      .then(response => {
        setProgrammingLanguages(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching programming languages:", error);
      });
  }, []);
  
  useEffect(() => {
    console.log("Updated company names:", companyNames);
  }, [companyNames]);
  
  useEffect(() => {
    console.log("Updated programming languages:", programmingLanguages);
  }, [programmingLanguages]);
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleProgrammingLanguageChange = (event) => {
    setProgrammingLanguage(event.target.value);
  };


  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleMcqCountChange = (event) => {
    const count = parseInt(event.target.value);
    setMcqCount(count);
  };

  const handleMsqCountChange = (event) => {
    const count = parseInt(event.target.value);
    setMsqCount(count);
  };

  const handleFillUpsCountChange = (event) => {
    const count = parseInt(event.target.value);
    setFillUpsCount(count);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleQuestionDurationChange = (event) => {
    const durationInSeconds = parseInt(event.target.value);
    setQuestionDuration(durationInSeconds);
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
    var tech=[]
    const tech1=questions.tech.map(item=>item.id)
    const tech2=questions.apt.map(item=>item.id)
    const tech3=questions.verb.map(item=>item.id)
    tech=tech1.concat(tech2,tech3)
    const nitem={
      "testid":uniqueId,
      "tech":tech,
      "apt":[],
        "verb":[],
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
      "comp": companyName,
      "pro": programmingLanguage,
      "mcq": parseInt(mcqCount),
      "msq": parseInt(msqCount),
      "fill": parseInt(fillUpsCount)
    };
    try {
      const response = await axios.post("http://localhost:5000/questions/techm", ni);
      setQuestions({
        "tech":response.data.mcq,
        "apt":response.data.msq,
        "verb":response.data.fill
      }); 
      console.log(response.data)// Update questions state with the fetched data
      setShowCheckout(true); // Set showCheckout to true to render Checkoutques component
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("Updated questions:", questions);
  }, [questions]);
    
 


  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginTop: '30px' }}>
        <div style={{ marginRight: '20px' }}>
        <label className="label" htmlFor="company">
            Select company
          </label>
          <select className="select-field" name="company" value={companyName} onChange={handleCompanyNameChange}>
            <option value="all">all company</option>
            {companyNames.map(company => (
              <option key={company.company} value={company.company}>{company.company}</option>
            ))}
          </select>
          <div>
                <label className="label" htmlFor="testName">Test Name</label>
                <input type="text" style={{ width: '50%', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }}
                    value={testName} onChange={handleTestNameChange} />
            </div>
        </div>
        <div style={{ marginRight: '20px' }}>
          <label className="label" htmlFor="programmingLanguage">
            Select programming language
          </label>
          <select className="select-field" name="programmingLanguage" value={programmingLanguage} onChange={handleProgrammingLanguageChange}>
            <option value="all">all programming</option>
            {programmingLanguages.map(language => (
              <option key={language.topic} value={language.topic}>{language.topic}</option>
            ))}
          </select>
        </div>

        <div style={{ marginRight: '20px' }}>
          <div>
            <label className="label" htmlFor="startDatetime"> Start Date and Time </label>
            <DatePicker className="form-datepicker" selected={startDate} onChange={handleStartDateChange}
              showTimeSelect timeFormat="HH:mm" timeIntervals={30} timeCaption="Time" dateFormat="MMMM d, yyyy h:mm aa" />
          </div>
        </div>

        <div style={{ marginRight: '20px' }}>
          <div>
            <label className="label" htmlFor="endDatetime">End Date and Time</label>
            <DatePicker
              className="form-datepicker" selected={endDate} onChange={handleEndDateChange} showTimeSelect
              timeFormat="HH:mm" timeIntervals={30} timeCaption="Time" dateFormat="MMMM d, yyyy h:mm aa" />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px', marginTop: '40px' }}>
        <label className='label' style={{ marginRight: '20px' }}>Total questions</label>
        <input style={{ width: 'auto', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }} type='number'/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginTop: '30px', marginBottom: '40px' }}>
        <div style={{ marginRight: '20px' }}>
          <label className='label' style={{ marginRight: '20px' }}>MCQ</label>
          <input style={{ width: 'auto', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }} type='number' value={mcqCount} onChange={handleMcqCountChange}  />
        </div>
        <div style={{ marginRight: '20px' }}>
          <label className='label' style={{ marginRight: '20px' }}>MSQ</label>
          <input style={{ width: 'auto', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }} type='number' value={msqCount} onChange={handleMsqCountChange}/>
        </div>
        <div style={{ marginRight: '20px' }}>
          <label className='label' style={{ marginRight: '20px' }}>Fill up's</label>
          <input style={{ width: 'auto', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }} type='number' value={fillUpsCount} onChange={handleFillUpsCountChange} />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="questionDuration">Question Duration (seconds)</label>
        <input type="number" style={{ width: '20%', padding: '0.5rem', border: ' 1px solid #ccc', borderRadius: '4px' }}
          value={questionDuration} onChange={handleQuestionDurationChange} />
      </div>
      <div style={{ clear: 'both', marginTop: '50px', textAlign: 'center', marginBottom: '50px' }}>
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

export default Technical;
