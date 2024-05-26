import React, { useState } from 'react';

const itemsPerPage = 5;

const Checkoutques = (question) => {
  const [currentPagetech, setCurrentPagetech] = useState(1);
  const [currentPageapt, setCurrentPageapt] = useState(1);
  const [currentPageverb, setCurrentPageverb] = useState(1);
  const {tech,apt,verb}=question.questions
  console.log(question)
  console.log(tech)
  console.log(apt)
  console.log(verb)
  const handlePageChange = (page, setPageFunction) => {
    setPageFunction(page);
  };

  const renderTable = (questions, currentPage, setCurrentPage) => {
    if (questions.length === 0) {
      return (
        <div style={{ marginLeft: '180px', marginTop: '20px', textAlign: 'center' }}>
          <p>No data available</p>
        </div>
      );
    }
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(questions.length / itemsPerPage);
  
    return (
      <div style={{ marginLeft: '180px' }}>
        <h1 style={{ marginTop: '20px', fontWeight: '500' }}>{questions[0].type}:</h1>
        <table className="question-table">
          <thead>
            <tr>
              <th>Question ID</th>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.question}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '10px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1, setCurrentPage)}
          >
            Previous
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1, setCurrentPage)}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  const questions = [
    { id: 1, question: 'tech problem questions', type: 'tech' },
    { id: 2, question: 'tech problem questions', type: 'tech' },
    { id: 3, question: 'tech problem questions', type: 'tech' },
    { id: 4, question: 'tech problem questions', type: 'tech' },
    { id: 5, question: 'tech problem questions', type: 'tech' },
    { id: 6, question: 'tech here', type: 'tech' },
  ];

  const questions1 = [
    { id: 1, question: 'apt problem questions', type: 'apt' },
    { id: 2, question: 'apt problem questions', type: 'apt' },
    { id: 3, question: 'apt problem questions', type: 'apt' },
    { id: 4, question: 'apt problem questions', type: 'apt' },
    { id: 5, question: 'apt problem questions', type: 'apt' },
  ];

  const questions2 = [
    { id: 1, question: 'verb problems', type: 'verb' },
    { id: 2, question: 'verb problems', type: 'verb' },
    { id: 3, question: 'verb problems', type: 'verb' },
    { id: 4, question: 'verb problems', type: 'verb' },
    { id: 5, question: 'verb problems', type: 'verb' },
    { id: 6, question: 'verb problems', type: 'verb' },
  ];

  return (
    <div>
      <h1 style={{ marginTop: '20px', fontWeight: '500', textAlign: 'center' }}>
        Question viewing center
      </h1>
      <p style={{ marginTop: '20px', fontSize: '18px', textAlign: 'center' }}>
        Here you can look up to the questions being generated for the particular test...
      </p>

      {renderTable(tech, currentPagetech, setCurrentPagetech)}
      {renderTable(apt, currentPageapt, setCurrentPageapt)}
      {renderTable(verb, currentPageverb, setCurrentPageverb)}
    </div>
  );
};

export default Checkoutques;