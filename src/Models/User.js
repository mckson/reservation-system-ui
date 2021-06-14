class User {
  constructor(obj) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.userName = obj.name;
    this.email = obj.email;
    this.roles = obj.role;
    this.hotel = obj.hotel;
  }
}

export default User;
