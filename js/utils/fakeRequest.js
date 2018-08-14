import server from './fakeServer';

var fakeRequest = {
  post(endpoint, data, callback) {
    setTimeout(() => {
      switch (endpoint) {
        case '/login':
          server.login(data.username, data.password, callback);
          break;
        case '/register':
          server.register(data.username, data.password, callback);
          break;
        case '/logout':
          server.logout(callback);
          break;
        default:
          break;
      }
    }, (Math.random() * 2000) + 100);
  }
};

module.exports = fakeRequest;