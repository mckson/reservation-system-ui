import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import MyTextField from '../../../Common/MyTextField';
import Service from '../../../Models/Service';

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

const ServiceFormComponent = ({
  open,
  title,
  close,
  service,
  validationSchema,
  submitHandler,
  submitText,
  error,
  resetError,
}) => {
  const classes = useStyles();

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
              name: service != null ? service.name : '',
              price: service != null ? service.price : '',
            }}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
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
                label="Price"
                name="price"
                type="text"
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
      </Dialog>
    </div>
  );
};

ServiceFormComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  service: PropTypes.instanceOf(Service).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  validationSchema: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
};

ServiceFormComponent.defaultProps = {
  error: null,
};

export default ServiceFormComponent;
