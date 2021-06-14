import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridListTile, makeStyles } from '@material-ui/core';
import HotelImage from '../Models/HotelImage';

const useStyles = makeStyles((/* theme */) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
}));

// function getColWidth(index) {
//   return index % 2 === 0 ? 1 : 2;
// }

// function getRowHeight(index) {
//   return index % 5 === 2 ? 2 : 1;
// }

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

const Gallery = ({ images }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={4} rows={2}>
        {images.map((image /* , index */) => (
          <GridListTile
            key={image.id}
            // cols={getColWidth(index)}
            // rows={getRowHeight(index)}
          >
            <img src={`data:image/jpeg;base64,${image.image}`} alt="hotel" />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(HotelImage).isRequired,
};

export default Gallery;
