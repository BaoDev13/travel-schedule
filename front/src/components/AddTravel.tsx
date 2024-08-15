import React, { useState } from 'react';
import axios from 'axios';

interface AddTravelProps {
    onAdd: ()=> void;
}

const AddTravel: React.FC<AddTravelProps> = ({onAdd}) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTravel = { name, startDate, endDate, description, imageUrl };
    await axios.post('http://localhost:5000/api/travels', newTravel);
    setName('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setImageUrl('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Travel</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <button type="submit">Add Travel</button>
    </form>
  );
};

export default AddTravel;
