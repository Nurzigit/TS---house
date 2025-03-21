import React, { useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  SearchControl,
} from "@pbe/react-yandex-maps";
import { Header } from "../Header";
import { Footer } from "../Footer";
import AdditionalHeader from "../AdditionalHeader";
import "./styles/style.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const SUGGEST_API_KEY = process.env.REACT_APP_SUGGEST_API_KEY;



const AddCardPage = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState([43.222, 76.851]);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);
  console.log(API_KEY)
  try {
    const response = await fetch("http://localhost:8000/api/cards/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Uploaded image response:", data); // ✅ Проверь, что сервер возвращает правильный URL

    if (response.ok) {
      setImages((prevImages) => [...prevImages, data.imageUrl]); // ✅ Используем imageUrl, а не data.url
    } else {
      alert("Image upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddCard = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/cards/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images,
        title,
        description,
        location: { address, coordinates },
        price,
        userId: user._id,
      }),
    });

    if (response.ok) {
      alert("Card added successfully");
      setImages([]);
      setTitle("");
      setDescription("");
      setAddress("");
      setCoordinates([43.222, 76.851]);
      setPrice("");
    } else {
      alert("Error adding card");
    }
  };

  return (
    <div className="add-card__page">
      <div className="add-card__page--header">
        <Header user={user} />
      </div>
      <div className="add-card__page--main">
        <AdditionalHeader user={user} />
        <div className="add-card__page--main-inner">
          <form onSubmit={handleAddCard}>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            <div className="image-preview">
              {images.map((img, index) => (
                <div key={index} className="image-container">
                  <img src={`http://localhost:8000${img}`} alt={`Uploaded ${index + 1}`} width="100" />
                  <button type="button" onClick={() => handleRemoveImage(index)}>
                    ❌
                  </button>
                </div>
              ))}
            </div>
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
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
            <YMaps query={{ apikey: API_KEY, suggest_apikey: SUGGEST_API_KEY }}>
              <Map
                defaultState={{ center: coordinates, zoom: 9 }}
                width="100%"
                height="400px"
              >
                <SearchControl options={{ float: "right" }} />
                <GeolocationControl options={{ float: "left" }} />
                <Placemark
                  geometry={coordinates}
                  options={{ draggable: true }}
                  onDragEnd={(e) =>
                    setCoordinates(e.get("target").geometry.getCoordinates())
                  }
                />
              </Map>
            </YMaps>
            <button type="submit">Add Card</button>
          </form>
        </div>
        <Footer user={user} />
      </div>
    </div>
  );
};

export default AddCardPage;
