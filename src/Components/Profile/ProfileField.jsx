import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@material-ui/icons';
import Constants from '../../Common/Constants';

const toISODate = (date) => {
  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
    -2
  )}-${`0${date.getDate()}`.slice(-2)}`;
};

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  },
  greenButton: {
    color: theme.palette.success.main,
  },
  redButton: {
    color: theme.palette.error.main,
  },
}));

const ProfileField = ({ fieldTitle, fieldValue, update, isDate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState(null);
  const [newValue, setNewValue] = useState(fieldValue);

  const classes = useStyles();

  const handleEnableEdit = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  const handleApplyEdit = () => {
    update(newValue);
    setIsEdit(false);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <Typography component="div">
          <Box>{fieldTitle}</Box>
        </Typography>
      </Grid>
      <Grid item xs={7}>
        {isEdit ? (
          <TextField
            fullWidth
            error={!isValid}
            helperText={isValid ? null : validationError}
            defaultValue={isDate ? toISODate(fieldValue) : fieldValue}
            onChange={(event) => {
              const { value } = event.target;
              setNewValue(value);
              if (!value || value === '') {
                setIsValid(false);
                setValidationError('Field must be not empty');
              } else {
                setIsValid(true);
                setValidationError(null);
              }
            }}
            type={isDate ? 'date' : 'text'}
          />
        ) : (
          <Typography component="div">
            <Box fontWeight="fontWeightMedium">
              {isDate
                ? fieldValue.toLocaleDateString('en-US', Constants.dateOptions)
                : fieldValue}
            </Box>
          </Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        {isEdit ? (
          <div className={classes.buttonGroup}>
            {newValue !== fieldValue && isValid !== false ? (
              <IconButton
                className={classes.greenButton}
                onClick={() => handleApplyEdit()}
              >
                <CheckOutlined />
              </IconButton>
            ) : null}
            <IconButton
              className={classes.redButton}
              onClick={() => handleCancelEdit()}
            >
              <CloseOutlined />
            </IconButton>
          </div>
        ) : (
          <IconButton onClick={() => handleEnableEdit()}>
            <EditOutlined />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

ProfileField.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fieldTitle: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isDate: PropTypes.bool,
};

ProfileField.defaultProps = {
  isDate: false,
};

export default ProfileField;
