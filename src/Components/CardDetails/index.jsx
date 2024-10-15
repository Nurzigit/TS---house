import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    axios.get(`/api/cards/${id}`)
      .then(res => setCard(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!card) return <p>Loading...</p>;

  return (
    <div>
      <img src={card.image} alt={card.title} />
      <h2>{card.title}</h2>
      <p>{card.description}</p>
      <p>Date: {new Date(card.date).toLocaleDateString()}</p>
      <p>Time: {card.time}</p>
    </div>
  );
};

export default CardDetails;
