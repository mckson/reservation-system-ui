class Hotel {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.numberFloors = obj.numberFloors;
    this.deposit = obj.deposit;
    this.location = obj.location;
    this.rooms = obj.rooms;
    this.managers = obj.managers;
    this.services = obj.services;
  }
}

export default Hotel;
