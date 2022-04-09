const Router = require('express');
const router = new Router();

const authMiddleware = require('../middleware/auth.middleware.js');
const fileController = require('../controllers/fileController.js');

router.post('', authMiddleware, fileController.uploadAvatar);
router.delete('', authMiddleware, fileController.deleteAvatar);

module.exports = router;
