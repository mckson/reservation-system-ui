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
  // TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { CloseOutlined, PhotoCameraOutlined } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import Hotel from '../../../Models/Hotel';

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

const AddImage = ({ open, close, hotel, createImage }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        console.log(file);
        setUploadedFile(file);
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    try {
      const base64 = await convertBase64(file);
      console.log(base64);
      setImage(base64);
    } catch (err) {
      setError(err);
    }
  };

  let errorResponse = null;
  const onCreateImageAsync = async (imageData) => {
    // eslint-disable-next-line no-debugger
    debugger;

    const createdImage = {
      image: imageData,
      hotelId: hotel.id,
    };

    // eslint-disable-next-line no-debugger
    debugger;

    errorResponse = await createImage(createdImage);

    // eslint-disable-next-line no-debugger
    debugger;
    if (errorResponse != null) {
      // eslint-disable-next-line no-debugger
      debugger;
      setError(errorResponse);
    } else {
      setImage(null);
      setUploadedFile(null);
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
                setUploadedFile(null);
                close();
              }}
            >
              <CloseOutlined />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
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
                  {uploadedFile?.name || 'Upload main picture'}
                </Typography>
                {image ? (
                  <img
                    height={100}
                    className={classes.image}
                    src={/* `data:image/jpeg;base64, */ `${image}`}
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
};

export default AddImage;
