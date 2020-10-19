import express from 'express';
import forgot from '../controllers/forgotPassword';
import reset from '../controllers/resetPassword';
import asyncHandler from '../middlewares/asynchandler';
import resetEmailValidator from '../middlewares/validations/reset-checkEmail';
import resetPasswordValidator from '../middlewares/validations/reset-checkPassword';

const passwordRouter = express.Router();

passwordRouter
  .post('/forgotPassword', resetEmailValidator, asyncHandler(forgot.forgot))
  .post(
    '/resetPassword/:theToken',
    resetPasswordValidator,
    asyncHandler(reset.reset)
  );

export default passwordRouter;
