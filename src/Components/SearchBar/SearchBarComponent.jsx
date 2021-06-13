import { Button, InputBase, makeStyles, Tooltip } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const placeholder = 'Search... (name city service)';
const now = new Date();
const year = now.getFullYear();
const month =
  now.getMonth() + 1 > 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`;
const day = now.getDate();
const today = `${year}-${month}-${day}`;

const validationSchema = Yup.object({
  search: Yup.string(),
  dateIn: Yup.date().min(today, 'Cannot be earlier than today'),
  dateOut: Yup.date().min(today, 'Cannot be earlier than today'),
  // .test({
  //   name: 'min',
  //   exlusive: false,
  //   params: {},
  //   message: 'Must be later than date in',
  //   test: (value) => new Date(value) > new Date(Yup.ref.date),
  // }),
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    // borderRadius: theme.shape.borderRadius,
    // borderColor: theme.palette.grey[300],
    // borderStyle: 'solid',
    // padding: 3,
    // borderWidth: 1,
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    borderColor: theme.palette.grey[300],
    borderStyle: 'solid',
    borderWidth: 1,
    margin: theme.spacing(0, 1, 0, 0),
  },
  searchIcon: {
    color: theme.palette.primary.main,
    padding: theme.spacing(0, 1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRoot: {
    color: 'inherit',
    width: '100%',
  },
  searchInput: {
    width: '100%',
    padding: 5,
    height: 30,
  },
  dateRange: {
    display: 'flex',
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    margin: theme.spacing(0, 1, 0, 0),
  },
  datepicker: {
    padding: 0,
  },
}));

// const handlerSubmit = (/* values */) => {
//   // eslint-disable-next-line no-debugger
//   debugger;
// };

const SearchBarComponent = ({
  searchHotels,
  dateIn,
  dateOut,
  onDateInChange,
  onDateOutChange,
}) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        search: '',
        dateIn: dateIn || today,
        dateOut: dateOut || today,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        searchHotels(values.search);
        onDateInChange(values.dateIn);
        onDateOutChange(values.dateOut);
      }}
    >
      {({ errors, touched }) => (
        <Form className={classes.root}>
          <Field name="search">
            {({ field }) => (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  {...field}
                  classes={{
                    root: classes.searchRoot,
                    input: classes.searchInput,
                  }}
                  placeholder={placeholder}
                />
              </div>
            )}
          </Field>
          <div className={classes.dateRange}>
            <Field name="dateIn">
              {({ field }) => (
                <Tooltip
                  title={
                    errors.dateIn && touched.dateIn
                      ? `${errors.dateIn}`
                      : 'date in'
                  }
                >
                  <InputBase
                    {...field}
                    inputProps={{
                      style: {
                        padding: 5,
                        height: 30,
                        width: 135,
                      },
                    }}
                    variant="outlined"
                    type="date"
                    className={classes.datepicker}
                  />
                </Tooltip>
              )}
            </Field>
            <Field name="dateOut">
              {({ field }) => (
                <Tooltip
                  title={
                    errors.dateIn && touched.dateIn
                      ? `${errors.dateIn}`
                      : 'date out'
                  }
                >
                  <InputBase
                    {...field}
                    inputProps={{
                      style: {
                        padding: 5,
                        height: 30,
                        width: 135,
                      },
                    }}
                    variant="outlined"
                    type="date"
                    className={classes.datepicker}
                  />
                </Tooltip>
              )}
            </Field>
          </div>
          <div className={classes.button}>
            <Button
              type="submit"
              style={{ height: 40 }}
              variant="contained"
              color="primary"
              disabled={!!(errors.dateIn || errors.dateOut)}
            >
              Search
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

SearchBarComponent.propTypes = {
  searchHotels: PropTypes.func.isRequired,
  dateIn: PropTypes.string,
  dateOut: PropTypes.string,
  onDateInChange: PropTypes.func.isRequired,
  onDateOutChange: PropTypes.func.isRequired,
};

SearchBarComponent.defaultProps = {
  dateIn: null,
  dateOut: null,
};

export default SearchBarComponent;
