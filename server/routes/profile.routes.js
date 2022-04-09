const Router = require('express');
const router = new Router();

const authMiddleware = require('../middleware/auth.middleware.js');
const fileController = require('../controllers/fileController.js');

router.post('/avatar', authMiddleware, fileController.uploadAvatar);
router.delete('/avatar', authMiddleware, fileController.deleteAvatar);

module.exports = router;
