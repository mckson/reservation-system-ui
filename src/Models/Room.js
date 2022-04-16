class Room {
  constructor({
    id,
    hotelId,
    name,
    roomNumber,
    price,
    floorNumber,
    capacity,
    reservations,
    images,
    area,
    description,
    smoking,
    parking,
    facilities,
    views,
  }) {
    this.id = id;
    this.hotelId = hotelId;
    this.name = name;
    this.roomNumber = roomNumber;
    this.floorNumber = floorNumber;
    this.price = price;
    this.capacity = capacity;
    this.area = area;
    this.description = description;
    this.smoking = smoking;
    this.parking = parking;
    this.facilities = facilities;
    this.views = views;
    this.reservations = reservations;
    this.images = images;
  }
}

export default Room;
