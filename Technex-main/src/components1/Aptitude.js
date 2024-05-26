import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import Checkoutques from '../components/Checkoutques';
import axios from 'axios';
import { useEffect } from 'react';
const Aptitude = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [questionDuration, setQuestionDuration] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const checkoutRef = useRef(null);
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const[questions,setQuestions]=useState([])
  const [msqCount,setMsqCount]=useState(0)
  const [mcqCount,setMcqCount]=useState(0)
  const [fillUpsCount,setFillUpsCount]=useState(0)
  const [testName, setTestName] = useState("");

  const navigate=useNavigate()
  useEffect(() => {
    // Fetch company list from the backend
    axios.get("http://localhost:5000/questions/aptc")
      .then(response => {
        setCompanyList(response.data);
      })
      .catch(error => {
        console.error("Error fetching company list:", error);
      });

    // Fetch topic list from the backend
    axios.get("http://localhost:5000/questions/aptt")
      .then(response => {
        setTopicList(response.data);
      })
      .catch(error => {
        console.error("Error fetching topic list:", error);
      });
  }, []);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };
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
    var apt=[]
    const apt1=questions.tech.map(item=>item.id)
    const apt2=questions.apt.map(item=>item.id)
    const apt3=questions.verb.map(item=>item.id)
    apt=apt1.concat(apt2,apt3)
    const nitem={
      "testid":uniqueId,
      "tech":[],
      "apt":apt,
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
 
  const handleCheckoutClick = async () => {
    const ni = {
      "comp": selectedCompany,
      "top": selectedTopic,
      "mcq": parseInt(mcqCount),
      "msq": parseInt(msqCount),
      "fill": parseInt(fillUpsCount)
    };
    try {
      const response = await axios.post("http://localhost:5000/questions/aptm", ni);
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
    
  const handleMcqCountChange = (event) => {
    const count = parseInt(event.target.value);
    setMcqCount(count);
  };

  const handleMsqCountChange = (event) => {
    const count = parseInt(event.target.value);
    setMsqCount(count);
  };
  const handleTestNameChange = (event) => {
    setTestName(event.target.value);
};
  const handleFillUpsCountChange = (event) => {
    const count = parseInt(event.target.value);
    setFillUpsCount(count);
  };
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginTop: '30px' }}>
        <div style={{ marginRight: '20px' }}>
        <label className="label" htmlFor="company">
            Select company
          </label>
          <select className="select-field" name="company" value={selectedCompany} onChange={handleCompanyChange}>
  <option value="all">--Select Company--</option>
  {companyList.filter(company => company.company !== null).map(company => (
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
        <label className="label" htmlFor="topic">
            Select topic
          </label>
          <select className="select-field" name="topic" value={selectedTopic} onChange={handleTopicChange}>
            <option value="all">--Select Topic--</option>
            {topicList.map(topic => (
              <option key={topic.id} value={topic.topic}>{topic.topic}</option>
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
  )
}

export default Aptitude