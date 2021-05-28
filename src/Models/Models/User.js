class User {
  constructor(obj) {
    this.id = obj.id;
    this.userName = obj.name;
    this.email = obj.email;
    this.roles = obj.role;
    this.hotelId = obj.hotelId;
  }
}

export default User;
