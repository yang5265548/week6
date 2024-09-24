import { useState } from 'react';
import SingleCounter from './SingleCounter';
import useField from './useField';
import './App.css';
import useLocalStorage from './useLocalStorage';

const App = () => {
const nameInput = useField('text');
const bornInput = useField('date');
const heightInput = useField('number');
const handleSubmit = (event) => {
  event.preventDefault();
}
const [name,setName]=useLocalStorage('name','');
  return (
    <div className="app-container">
      <SingleCounter />
      <SingleCounter />
      <SingleCounter />
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input {...nameInput} />
        </div>
        <br/>
        <div>
          Birthdate: <input {...bornInput} />
        </div>
        <br/>
        <div>
          Height: <input {...heightInput} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {nameInput.value} {bornInput.value} {heightInput.value}
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Your name is stored in localStorage: {name}</p>
    
    </div>
  );
}

export default App;