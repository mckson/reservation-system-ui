import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Autocomplete, createFilterOptions, Alert } from '@material-ui/lab';
import { Formik, Form } from 'formik';
import User from '../../../Models/User';
import MyTextField from '../../../Common/MyTextField';
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

const AddManagerForm = ({
  open,
  title,
  close,
  users,
  submitHandler,
  submitText,
  error,
  resetError,
}) => {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.firstName,
  });

  return (
    <div>
      <BaseDialog open={open} close={close} title={title}>
        <Formik
          onSubmit={() => submitHandler(selectedUser)}
          initialValues={{ user: '' }}
        >
          <Form>
            <Autocomplete
              options={users}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}, ${option.email}`
              }
              onChange={(event, value) => setSelectedUser(value)}
              filterOptions={filterOptions}
              renderInput={(params) => (
                <MyTextField
                  {...params}
                  required
                  variant="outlined"
                  fullWidth
                  label="User"
                  name="user"
                />
              )}
            />
            <Button
              fullWidth
              disabled={!selectedUser}
              className={classes.submit}
              variant="contained"
              type="submit"
              color="primary"
            >
              {submitText}
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
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        ) : null}
      </BaseDialog>
    </div>
  );
};

AddManagerForm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(User).isRequired,
  error: PropTypes.string,
  resetError: PropTypes.func.isRequired,
};

AddManagerForm.defaultProps = {
  error: null,
};

export default AddManagerForm;
