export default class EmailContact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  toString() {
    return `${this.name} <${this.email}>`;
  }
}
