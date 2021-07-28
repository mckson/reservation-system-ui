import { makeStyles, Snackbar, Tab } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, TabContext, TabPanel, TabList } from '@material-ui/lab';
import HotelsTable from '../HotelsTableModule/HotelsTable/HotelsTable';
import RoomViewTable from '../RoomViewTableModule/RoomViewTable/RoomViewTable';
import Hotel from '../../Models/Hotel';
import User from '../../Models/User';
import FullScreenDialog from '../../Common/FullScreenDialog';
import RoomView from '../../Models/RoomView';
import Constants from '../../Common/Constants';
import SearchClause from '../../Common/BaseSearch/SearchClause';
import SearchRange from '../../Common/BaseSearch/SearchRange';
import SearchOption from '../../Common/BaseSearch/SearchOption';

const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(3, 7),
  },
  contentItem: {
    margin: theme.spacing(0, 0, 3, 0),
  },
  tabList: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const HotelsManagementComponent = ({
  users,
  isOpen,
  prompts,
  close,
  role,
  hotels,
  roomViews,
  totalCount,
  onSearch,
  clauses,
  ranges,
  options,
  onChangeClauses,
  onChangeRanges,
  onChangeOptions,
  pageChanged,
  pageSizeChanged,
  pageSize,
  deleteHotel,
  updateHotel,
  createHotel,
  createRoom,
  updateRoom,
  deleteRoom,
  createService,
  updateService,
  deleteService,
  updateUser,
  createImage,
  deleteImage,
  createRoomImage,
  deleteRoomImage,
  createRoomView,
  updateRoomView,
  deleteRoomView,
  onOrderChanged,
  orderBy,
  order,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState('0');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleResetError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(null);
  };

  const handleResetSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleSuccess = (successMessage) => {
    setSuccess(successMessage);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <FullScreenDialog isOpen={isOpen} close={close} title="Hotels management">
      <div className={classes.content}>
        <TabContext value={tab}>
          <div className={classes.tabList}>
            <TabList
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
            >
              <Tab label="Hotels management" value="0" />
              {role === Constants.adminRole ? (
                <Tab label="Room views management" value="1" />
              ) : (
                <></>
              )}
            </TabList>
          </div>
          <TabPanel value="0">
            <div className={classes.contentItem}>
              <HotelsTable
                prompts={prompts}
                role={role}
                users={users}
                hotels={hotels}
                roomViews={roomViews}
                totalCount={totalCount}
                onSearch={onSearch}
                clauses={clauses}
                options={options}
                ranges={ranges}
                onChangeClauses={onChangeClauses}
                onChangeRanges={onChangeRanges}
                onChangeOptions={onChangeOptions}
                pageChanged={pageChanged}
                pageSize={pageSize}
                pageSizeChanged={pageSizeChanged}
                deleteHotel={deleteHotel}
                updateHotel={updateHotel}
                createHotel={createHotel}
                createRoom={createRoom}
                updateRoom={updateRoom}
                deleteRoom={deleteRoom}
                createService={createService}
                updateService={updateService}
                deleteService={deleteService}
                updateUser={updateUser}
                createImage={createImage}
                deleteImage={deleteImage}
                createRoomImage={createRoomImage}
                deleteRoomImage={deleteRoomImage}
                onError={handleError}
                onSuccess={handleSuccess}
                onOrderChanged={onOrderChanged}
                orderBy={orderBy}
                order={order}
              />
            </div>
          </TabPanel>
          {role && role === Constants.adminRole ? (
            <TabPanel value="1">
              <div className={classes.contentItem}>
                <RoomViewTable
                  createRoomView={createRoomView}
                  updateRoomView={updateRoomView}
                  deleteRoomView={deleteRoomView}
                  onError={handleError}
                  onSuccess={handleSuccess}
                />
              </div>
            </TabPanel>
          ) : null}
        </TabContext>
      </div>
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={handleResetError}
      >
        <Alert onClose={handleResetError} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={5000}
        onClose={handleResetSuccess}
      >
        <Alert onClose={handleResetSuccess} severity="success" variant="filled">
          {success}
        </Alert>
      </Snackbar>
    </FullScreenDialog>
  );
};

HotelsManagementComponent.propTypes = {
  clauses: PropTypes.arrayOf(SearchClause),
  ranges: PropTypes.arrayOf(SearchRange),
  options: PropTypes.arrayOf(SearchOption),
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  onChangeOptions: PropTypes.func,
  users: PropTypes.arrayOf(User).isRequired,
  isOpen: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  roomViews: PropTypes.arrayOf(RoomView),
  totalCount: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  pageSizeChanged: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  deleteHotel: PropTypes.func.isRequired,
  updateHotel: PropTypes.func.isRequired,
  createHotel: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  createImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  createRoomImage: PropTypes.func.isRequired,
  deleteRoomImage: PropTypes.func.isRequired,
  createRoomView: PropTypes.func.isRequired,
  updateRoomView: PropTypes.func.isRequired,
  deleteRoomView: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  prompts: PropTypes.array,
  onOrderChanged: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string.isRequired,
};

HotelsManagementComponent.defaultProps = {
  roomViews: [],
  clauses: [],
  ranges: [],
  options: [],
  prompts: [],
  onChangeClauses: null,
  onChangeRanges: null,
  onChangeOptions: null,
  orderBy: null,
};

export default HotelsManagementComponent;
