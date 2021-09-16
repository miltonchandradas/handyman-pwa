import React from 'react';
import PropTypes from 'prop-types';

import './imagePreview.css';

export const ImagePreview = ({ dataUri }) => {

  return (
    <div className={'demo-image-preview'}>
      <img src={dataUri} alt=""/>
    </div>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool
};

export default ImagePreview;