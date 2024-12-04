class UserModel {
  constructor(user) {
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.password = user.password;
    this.role = user.role;
  }
}
export default UserModel;
