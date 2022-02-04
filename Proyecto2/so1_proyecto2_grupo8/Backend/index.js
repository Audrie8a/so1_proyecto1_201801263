const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const Patient = require('./models/Patient');
const redisConn = require('./helpers/redisConn')
const Redis = require('ioredis');
const redis = new redisConn();
// Constants
const PORT = 3000;

//Public directory
app.use(express.static('public'));

//Middlewares
app.use(express.json());
app.use(cors());

// App
const server = require('http').createServer(app);
const wsServer = require('socket.io').Server;
const { resolve } = require('path/posix');
const { response } = require('express');

const io = new wsServer(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {

  console.log('Nueva conexion:', socket.id);

  setInterval(() => {
    Patient.aggregate([
      {
        '$match': {
          'n_dose': 2
        }
      }, {
        '$group': {
          '_id': '$location', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }, {
          $limit: 3
      }
    ], {}, (_, resp) => {
      socket.emit('top', resp);
    });
  }, 1000);

  setInterval(() => {
    Patient.aggregate([
      {
        '$match': {
          'n_dose': 1
        }
      }, {
        '$group': {
          '_id': '$location', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }
    ], {}, (_, resp) => {
      socket.emit('circle1', resp);
    });
  }, 1000);

  setInterval(() => {
    Patient.aggregate([
      {
        '$match': {
          'n_dose': 2
        }
      }, {
        '$group': {
          '_id': '$location', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }
    ], {}, (_, resp) => {
      socket.emit('circle2', resp);
    });
  }, 1000);

  setInterval(() => {
    Patient.find({}, (_, resp) => {
      socket.emit('data', resp);
    });
  }, 1000);
  
  setInterval(() => {
    redis.client.sendCommand(new Redis.Command('lrange', ['myList', '0', '-1'], 'utf-8', async (err, result) => {
      if(err) throw err;
      const valores = result.map(element => {
        return JSON.parse(element.toString());
      });
      socket.emit('redis', valores);
    }));
  }, 1000)

});

// const llaves = () => {
//   return new Promise((resolve, reject) => {
//     redis.client.sendCommand(new Redis.Command('keys', ['*'], 'utf-8', async (err, result) => {
//       if(err) reject(err);
//       let keys = [];
//       result.forEach(element => {
//         keys.push(element.toString());
//       });
//       for (let i = 0; i < keys.length; i++ ){
//         if (val.length === 0) {
//           val.push(await redis.get(keys[i]));
//         }else {
//           val[i] = await redis.get(keys[i]);
//         }
//       }
//       socket.emit('redis2', val);
//     }));
//   });
// }

// llaves()
// .then((llaves) => {
// })
// .catch(err => {
//   console.error(err);
// });
// const pipeline = redis.client.pipeline();
// redis.client.exec(["keys", "*"], (err, res) => {
//   if (err) throw err;
//   console.log(res);
// });

//Redirect to public dir
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});



server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});