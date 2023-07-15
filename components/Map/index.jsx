import React, { useEffect, useMemo, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

const MapContainer = ({
  orderId,
  addresses,
  height = '230px',
  radius = '0.75rem 0.75rem 0 0',
}) => {
  const [map, setMap] = useState(null);
  const { pickup, dropOff } = addresses;

  const [pickupLongitude, pickupLatitude] = pickup.center;
  const [dropOffLongitude, dropOffLatitude] = dropOff.center;

  const mapContainerId = `map-container-${orderId}`;
  const mapUpIconId = `map-up-icon-${orderId}`;
  const mapDownIconId = `map-down-icon-${orderId}`;

  useEffect(() => {
    if (!pickup || !dropOff) return;

    const map = new mapboxgl.Map({
      container: mapContainerId,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: pickup.center,
      zoom: 15,
      accessToken: MAPBOX_ACCESS_TOKEN,
    });

    setMap(map);

    return () => {
      map.remove();
    };
  }, [pickup, dropOff, mapContainerId]);

  const apiUrl = useMemo(() => {
    return `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLongitude},${pickupLatitude};${dropOffLongitude},${dropOffLatitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;
  }, [pickupLongitude, pickupLatitude, dropOffLongitude, dropOffLatitude]);

  useEffect(() => {
    if (map) {
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          const route = data.routes[0].geometry.coordinates;

          //  pickup marker
          const pickupMarker = new mapboxgl.Marker({
            draggable: false,
            element: document.getElementById(mapUpIconId),
          });
          // drop off marker
          const dropOffMarker = new mapboxgl.Marker({
            draggable: false,
            element: document.getElementById(mapDownIconId),
          });

          map.on('load', function () {
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: route,
                },
              },
            });

            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#410eff',
                'line-width': 4,
              },
            });

            pickupMarker.setLngLat([pickupLongitude, pickupLatitude]);
            pickupMarker.addTo(map);
            dropOffMarker.setLngLat([dropOffLongitude, dropOffLatitude]);
            dropOffMarker.addTo(map);
          });

          const bounds = new mapboxgl.LngLatBounds()
            .extend([pickupLongitude, pickupLatitude])
            .extend([dropOffLongitude, dropOffLatitude]);

          map.fitBounds(bounds, {
            padding: 40,
            maxZoom: 11,
          });
        });
    }
  }, [
    map,
    apiUrl,
    pickupLongitude,
    pickupLatitude,
    dropOffLongitude,
    dropOffLatitude,
    mapUpIconId,
    mapDownIconId,
  ]);

  return (
    <>
      <div
        id={mapContainerId}
        className='map-container'
        style={{ height, borderRadius: radius }}
      />

      <div style={{ visibility: 'hidden' }}>
        <BsFillArrowUpCircleFill
          style={{ backgroundColor: '#fff', borderRadius: '50%' }}
          id={mapUpIconId}
          size={22}
          color='green'
        />

        <BsFillArrowDownCircleFill
          style={{ backgroundColor: '#fff', borderRadius: '50%' }}
          id={mapDownIconId}
          size={22}
          color='red'
        />
      </div>
    </>
  );
};

export default MapContainer;
