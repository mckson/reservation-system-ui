import {
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Hotel from '../Models/Hotel';
import RoomSelectionComponent from './ReservationModule/RoomSelection/RoomSelectionComponent';
import PersonalInfo from './ReservationModule/PersonalInfo/PersonalInfo';
import User from '../Models/User';
import ReservationRequest from '../Models/ReservationRequest';
import CompleteOrder from './ReservationModule/CompleteOrder/CompleteOrder';
import API from '../Common/API';
import SmallHotelCard from './SmallHotelCard';
import DetailsComponent from './ReservationModule/Details/DetailsComponent';

const getSteps = () => [
  'Select room and services',
  'Enter your details',
  'Final details',
];

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

const getStepContent = (
  stepIndex,
  hotel,
  loggedUser,
  onRoomChange,
  onServicesChange,
  onCustomerChange,
  onSubmitOrder
) => {
  // eslint-disable-next-line no-debugger
  debugger;
  switch (stepIndex) {
    case 0:
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">
              Select rooms annd services you want to reserve
            </Typography>
            <SmallHotelCard hotel={hotel} />
          </Grid>
          <Grid item xs={12}>
            <RoomSelectionComponent
              hotel={hotel}
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

const Reservation = ({ loggedUser, open, close, hotel, dateIn, dateOut }) => {
  const [activeStep, setActiveStep] = useState({
    step: 0,
    isNextAvailable: false,
  });
  const steps = getSteps();
  const classes = useStyles();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);

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
    });

    try {
      const createdReservation = await API.createReservation(reservation);
      console.log(createdReservation);
    } catch (error) {
      console.log(error);
    }

    close();
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
    // eslint-disable-next-line no-debugger
    debugger;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => ({
      step: prevActiveStep.step - 1,
      isNextAvailable: true,
    }));
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleRoomsChange = (rooms) => {
    setSelectedRooms(rooms);
    setActiveStep((previosActiveStep) => ({
      step: previosActiveStep.step,
      isNextAvailable: rooms && rooms.length !== 0, // ? true : false
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
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle>
        <div className={classes.titleSection}>
          <Typography className={classes.title} variant="h6">
            Propperty reservation
          </Typography>
          <IconButton
            className={classes.closeButton}
            onClick={() => {
              close();
              setActiveStep({ step: 0, isNextAvailable: false });
              setSelectedRooms([]);
              setSelectedServices([]);
              setCustomerInfo(null);
            }}
          >
            <CloseOutlined />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
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
                        {activeStep.step === steps.length - 1
                          ? 'Finish'
                          : 'Next'}
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
      </DialogContent>
    </Dialog>
  );
};

Reservation.propTypes = {
  loggedUser: PropTypes.instanceOf(User),
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
};

Reservation.defaultProps = {
  loggedUser: null,
  dateIn: null,
  dateOut: null,
};

export default Reservation;
