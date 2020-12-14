/* eslint-disable */
import mapboxgl from 'mapbox-gl';
import getPolygonBound from '@/utils/getPolygonBound';

const marker = new mapboxgl.Marker();

const zoomFlyTo = (item, map) => {
  console.log('zoomFlyTo ', map.getZoom());
  if (map.getZoom() < 13.5) {
    map.flyTo({
      center: [item.lng, item.lat],
      zoom: 13.5, // zoom hien thi neu dang o muc xa
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  } else {
    map.flyTo({
      center: [item.lng, item.lat],
      zoom: map.getZoom(), // di chuyen toi location cung muc zoom
      essential: true,
      // this animation is considered essential with respect to prefers-reduced-motion
    });
  }
  marker.setLngLat([item.lng, item.lat]).addTo(map);
};
const locatePoint = (map, item, featureFocusOn) => {
  return new Promise((resolve, reject) => {
    if (map && item) {
      // map.flyTo({ center: [item.lng, item.lat], zoom: 14, essential: true });
      if (featureFocusOn === 'subDis') {
        map.flyTo(
          {
            center: [item.lng, item.lat],
            zoom: 11,
            essential: true,
            speed: 0.7, // this animation is considered essential with respect to prefers-reduced-motion
          },
          { disableDataLoadDone: true },
        );
        const interval = setInterval(() => {
          const point = map.project([parseFloat(item.lng), parseFloat(item.lat)]);
          const features = map.queryRenderedFeatures(point, {
            layers: ['subDis', 'district', 'province'],
          });
          if (features.length > 0) {
            clearInterval(interval);
            map.fitBounds(getPolygonBound(features[0]), { speed: 0.7 });
            // zoomFlyTo(item, map)
            resolve(features);
          }
        }, 1000);
        return;
      }

      if (featureFocusOn === 'dis') {
        map.flyTo(
          {
            center: [item.lng, item.lat],
            zoom: 10, // zoom hien thi neu dang o muc xa
            essential: true,
            speed: 0.7, // this animation is considered essential with respect to prefers-reduced-motion
          },
          { disableDataLoadDone: true },
        );
        const interval = setInterval(() => {
          const point = map.project([parseFloat(item.lng), parseFloat(item.lat)]);
          const features = map.queryRenderedFeatures(point, {
            layers: ['district', 'subDis', 'province'],
          });
          if (features.length > 0) {
            clearInterval(interval);
            map.fitBounds(getPolygonBound(features[0]), { speed: 0.7 });
          }
          resolve(features);
        }, 1000);
        return;
      }
      zoomFlyTo(item, map);
    }
    resolve([]);
  });
};

export default locatePoint;
