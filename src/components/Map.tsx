import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  userLocation?: { lat: number; lng: number } | null;
  drivers?: Array<{ id: string; lat: number; lng: number; name: string; rating: number; distance: string }>;
  specialists?: Array<{ id: string; lat: number; lng: number; name: string; specialty: string; rating: number }>;
  isDriverMode?: boolean;
}

// Custom driver icon
const driverIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="12" fill="#10B981" stroke="#fff" stroke-width="2"/>
      <text x="15" y="20" text-anchor="middle" fill="white" font-size="14">🚗</text>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Custom specialist icon
const specialistIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="12" fill="#3B82F6" stroke="#fff" stroke-width="2"/>
      <text x="15" y="20" text-anchor="middle" fill="white" font-size="14">👷</text>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Custom user icon
const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="12" fill="#EF4444" stroke="#fff" stroke-width="2"/>
      <text x="15" y="20" text-anchor="middle" fill="white" font-size="14">📍</text>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const MapEvents = ({ onLocationSelect }: { onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void }) => {
  useMapEvents({
    click: (e) => {
      if (onLocationSelect) {
        const { lat, lng } = e.latlng;
        const address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        onLocationSelect({ lat, lng, address });
      }
    },
  });
  return null;
};

const Map = ({ onLocationSelect, userLocation, drivers = [], specialists = [], isDriverMode = false }: MapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const defaultCenter: [number, number] = userLocation ? [userLocation.lat, userLocation.lng] : [55.7558, 37.6173];

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setSelectedLocation({ lat: location.lat, lng: location.lng });
    onLocationSelect?.(location);
  };

  // Guard against null userLocation
  if (!userLocation) {
    return (
      <div className="w-full h-64 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 dark:text-gray-400">Загрузка карты...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapEvents onLocationSelect={handleLocationSelect} />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Ваше местоположение</Popup>
          </Marker>
        )}
        
        {/* Driver markers */}
        {drivers.map((driver) => (
          <Marker 
            key={driver.id} 
            position={[driver.lat, driver.lng]} 
            icon={driverIcon}
          >
            <Popup>
              <div className="p-2">
                <div className="font-bold">{driver.name}</div>
                <div className="text-sm">Рейтинг: {driver.rating} ⭐</div>
                <div className="text-sm">{driver.distance}</div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Specialist markers */}
        {specialists && specialists.map((specialist) => (
          <Marker 
            key={specialist.id} 
            position={[specialist.lat, specialist.lng]} 
            icon={specialistIcon}
          >
            <Popup>
              <div className="p-2">
                <div className="font-bold">{specialist.name}</div>
                <div className="text-sm">{specialist.specialty}</div>
                <div className="text-sm">Рейтинг: {specialist.rating} ⭐</div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Selected location marker */}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>Выбранная точка</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;