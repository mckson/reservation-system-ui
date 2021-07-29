import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TableRow, TableCell, makeStyles } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';

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
    const splited = image.split('/');
    const imageId = splited[splited.length - 1];

    const errorResponse = await deleteImage(imageId);

    if (errorResponse) {
      onError(errorResponse);
    } else {
      onSuccess('Image successfully deleted');
    }
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">
          <img className={classes.image} src={image} alt="Hotel" />
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
  image: PropTypes.instanceOf(PropTypes.string).isRequired,
  deleteImage: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ImageRow;
