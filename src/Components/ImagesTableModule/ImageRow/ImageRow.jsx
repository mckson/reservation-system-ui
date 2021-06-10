import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TableRow, TableCell, makeStyles } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import Image from '../../../Models/Image';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
    color: theme.palette.primary.main,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const ImageRow = ({ image, deleteImage }) => {
  const classes = useStyles();

  const onDeleteImage = async () => {
    const errorResponse = await deleteImage(image);
    console.log(errorResponse);
  };
  return (
    <>
      <TableRow>
        <TableCell>{image.id}</TableCell>
        <TableCell>
          <img src={`data:image/jpeg;base64,${image.image}`} alt="Hotel" />
        </TableCell>
        <TableCell className={classes.actions}>
          <IconButton
            className={classes.button}
            onClick={async () => onDeleteImage()}
          >
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
};

export default ImageRow;
