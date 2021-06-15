import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TableRow, TableCell, makeStyles } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import Image from '../../../Models/HotelImage';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    color: theme.palette.primary.main,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 150,
  },
}));

const ImageRow = ({ image, deleteImage, onSuccess, onError }) => {
  const classes = useStyles();

  const onDeleteImage = async () => {
    const errorResponse = await deleteImage(image);

    if (errorResponse) {
      onError(errorResponse);
    } else {
      onSuccess('Image successfully deleted');
    }
  };
  return (
    <>
      <TableRow>
        <TableCell>{image.id}</TableCell>
        <TableCell align="center">
          <img
            className={classes.image}
            src={`data:image/jpeg;base64,${image.image}`}
            alt="Hotel"
          />
        </TableCell>
        <TableCell className={classes.actions}>
          <IconButton className={classes.button} onClick={onDeleteImage}>
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

ImageRow.propTypes = {
  image: PropTypes.instanceOf(Image).isRequired,
  deleteImage: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ImageRow;
