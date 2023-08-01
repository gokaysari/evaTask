const express = require('express');
const router = express.Router();
const shareController = require('../controllers/shareController');

// Route to get all shares
router.get('/', shareController.getAllShares);

// Route to get a share by its symbol
router.get('/:symbol', shareController.getShareBySymbol);

// Route to create a new share
router.post('/', shareController.createShare);

// Route to update an existing share
router.put('/:symbol', shareController.updateShare);

// Route to delete a share
router.delete('/:symbol', shareController.deleteShare);

module.exports = router;
