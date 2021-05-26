import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   image: {
//     flex,
//   },
// }));

const Gallery = ({ imageUrls }) => {
  return (
    <Grid container spacing={0}>
      {imageUrls.map((imageUrl, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid item xs={2} key={index}>
          <img width="auto" height="300px" src={imageUrl} alt="hotel" />
        </Grid>
      ))}
    </Grid>
  );
};

Gallery.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Gallery;
