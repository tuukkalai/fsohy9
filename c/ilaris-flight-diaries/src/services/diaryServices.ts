import diaryData from '../../data/diaries.json';
import {
  DiaryEntry,
  NonSensitiveDiaryEntry,
  NewDiaryEntry
} from '../types';

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): Array<NonSensitiveDiaryEntry> => {
  return diaries.map(({id, date, weather, visibility}) => ({
    id,
    date,
    weather,
    visibility
  }));
};

const addEntry = (newEntry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newEntry
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById
};