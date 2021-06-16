import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  makeStyles,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import HotelImage from '../Models/HotelImage';

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
  const [viewAll, setViewAll] = useState(false);
  const [viewImage, setViewImage] = useState(null);

  const cols = 4;
  const rows = 2;
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={cols} rows={rows}>
        {images.slice(0, cols * rows - 1).map((image /* , index */) => (
          <GridListTile
            key={image.id}
            onClick={() => setViewImage(image)}
            // cols={getColWidth(index)}
            // rows={getRowHeight(index)}
          >
            <img src={`data:image/jpeg;base64,${image.image}`} alt="hotel" />
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
      <Dialog open={viewAll}>
        <DialogTitle>
          <div className={classes.titleSection}>
            <Typography className={classes.title} variant="h6">
              Album
            </Typography>
            <IconButton
              className={classes.closeButton}
              onClick={() => setViewAll(false)}
            >
              <CloseOutlined />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <GridList cellHeight={160} cols={cols} rows={rows}>
            {images.map((image /* , index */) => (
              <GridListTile key={image.id} onClick={() => setViewImage(image)}>
                <img
                  src={`data:image/jpeg;base64,${image.image}`}
                  alt="hotel"
                />
              </GridListTile>
            ))}
          </GridList>
        </DialogContent>
      </Dialog>
      <Dialog open={viewImage} fullWidth maxWidth="lg">
        <DialogTitle>
          <div className={classes.titleSection}>
            <Typography className={classes.title} variant="h6">
              Image
            </Typography>
            <IconButton
              className={classes.closeButton}
              onClick={() => setViewImage(null)}
            >
              <CloseOutlined />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <img src={`data:image/jpeg;base64,${viewImage?.image}`} alt="hotel" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(HotelImage).isRequired,
};

export default Gallery;
