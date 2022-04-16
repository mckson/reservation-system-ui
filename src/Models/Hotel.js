class Hotel {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.numberFloors = obj.numberFloors;
    this.deposit = obj.deposit;
    this.description = obj.description;
    this.location = obj.location;
    this.managers = obj.managers;
    this.mainImage = obj.mainImage;
    this.images = obj.images;
  }
}

export default Hotel;
