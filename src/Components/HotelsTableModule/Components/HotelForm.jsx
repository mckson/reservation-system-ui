import React, { useState } from 'react';
import { CloseOutlined } from '@material-ui/icons';
import {
  IconButton,
  Dialog,
  DialogTitle,
  Typography,
  makeStyles,
  DialogContent,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FileBase64 from 'react-file-base64';
import Hotel from '../../../Models/Hotel';
import MyTextField from '../../../Common/MyTextField';

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
    .max(1000, 'Must be 1000 characters or less')
    .min(10, 'Must be 10 characters or more')
    .required('Required'),
});

const EditHotelComponent = ({ open, close, hotel, submitHandler, title }) => {
  const classes = useStyles();

  const [mainImage, setMainImage] = useState(null);

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <div className={classes.titleSection}>
            <Typography className={classes.title} variant="h6">
              {title}
            </Typography>
            <IconButton className={classes.closeButton} onClick={close}>
              <CloseOutlined />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: hotel != null ? hotel.name : '',
              floors: hotel != null ? hotel.numberFloors : '',
              deposit: hotel != null ? hotel.deposit : '',
              description: hotel != null ? hotel.description : '',
              country: hotel != null ? hotel.location.country : '',
              region: hotel != null ? hotel.location.region : '',
              city: hotel != null ? hotel.location.city : '',
              street: hotel != null ? hotel.location.street : '',
              buildingNumber:
                hotel != null ? hotel.location.buildingNumber : '',
              mainImage: hotel != null ? hotel.mainImage : null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // eslint-disable-next-line no-param-reassign
              values.mainImage = mainImage;
              submitHandler(values);
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
              <FileBase64
                multiple
                onDone={(result) => {
                  // eslint-disable-next-line no-debugger
                  debugger;
                  setMainImage(result[0].base64);
                }}
              />
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
              <Button
                fullWidth
                disabled={!mainImage}
                className={classes.submit}
                variant="contained"
                type="submit"
                color="primary"
              >
                Apply changes
              </Button>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

EditHotelComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  submitHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default EditHotelComponent;
