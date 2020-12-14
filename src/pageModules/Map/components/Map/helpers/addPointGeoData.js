/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import React from 'react';
import ReactDOM from 'react-dom';
import EstateMapBuilding from '@/components/EstateMapBuilding';
// import { DATA_API_URL } from '@/constants';
import mapboxgl from 'mapbox-gl';
import { getAllEstatesFromId, getAllEstatesHouseFromId } from '../../../services/getFilterEstates';
import { getAllGeoPoints } from '../../../services/getAllGeoPoints';
import { popUpHover as popUpHoverWard } from './mouseLayerEvents/ward';

const addPointGeoData = async (
  map,
  filters,
  setFilterRef,
  handleCloseMobileMap,
  { onLoading, onLoadDone } = {},
) => {
  const popUpHover = new mapboxgl.Popup({
    closeButton: false,
  });

  const popUpClick = new mapboxgl.Popup({
    closeButton: false,
  });

  let estateBuildingData = null;
  let estateHouseData = null;

  onLoading();

  map?.scrollZoom.disable();

  const result = await getAllGeoPoints(
    filters?.where?.recordType ? filters?.where?.recordType : 'apartment',
  );

  map.addSource('estates', {
    type: 'geojson',
    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
    // from 12/22/15 to 1/21/16s as logged by USGS' Earthquake hazards program.
    data: result?.data,
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  });

  if (result) {
    map?.scrollZoom.enable();
    onLoadDone();
  }

  // map.on('sourcedataloading', e => {
  //   console.log(e.isSourceLoaded, 'here')
  //   if (!e.isSourceLoaded) {
  //     onLoading();
  //   }
  // })

  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'estates',
    filter: ['has', 'point_count'],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#51bbd6', 750, '#51bbd6'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    },
  });

  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'estates',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  });

  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'estates',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': '#00AEAC',
      'circle-radius': 6,
      'circle-stroke-width': 3,
      'circle-stroke-color': '#fff',
    },
  });

  map.addLayer({
    id: 'unclustered-point-hightlight',
    type: 'circle',
    source: 'estates',
    paint: {
      'circle-color': '#00AEAC',
      'circle-radius': 5,
      'circle-stroke-width': 8,
      'circle-stroke-color': '#00AEAC',
      'circle-stroke-opacity': 0.3,
    },
    filter: ['==', '_id', ''],
  });

  map.addLayer({
    id: 'unclustered-point-hover-hightlight',
    type: 'circle',
    source: 'estates',
    paint: {
      'circle-color': '#00AEAC',
      'circle-radius': 5,
      'circle-stroke-width': 8,
      'circle-stroke-color': '#00AEAC',
      'circle-stroke-opacity': 0.3,
    },
    filter: ['==', '_id', ''],
  });

  map.on('click', 'unclustered-point', async function (e) {
    popUpHoverWard.remove();
    const id = e.features[0].properties?._id;
    map.setFilter('unclustered-point-hightlight', ['==', '_id', id]);
    popUpHover.remove();
    if (filters?.where?.recordType === 'house') {
      if(setFilterRef?.current){
        setFilterRef?.current({
          houseId: id,
        });
      }
      if (estateHouseData && Array.isArray(estateHouseData)) {
        const placeholder = document.createElement('div');
        ReactDOM.render(
          <EstateMapBuilding
            handleCloseMobileMap={handleCloseMobileMap}
            popUpClick={popUpClick}
            setFilterRef={setFilterRef}
            data={estateHouseData}
            type="house"
          />,
          placeholder,
        );
        popUpClick
          .setLngLat([e?.lngLat?.lng, e?.lngLat?.lat])
          .setDOMContent(placeholder)
          .addTo(map);
      } else {
        const estatesHouse = await getAllEstatesHouseFromId({ id, pageSize: 100 });
        if (estatesHouse?.data && Array.isArray(estatesHouse?.data?.data)) {
          const placeholder = document.createElement('div');
          ReactDOM.render(
            <EstateMapBuilding
              handleCloseMobileMap={handleCloseMobileMap}
              popUpClick={popUpClick}
              setFilterRef={setFilterRef}
              data={estatesHouse?.data?.data}
              type="house"
            />,
            placeholder,
          );
          popUpClick
            .setLngLat([e?.lngLat?.lng, e?.lngLat?.lat])
            .setDOMContent(placeholder)
            .addTo(map);
        }
      }
    }
    if (filters?.where?.recordType === 'apartment' || !filters?.where?.recordType) {
      if(setFilterRef?.current){
        setFilterRef?.current({ buildingId: id });
      }
      try {
        if (estateBuildingData && Array.isArray(estateBuildingData)) {
          const placeholder = document.createElement('div');
          ReactDOM.render(
            <EstateMapBuilding
              handleCloseMobileMap={handleCloseMobileMap}
              popUpClick={popUpClick}
              setFilterRef={setFilterRef}
              data={estateBuildingData}
              type="apartment"
            />,
            placeholder,
          );
          popUpClick
            .setLngLat([e?.lngLat?.lng, e?.lngLat?.lat])
            .setDOMContent(placeholder)
            .addTo(map);
        } else {
          const estates = await getAllEstatesFromId({ id, pageSize: 100 });
          if (estates?.data?.data && Array.isArray(estates?.data?.data)) {
            const placeholder = document.createElement('div');
            ReactDOM.render(
              <EstateMapBuilding
                handleCloseMobileMap={handleCloseMobileMap}
                popUpClick={popUpClick}
                setFilterRef={setFilterRef}
                data={estates?.data?.data}
                type="apartment"
              />,
              placeholder,
            );
            popUpClick
              .setLngLat([e?.lngLat?.lng, e?.lngLat?.lat])
              .setDOMContent(placeholder)
              .addTo(map);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  map.on('mousemove', 'unclustered-point', () => {
    popUpHoverWard.remove();
  });

  map.on('mouseenter', 'unclustered-point', async (e) => {
    popUpHoverWard.remove();
    const id = e.features[0].properties?._id;
    map.setFilter('unclustered-point-hover-hightlight', ['==', '_id', id]);
    if (filters?.where?.recordType === 'house') {
      try {
        const estatesHouse = await getAllEstatesHouseFromId({ id, pageSize: 100 });
        if (estatesHouse?.data && Array.isArray(estatesHouse?.data?.data)) {
          estateHouseData = estatesHouse?.data?.data;
          popUpHover
            .setLngLat([e?.lngLat?.lng, e?.lngLat?.lat])
            .setHTML(
              `<h2 class="Muna_customPopUpHover" style="padding: 10px">Có ${estatesHouse?.data?.data?.length} nhà ở đây</h2>`,
            )
            .addTo(map);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (filters?.where?.recordType === 'apartment' || !filters?.where?.recordType) {
      try {
        const estates = await getAllEstatesFromId({ id, pageSize: 100 });
        if (estates?.data?.data && Array.isArray(estates?.data?.data)) {
          estateBuildingData = estates?.data?.data;
          popUpHover
            .setLngLat([e?.lngLat?.lng, e?.lngLat?.lat])
            .setHTML(
              `<h2 class="Muna_customPopUpHover" style="padding: 10px">Có ${estates?.data?.data?.length} bất động sản ở đây</h2>`,
            )
            .addTo(map);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  map.on('mouseleave', 'unclustered-point', () => {
    map.setFilter('unclustered-point-hover-hightlight', ['==', '_id', '']);
    popUpHover.remove();
  });

  // inspect a cluster on click
  map.on('click', 'clusters', function (e) {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters'],
    });
    const clusterId = features[0].properties.cluster_id;
    map.getSource('estates').getClusterExpansionZoom(clusterId, function (err, zoom) {
      if (err) return;

      map.easeTo({
        center: features[0].geometry.coordinates,
        zoom,
      });
    });
  });

  // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.
  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = '';
  });
  map.on('mouseenter', 'unclustered-point', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mousemove', 'unclustered-point', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'unclustered-point', () => {
    map.getCanvas().style.cursor = '';
  });
};

export default addPointGeoData;
