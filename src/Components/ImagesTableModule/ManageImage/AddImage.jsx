import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  makeStyles,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  Button,
  CircularProgress,
  // TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { CloseOutlined, PhotoCameraOutlined } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import Hotel from '../../../Models/Hotel';
import ImageModelConverter from '../../../Common/ImageModelConverter';

const useStyles = makeStyles(() => ({
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

const AddImage = ({ open, close, hotel, createImage, onSuccess }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  // const outputImage = (fileImage) => {
  //   const reader = new FileReader();

  //   return reader.readAsDataURL(fileImage);
  // };

  const uploadImage = async (event) => {
    try {
      const file = event.target.files[0];

      const imageModel = await ImageModelConverter.fileToImageModelAsync(file);

      setImage(imageModel);
    } catch (err) {
      setError(err);
    }
  };

  const onCreateImageAsync = async (imageData) => {
    const createdImage = {
      image: imageData.image,
      name: imageData.name,
      type: imageData.type,
      hotelId: hotel.id,
    };

    setProcessing(true);
    const errorResponse = await createImage(createdImage);
    setProcessing(false);

    if (errorResponse != null) {
      setError(errorResponse);
    } else {
      setImage(null);
      onSuccess('Image successfully added');
      close();
    }
  };

  const handleResetError = () => {
    setError(null);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <div className={classes.titleSection}>
            <Typography className={classes.title} variant="h6">
              Add Image
            </Typography>
            <IconButton
              className={classes.closeButton}
              onClick={() => {
                setImage(null);
                close();
              }}
            >
              <CloseOutlined />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {processing ? (
            <CircularProgress />
          ) : (
            <Formik
              initialValues={{ image: '' }}
              onSubmit={() => onCreateImageAsync(image)}
            >
              <Form>
                <label
                  htmlFor="icon-button-file"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography>
                    {image?.name || 'Upload main picture'}
                  </Typography>
                  {image ? (
                    <img
                      height={100}
                      className={classes.image}
                      src={image.image}
                      alt="Hotel"
                    />
                  ) : null}
                  <input
                    accept="image/*"
                    dra
                    style={{ display: 'none' }}
                    onChange={(e) => uploadImage(e)}
                    id="icon-button-file"
                    type="file"
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCameraOutlined />
                  </IconButton>
                </label>
                <Button
                  fullWidth
                  disabled={!image}
                  className={classes.submit}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Add Image
                </Button>
              </Form>
            </Formik>
          )}
        </DialogContent>
        {error != null ? (
          <Alert
            fullWidth
            variant="outlined"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleResetError();
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        ) : null}
      </Dialog>
    </div>
  );
};

AddImage.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  createImage: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AddImage;
