import type { Event } from '../types/Event';

const BASE_URL = 'http://localhost:3000/api/events';

export const getEvents = async (): Promise<Event[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createEvent = async (data: Omit<Event, '_id'>): Promise<Event> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
};