/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const SelectedImage = ({ url, onClick }) => {
  const styles = {
    width: '100%',
    height: 0,
    paddingBottom: '70%',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
  };
  return <div style={styles} onClick={onClick} />;
};

SelectedImage.propTypes = {
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SelectedImage;
