import HotelRequests from '../api/HotelRequests';
import ImageRequests from '../api/ImageRequests';
import RoomRequests from '../api/RoomRequests';
import RoomViewRequests from '../api/RoomViewRequests';
import ServiceRequests from '../api/ServiceRequests';
import UserRequests from '../api/UserRequests';

const ManagementService = (function Management() {
  const { createHotel, deleteHotel, getHotels, updateHotel } = HotelRequests;
  const {
    createHotelImage,
    createRoomImage,
    deleteHotelImage,
    deleteRoomImage,
  } = ImageRequests;
  const { createRoom, deleteRoom, updateRoom } = RoomRequests;
  const { createRoomView, deleteRoomView, updateRoomView } = RoomViewRequests;
  const { createService, deleteService, updateService } = ServiceRequests;
  const { createUser, deleteUser, updateUser } = UserRequests;

  let service;

  function getService() {
    if (!service) {
      service = this;
    }

    return service;
  }

  const baseRequestHandler = async (requestFunction, parameter) => {
    try {
      const returnedValue = await requestFunction(parameter);

      return [returnedValue, null];
    } catch (error) {
      if (error.response?.data?.message) {
        return [null, error.response.data.message];
      }
      if (error.response?.data?.title) {
        return [null, error.response.data.title];
      }
      return [null, error.message];
    }
  };

  const handleGetHotels = async ({
    pageNumber,
    pageSize,
    dateIn,
    dateOut,
    manager,
    name,
    city,
    services,
    minDeposit,
    maxDeposit,
    minFloors,
    maxFloors,
  }) => {
    const returnedHotels = await getHotels({
      pageNumber,
      pageSize,
      dateIn,
      dateOut,
      manager,
      name,
      city,
      services,
      minDeposit,
      maxDeposit,
      minFloors,
      maxFloors,
    });
    return returnedHotels;
  };

  const handleCreateHotel = async (createdHotel) => {
    const returnedHotel = await createHotel(createdHotel);
    return returnedHotel;
  };

  const handleUpdateHotel = async (updatedHotel) => {
    const returnedHotel = await updateHotel(updatedHotel);
    return returnedHotel;
  };

  const handleDeleteHotel = async (id) => {
    const deletedHotel = await deleteHotel(id);
    return deletedHotel;
  };

  const handleCreateRoom = async (createdRoom) => {
    const returnedRoom = await createRoom(createdRoom);
    return returnedRoom;
  };

  const handleUpdateRoom = async (updatedRoom) => {
    const returnedRoom = await updateRoom(updatedRoom);
    return returnedRoom;
  };

  const handleDeleteRoom = async (id) => {
    const returnedRoom = await deleteRoom(id);
    return returnedRoom;
  };

  const handleCreateService = async (createdService) => {
    const returnedService = await createService(createdService);
    return returnedService;
  };

  const handleUpdateService = async (updatedService) => {
    const returnedService = await updateService(updatedService);
    return returnedService;
  };

  const handleDeleteService = async (id) => {
    const returnedService = await deleteService(id);
    return returnedService;
  };

  const handleCreateUser = async (createdUser) => {
    const returnedUser = await createUser(createdUser);
    return returnedUser;
  };

  const handleUpdateUser = async (updatedUser) => {
    const returnedUser = await updateUser(updatedUser);
    return returnedUser;
  };

  const handleDeleteUser = async (id) => {
    const returnedUser = await deleteUser(id);
    return returnedUser;
  };

  const handleCreateHotelImage = async (image) => {
    try {
      await createHotelImage(image);
      return null;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.title) {
        return error.response.data.title;
      }
      return error.message;
    }
  };

  const handleDeleteHotelImage = async (imageId) => {
    try {
      await deleteHotelImage(imageId);
      return null;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.title) {
        return error.response.data.title;
      }
      return error.message;
    }
  };

  const handleCreateRoomImage = async (image) => {
    try {
      await createRoomImage(image);
      return null;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.title) {
        return error.response.data.title;
      }
      return error.message;
    }
  };

  const handleDeleteRoomImage = async (imageId) => {
    try {
      await deleteRoomImage(imageId);
      return null;
    } catch (error) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.title) {
        return error.response.data.title;
      }
      return error.message;
    }
  };

  const handleCreateRoomView = async (createdRoomView) => {
    const returnedRoomView = await createRoomView(createdRoomView);
    return returnedRoomView;
  };

  const handleUpdateRoomView = async (updatedRoomView) => {
    const returnedRoomView = await updateRoomView(updatedRoomView);
    return returnedRoomView;
  };

  const handleDeleteRoomView = async (id) => {
    const returnedRoomView = await deleteRoomView(id);
    return returnedRoomView;
  };

  return {
    handleGetHotels,
    getService,
    baseRequestHandler,
    handleCreateHotel,
    handleUpdateHotel,
    handleDeleteHotel,
    handleCreateRoom,
    handleUpdateRoom,
    handleDeleteRoom,
    handleCreateService,
    handleUpdateService,
    handleDeleteService,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateHotelImage,
    handleDeleteHotelImage,
    handleCreateRoomImage,
    handleDeleteRoomImage,
    handleCreateRoomView,
    handleUpdateRoomView,
    handleDeleteRoomView,
  };
})();

export default ManagementService;
