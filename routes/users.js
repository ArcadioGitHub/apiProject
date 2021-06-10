import express from 'express';
import {getUsers, createUsers, deleteUser, getUser, updateUser} from '../controllers/users.js'
const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUsers);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;