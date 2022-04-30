const weather = require('cloudza-sdk');
weather.setApiKey('5eb24fdbd4f1b1e1c95c34be84d2915f');

weather.getWeather().then(console.log).catch(console.log);
