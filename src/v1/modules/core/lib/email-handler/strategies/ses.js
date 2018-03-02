import ses from 'node-ses';

export default class SES {
  constructor(from, to, subject, body) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;

    this.client = ses.createClient({
      key: process.env.AWS_ACCESS_KEY,
      secret: process.env.AWS_SECRET_KEY,
      amazon: 'https://email.us-west-2.amazonaws.com',
    });
  }

  send() {
    return new Promise((resolve, reject) => {
      this.client.sendEmail({
        to: this.to.toString(),
        from: this.from.toString(),
        subject: this.subject,
        message: this.body,
      }, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }
}
