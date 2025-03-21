import React, { useEffect, useRef, useState } from "react";

const yandexMapApi = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const [coords, setCoords] = useState([55.751574, 37.573856]); // Default: Москва

  useEffect(() => {
    const loadMap = () => {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current, {
          center: coords,
          zoom: 10,
        });

        const placemark = new window.ymaps.Placemark(coords, {}, { draggable: true });

        map.geoObjects.add(placemark);

        placemark.events.add("dragend", function () {
          const newCoords = placemark.geometry.getCoordinates();
          setCoords(newCoords);
          onLocationSelect(newCoords);
        });

        map.events.add("click", function (e) {
          const newCoords = e.get("coords");
          placemark.geometry.setCoordinates(newCoords);
          setCoords(newCoords);
          onLocationSelect(newCoords);
        });
      });
    };

    if (window.ymaps) {
      loadMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.onload = loadMap;
      document.body.appendChild(script);
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "300px" }} />;
};

export default yandexMapApi;