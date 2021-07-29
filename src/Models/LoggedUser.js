class LoggedUser {
  id;

  firstName;

  lastName;

  userName;

  email;

  roles;

  constructor({ id, email, firstName, lastName, userName, roles }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.roles = roles;
  }
}

export default LoggedUser;
