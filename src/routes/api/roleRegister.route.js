import express from 'express';
import RoleRegisterController from '../../controllers/roleRegister.controller';
import asynchandler from '../../middlewares/asynchandler';
import { roleValidation } from '../../middlewares/validations/roleValidations';

const router = express.Router();
router.post('/role/register', roleValidation, asynchandler(RoleRegisterController.create));

export default router;
