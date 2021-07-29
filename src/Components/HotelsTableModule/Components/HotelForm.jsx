import React, { useState /* , useEffect */ } from 'react';
import {
  CloseOutlined,
  DeleteOutlined,
  PhotoCameraOutlined,
} from '@material-ui/icons';
import { IconButton, Typography, makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { Alert } from '@material-ui/lab';
import * as Yup from 'yup';
import Hotel from '../../../Models/Hotel';
import MyTextField from '../../../Common/MyTextField';
import ImageModelConverter from '../../../Common/ImageModelConverter';
import BaseDialog from '../../../Common/BaseDialog';
import WarningDialog from '../../../Common/WarningDialog';

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
  image: {
    height: 100,
  },
}));

const validationSchema = Yup.object({
  name: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .min(2, 'Must be 2 charaters or more')
    .required('Required'),
  country: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .min(2, 'Must be 2 charaters or more')
    .required('Required'),
  region: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .min(2, 'Must be 2 charaters or more')
    .required('Required'),
  city: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .min(2, 'Must be 2 charaters or more')
    .required('Required'),
  street: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .min(2, 'Must be 2 charaters or more')
    .required('Required'),
  buildingNumber: Yup.number()
    .min(1, 'Must be 1 or bigger')
    .max(10000, 'Must be 10000 or less')
    .required('Required'),
  floors: Yup.number()
    .min(1, 'Must be 1 or more')
    .max(500, 'Must be 500 or less')
    .required('Required'),
  deposit: Yup.number().required('Required'),
  description: Yup.string()
    .max(10000, 'Must be 10000 characters or less')
    .min(10, 'Must be 10 characters or more')
    .required('Required'),
});

const HotelForm = ({
  open,
  close,
  hotel,
  submitHandler,
  title,
  error,
  resetError,
  onCancel,
  onAccept,
  acceptText,
  cancelText,
  warningContent,
  warningTitle,
  color,
}) => {
  const classes = useStyles();
  const [newMainImage, setNewMainImage] = useState(null);
  const [isDeleteMainImage, setIsDeleteMainImage] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

  const [mainImagePreview, setMainImagePreview] = useState(
    hotel?.mainImage ? hotel.mainImage : null
  );

  const uploadImage = async (event) => {
    const file = event.target.files[0];

    const imageModel = await ImageModelConverter.fileToImageModelAsync(file);

    setNewMainImage(imageModel);
    setMainImagePreview(imageModel.image);
    setIsDeleteMainImage(false);
  };

  const handleOpenWarning = () => {
    setOpenWarning(true);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  return (
    <div>
      <BaseDialog
        open={open}
        close={() => {
          setIsDeleteMainImage(false);
          setNewMainImage(null);
          close();
        }}
        title={title}
      >
        <Formik
          initialValues={{
            name: hotel ? hotel.name : '',
            floors: hotel ? hotel.numberFloors : '',
            deposit: hotel ? hotel.deposit : '',
            description: hotel ? hotel.description : '',
            country: hotel ? hotel.location?.country : '',
            region: hotel ? hotel.location?.region : '',
            city: hotel ? hotel.location?.city : '',
            street: hotel ? hotel.location?.street : '',
            buildingNumber: hotel ? hotel.location?.buildingNumber : '',
            newMainImage: null,
            isDeleteMainImage: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // eslint-disable-next-line no-param-reassign
            values.newMainImage = newMainImage;
            // eslint-disable-next-line no-param-reassign
            values.isDeleteMainImage = isDeleteMainImage;
            submitHandler(values);
            handleOpenWarning();
          }}
        >
          <Form autoComplete="on">
            <MyTextField
              required
              fullWidth
              label="Name"
              name="name"
              type="text"
              placeholder="Hotelname"
            />
            <MyTextField
              required
              fullWidth
              label="Number floors"
              name="floors"
              type="text"
              placeholder="4"
            />
            <MyTextField
              required
              fullWidth
              label="Deposit"
              name="deposit"
              type="text"
              placeholder="100"
            />
            <MyTextField
              required
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              type="text"
              placeholder="Some description"
            />
            <MyTextField
              required
              fullWidth
              label="Country"
              name="country"
              type="text"
              placeholder="Country"
            />
            <MyTextField
              required
              fullWidth
              label="Region"
              name="region"
              type="text"
              placeholder="Region"
            />
            <MyTextField
              required
              fullWidth
              label="City"
              name="city"
              type="text"
              placeholder="City"
            />
            <MyTextField
              required
              fullWidth
              label="Street"
              name="street"
              type="text"
              placeholder="Street"
            />
            <MyTextField
              required
              fullWidth
              label="Building number"
              name="buildingNumber"
              type="text"
              placeholder="14"
            />
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
                {mainImagePreview
                  ? 'Select new one to change'
                  : 'Upload main picture'}
              </Typography>
              {mainImagePreview ? (
                <img
                  className={classes.image}
                  src={mainImagePreview}
                  alt="Hotel"
                />
              ) : null}
              <input
                accept="image/*"
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
              <IconButton
                color="primary"
                disabled={!mainImagePreview}
                onClick={() => {
                  setNewMainImage(null);
                  setMainImagePreview(null);
                  setIsDeleteMainImage(true);
                }}
              >
                <DeleteOutlined />
              </IconButton>
            </label>
            <Button
              fullWidth
              className={classes.submit}
              variant="contained"
              type="submit"
              color="primary"
            >
              Apply changes
            </Button>
          </Form>
        </Formik>
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
                  resetError();
                }}
              >
                <CloseOutlined fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        ) : null}
        {openWarning ? (
          <WarningDialog
            title={warningTitle}
            open={openWarning}
            close={handleCloseWarning}
            onAccept={() => {
              setIsDeleteMainImage(false);
              setMainImagePreview(null);
              setNewMainImage(null);
              close();
              onAccept();
            }}
            onCancel={onCancel}
            cancelText={cancelText}
            acceptText={acceptText}
            color={color}
          >
            {warningContent || null}
          </WarningDialog>
        ) : null}
      </BaseDialog>
    </div>
  );
};

HotelForm.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel),
  submitHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  acceptText: PropTypes.string,
  cancelText: PropTypes.string,
  warningTitle: PropTypes.string,
  warningContent: PropTypes.func,
  color: PropTypes.string,
};

HotelForm.defaultProps = {
  error: null,
  hotel: null,
  onCancel: null,
  onAccept: null,
  acceptText: null,
  cancelText: null,
  warningContent: null,
  warningTitle: null,
  color: 'white',
};

export default HotelForm;
