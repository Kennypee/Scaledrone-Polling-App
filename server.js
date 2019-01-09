
const express = require('express');
const bodyParser = require('body-parser');
const Scaledrone = require('scaledrone-node-push');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res) => {
  res.send(req.body)

});

app.post('/vote', (req, res) => {
  // const sd = new Scaledrone({
  //   channelId: 'AfdKeFBcrOpY48AO',
  //   secretKey: 'RV8stYmPx5UcusGfDNYmpdzkmhyCg1FG'
  // });
  const data = { player: req.body.playerId }
  res.json({
    vote: data
  })
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});