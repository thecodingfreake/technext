import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { dashContext } from '../userContext';

const Testscheduled = () => {
  const { userstate } = useContext(dashContext);
  const [test, setTest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get_test/${userstate.email}`);
        if (Array.isArray(response.data)) {
          setTest(response.data);
        } else {
          setTest([]); // Initialize as an empty array if response.data is not an array
        }
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };

    fetchData();
  }, [userstate.email]);

  return (
    <div>
      <NavBar />
      <h1 style={{ marginTop: '50px', paddingLeft: '80px' }}>Look up what you got,</h1>
      {test.length === 0 ? (
        <div style={{ marginLeft: '80px', marginTop: '20px' }}>No tests are scheduled.</div>
      ) : (
        test.map((item) => (
          <div key={item.test_id} className='test-container'>
            <div className='test-form' style={{ display: 'flex', flexDirection: 'column', lineHeight: '30px' }}>
              <h1>{item.test_name}</h1>
              <p>For Departments: {item.departments}</p>
              <p>Test ID: {item.test_id}</p>
              <Link className='test-link' to={`/instruction/${item.test_id}`}>
                <button className='test-link' style={{ background: 'black', borderRadius: '5px', width: '120px', height: '35px' }}>Take Test</button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Testscheduled;
