/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Box,
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import Service from '../../Models/Service';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'transient',
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#12b82b',
    color: '#12b82b',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    padding: theme.spacing(1, 3),
    margin: theme.spacing(0.5, 1),
    fontWeight: 'bold',
    borderRadius: 20,
    '&:hover': {
      borderColor: '#109123',
      color: '#109123',
      cursor: 'pointer',
    },
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

const ServiceItem = ({ service }) => {
  const [viewInfo, setViewInfo] = useState(false);
  const classes = useStyles();
  return (
    <>
      <div className={classes.root} onClick={() => setViewInfo(true)}>
        {service.name}
      </div>
      <Dialog open={viewInfo} maxWidth="xs" fullWidth>
        <DialogTitle>
          <div className={classes.titleSection}>
            <Typography className={classes.title} variant="h6">
              {service.name}
            </Typography>
            <IconButton
              className={classes.closeButton}
              onClick={() => {
                setViewInfo(false);
              }}
            >
              <CloseOutlined />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>
                <Box>Price</Box>
                <Box fontWeight="fontWeightMedium">${service.price}</Box>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

ServiceItem.propTypes = {
  service: PropTypes.instanceOf(Service).isRequired,
};

export default ServiceItem;
