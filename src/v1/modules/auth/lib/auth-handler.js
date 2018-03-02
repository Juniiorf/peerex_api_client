export default class AuthHandler {
  setData(data) {
    this.data = data;
    return Promise.resolve(data);
  }

  setStrategy(strategy) {
    this.strategy = strategy;
    return Promise.resolve(strategy);
  }

  authenticate() {
    return this.strategy.authenticate(this.data);
  }
}
