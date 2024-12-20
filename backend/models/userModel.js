class UserModel {
  constructor(user) {
    this.email = user.email;
    this.fullname = user.fullname;
    this.password = user.password;
    this.role = user.role;
  }
}
export default UserModel;
