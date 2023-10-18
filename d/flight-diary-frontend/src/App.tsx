import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((res) => {
      setEntries(res.data);
    });
  }, []);

  const createEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post<NonSensitiveDiaryEntry>("http://localhost:3000/api/diaries", newEntry)
      .then((res) => {
        setEntries(entries.concat(res.data));
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  return (
    <div>
      <h1>Ilari's fligh diary application</h1>
      <h2>Add new entry</h2>
      {errorMessage && <div style={{ color: "#e22" }}>{errorMessage}</div>}
      <form onSubmit={createEntry}>
        <label htmlFor="date">Date</label>
        <input
          type="text"
          name="date"
          value={newEntry.date}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="visibility">Visibility</label>
        <input
          type="text"
          name="visibility"
          value={newEntry.visibility}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="weather">Weather</label>
        <input
          type="text"
          name="weather"
          value={newEntry.weather}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="comment">Comment</label>
        <input
          type="text"
          name="comment"
          value={newEntry.comment}
          onChange={handleInputChange}
        />
        <br />
        <input type="submit" />
      </form>
      <h2>Entries</h2>
      {entries.map((e) => (
        <div key={e.id}>
          <h3>{e.date}</h3>
          <ul>
            <li>Visibility: {e.visibility}</li>
            <li>Weather: {e.weather}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
