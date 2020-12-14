const getMapGeoInfo = map => {
  const mapBounds = map.getBounds();
  const ne = mapBounds.getNorthEast();
  const sw = mapBounds.getSouthWest();

  return {
    topRight: ne,
    bottomLeft: sw,
    zoom: map.getZoom(),
    center: map.getCenter(),
  }
}

export default getMapGeoInfo;
