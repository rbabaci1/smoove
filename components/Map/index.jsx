import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { RiMapPin5Fill } from 'react-icons/ri';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

const MapContainer = () => {
  const [map, setMap] = useState(null);
  const { pickup, dropOff } = useSelector(state => state.order.addresses);

  const [pickupLongitude, pickupLatitude] = pickup.center;
  const [dropOffLongitude, dropOffLatitude] = dropOff.center;

  useEffect(() => {
    if (!pickup || !dropOff) return;

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.4194, 37.7749],
      zoom: 12,
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
            element: document.getElementById('up'),
          });
          // drop off marker
          const dropOffMarker = new mapboxgl.Marker({
            draggable: false,
            element: document.getElementById('down'),
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
            padding: 50,
            maxZoom: 12,
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
      <div id='map-container' />

      <div style={{ visibility: 'hidden' }}>
        <RiMapPin5Fill id='up' size={25} color='green' />

        <RiMapPin5Fill id='down' size={25} color='red' />
      </div>
    </>
  );
};

export default MapContainer;
