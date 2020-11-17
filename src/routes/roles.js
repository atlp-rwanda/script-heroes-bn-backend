import express from 'express';
import asynchandler from '../middlewares/asynchandler';
import UserRoleController from '../controllers/role.controller';
import RoleMiddleware from '../middlewares/role.middleware';
import AuthMiddleware from '../middlewares/auth.middleware';
import {
  roleAssignValidation,
  roleValidation
} from '../middlewares/validations/roleValidations';

const { isSuperAdmin } = RoleMiddleware;
const router = express.Router();
router.post(
  '/assign',
  AuthMiddleware.checkToken,
  roleAssignValidation,
  isSuperAdmin,
  asynchandler(UserRoleController.assign)
);

router.post(
  '/register',
  AuthMiddleware.checkToken,
  isSuperAdmin,
  roleValidation,
  asynchandler(UserRoleController.create)
);

router.get(
  '/',
  AuthMiddleware.checkToken,
  isSuperAdmin,
  asynchandler(UserRoleController.getRoles)
);

router.get(
  '/:id',
  AuthMiddleware.checkToken,
  isSuperAdmin,
  RoleMiddleware.oneRole,
  asynchandler(UserRoleController.getRole)
);

router.patch(
  '/:id',
  AuthMiddleware.checkToken,
  isSuperAdmin,
  RoleMiddleware.oneRole,
  roleValidation,
  asynchandler(UserRoleController.updateRole)
);

router.delete(
  '/:id',
  AuthMiddleware.checkToken,
  isSuperAdmin,
  RoleMiddleware.oneRole,
  asynchandler(UserRoleController.deleteRole)
);

export default router;
