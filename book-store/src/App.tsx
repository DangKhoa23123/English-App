import { useEffect, useState } from 'react';
import { getEvents, createEvent } from './api/eventApi';
import type { Event } from './types/Event';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');

  const loadData = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
  const fetchData = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  fetchData();
}, []);

  const handleCreate = async () => {
    if (!title) return;

    await createEvent({
      title,
      description: 'demo',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    });

    setTitle('');
    loadData(); // reload
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Timeline</h1>

      {/* Form */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập title"
        />
        <button onClick={handleCreate}>Add</button>
      </div>

      {/* Timeline */}
      {events.map((e) => (
        <div key={e._id} className="timeline-item">
          <h3>{e.title}</h3>
          <p>{e.description}</p>
          <small>{new Date(e.startTime).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default App;