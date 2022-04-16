import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { PhotoCameraOutlined } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import ImageModelConverter from '../../../Common/ImageModelConverter';
import BaseDialog from '../../../Common/BaseDialog';

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

const AddImageComponent = ({
  open,
  close,
  onCreateImage,
  onError,
  error,
  processing,
  title,
}) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const uploadImage = async (event) => {
    try {
      const file = event.target.files[0];

      const imageModel = await ImageModelConverter.fileToImageModelAsync(file);

      setImage(imageModel);
    } catch (err) {
      onError(err);
    }
  };

  const handleResetError = () => {
    onError(null);
  };
  return (
    <BaseDialog
      open={open}
      title={title}
      close={() => {
        setImage(null);
        close();
      }}
    >
      <>
        {processing ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={{ image: '' }}
            onSubmit={() => {
              onCreateImage(image);
              setImage(null);
            }}
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
                <Typography>{image?.name || 'Upload main picture'}</Typography>
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
      </>
    </BaseDialog>
  );
};

AddImageComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onCreateImage: PropTypes.func.isRequired,
  error: PropTypes.string,
  onError: PropTypes.func.isRequired,
  title: PropTypes.string,
};

AddImageComponent.defaultProps = {
  error: null,
  title: 'Add Image',
};

export default AddImageComponent;
