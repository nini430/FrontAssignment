import express from 'express';
import {
  createNewUser,
  deleteUser,
  fetchAllUsers,
  getUserStatisticForCountry,
  updateUser,
} from '../controllers/user';

const router = express.Router();

router.route('/').get(fetchAllUsers).post(createNewUser);
router.route('/statistics').get(getUserStatisticForCountry);
router.route('/:id').put(updateUser).delete(deleteUser);

export default router;
