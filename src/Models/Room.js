class Room {
  constructor({
    id,
    hotelId,
    roomNumber,
    price,
    floorNumber,
    capacity,
    reservations,
  }) {
    this.id = id;
    this.hotelId = hotelId;
    this.roomNumber = roomNumber;
    this.floorNumber = floorNumber;
    this.price = price;
    this.capacity = capacity;
    this.reservations = reservations;
  }
}

export default Room;
