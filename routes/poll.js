const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '519214',
  key: '6c404551e69b77667b15',
  secret: '9e2274fecf7d6936d12e',
  cluster: 'us2',
  encrypted: true
});

router.get('/', (req, res) => {
	res.send('MAGIC');
});

router.post('/', (req, res) => {
	pusher.trigger('avenger-poll', 'avenger-vote', {
	  points: 1,
	  avenger: req.body.avenger
	});
	return res.json({success: true, message: 'Destiny arrives!'});
});

module.exports = router;