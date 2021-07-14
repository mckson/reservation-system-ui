class User {
  constructor(obj) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.userName = obj.userName;
    this.email = obj.email;
    this.dateOfBirth = new Date(obj.dateOfBirth);
    this.phoneNumber = obj.phoneNumber;
    this.roles = obj.roles;
    this.hotels = obj.hotels;
  }
}

export default User;
