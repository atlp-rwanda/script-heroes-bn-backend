import express from 'express';
import asynchandler from '../../middlewares/asynchandler';
import UserRoleController from '../../controllers/role.controller';
import { roleAssignValidation } from '../../middlewares/validations/roleValidations';
import RoleMiddleware from '../../middlewares/role.middleware';
import AuthMiddleware from '../../middlewares/auth.middleware';

const { isSuperAdmin } = RoleMiddleware;
const router = express.Router();
router.post(
  '/role/assign',
  roleAssignValidation,
  AuthMiddleware.checkToken,
  isSuperAdmin,
  asynchandler(UserRoleController.assign)
);

export default router;
