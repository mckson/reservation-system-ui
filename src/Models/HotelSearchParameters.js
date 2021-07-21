class HotelSearchParameters {
  name;

  city;

  services;

  constructor({ name, city, services }) {
    this.name = name;
    this.city = city;
    this.services = services;
  }
}

export default HotelSearchParameters;
