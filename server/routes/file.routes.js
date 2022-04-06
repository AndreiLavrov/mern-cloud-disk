const Router = require('express');
const router = new Router();

const authMiddleware = require('../middleware/auth.middleware.js');
const fileController = require('../controllers/fileController.js');

router.post('', authMiddleware, fileController.createDir);
router.get('', authMiddleware, fileController.getFiles);
router.post('/upload', authMiddleware, fileController.uploadFile);

module.exports = router;
