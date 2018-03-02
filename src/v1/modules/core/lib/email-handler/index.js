import Contact from './contact';
import SES from './strategies/ses';

export default class EmailHandler {
  constructor(strategy = 'SES') {
    this.strategy = strategy;
  }

  from(from) {
    if (!(from instanceof Contact)) throw Error('Invalid contact type.');
    this.from = from;
    return this;
  }

  to(to) {
    if (!(to instanceof Contact)) throw Error('Invalid contact type.');
    this.to = to;
    return this;
  }

  subject(subject) {
    this.subject = subject;
    return this;
  }

  body(body) {
    this.body = body;
    return this;
  }

  send() {
    switch (this.strategy) {
      case 'SES':
      default:
        return new SES(this.from, this.to, this.subject, this.body).send();
    }
  }
}
