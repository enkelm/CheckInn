import React, { useEffect } from 'react';
import L, { LatLng } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from '../../../assests/marker.svg';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useAppSelector } from '../../../hooks/store-hooks';

const iconPerson = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconSize: new L.Point(30, 45),
});

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface LocationMarkerProps {
  center: L.LatLngExpression;
  onClick: (value: [number, number]) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ center, onClick }) => {
  const map = useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return <Marker position={center} draggable icon={iconPerson} />;
};

const Map: React.FC<{ onClick: (value: [number, number]) => void }> = ({ onClick }) => {
  const center = useAppSelector(
    (state) => state.createListing.location?.latlng,
  ) as L.LatLngExpression;

  return (
    <MapContainer
      center={center || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={true}
      className='h-[35vh] rounded-lg'
      style={{ position: 'sticky' }}
    >
      <TileLayer url={url} attribution={attribution} />
      <LocationMarker center={center || [51, -0.09]} onClick={onClick} />
    </MapContainer>
  );
};

export default Map;
