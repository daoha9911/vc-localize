const gatherPoints = (pointWrap) =>
  pointWrap.flatMap((pWChild) => {
    if (Array.isArray(pWChild[0])) {
      return gatherPoints(pWChild);
    }
    return [pWChild];
  });

const getPolygonBound = (polygon) => {
  const allPoints = gatherPoints(polygon?.geometry?.coordinates || []);
  console.log('all points', allPoints);
  if (!Array.isArray(allPoints)) { return [];
  }
  const maxLng = allPoints.reduce((currentMaxLng, coor) => {
    return coor[0] > currentMaxLng ? coor[0] : currentMaxLng;
  }, -1000);

  const maxLat = allPoints.reduce((currentMaxLat, coor) => {
    return coor[1] > currentMaxLat ? coor[1] : currentMaxLat;
  }, -1000);

  const minLng = allPoints.reduce((currentMinLng, coor) => {
    return coor[0] < currentMinLng ? coor[0] : currentMinLng;
  }, 1000);

  const minLat = allPoints.reduce((currentMinLat, coor) => {
    return coor[1] < currentMinLat ? coor[1] : currentMinLat;
  }, 1000);
  // console.log('getPolygonBound', { minLng, minLat, maxLng, maxLat }, polygon.geometry.coordinates)
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
};

export default getPolygonBound;
