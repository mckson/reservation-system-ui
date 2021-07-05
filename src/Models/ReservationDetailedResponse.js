class ReservationDetailedResponse {
  constructor(obj) {
    this.id = obj.id;
    this.hotel = obj.hotel;
    this.surname = obj.firstName;
    this.name = obj.lastName;
    this.email = obj.email;
    this.reservedTime = new Date(obj.reservedTime);
    this.dateIn = new Date(obj.dateIn);
    this.dateOut = new Date(obj.dateOut);
    this.totalNights = obj.totalDays;
    this.totalPrice = obj.totalPrice;
    this.deposit = obj.deposit;
    this.rooms = obj.rooms;
    this.services = obj.services;
    this.priceForRooms = obj.roomsPrice;
    this.priceForServices = obj.servicesPrice;
  }
}

export default ReservationDetailedResponse;
