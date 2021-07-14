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

const ProfileField = ({ fieldTitle, fieldValue, update }) => {
  const [isEdit, setIsEdit] = useState(false);
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
            defaultValue={fieldValue}
            onChange={(event) => {
              setNewValue(event.target.value);
            }}
          />
        ) : (
          <Typography component="div">
            <Box fontWeight="fontWeightMedium">{fieldValue}</Box>
          </Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        {isEdit ? (
          <div className={classes.buttonGroup}>
            {newValue === fieldValue ? null : (
              <IconButton
                className={classes.greenButton}
                onClick={() => handleApplyEdit()}
              >
                <CheckOutlined />
              </IconButton>
            )}
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
};

export default ProfileField;
