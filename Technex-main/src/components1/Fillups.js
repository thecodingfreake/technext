import React from 'react'

const Fillups = () => {
  return (
    <div>
        <label className="label" htmlFor="question">
                Question:
            </label>
            <textarea className="textarea-field" placeholder='Enter your question here' />

            

            <label className="label" htmlFor="Name">Answer is:</label>
            <input className="input-field" type="text" placeholder="Answer" name="ans"/>
    </div>
  )
}

export default Fillups