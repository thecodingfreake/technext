import React from 'react'
import NavBar from './NavBar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useContext } from 'react'
import { dashContext } from '../userContext'
import { useEffect } from 'react'
const Adminview = () => {
 const {userstate,setUserstate}=useContext(dashContext)
const navigate=useNavigate()
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
  return (
    <div>
      <NavBar />
      <h1 style={{ fontFamily: 'montserrat', fontWeight: '500', marginTop: '30px', textAlign: 'center' }} >Welcome Admin users,</h1>

      <p style={{ fontFamily: 'montserrat', fontWeight: '600', marginTop: '20px', textAlign: 'center', fontSize: '20px' }}>Your central hub for managing and organizing various tasks crucial for student engagement and assessment.</p>

      <ul style={{
        maxWidth: '1200px', marginLeft: '180px', fontFamily: 'montserrat', marginTop: '30px',
        fontSize: '18px', letterSpacing: '0.3px', lineHeight: '30px'
      }}>
        <li style={{ marginBottom: '8px' }}>Here administrators wield the authority to schedule tests, deliver crucial information to students,
          monitor leaderboards, and craft assessment questions. The intuitive dashboard streamlines test scheduling,
          ensuring alignment with curriculum and learning objectives. Administrators also facilitate effective communication
          by sharing updates and resources. The leaderboard functionality tracks student progress, fostering healthy competition and
          recognizing top achievers. Furthermore, admins generate diverse, topic-specific questions to ensure comprehensive assessments aligned
          with learning goals.</li>

      </ul>
      <hr style={{ marginTop: '20px', marginBottom: '30px', maxWidth: '1300px', marginLeft: '100px' }} />

      <div className='examSection' id='mockexams'>
        <div className='previousTop'>
          <div className='previousTitle'>
            <h2>Admin Control Center</h2>
            <h5>Assess, Engage, Empower Students!</h5>
          </div>
        </div>
        <div className='examBottom'>
          <div className='examCards'>
            <img src='https://treasurenew178.weebly.com/uploads/1/2/6/2/126291943/943480651.png'></img>
            <h4>By <b>-TechNex</b></h4>
            <h2>Schedule test</h2>
            <hr />
            <div className='cardDiv2'>
              <h3>Schedule up.</h3>
              <h4><Link style={{ textDecoration: 'none', color: 'black' }} to='/assign' >Schedule</Link></h4>
            </div>
          </div>

          <div className='examCards'>
            <img src='https://resources.biginterview.com/wp-content/uploads/2023/04/most-common-interview-questions.png'></img>
            <h4>By <b>-TechNex</b></h4>
            <h2>Upload Questions</h2>
            <hr />
            <div className='cardDiv2'>
              <h3>Quickly upload questions.</h3>
              <h4><Link style={{ textDecoration: 'none', color: 'black' }} to='/uploadquestion' >Upload</Link></h4>
            </div>
          </div>

          <div className='examCards'>
            <img src='https://blog.vantagecircle.com/content/images/2023/04/Employee-leaderboard.png'></img>
            <h4>By <b>-TechNex</b></h4>
            <h2>LeaderBoard</h2>
            <hr />
            <div className='cardDiv2'>
              <h3>Track progress.</h3>
              <h4><Link style={{ textDecoration: 'none', color: 'black' }} to='/leaderboard' >Watch out!</Link></h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />


    </div>
  )
}

export default Adminview