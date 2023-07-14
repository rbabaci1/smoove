import React, { useEffect, useMemo, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

const MapContainer = ({ addresses, height = '230px' }) => {
  const [map, setMap] = useState(null);

  const { pickup, dropOff } = addresses;

  const [pickupLongitude, pickupLatitude] = pickup.center;
  const [dropOffLongitude, dropOffLatitude] = dropOff.center;

  useEffect(() => {
    if (!pickup || !dropOff) return;

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: pickup.center,
      zoom: 15,
      accessToken: MAPBOX_ACCESS_TOKEN,
    });

    setMap(map);

    return () => {
      map.remove();
    };
  }, [pickup, dropOff]);

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
            element: document.getElementById('map-up-icon'),
          });
          // drop off marker
          const dropOffMarker = new mapboxgl.Marker({
            draggable: false,
            element: document.getElementById('map-down-icon'),
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
  ]);

  return (
    <>
      <div id='map-container' style={{ height }} />

      <div style={{ visibility: 'hidden' }}>
        <BsFillArrowUpCircleFill id='map-up-icon' size={23} color='green' />

        <BsFillArrowDownCircleFill id='map-down-icon' size={23} color='red' />
      </div>
    </>
  );
};

export default MapContainer;
