const fs = require('fs');

const envFilePath = './environments/toolshop-ci.json';
const env = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));

const injections = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD
};

env.values = env.values.map(variable => {
  if (injections[variable.key]) {
    return { ...variable, value: injections[variable.key] };
  }
  return variable;
});

fs.writeFileSync(envFilePath, JSON.stringify(env, null, 2));
console.log('Credentials injected successfully into toolshop-ci.json');