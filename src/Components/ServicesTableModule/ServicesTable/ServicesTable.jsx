import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ServicesTableComponent from './ServicesTableComponent';
import Service from '../../../Models/Service';
import ServiceRequests from '../../../api/ServiceRequests';
import Hotel from '../../../Models/Hotel';
import SearchClause from '../../../Common/BaseSearch/SearchClause';

const { getServices, getServiceSearchVariants } = ServiceRequests;

const ServicesTable = ({
  hotel,
  createService,
  deleteService,
  updateService,
  onError,
  onSuccess,
}) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(null);
  const [services, setServices] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchVariants, setSearchVariants] = useState([]);
  const [searchClauses, setSearchClauses] = useState([
    new SearchClause({
      name: 'Name',
      value: '',
      getOptionValue: (option) => option.name,
      getOptionLabel: (option) => option.name,
    }),
  ]);

  const [refresh, setRefresh] = useState(false);

  const handleOrderChanged = (newOrder) => {
    setOrderBy(newOrder.orderBy);
    setOrder(newOrder.order);
    setPageNumber(1);
    setRefresh(!refresh);
  };

  const handleChangeSearchClauses = (newClauses) => {
    setSearchClauses(newClauses);
  };

  const handleSearch = () => {
    setPageNumber(1);
    setRefresh(!refresh);
  };

  const handlePageChanged = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChanged = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const requestServicesAsync = async () => {
    const response = await getServices({
      pageNumber,
      pageSize,
      hotelId: hotel.id,
      name: searchClauses[0].value,
      propertyName: orderBy,
      isDescending: order === 'desc',
    });

    if (response) {
      const servicesResponded = response.content.map(
        (service) => new Service(service)
      );

      setServices(servicesResponded);
      setTotalCount(response.totalResults);
      if (pageNumber !== response.pageNumber) {
        setPageNumber(response.pageNumber);
      }
      if (pageSize !== response.pageSize) {
        setPageSize(response.pageSize);
      }
    }
  };

  const requestSearchVariants = async () => {
    const response = await getServiceSearchVariants({
      hotelId: hotel.id,
      name: searchClauses[0].value,
    });

    setSearchVariants(response);
  };

  useEffect(async () => {
    await requestServicesAsync();
  }, [pageNumber, pageSize, refresh]);

  useEffect(async () => {
    if (searchClauses[0].value) {
      await requestSearchVariants();
    } else {
      setSearchVariants([]);
    }
  }, [searchClauses]);

  return (
    <ServicesTableComponent
      services={services}
      pageNumber={pageNumber}
      pageSize={pageSize}
      totalCount={totalCount}
      hotel={hotel}
      createService={createService}
      deleteService={deleteService}
      updateService={updateService}
      onPageChanged={handlePageChanged}
      onPageSizeChanged={handlePageSizeChanged}
      onSuccess={onSuccess}
      onError={onError}
      searchVariants={searchVariants}
      clauses={searchClauses}
      onChangeClauses={handleChangeSearchClauses}
      onSearch={handleSearch}
      onOrderChanged={handleOrderChanged}
      orderBy={orderBy}
      order={order}
    />
  );
};

ServicesTable.propTypes = {
  hotel: PropTypes.instanceOf(Hotel).isRequired,
  createService: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ServicesTable;
