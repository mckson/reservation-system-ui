import React from 'react';
import PropTypes from 'prop-types';
import HotelsTableComponent from './HotelsTableComponent';
import Hotel from '../../../Models/Hotel';
import User from '../../../Models/User';
import RoomView from '../../../Models/RoomView';
import SearchClause from '../../../Common/BaseSearch/SearchClause';
import SearchRange from '../../../Common/BaseSearch/SearchRange';
import SearchOption from '../../../Common/BaseSearch/SearchOption';

const HotelsTable = ({
  role,
  users,
  hotels,
  roomViews,
  onSearch,
  clauses,
  ranges,
  options,
  onChangeClauses,
  onChangeRanges,
  onChangeOptions,
  pageChanged,
  pageSizeChanged,
  totalCount,
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
  onError,
  onSuccess,
  prompts,
  onOrderChanged,
  orderBy,
  order,
}) => {
  return (
    <HotelsTableComponent
      role={role}
      users={users}
      hotels={hotels}
      roomViews={roomViews}
      totalCount={totalCount}
      onSearch={onSearch}
      prompts={prompts}
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
      onError={onError}
      onSuccess={onSuccess}
      onOrderChanged={onOrderChanged}
      orderBy={orderBy}
      order={order}
    />
  );
};

HotelsTable.propTypes = {
  onSearch: PropTypes.func.isRequired,
  clauses: PropTypes.arrayOf(SearchClause),
  ranges: PropTypes.arrayOf(SearchRange),
  options: PropTypes.arrayOf(SearchOption),
  onChangeClauses: PropTypes.func,
  onChangeRanges: PropTypes.func,
  onChangeOptions: PropTypes.func,
  role: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(User).isRequired,
  hotels: PropTypes.arrayOf(Hotel).isRequired,
  roomViews: PropTypes.arrayOf(RoomView),
  totalCount: PropTypes.number.isRequired,
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
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  prompts: PropTypes.array,
  onOrderChanged: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string.isRequired,
};

HotelsTable.defaultProps = {
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

export default HotelsTable;
