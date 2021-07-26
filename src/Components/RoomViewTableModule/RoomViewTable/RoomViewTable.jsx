import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RoomView from '../../../Models/RoomView';
import RoomViewTableComponent from './RoomViewTableComponent';
import RoomViewRequests from '../../../api/RoomViewRequests';
import SearchClause from '../../../Common/BaseSearch/SearchClause';

const { getRoomViews, getRoomViewSearchPrompts } = RoomViewRequests;

const RoomViewTable = ({
  onError,
  onSuccess,
  createRoomView,
  updateRoomView,
  deleteRoomView,
}) => {
  const [roomViews, setRoomViews] = useState([]);
  const [searchVariants, setSearchVariants] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [refresh, setRefresh] = useState(false);

  const [searchClauses, setSearchClauses] = useState([
    new SearchClause({
      name: 'Name',
      value: null,
      getOptionValue: (option) => option.name,
      getOptionLabel: (option) => option.name,
    }),
  ]);
  const [searchRanges, setSearchRanges] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  const handleSearch = () => {
    setPageNumber(0);
    setRefresh(!refresh);
  };

  const handleChangeSearchClauses = (newClauses) => {
    setSearchClauses(newClauses);
  };

  const handleChangeSearchRanges = (newRanges) => {
    setSearchRanges(newRanges);
  };

  const handleChangeSearchOptions = (newOptions) => {
    setSearchOptions(newOptions);
  };

  const requestSearchVariants = async () => {
    const response = await getRoomViewSearchPrompts({
      name: searchClauses[0].value,
    });

    setSearchVariants(response);
  };

  const requestRoomViews = async () => {
    const response = await getRoomViews({
      pageNumber,
      pageSize,
      name: searchClauses[0].value,
    });

    if (response != null) {
      const respondedRoomViews = response.content.map(
        (item) => new RoomView(item)
      );

      setRoomViews(respondedRoomViews);
      setTotalResults(response.totalResults);
      if (pageNumber !== response.pageNumber) {
        setPageNumber(response.pageNumber);
      }
      if (pageSize !== response.pageSize) {
        setPageSize(response.pageSize);
      }
    }
  };

  const handlePageChanged = (value) => {
    setPageNumber(value);
  };

  const handlePageSizeChanged = (newSize) => {
    setPageSize(newSize);
  };

  useEffect(async () => {
    await requestRoomViews();
  }, [pageSize, pageNumber]);

  useEffect(async () => {
    if (searchClauses[0].value) {
      await requestSearchVariants();
    } else {
      setSearchVariants([]);
    }
  }, [searchClauses, searchOptions, searchRanges]);

  return (
    <RoomViewTableComponent
      roomViews={roomViews}
      onError={onError}
      onSuccess={onSuccess}
      createRoomView={createRoomView}
      updateRoomView={updateRoomView}
      deleteRoomView={deleteRoomView}
      pageChanged={handlePageChanged}
      pageSizeChanged={handlePageSizeChanged}
      totalCount={totalResults}
      pageSize={pageSize}
      onSearch={handleSearch}
      clauses={searchClauses}
      ranges={searchRanges}
      options={searchOptions}
      onChangeClauses={handleChangeSearchClauses}
      onChangeRanges={handleChangeSearchRanges}
      onChangeOptions={handleChangeSearchOptions}
      prompts={searchVariants}
    />
  );
};

RoomViewTable.propTypes = {
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  createRoomView: PropTypes.func.isRequired,
  updateRoomView: PropTypes.func.isRequired,
  deleteRoomView: PropTypes.func.isRequired,
};

export default RoomViewTable;
