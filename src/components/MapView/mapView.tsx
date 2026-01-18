import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map"; // Corrigido: 'M' maiúsculo
import TileLayer from "ol/layer/Tile"; // Corrigido: 'T' maiúsculo
import OSM from "ol/source/OSM";
import View from "ol/View";

function MapView() {
  // Uso de useRef é mais seguro em React do que usar IDs de string
  const mapElement = useRef<HTMLDivElement>(null); 
  const mapRef = useRef<Map | null>(null); // Para manter a instância do mapa se precisar acessar depois

  useEffect(() => {
    if (!mapElement.current) return;

    // Inicializa o mapa
    const map = new Map({
      target: mapElement.current, // Aponta diretamente para o elemento DOM
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    mapRef.current = map;

    // Cleanup ao desmontar o componente
    return () => {
      map.setTarget(undefined); // Remove o mapa do DOM
    };
  }, []);

  return (
    <div 
      ref={mapElement} 
      className="map-container rounded-4xl" 
      style={{ width: "100%", height: "400px" }} 
    />
  );
}

export default MapView;