import mapboxgl from 'mapbox-gl';

const addControl = map => {
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })
  );
}

export default addControl;
