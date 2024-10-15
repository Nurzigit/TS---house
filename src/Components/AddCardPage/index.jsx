import React, { useState } from 'react';

const AddCardPage = ({ user }) => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCard = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/cards/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image,
        title,
        description,
        userId: user._id, 
      })
    });

    if (response.ok) {
      alert('Card added successfully');
      setImage('');
      setTitle('');
      setDescription('');
    } else {
      alert('Error adding card');
    }
  };

  return (
    <form onSubmit={handleAddCard}>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
        required
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Add Card</button>
    </form>
  );
};

export default AddCardPage;
