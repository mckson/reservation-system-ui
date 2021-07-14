import { Field, Form, Formik } from 'formik';

import {
  //   InputBase,
  Button,
  makeStyles,
  Tooltip,
  TextField,
  Typography,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import HotelBrief from '../../Models/HotelBrief';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: theme.palette.common.white,
  },
  grid: {
    padding: theme.spacing(1),
    background: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
  },
  textfield: {
    padding: 0,
    background: theme.palette.common.white,
  },
}));

const SideSearchBarComponent = ({
  hotels,
  placeholder,
  validationSchema,
  initialValues,
  onSubmit,
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={1} className={classes.grid}>
            <Typography variant="h6">Search</Typography>
            <Grid item xs={12}>
              <Typography variant="body1">Hotel</Typography>
              <Field name="search">
                {({ field }) => (
                  <>
                    <TextField
                      {...field}
                      className={classes.textfield}
                      fullWidth
                      size="small"
                      variant="outlined"
                      type="text"
                      placeholder={placeholder}
                    />
                    {hotels && hotels.length > 0 ? (
                      hotels.map((hotel) => <div>{hotel.name}</div>)
                    ) : (
                      <div>No hotels</div>
                    )}
                  </>
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">Date-in</Typography>
              <Field name="dateIn">
                {({ field }) => (
                  <Tooltip
                    title={
                      errors.dateIn && touched.dateIn
                        ? `${errors.dateIn}`
                        : 'date in'
                    }
                  >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      variant="outlined"
                      type="date"
                      className={classes.textfield}
                    />
                  </Tooltip>
                )}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">Date-out</Typography>
              <Field name="dateOut">
                {({ field }) => (
                  <Tooltip
                    title={
                      errors.dateOut && touched.dateOut
                        ? `${errors.dateOut}`
                        : 'date out'
                    }
                  >
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      variant="outlined"
                      type="date"
                      className={classes.textfield}
                    />
                  </Tooltip>
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.button}>
                <Button
                  fullWidth
                  type="submit"
                  style={{ height: 40 }}
                  variant="contained"
                  color="primary"
                  disabled={!!(errors.dateIn || errors.dateOut)}
                >
                  Search
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

SideSearchBarComponent.propTypes = {
  hotels: PropTypes.arrayOf(HotelBrief).isRequired,
  placeholder: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  validationSchema: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SideSearchBarComponent.defaultProps = {
  placeholder: 'Search... (name city service)',
};

export default SideSearchBarComponent;
