import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.75rem',
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090
}; // Default to New Delhi

const pollingStation = {
  lat: 28.6150,
  lng: 77.2100,
  name: 'Booth #142, NDMC School',
  address: 'Connaught Place, New Delhi'
};

export default function PollingBoothMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // If we have a specific location, we can fit bounds here
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    return <div style={{ padding: '1rem', background: '#fee2e2', color: '#ef4444', borderRadius: '0.75rem' }}>Map cannot be loaded right now.</div>;
  }

  if (!isLoaded || !import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    // Fallback if no API key is provided
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Google Maps integration requires an API key.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Map will display your assigned polling booth here.</p>
      </div>
    );
  }

  return (
    <div className="polling-booth-map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Marker for polling station */ }
        <Marker
          position={{ lat: pollingStation.lat, lng: pollingStation.lng }}
          onClick={() => setSelected(pollingStation)}
        />

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ padding: '0.5rem', color: '#000' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{selected.name}</h4>
              <p style={{ margin: 0, fontSize: '0.8rem' }}>{selected.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
