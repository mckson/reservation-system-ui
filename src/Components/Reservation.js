import {
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hotel from '../Models/Hotel';
import RoomSelectionComponent from './ReservationModule/RoomSelection/RoomSelectionComponent';
import PersonalInfo from './ReservationModule/PersonalInfo/PersonalInfo';
import User from '../Models/User';
import ReservationRequest from '../Models/ReservationRequest';
import CompleteOrder from './ReservationModule/CompleteOrder/CompleteOrder';
import SmallHotelCard from './SmallHotelCard';
import DetailsComponent from './ReservationModule/Details/DetailsComponent';
import Room from '../Models/Room';
import RoomRequests from '../api/RoomRequests';
import ReservationRequests from '../api/ReservationRequests';
import BaseDialog from '../Common/BaseDialog';

const { unlockRoom, lockRoom } = RoomRequests;
const { createReservation } = ReservationRequests;

const getSteps = () => [
  'Select room and services',
  'Enter your details',
  'Final details',
];

const arrayDifference = (oldArray, newArray) => {
  const addedItems = newArray.filter((item) => !oldArray.includes(item));

  return addedItems;
};

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'center',
    padding: theme.spacing(0),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getStepContent = (
  stepIndex,
  hotel,
  rooms,
  loggedUser,
  onRoomChange,
  onServicesChange,
  onCustomerChange,
  onSubmitOrder
) => {
  switch (stepIndex) {
    case 0:
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">
              Select rooms and services you want to reserve
            </Typography>
            <SmallHotelCard hotel={hotel} />
          </Grid>
          <Grid item xs={12}>
            <RoomSelectionComponent
              hotel={hotel}
              rooms={rooms}
              onRoomChange={onRoomChange}
              onServicesChange={onServicesChange}
            />
          </Grid>
        </>
      );
    case 1:
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">
              Provide us with information about yourself
            </Typography>
            <SmallHotelCard hotel={hotel} />
          </Grid>
          <Grid item xs={12}>
            <PersonalInfo
              onSetCustomer={onCustomerChange}
              loggedUser={loggedUser}
            />
          </Grid>
        </>
      );
    case 2:
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">Finish your order</Typography>
            <SmallHotelCard hotel={hotel} />
          </Grid>
          <Grid item xs={12}>
            <CompleteOrder onSubmitOrder={onSubmitOrder} />
          </Grid>
        </>
      );
    default:
      return 'Oops, unknown step';
  }
};

const Reservation = ({
  loggedUser,
  rooms,
  open,
  close,
  hotel,
  dateIn,
  dateOut,
  onRequestRooms,
}) => {
  const [activeStep, setActiveStep] = useState({
    step: 0,
    isNextAvailable: false,
  });
  const steps = getSteps();
  const classes = useStyles();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);

  const onClose = () => {
    selectedRooms.forEach((room) => unlockRoom(room.id));
    onRequestRooms();
    close();
  };

  const handleReservationComplete = async () => {
    const reservation = new ReservationRequest({
      hotelId: hotel.id,
      rooms: selectedRooms.map((room) => room.id),
      services: selectedServices.map((service) => service.id),
      dateIn,
      dateOut,
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      email: customerInfo.email,
      passportNumber: customerInfo.passportNumber,
      phoneNumber: customerInfo.phoneNumber,
    });

    try {
      await createReservation(reservation);
    } catch (error) {
      console.log(error);
    }

    onClose();
    setActiveStep({ step: 0, isNextAvailable: false });
    setSelectedRooms([]);
    setSelectedServices([]);
    setCustomerInfo(null);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => ({
      step: prevActiveStep.step + 1,
      isNextAvailable: false,
    }));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => ({
      step: prevActiveStep.step - 1,
      isNextAvailable: true,
    }));
  };

  const handleRoomsChange = (changedRooms) => {
    const addedRoom = arrayDifference(selectedRooms, changedRooms);

    if (addedRoom[0]) {
      lockRoom(addedRoom[0].id);
    } else {
      const removedRoom = arrayDifference(changedRooms, selectedRooms);

      if (removedRoom[0]) {
        unlockRoom(removedRoom[0].id);
      }
    }

    setSelectedRooms(changedRooms);
    setActiveStep((previosActiveStep) => ({
      step: previosActiveStep.step,
      isNextAvailable: rooms && rooms.length !== 0,
    }));
  };

  const handleServicesChange = (event, services) => {
    setSelectedServices(services);
  };

  const handleCustomerChange = (customer) => {
    setCustomerInfo(customer);
    setActiveStep((previosActiveStep) => ({
      step: previosActiveStep.step,
      isNextAvailable: !!customer,
    }));
  };

  const handleSubmitOrderChange = (agree) => {
    setActiveStep((previosActiveStep) => ({
      step: previosActiveStep.step,
      isNextAvailable: agree,
    }));
  };

  return (
    <BaseDialog
      open={open}
      close={() => {
        onClose();
        setActiveStep({ step: 0, isNextAvailable: false });
        setSelectedRooms([]);
        setSelectedServices([]);
        setCustomerInfo(null);
      }}
      title="Propperty reservation"
      width="md"
    >
      {hotel != null ? (
        <Grid container className={classes.root} justify="center">
          <Grid item xs={12}>
            <Stepper activeStep={activeStep.step}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid container item xs={12} spacing={1} justify="center">
            <Grid item sm={12} xs={12} md={5}>
              <DetailsComponent
                dateIn={dateIn}
                dateOut={dateOut}
                selectedRooms={selectedRooms}
                selectedServices={selectedServices}
                customerInfo={customerInfo}
                deposit={hotel.deposit}
              />
            </Grid>

            <Grid container item sm={12} md={7}>
              {activeStep.step === steps.length ? (
                <Grid item xs={12}>
                  <Typography className={classes.instructions}>
                    Reservation successfully completed
                  </Typography>
                  <Button>Back</Button>
                </Grid>
              ) : (
                <Grid container item xs={12} spacing={1}>
                  {getStepContent(
                    activeStep.step,
                    hotel,
                    rooms,
                    loggedUser,
                    handleRoomsChange,
                    handleServicesChange,
                    handleCustomerChange,
                    handleSubmitOrderChange
                  )}
                  <Grid item xs={12}>
                    <Button
                      disabled={activeStep.step === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        activeStep.step === steps.length - 1
                          ? handleReservationComplete
                          : handleNext
                      }
                      disabled={!activeStep.isNextAvailable}
                    >
                      {activeStep.step === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </BaseDialog>
  );
};

Reservation.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  rooms: PropTypes.arrayOf(Room).isRequired,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  onRequestRooms: PropTypes.func.isRequired,
};

Reservation.defaultProps = {
  loggedUser: null,
  dateIn: null,
  dateOut: null,
};

export default Reservation;
