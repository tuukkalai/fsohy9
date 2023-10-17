import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { DiaryEntry } from './types';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setEntries(response.data);
    })
  }, []);

  return (
    <div>
      <h1>Ilari's fligh diary application</h1>
      <h2>Entries</h2>
      {entries.map(e => 
        <div key={e.id}>
          <h3>{e.date}</h3>
          <ul>
            <li>Visibility: {e.visibility}</li>
            <li>Weather: {e.weather}</li>
            {e.comment &&
              <li>Comment: {e.comment}</li>
            }
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
