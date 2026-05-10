const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function setup() {
  const secret = crypto.randomBytes(32).toString('hex');
  const envPath = path.join(__dirname, '../../.env.local');
  
  const content = `CRON_SECRET=${secret}\n`;
  
  if (fs.existsSync(envPath)) {
    console.log('.env.local already exists. Here is a secret you can add manually:');
    console.log(content);
  } else {
    fs.writeFileSync(envPath, content);
    console.log('.env.local created with a new CRON_SECRET.');
  }
}

setup();
