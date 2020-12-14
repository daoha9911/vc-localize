import React, { useEffect } from 'react';
import { LightgalleryProvider, LightgalleryItem, useLightgallery } from 'react-lightgallery';
import styles from '../index.less';

// export const useLightGalleryImage = () => {
//     const { openGallery } = useLightgallery();
//     openGallery('group1');
// }

const LightGalleryImage = ({ visible = false, images }) => {
  const { openGallery } = useLightgallery();

  useEffect(() => {
    if (visible) {
      openGallery('group1');
    }
  }, [visible]);

  const PhotoItem = ({ image, thumb, group }) => (
    <LightgalleryItem group={group} src={image} thumb={thumb} />
  );

  return (
    <>
      <div>
        {visible ? (
          <div>
            {images.map((p) => (
              <PhotoItem key={p} image={p} group="group1" />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

const LightgalleryImageProvider = ({ setVisible, ...rest }) => {
  return (
    <LightgalleryProvider
      className={styles.customLightBoxGallery}
      onBeforeClose={() => {
        setVisible(false);
      }}
    >
      <LightGalleryImage {...rest} />
    </LightgalleryProvider>
  );
};

export default LightgalleryImageProvider;
