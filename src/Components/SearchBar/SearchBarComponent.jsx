import { Button, InputBase, makeStyles, Tooltip } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: theme.palette.common.white,
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

const SearchBarComponent = ({
  initialValues,
  validationSchema,
  placeholder,
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
                    errors.dateOut && touched.dateOut
                      ? `${errors.dateOut}`
                      : 'date out'
                  }
                >
                  <InputBase
                    {...field}
                    inputProps={{
                      style: {
                        padding: 5,
                        height: 30,
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
  placeholder: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  validationSchema: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SearchBarComponent.defaultProps = {
  placeholder: 'Search... (name city service)',
};

export default SearchBarComponent;
