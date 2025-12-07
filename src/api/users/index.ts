import express from 'express';

import controller from './controllers/users.controller.js';

const router = express.Router();

router.get('/', controller.getUsers);
router.put('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);
export default router;
