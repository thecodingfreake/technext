import React from 'react'
import { Link } from 'react-router-dom'
import Navbar1 from './components/Navbar1'
import { useParams } from 'react-router-dom'


const Instructions = () => {
    const { id } = useParams();

    return (
        <div>
            <Navbar1 />
            <h1 style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'montserrat', fontSize: '28px', fontWeight: '600' }}>Do read up to the instructions</h1>


            {/* general instructions */}
            <div style={{ maxWidth: '1300px', margin: '0 auto', marginTop: '15px',letterSpacing:'0.4px' }}>
                <p style={{ textDecoration: 'Underline', fontFamily: 'montserrat', fontSize: '18px', marginBottom: '8px' }}>
                    <b>General Instructions:</b></p>

                <ul>
                    <li style={{ marginBottom: '8px' }}>1. The total duration for gate mock exam is 1 hour 30 minutes(90 minutes).</li>
                    <li style={{ marginBottom: '8px' }}>2. The clock will be set at the server. The countdown timer in the top right comer of
                        screen wit display the remaining time available for you to complete the
                        examination When the timer reaches zero, the examination will end by thert.
                        You will not be required to end or submit your examination.</li>
                    <li style={{ marginBottom: '10px' }}>3.The Questions Parette displayed on the nont side of screen will show the status of each
                        question using one of the following symbols:</li>
                </ul>

                <div style={{ textAlign: 'center',marginBottom:'5px',marginTop:'10px' }}>
                    <ul style={{ padding: 0, listStyle: 'none', display: 'inline-flex', alignItems: 'center' }}>
                        <li style={{ display: 'inline', marginRight: '5px' }}>1.</li>
                        <div style={{ width: '20px', height: '15px', backgroundColor: '#5ab75b', display: 'inline-block', marginRight: '10px' }}></div>
                        <li style={{ display: 'inline', listStyleType: 'none' }}>You have answered the question.</li>
                    </ul>
                </div>
                <div style={{ textAlign: 'center',marginBottom:'5px',marginLeft:'34px' }}>
                    <ul style={{ padding: 0, listStyle: 'none', display: 'inline-flex', alignItems: 'center' }}>
                        <li style={{ display: 'inline', marginRight: '5px' }}>2.</li>
                        <div style={{ width: '20px', height: '15px', backgroundColor: '#e10000', display: 'inline-block', marginRight: '10px' }}></div>
                        <li style={{ display: 'inline', listStyleType: 'none' }}>You have not answered the question.</li>
                    </ul>
                </div>
                <div style={{ textAlign: 'center',marginLeft:'142px' }}>
                    <ul style={{ padding: 0, listStyle: 'none', display: 'inline-flex', alignItems: 'center' }}>
                        <li style={{ display: 'inline', marginRight: '5px' }}>3.</li>
                        <div style={{ width: '20px', height: '15px', backgroundColor: 'grey', display: 'inline-block', marginRight: '10px' }}></div>
                        <li style={{ display: 'inline', listStyleType: 'none' }}>You have marked the question for later to answer.</li>
                    </ul>
                </div>
            </div>

            {/* Navigate instructions */}
            <div style={{ maxWidth: '1300px', margin: '0 auto',marginTop: '15px',letterSpacing:'0.4px' }}>
                <p style={{ textDecoration: 'Underline', fontFamily: 'montserrat', fontSize: '18px', marginBottom: '8px' }}><b>Navigating to a questions:</b></p>
                <ul>
                    <li style={{ marginBottom: '8px',fontWeight:'600' }}>4. To answer a question, do the following:</li>
                    <li style={{ marginBottom: '8px' }}>a. Click on the question number in the Question Palette of your screen to go to that numbered question directly.
                    Note that using this option does NOT save your answer to the current question.</li>
                    <li style={{ marginBottom: '10px' }}> b. Click on Save & Next to save your answer for the current question and then go to the next question.</li>
                    <li style={{ marginBottom: '10px' }}> c. Click on Mark for Review & Next to save your answer for
                    the current question, mark it for review, and then go to the next question.</li>
                </ul>
            </div>

            {/* Answering questions*/}
            <div style={{ maxWidth: '1300px', margin: '0 auto', marginTop: '15px',letterSpacing:'0.4px' }}>
                <p style={{ textDecoration: 'Underline', fontFamily: 'montserrat', fontSize: '18px', marginBottom: '8px' }}><b>Answering a question:</b></p>
                <p style={{ fontWeight:600, fontFamily: 'montserrat', fontSize: '18px', marginBottom: '8px' }}>5. Procedure for answering a multiple choice type question:</p>
                <ul>
                    <li style={{ marginBottom: '8px' }}>a. To select you answer, click on the button of one of the options.</li>
                    <li style={{ marginBottom: '10px' }}>b. To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button.</li>
                    <li style={{ marginBottom: '10px' }}> c. To change your chosen answer, click on the button of another option.</li>
                    <li style={{ marginBottom: '10px' }}> d. To save your answer, you MUST click on the Save & Next button.</li>
                    <li style={{ marginBottom: '10px' }}> e. To mark the question for review, click on the Mark for Review & Next button.</li>
                </ul>

                <p style={{ fontWeight:600, fontFamily: 'montserrat', fontSize: '18px', marginBottom: '8px',marginTop:'10px' }}>6. Procedure for answering a multiple choice type question:</p>
                <ul>
                    <li style={{ marginBottom: '8px' }}>a. Review the question and make sure you understand what information is required to fill in the blank.</li>
                    <li style={{ marginBottom: '10px' }}>b. Type your answer directly into the blank space provided.</li>
                    <li style={{ marginBottom: '10px' }}> c. Review your entered answer for accuracy and completeness. You can edit your response within the blank space.</li>
                    <li style={{ marginBottom: '10px' }}> d. If there is a "Save & Next" button or similar, click on it to ensure your answer is recorded.</li>
                    <li style={{ marginBottom: '10px' }}> e. If there's an option to mark the question for review, you can use it if you want to revisit the question later.</li>
                </ul>         
            </div>

            {/* Navigating sections*/}
            <div style={{ maxWidth: '1300px', margin: '0 auto',marginTop:'15px',letterSpacing:'0.4px' }}>
                <p style={{  textDecoration: 'Underline', fontFamily: 'montserrat', fontSize: '18px', marginBottom: '8px' }}><b>Navigating through sections:</b></p>
                <ul>
                    <li style={{ marginBottom: '8px' }}>7. Sections in this question paper are displayed on the top bar of the screen. Questions in a section
                    can be viewed by click on the section name. The section you are currently viewing is highlighted.</li>
                    <li style={{ marginBottom: '10px' }}>8.After click the Save & Next button on the last question for a section,
                    you will automatically be taken to the first question of the next section.</li>
                    <li style={{ marginBottom: '10px' }}>9. You can shuffle between sections and questions anything during the examination as per your convenience only
                    during the time stipulated.</li>
                    <li style={{ marginBottom: '10px' }}> 10. Candidate can view the corresponding section summery as part of the legend that appears in every section
                    above the question palette.</li>
                </ul>
            </div>

            <div style={{ maxWidth: '1300px', margin: '0 auto', marginTop:'15px' }}>
                <hr  style={{marginBottom:'5px'}}/>
                <label  style={{fontFamily: 'montserrat', fontSize: '16px',letterSpacing:'0.5px',lineHeight:'22px'}} >
                    <input type='checkbox'/>
                    I confirm that I have carefully read and understood the instructions for fill-in-the-blank questions.
                    I will enter my responses directly into the provided blank spaces, review my answers for accuracy, save each response using the
                    'Save & Next' button, and, if needed, use the 'Mark for Review' option before navigating to the next question.
                    I acknowledge the importance of saving my answers before proceeding. <b>I am ready to begin the test.</b>
                </label>
                <hr style={{marginTop:'5px'}} />

                <button style={{
                    backgroundColor: '#0A1D44', border: 'none', borderRadius: '5px', color: 'white', height: '40px', width: '140px',
                    marginTop: '20px', marginBottom: '30px', cursor: 'pointer'
                }}><Link to={`/questions/${id}`} style={{ color: 'white', textDecoration: 'none' }}>PROCEED</Link>
                </button>
            </div>

        </div>
    )
}

export default Instructions
