const mongoose = require('mongoose');
const { Logger } = require('ta-common');

const logger = Logger.getLogger('mongoose');

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', logger.error);
db.once('open', async () => {
  logger.info('connection open');

  const kittySchema = new mongoose.Schema({
    name: String,
    tag: Number,
    no: {
      type: String,
      alias: 'serialNumber'
    }
  });
  kittySchema.methods.speak = function () {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    logger.info(greeting);
  };
  kittySchema.virtual('formal').get(function () {
    return `${this.tag} (${this.name})`;
  }).set(function (v='') {
    this.tag = v.substring(0, v.indexOf(' '));
    this.name = v.substring(v.indexOf('(') + 1, v.indexOf(')'));
  });

  const Kitten = mongoose.model('w', kittySchema);

  const silence = new Kitten({ name: 'Silence', tag: 23393 });
  silence.speak();
  logger.info(silence.formal);

  const fluffy = new Kitten({ name: 'fluffy', tag: 30902 });
  fluffy.speak();

  fluffy.formal = '20033 (mobile)';

  logger.info(JSON.stringify(fluffy.toJSON({ virtuals: true })));
  logger.info(fluffy.toString());

  const charge = new Kitten({ name: 'Charge', tag: 43982, serialNumber: '39jmd0ci19ekd' });
  logger.info(charge.serialNumber);
  logger.info(charge.no);

  // await fluffy.save();
  // fluffy.speak();

  // fluffy.save((err, fluffy) => {
  //   if (err) return logger.error(err);
  //   fluffy.speak();
  // });

  // const kittens = await Kitten.find();
  // logger.info(kittens);

  // Kitten.find((err, kittens) => {
  //   if (err) return logger.error(err);
  // });

  // const matchedKittens = await Kitten.find({ name: /^fluff/ });
  // logger.info(matchedKittens);

  // Kitten.find({ name: /^fluff/ }, (err, kitten) => {
  //   if (err) return logger.error(err);
  //   logger.info(kitten);
  //   // kitten.forEach(item => item.remove());
  // });

  // kittens.forEach(async item => await item.remove());

  db.close();
});

