import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridListTile, makeStyles, Button } from '@material-ui/core';
import HotelImage from '../Models/HotelImage';
import BaseDialog from '../Common/BaseDialog';

const useStyles = makeStyles((/* theme */) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  viewAll: {
    width: '100%',
    height: '100%',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexGrow: 1,
  },
  closeButton: {
    width: 'auto',
  },
  content: {
    padding: 0,
  },
}));

const Gallery = ({ images }) => {
  const classes = useStyles();
  const [viewAll, setViewAll] = useState(false);
  const [viewImage, setViewImage] = useState(false);

  const cols = 4;
  const rows = 2;
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={cols} rows={rows}>
        {images.slice(0, cols * rows - 1).map((image) => (
          <GridListTile key={image} onClick={() => setViewImage(image)}>
            <img src={image} alt={image} />
          </GridListTile>
        ))}
        {images.length > 7 ? (
          <GridListTile>
            <Button
              className={classes.viewAll}
              onClick={() => setViewAll(true)}
            >
              View all
            </Button>
          </GridListTile>
        ) : null}
      </GridList>
      <BaseDialog open={viewAll} close={() => setViewAll(false)} title="Album">
        <GridList cellHeight={160} cols={cols} rows={rows}>
          {images.map((image /* , index */) => (
            <GridListTile key={image} onClick={() => setViewImage(image)}>
              <img src={image} alt={image.name} />
            </GridListTile>
          ))}
        </GridList>
      </BaseDialog>
      <BaseDialog
        open={viewImage}
        title="Image"
        close={() => setViewImage(null)}
        width="lg"
        notFullWidth
      >
        <img src={viewImage} alt={viewImage?.name} />
      </BaseDialog>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(HotelImage).isRequired,
};

export default Gallery;
