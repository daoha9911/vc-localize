import addMouseLayerEventProvince from './province';
import addMouseLayerEventSubDis from './ward';
import addMouseLayerEventDis from './district';

const addMouseLayerEvent = (map, { changeLocation }) => {
  addMouseLayerEventProvince(map, changeLocation);
  addMouseLayerEventSubDis(map, changeLocation);
  addMouseLayerEventDis(map, changeLocation);
};

export default addMouseLayerEvent;
