import React, { useState } from 'react';
import {
  IconButton,
  makeStyles,
  Button,
  Checkbox,
  TextField,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Alert, Autocomplete } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Room from '../../Models/Hotel';
import MyTextField from '../../Common/MyTextField';
import RoomView from '../../Models/RoomView';
import FacilitiesTable from './FacilitiesTable';
import BaseDialog from '../../Common/BaseDialog';

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
  name: Yup.string().required('Required'),
  number: Yup.number()
    .max(10000, 'Must be 10000 or less')
    .min(1, 'Must be 1 or more')
    .required('Required'),
  floor: Yup.number()
    .max(500, 'Must be 500 or less')
    .min(1, 'Must be 1 or more')
    .required('Required'),
  price: Yup.number().min(1, 'Must be 1 or more').required('Required'),
  capacity: Yup.number()
    .max(50, 'Must be 50 or less')
    .min(1, 'Must be 1 or more')
    .required('Required'),
  description: Yup.string()
    .max(500, 'Must be 500 characters or less')
    .required('Required'),
  area: Yup.number().min(1, 'Must be 1 m2 or bigger').required('Required'),
  smoking: Yup.bool(),
  parking: Yup.bool(),
});

const RoomForm = ({
  open,
  close,
  roomViews,
  room,
  submitHandler,
  title,
  submitText,
  error,
  resetError,
}) => {
  const [facilities, setFacilities] = useState(
    room?.facilities ? room.facilities : []
  );
  const [facility, setFacility] = useState(null);
  const [selectedViews, setSelectedViews] = useState(
    room?.views ? room.views : []
  );
  const classes = useStyles();

  // const requestViewsAsync = async () => {
  //   const response = await API.getRoomViews();

  //   if (response) {
  //     const respondedRoomViews = response.map((view) => new RoomView(view));
  //     // eslint-disable-next-line no-debugger
  //     debugger;
  //     setViews(respondedRoomViews);
  //   }
  // };

  const handleFacilityAdd = () => {
    const checkArray = facilities.filter(
      (f) => f.name.toUpperCase() === facility.name.toUpperCase()
    );
    // eslint-disable-next-line no-debugger
    debugger;
    if (
      (checkArray.length === 0 && facilities.length > 0) ||
      facilities.length === 0
    ) {
      facilities.push(facility);
      setFacilities(facilities);
    }
    setFacility(null);
  };

  const handleFacilityDelete = (delFacility) => {
    const newFacilities = facilities.filter((f) => f.name !== delFacility.name);
    setFacilities(newFacilities);
  };

  // useEffect(async () => {
  //   await requestViewsAsync();
  // }, []);

  return (
    <BaseDialog
      open={open}
      close={close}
      title={title}
      contentComponent={
        <>
          <Formik
            initialValues={{
              name: room?.name ? room.name : '',
              number: room != null ? room.roomNumber : '',
              floor: room != null ? room.floorNumber : '',
              price: room != null ? room.price : '',
              capacity: room != null ? room.capacity : '',
              description: room?.description ? room.description : '',
              area: room?.area ? room.area : 0,
              smoking: room?.smoking ? room.smoking : false,
              parking: room?.parking ? room.parking : false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // eslint-disable-next-line no-param-reassign
              values.facilities = facilities.map((f) => f.name);
              // eslint-disable-next-line no-param-reassign
              values.views = selectedViews.map((view) => view.id);
              submitHandler(values);
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete="on">
                <MyTextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  type="text"
                />
                <MyTextField
                  required
                  fullWidth
                  label="Number"
                  name="number"
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: 1,
                      min: 1,
                      max: 10000,
                    },
                  }}
                />
                <MyTextField
                  required
                  fullWidth
                  label="Floor number"
                  name="floor"
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: 1,
                      min: 1,
                      max: 500,
                    },
                  }}
                />
                <MyTextField
                  required
                  fullWidth
                  label="Price per night"
                  name="price"
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: 0.01,
                      min: 0,
                    },
                  }}
                  prefix="$"
                />
                <MyTextField
                  required
                  fullWidth
                  label="Beds"
                  name="capacity"
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: 1,
                      min: 1,
                    },
                  }}
                />
                <MyTextField
                  required
                  fullWidth
                  label="Area"
                  name="area"
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: 0.1,
                      min: 1.0,
                    },
                  }}
                />
                <MyTextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Provide some room brief description"
                />

                <Field name="smoking">
                  {({ field }) => (
                    <FormControl
                      required
                      fullWidth
                      error={
                        errors.smoking && touched.smoking
                          ? `${errors.smoking}`
                          : ''
                      }
                      component="fieldset"
                    >
                      {/* <FormLabel component="legend">Allow smoking</FormLabel> */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            color="primary"
                          />
                        }
                        label="Allow smoking"
                      />
                    </FormControl>
                  )}
                </Field>

                <Field name="parking">
                  {({ field }) => (
                    <FormControl
                      required
                      fullWidth
                      error={
                        errors.parking && touched.parking
                          ? `${errors.parking}`
                          : ''
                      }
                      component="fieldset"
                    >
                      {/* <FormLabel component="legend">Allow smoking</FormLabel> */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            color="primary"
                          />
                        }
                        label="Parking provided"
                      />
                    </FormControl>
                  )}
                </Field>

                <FacilitiesTable
                  facilities={facilities}
                  deleteFacility={handleFacilityDelete}
                />

                <TextField
                  size="small"
                  value={facility?.name ? facility.name : ''}
                  onChange={(event) => {
                    console.log(event);
                    setFacility({ name: event.target.value });
                  }}
                />

                <Button
                  startIcon={<AddOutlinedIcon />}
                  disabled={!facility}
                  onClick={() => {
                    handleFacilityAdd();
                  }}
                >
                  Add facility
                </Button>

                <Autocomplete
                  multiple
                  limitTags={3}
                  value={selectedViews}
                  size="small"
                  options={roomViews}
                  getOptionLabel={(view) => `${view.name}`}
                  onChange={(event, newValues) => {
                    setSelectedViews(newValues);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      autoComplete={false}
                      helperText={null}
                      variant="outlined"
                    />
                  )}
                />

                <Button
                  fullWidth
                  className={classes.submit}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  {submitText}
                </Button>
              </Form>
            )}
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
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          ) : null}
        </>
      }
    />
  );
};

RoomForm.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  roomViews: PropTypes.arrayOf(RoomView),
  room: PropTypes.instanceOf(Room).isRequired,
  submitHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
};

RoomForm.defaultProps = {
  submitText: 'Submit',
  error: null,
  roomViews: [],
};

export default RoomForm;
