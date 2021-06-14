import express from 'express';
import {getUsers, createUsers, deleteUser, getUser, updateUser, deleteUsers} from '../controllers/users.js'
const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUsers);

router.delete('/deleteUsers', deleteUsers);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;