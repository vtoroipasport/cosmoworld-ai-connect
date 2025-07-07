import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  userLocation?: { lat: number; lng: number };
  drivers?: Array<{ id: string; lat: number; lng: number; name: string; rating: number; distance: string }>;
  isDriverMode?: boolean;
}

const Map = ({ onLocationSelect, userLocation, drivers = [], isDriverMode = false }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: userLocation ? [userLocation.lng, userLocation.lat] : [37.6173, 55.7558], // Moscow
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user location marker
    if (userLocation) {
      new mapboxgl.Marker({ color: '#3B82F6' })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup().setHTML('<div>Ваше местоположение</div>'))
        .addTo(map.current);
    }

    // Add driver markers
    drivers.forEach((driver) => {
      const el = document.createElement('div');
      el.className = 'driver-marker';
      el.style.backgroundImage = `url('data:image/svg+xml;base64,${btoa(`
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="#10B981" stroke="#fff" stroke-width="2"/>
          <text x="15" y="20" text-anchor="middle" fill="white" font-size="14" font-weight="bold">🚗</text>
        </svg>
      `)}')`;
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.backgroundSize = '100%';

      new mapboxgl.Marker(el)
        .setLngLat([driver.lng, driver.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-2">
            <div class="font-bold">${driver.name}</div>
            <div class="text-sm">Рейтинг: ${driver.rating} ⭐</div>
            <div class="text-sm">${driver.distance}</div>
          </div>
        `))
        .addTo(map.current);
    });

    // Handle map clicks for location selection
    if (onLocationSelect) {
      map.current.on('click', async (e) => {
        const { lng, lat } = e.lngLat;
        
        // Reverse geocoding would go here in a real app
        const address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        
        onLocationSelect({ lat, lng, address });
        
        // Add temporary marker
        new mapboxgl.Marker({ color: '#EF4444' })
          .setLngLat([lng, lat])
          .addTo(map.current!);
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, userLocation, drivers, onLocationSelect]);

  if (!mapboxToken) {
    return (
      <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
          Введите Mapbox токен для отображения карты
        </p>
        <div className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="pk.eyJ1..."
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <button
            onClick={() => window.open('https://mapbox.com/', '_blank')}
            className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm"
          >
            Получить токен
          </button>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-64 rounded-lg" />;
};

export default Map;