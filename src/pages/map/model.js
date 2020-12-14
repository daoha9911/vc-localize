export const namespace = 'mapsource';

const initialState = {
  topRight: null,
  bottomLeft: null,
  center: null,
  zoom: null,
  currentProvince: null,
  currentDis: null,
  currentSubDis: null,
  map: null,
  colorType: 'price',
  colorRanges: {
    province: null,
    district: null,
  },
  loading: {
    point: false,
    data: false,
  },
  previousCoordinates: {},
  mapRouter: {},
};

const MapModel = {
  namespace,
  state: { ...initialState },
  reducers: {
    reload(state, { payload }) {
      return {
        ...initialState,
      };
    },
    changeRecordType(state, { payload }) {
      return {
        ...state,
        currentDis: null,
        currentSubDis: null,
      }
    },
    changeMap(state, { payload }) {
      const colorRanges = {};
      if (payload.currentProvince === null) {
        colorRanges.province = null;
      }
      if (payload.currentDis === null) {
        colorRanges.district = null;
      }
      return {
        ...state,
        ...payload,
        colorRanges: {
          ...state?.colorRanges,
          ...colorRanges,
        },
      };
    },
    updateColorRanges(state, { payload }) {
      const { type, stops } = payload;
      if (!type) {
        return state;
      }
      return {
        ...state,
        colorRanges: {
          ...state?.colorRanges,
          [type]: stops,
        },
      };
    },
    changeColorType(state, { payload }) {
      const { type } = payload;
      if (!type) {
        return state;
      }
      return {
        ...state,
        colorType: type,
      };
    },
    setPointLoading(state, { payload }) {
      return {
        ...state,
        loading: {
          ...state.loading,
          point: payload.isLoading,
        },
      };
    },
    setDataLoading(state, { payload }) {
      return {
        ...state,
        loading: {
          ...state.loading,
          data: payload.isLoading,
        },
      };
    },
    setMapRouter(state, { payload }) {
      return {
        ...state,
        mapRouter: payload,
      };
    },
  },
  subscriptions: {
    listenFetchData({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname !== '/map') {
          dispatch({
            type: 'reload',
          });
        }
      });
    },
  },
};

export const setMapRouterInstance = (dispatch, payload) => {
  dispatch({
    type: `${namespace}/setMapRouter`,
    payload,
  });
};

export const changeMapInstance = (dispatch, map) => {
  dispatch({
    type: `${namespace}/changeMap`,
    payload: {
      map,
    },
  });
};

export const updateProvinceColors = (dispatch, stops) => {
  dispatch({
    type: `${namespace}/updateColorRanges`,
    payload: {
      type: 'province',
      stops,
    },
  });
};

export const updateDistrictColors = (dispatch, stops) => {
  dispatch({
    type: `${namespace}/updateColorRanges`,
    payload: {
      type: 'district',
      stops,
    },
  });
};

export const changeBoundCorner = (dispatch, { topRight, bottomLeft, zoom, center }) => {
  dispatch({
    type: `${namespace}/changeMap`,
    payload: {
      topRight,
      bottomLeft,
      zoom,
      center
    },
  });
};

export const changeTerritory = (dispatch, { province, dis, subDis }) => {
  dispatch({
    type: `${namespace}/changeMap`,
    payload: {
      currentProvince: province,
      currentDis: dis,
      currentSubDis: subDis,
    },
  });
};

export const changeCurrentProvince = (dispatch, { province }) => {
  dispatch({
    type: `${namespace}/changeMap`,
    payload: {
      currentProvince: province,
    },
  });
};

export const changeCurrentDis = (dispatch, { dis }) => {
  dispatch({
    type: `${namespace}/changeMap`,
    payload: {
      currentDis: dis,
    },
  });
};

export const changeCurrentSubDis = (dispatch, { subDis }) => {
  dispatch({
    type: `${namespace}/changeMap`,
    payload: {
      currentDis: subDis,
    },
  });
};

export const switchPopColorType = (dispatch) => {
  dispatch({
    type: `${namespace}/changeColorType`,
    payload: {
      type: 'popular',
    },
  });
};

export const switchPriceColorType = (dispatch) => {
  dispatch({
    type: `${namespace}/changeColorType`,
    payload: {
      type: 'price',
    },
  });
};

export const changePreviousCoordinates = (dispatch, { center, zoom }) => {
  dispatch({
    type: `${namespace}/changeMap`,
    payload: {
      previousCoordinates: {
        center,
        zoom,
      },
    },
  });
};

export default MapModel;
