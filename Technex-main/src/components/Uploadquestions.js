import React, { useState } from 'react';
import Navbar1 from './Navbar1';
import Choice from '../components1/Choice';
import Select from '../components1/Select';
import Fillups from '../components1/Fillups';

const Uploadquestions = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [savedData, setSavedData] = useState(null);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSave = () => {
        setSavedData(selectedOption);
    };

    const handleSaveAndAddAnother = () => {
        handleSave();
        window.location.reload();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
            // Here you can perform the file upload logic
            console.log('Uploading file:', file.name);
            // Clear the file input after upload
            setFile(null);
        } else {
            alert('Please select a file to upload.');
        }
    };

    return (
        <div>
            <Navbar1 />
            <h1 style={{ marginTop: '20px', fontWeight: '500', textAlign: 'center' }}>Hey admins, Upload up your questions</h1>

            <div className='container'>
                <div className='label-container'>
                    <label className='label' htmlFor="type">
                        Question type
                    </label>
                    <select className='selection-field' name="type" onChange={handleChange} value={selectedOption}>
                        <option value="">--Question type--</option>
                        <option value="choice" >Multiple choice</option>
                        <option value="select">Multiple select</option>
                        <option value="fill">Fill up's</option>
                    </select>
                </div>
                {selectedOption === 'choice' && <Choice />}
                {selectedOption === 'select' && <Select />}
                {selectedOption === 'fill' && <Fillups />}
                <div className='button-container'>
                    <button className='button1' style={{ marginRight: '20px' }} onClick={handleSave}>Save</button>
                    <button className='button1' style={{ width: '220px' }} onClick={handleSaveAndAddAnother}>Save & Add Another</button>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    overflow: 'hidden',
                    maxWidth: '800px',
                    marginLeft: '180px',
                    marginTop: '50px'
                }}>
                    <hr style={{ flex: 1, marginRight: "10px" }} />
                    <p style={{ color: "gray", fontFamily: "montserrat" }}>OR</p>
                    <hr style={{ flex: 1, marginLeft: "10px" }} />
                </div>
                <div style={{ marginTop: '30px' }} >
                    <p style={{ marginBottom: '30px', fontWeight: '600' }}>Upload up using .csv</p>
                    <input type="file" accept=".csv" onChange={handleFileChange} />
                    <button style={{ width: '100px', height: '30px', color: 'white', backgroundColor: '#28679e', border: 'none', cursor: 'pointer' }} onClick={handleUpload}>Upload CSV</button>
                </div>
            </div>
        </div>
    );
};

export default Uploadquestions;
