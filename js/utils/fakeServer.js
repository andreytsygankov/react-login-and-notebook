import bcrypt from 'bcryptjs';
import genSalt from './salt';
const salt = bcrypt.genSaltSync(10);
let users;
let localStorage = global.window.localStorage;

var server = {

  init() {
    if (localStorage.users === undefined || !localStorage.encrypted) {
      const UserName = "admin";
      const UserNameSalt = genSalt(UserName);
      const Password = bcrypt.hashSync("admin", UserNameSalt);
      users = {
        [UserName]: bcrypt.hashSync(Password, salt)
      };
      localStorage.users = JSON.stringify(users);
      localStorage.encrypted = true;
    } else {
      users = JSON.parse(localStorage.users);
    }
  },

  login(username, password, callback) {
    const userExists = this.doesUserExist(username);
    if (userExists && bcrypt.compareSync(password, users[username])) {
      if (callback) callback({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      if (userExists) {
        var error = {
          type: "password-wrong"
        }
      } else {
        var error = {
          type: "user-doesnt-exist"
        }
      }
      if (callback) callback({
        authenticated: false,
        error: error
      });
    }
  },

  register(username, password, callback) {
    if (!this.doesUserExist(username)) {
        console.log(username);
      users[username] = bcrypt.hashSync(password, salt);
      localStorage.users = JSON.stringify(users);
      if (callback) callback({
        registered: true
      });
    } else {
      if (callback) callback({
        registered: false,
        error: {
          type: "username-exists"
        }
      });
    }
  },

  logout(callback) {
    localStorage.removeItem('token');
    if (callback) callback();
  },

  doesUserExist(username) {
    return !(users[username] === undefined);
  }
}

server.init();

module.exports = server;
