require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

const Scaledrone = require('scaledrone-node-push');
const sd = new Scaledrone({
  channelId: 'AfdKeFBcrOpY48AO',
  secretKey: 'RV8stYmPx5UcusGfDNYmpdzkmhyCg1FG'
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


app.post('/vote', (req, res) => {
    const { body } = req
    console.log(body)
    const room = 'live-votes';
    const response = {
      id: body.vote.player_id
    }
    console.log(response.id)
    sd.publish(room, response.id, error => {
    // check for errors
    if(error){
        console.log(error);
    } else {
      res.json({
        player_id: body
      })
    }
  });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});





// const express = require('express');
// const bodyParser = require('body-parser');
// const Scaledrone = require('scaledrone-node-push');
// const app = express();
// const port = process.env.PORT || 4000;
// const cors = require("cors");
// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use((req, res) => {
//   res.send(req.body)

// });
// const sd = new Scaledrone({
//   channelId: 'AfdKeFBcrOpY48AO',
//   secretKey: 'RV8stYmPx5UcusGfDNYmpdzkmhyCg1FG'
// });

// // app.get('/auth/:clientId', function(req, res) {
// //   if (hasChannelAccess(req)) {
// //     const payload = {
// //       client: req.params.clientId,
// //       channel: CHANNEL_ID,
// //       permissions: {
// //         '^live-votes$': {
// //           publish: false,
// //           subscribe: true,
// //         },
// //       },
// //       exp: Math.floor(Date.now() / 1000) + 60 * 3 // client has to use this token within 3 minutes
// //     };
// //     const token = jwt.sign(payload, CHANNEL_SECRET, {algorithm: 'HS256'});
// //     res.status(200).end(token);
// //   } else {
// //     res.status(403).end('Sorry! You are not allowed.');
// //   }
// // });
// // function hasChannelAccess(req) {
// //   if(req){
// //     console.log(req)
// //     return true;
// //   }else console.log("request error" + req)
// //   // You could query your user from your database and see if they are allowed to
// //   // connect or give them user-scoped access using JWT permissions
  
// // }

// app.post('/vote', (req, res) => {

//   sd.publish({
//     room: "live-votes",
//     message: req.body.playerId
//   })

//   const data = { player: req.body.playerId }
//   console.log(data)
//   res.json({
//     vote: data
//   })
// });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });