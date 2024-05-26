import React, { useState } from 'react';
import NavBar from './NavBar';
import Techquotient from '../components1/Techquotient';
import Technical from '../components1/Technical';
import Aptitude from '../components1/Aptitude';
import Verbal from '../components1/Verbal';
import { useContext } from 'react';
import { dashContext } from '../userContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Assigntest = () => {
  const {userstate,setUserstate}=useContext(dashContext)
  const [company,setCompany]=useState([])

  const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/questions/company");
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company names:", error);
      }
    };
    fetchData();
  }, []);
    useEffect(()=>{
      try
      {
        if(userstate.admin!=true){
          navigate("/")
        }
    }
      catch(Err){
        console.log(Err)
      }
     },[])
  //    useEffect(()=>{
  //     const fetchData = async () => {
  //         try {
  //             const response = await axios.get("http://localhost:5000/questions/company");
  //             setCompany(response.data);
  //             console.log(response.data)
  //             console.log(company);
  //         } catch (err) {
  //             console.log(err);
  //         }
  //     };
  //     fetchData();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <h1 style={{ marginTop: '50px', fontWeight: '500', textAlign: 'left', marginLeft: '200px' }}>Fill up to Schedule a test</h1>
      <div style={{ marginLeft: '200px', marginTop: '30px' }}  >
        <label className="label" htmlFor="type">
          Exam type
        </label>
        <select className="select-field" name="type" onChange={handleChange} value={selectedOption}>
          <option value="">--Exam type--</option>
          <option value="all">Techical Quotient Mock (Technical,Aptitude,Verbal)</option>
          <option value="tech">Techical Mock</option>
          <option value="aptitude">Aptitude Mock </option>
          <option value="verbal">Verbal Communication</option>
        </select>
        {selectedOption === 'all' && <Techquotient company={company}/>}
        {selectedOption === 'tech' && <Technical  company={company}/>}
        {selectedOption === 'aptitude' && <Aptitude company={company}/>}
        {selectedOption === 'verbal' && <Verbal company={company}/>}
      </div>
    </div>
  );
};

export default Assigntest;
