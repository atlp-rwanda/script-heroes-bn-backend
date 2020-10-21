import { Router } from 'express';
import HostAccomodation from '../controllers/hostAccomodation';
import AuthMiddleware from '../middlewares/auth.middleware';
import { validateHostAccomodation } from '../middlewares/validations/hostAccomodationValidation';
import Host from '../middlewares/hostAccomodation';

const router = Router();
const hostAccomodation = new HostAccomodation();
const host = new Host();

router.get(
  '/accomodations',
  AuthMiddleware.checkToken,
  hostAccomodation.getAll
);
router.get(
  '/accomodations/:id',
  AuthMiddleware.checkToken,
  hostAccomodation.getOne
);
router.post(
  '/accomodations',
  AuthMiddleware.checkToken,
  validateHostAccomodation,
  host.host,
  hostAccomodation.create
);
router.put(
  '/accomodations/:id',
  AuthMiddleware.checkToken,
  host.host,
  hostAccomodation.update
);
router.delete(
  '/accomodations/:id',
  AuthMiddleware.checkToken,
  host.host,
  hostAccomodation.delete
);

export default router;
