/* eslint-disable func-names */
/* eslint-disable no-param-reassign  */
/* eslint-disable prefer-destructuring  */
/* eslint-disable no-plusplus  */
/* eslint-disable consistent-return  */

export default function (polygon) {
  if (!polygon) {
    return;
  }
  if ('geometry' in polygon) polygon = polygon.geometry;
  if (!Array.isArray(polygon)) polygon = polygon.coordinates[0];

  let minx = 1000;
  let miny = 1000;
  let maxx = -1000;
  let maxy = -1000;
  for (let i = 0; i < polygon.length; i++) {
    const point = polygon[i];
    const x = point[0];
    const y = point[1];

    if (x < minx) minx = x;
    else if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    else if (y > maxy) maxy = y;
  }

  return {
    type: 'Point',
    coordinates: [minx + (maxx - minx) / 2, miny + (maxy - miny) / 2],
  };
}
