import React from 'react'

const Choice = () => {
    return (
        <div className='opt'>
            <label  className="label" htmlFor="question">
                Question:
            </label>
            <textarea className="textarea-field" placeholder='Enter your question here' />
            
            <label className="label" htmlFor="Name">Option 1:</label>
            <input className="input-field" type="text" placeholder="option 1 ??" name="opt1"/>

            <label className="label" htmlFor="Name">Option 2:</label>
            <input className="input-field" type="text" placeholder="option 2 ??" name="opt2"/>

            <label className="label" htmlFor="Name">Option 3:</label>
            <input className="input-field" type="text" placeholder="option 3 ??" name="opt3"/>

            <label className="label" htmlFor="Name">Option 4:</label>
            <input className="input-field" type="text" placeholder="option 4 ??" name="opt4"/>

            <label className="label" htmlFor="Name">Answer is:</label>
            <input className="input-field" type="text" placeholder="Answer" name="ans"/>

            <label className="label" htmlFor="Name">Difficulty:</label>
            <input className="input-field" type="text" placeholder="Difficulty" name="ans"/>
            
            <label className="label" htmlFor="Name">Department:</label>
            <input className="input-field" type="text" placeholder="Department" name="ans"/>
        </div>
    )
}

export default Choice