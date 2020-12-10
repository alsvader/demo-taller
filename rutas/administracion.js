const express = require('express');

const router = express.Router();

router.get('/configuracion', (req, res) => {
  res.send('Esta es la conf del admin');
});

module.exports = router;
