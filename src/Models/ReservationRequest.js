class ReservationRequest {
  constructor(obj) {
    this.hotelId = obj.hotelId;
    this.rooms = obj.rooms;
    this.services = obj.services;
    this.dateIn = obj.dateIn;
    this.dateOut = obj.dateOut;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
  }
}

export default ReservationRequest;
