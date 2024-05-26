import React, { useState, useEffect } from "react";
import "./Questionpage.css";
import Logo from "./assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { dashContext } from "./userContext";

const Questionpage = () => {
  const { id } = useParams();
  const { userstate } = useContext(dashContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0); // Add state for total question count

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const questionData = await axios
          .get(`http://localhost:5000/get_question/${id}`)
          .then((questionData) => {
            setQuestions(questionData.data);
            setTotalQuestion(questionData.data.length);
            setSelectedAnswers(Array(questionData.data.length).fill([]));
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleSelect = (questionId, optionId) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    if (updatedSelectedAnswers[questionId] !== undefined) {
      updatedSelectedAnswers[questionId] = [
        ...(updatedSelectedAnswers[questionId] || []),
        optionId,
      ];
    } else {
      updatedSelectedAnswers[questionId] = [optionId];
    }
    setSelectedAnswers(updatedSelectedAnswers);
  };
  const handleSubmit = () => {
    const correctAnswersCount = questions.filter((question, index) => {
      if (Array.isArray(question.answer)) {
        if (question.type === "Multiple Select") {
          return question.answer.every((answer) =>
            selectedAnswers[index].includes(answer)
          );
        } else {
          return question.answer.includes(selectedAnswers[index][0]);
        }
      } else {
        return false;
      }
    }).length;

    const scorePercentage = (correctAnswersCount / questions.length) * 100;
    alert(
      `Your score: ${correctAnswersCount}/${
        questions.length
      } (${scorePercentage.toFixed(2)}%)`
      
    );
    const score = {
      score: questions.length,
    };
    axios
      .post(`http://localhost:5000/addscore/${id}/${userstate.email}`, score)
      .then((res) => {
        if (res.data === "done") {
          navigate("/");
        }
      })
      .catch();
  };

  const handleClear = (e) => {
    const ind = e.index;
    var ele = document.getElementsByName(`option-${ind}`);
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  };

  if (questions) {
    console.log(questions, "adsflsakjdfldkasj");
    return (
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* left side */}
        <div className="left-column">
          <img
            src={Logo}
            style={{ height: "14px", width: "80px" }}
            alt="logo"
          />
          <h1
            style={{
              color: "#2068DE",
              fontSize: "25px",
              marginTop: "25px",
              overflow: "hidden",
            }}
          >
            WORLDLINE MOCK
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "gray",
              fontFamily: "montserrat",
              overflow: "hidden",
              lineHeight: "20px",
            }}
          >
            Your go-to test portal for placement training and company drives
            exams. Access a wide range of scheduled tests aimed in enhancing
            your knowledge, aptitude, and core competencies.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
              overflow: "hidden",
            }}
          >
            <hr style={{ flex: 1, marginRight: "10px" }} />
            <p style={{ color: "gray", fontFamily: "montserrat" }}>QUESTION</p>
            <hr style={{ flex: 1, marginLeft: "10px" }} />
          </div>

          <div
            className="mainGrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
              gap: "10px",
            }}
          >
            {Array.from({ length: totalQuestion }, (_, index) => (
              <a
                href={`#${index}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                <button
                  style={{ fontFamily: "montserrat", width: "100%" }}
                  key={index}
                  className="button"
                >
                  {index + 1}
                </button>
              </a>
            ))}
          </div>
          <hr></hr>

          <div className="rightButtons">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>

        {/* right side */}
        <div className="right-column" style={{ overflowY: "hidden" }}>
          {/* {console.log(question, "sdddddddd")} */}
          {questions &&
            questions.map((question, index) => (
              <div
                id={index}
                key={index}
                style={{ height: "100vh", padding: "50px 0" }}
              >
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "montserrat",
                    fontWeight: "500",
                    marginBottom: "30px",
                  }}
                >
                  {index + 1} | {question.length}
                </p>

                <h2
                  style={{
                    textAlign: "left",
                    paddingLeft: "40px",
                    color: "white",
                    fontFamily: "montserrat",
                    fontWeight: "400",
                    marginBottom: "50px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {question.question}
                </h2>

                {question.options != null &&
                  question.options.map((option, optionIndex) => (
                    <>
                      <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li
                          key={optionIndex}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "15px",
                            backgroundColor: "white",
                            padding: "10px",
                            maxWidth: "350px",
                            marginLeft: "350px",
                            borderRadius: "8px",
                          }}
                        >
                          {question.type === "multiselect" ? (
                            <label
                              style={{
                                marginRight: "10px",
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <input
                                type="checkbox"
                                name={`option-${index}`}
                                value={option}
                                onChange={() => handleSelect(index, option)}
                                style={{ marginLeft: "10px" }}
                              />
                              {option}
                              <p></p>
                            </label>
                          ) : (
                            <label
                              style={{
                                marginRight: "10px",
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <input
                                type="radio"
                                name={`option-${index}`}
                                value={option}
                                onChange={() => handleSelect(index, option)}
                                style={{ marginLeft: "10px" }}
                              />
                              {option}
                              <p></p>
                            </label>
                          )}
                        </li>
                      </ul>
                      {optionIndex === 3 ? (
                        <div className="questionButtons">
                          <button
                            className="b1"
                            onClick={() => {
                              handleClear({ index });
                            }}
                          >
                            Clear Response
                          </button>
                          <button className="b2">Mark for Review & Next</button>
                          <button className="b4">Save & Mark for review</button>
                          {index !== totalQuestion - 1 ? (
                            <button className="b3">
                              <a
                                href={`#${index + 1}`}
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                              >
                                Save & Next
                              </a>
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default Questionpage;





