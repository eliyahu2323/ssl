const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });
const app = require('./app');

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const fs = require('fs');
const https = require('https');
const path = require('path');

const keyPath = path.resolve(__dirname, 'eliyahu.key');
const certPath = path.resolve(__dirname, 'eliyahu.crt');
console.log('Key path:', keyPath);
console.log('Cert path:', certPath);

app.get('/', (req, res) => {
  res.send('Hello, HTTPS world!');
});

let key, cert;

try {
  key = fs.readFileSync(keyPath, 'utf8');
  cert = fs.readFileSync(certPath, 'utf8');
} catch (err) {
  console.error('Error reading SSL/TLS files:', err);
  process.exit(1); // Exit the process with an error code
}

const options = { key, cert, passphrase: 'eliyahu2079' };

https.createServer(options, app).listen(8080, () => {
  console.log('HTTPS Server is running on port 8080');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(`UNHADLER REJECTION 💥 Shuting down...`);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
