import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChartLine,
  faFileExcel,
  faTv,
  faNewspaper,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";
import Navbar1 from "./components/Navbar1";
import './App.css';
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';

const Leaderboard = () => {
  const [name, setName] = useState("");
  const [testname, setTestname] = useState("");
  const [dept, setDept] = useState("");
  const [score, setScore] = useState("");
  const [ldata, setLdata] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/leaderboard/")
      .then(res => {
        setLdata(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const filteredData = ldata.filter((item) => {
    return (
      (name === "" || item.user_id.toLowerCase().includes(name.toLowerCase())) &&
      (testname === "" ||
        item.test_name.toLowerCase().includes(testname.toLowerCase())) &&
      (dept === "" || item.department.toLowerCase().includes(dept.toLowerCase())) &&
      (score === "" || String(item.score).includes(score))
    );
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Leaderboard', 20, 10);

    const tableColumn = ["Student ID", "Email", "Test Name", "Department", "Score"];
    const tableRows = [];

    filteredData.forEach(item => {
      const itemData = [
        item.user_id,
        item.email,
        item.test_name,
        item.department,
        item.score,
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('leaderboard.pdf');
  };

  return (
    <div>
      <Navbar1 />
      <div className="center-container">
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Leaderboard</h1>
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}>
          Discover achievements and rivals on our vibrant leaderboard - your hub
          for tracking scores and embracing friendly competition!
        </p>
      </div>

      <div className="leaderboardTop">
        <div className="leaderTopLeft">
          <h2 style={{ overflow: "hidden", position: "relative" }}>
            Podium Winners
          </h2>
          <div>
            <div className="secondWinner">
              <div style={{ position: "relative", top: "30px" }}>
                <img
                  src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
                  style={{ height: "55px", width: "55px", borderRadius: "50%" }}
                ></img>
                <p>Name</p>
              </div>
              <div
                style={{
                  flexBasis: "50%",
                  backgroundColor: "#EFEFEF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  rowGap: "10px",
                  padding: "0 10px",
                  width: "100%",
                  borderRadius: "20px 20px 0 0",
                  alignItems: "center",
                }}
              >
                Second
                <h5>54 points</h5>
              </div>
            </div>
            <div className="firstWinner">
              <div>
                <img
                  src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
                  style={{ height: "55px", width: "55px", borderRadius: "50%" }}
                ></img>
                <p>Name</p>
              </div>
              <div
                style={{
                  flexBasis: "60%",
                  backgroundColor: "#FFEBC2",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  rowGap: "10px",
                  padding: "0 10px",
                  width: "100%",
                  borderRadius: "20px 20px 0 0",
                  alignItems: "center",
                }}
              >
                First
                <h5>59 points</h5>
              </div>
            </div>
            <div className="thirdWinner">
              <div style={{ position: "relative", top: "70px" }}>
                <img
                  src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
                  style={{ height: "55px", width: "55px", borderRadius: "50%" }}
                ></img>
                <p>Name</p>
              </div>
              <div
                style={{
                  flexBasis: "40%",
                  backgroundColor: "#DFCFCC",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  rowGap: "10px",
                  padding: "0 10px",
                  width: "100%",
                  borderRadius: "20px 20px 0 0",
                  alignItems: "center",
                }}
              >
                Third
                <h5>51 points</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="leaderTopRight">
          <div className="leaderHead">
            <p>Template</p>
            <h5>View More</h5>
          </div>
          <div className="leaderTemplate">
            <img src="" style={{ height: "100%", width: "70px" }}></img>
            <div>
              <h3>Title</h3>
              <p>Para</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lead-container">
        <div className="lead-left">
          <p style={{ color: "grey", marginBottom: "20px", fontWeight: "600" }}>
            ANALYTICS
          </p>
          <div className="left-opt">
            <FontAwesomeIcon
              icon={faHouse}
              style={{ color: "#28679E", marginRight: "8px" }}
            />
            <p>Overview</p>
          </div>
          <div className="left-opt">
            <FontAwesomeIcon
              icon={faChartLine}
              style={{ color: "#28679E", marginRight: "8px" }}
            />
            <p>Insights</p>
          </div>
          <div className="left-opt">
            <FontAwesomeIcon
              icon={faFileExcel}
              style={{ color: "#28679E", marginRight: "8px" }}
            />
            <p>Spreadsheet</p>
          </div>
          <hr />

          <div className="lead-left1">
            <p style={{ color: "grey", marginBottom: "25px", fontWeight: "600" }}>
              DEPARTMENT
            </p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>CSE</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>IT</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>CSBS</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>AIDS</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>AIML</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>CS-CY</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>ECE</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>EEE</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>MECH</p>
            <p style={{ fontWeight: "500", marginBottom: "20px" }}>CIVIL</p>
          </div>
        </div>

        <div className="lead-right">
          <div className="lead-search">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="leaderboard-searchbar"
              />
              <input
                type="text"
                placeholder="Search Test Name"
                value={testname}
                onChange={(e) => setTestname(e.target.value)}
                className="leaderboard-searchbar"
              />
              <input
                type="text"
                placeholder="Search Department"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="leaderboard-searchbar"
              />
              <input
                type="text"
                placeholder="Search Score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="leaderboard-searchbar"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
          </div>

          <div className="lead-download">
            <button onClick={downloadPDF} className="download-button">
              Download as PDF
            </button>
          </div>

          <div className="leaderboard-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Test Name</th>
                  <th>Department</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.user_id}</td>
                    <td>{item.test_name}</td>
                    <td>{item.department}</td>
                    <td>{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
