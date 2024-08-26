import express from 'express';
import { getUser, createUser, deleteUser, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUser);       // GET request to get all users
router.post('/', createUser);   // POST request to create a new user
router.delete('/:id', deleteUser); // DELETE request to delete a user by ID
router.patch('/:id', updateUser);  // PATCH request to update a user by ID

export default router;
