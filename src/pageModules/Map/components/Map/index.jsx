import React, { useRef, useEffect } from 'react';
import { useMount } from '@umijs/hooks';
import useMap from './hooks';
import styles from './index.less';

const INIT_CENTER = [105.804817, 21.028511];
const INIT_ZOOM = 7;

const Map = ({ getMap }) => {
  const containerRef = useRef(null);
  const { map, generateMap } = useMap(INIT_CENTER, INIT_ZOOM);
  useEffect(() => {
    getMap(map);
  }, [map]);
  useMount(() => {
    generateMap(containerRef.current);
  });
  return <div ref={containerRef} className={styles.container} />;
};

export default Map;
