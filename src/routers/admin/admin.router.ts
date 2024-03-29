//NPM packages imports
import express from 'express';

// Validators
import createInspectorValidator from '../../utils/validators/admin/forms/create-inspector.form.validator';
import editInspectorValidator from '../../utils/validators/admin/forms/edit-inspector.form.validator';

// Controllers imports
import * as driverController from '../../controllers/driver/driver.controller';
import * as inspectorController from '../../controllers/inspector/inspector.controller';
import * as addressController from '../../controllers/address/address.controller';
import * as historyController from '../../controllers/history/history.controller';

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                 GET ROUTES                                 */
/* -------------------------------------------------------------------------- */
router.get('/get/drivers/all', driverController.getAllDrivers);
router.get('/get/drivers/count', driverController.getDriversCount);
router.get('/get/inspectors/all', inspectorController.getAllInspectors);
router.get('/get/inspectors/count', inspectorController.getInspectorsCount);
router.get('/get/addresses/all', addressController.getAddresses);
router.get('/get/addresses/count', addressController.getAddressesCount);
router.get('/get/earnings/today', historyController.getEarningsToday);
router.get(
  '/get/earnings/last-seven-days',
  historyController.getEarningsLastSevenDays
);
router.get(
  '/get/earnings/last-four-weeks',
  historyController.getEarningsLastFourWeeks
);
router.get(
  '/get/earnings/last-six-months',
  historyController.getEarningsLastSixMonths
);
router.get(
  '/get/drivers/last-seven-days',
  historyController.getDriversLastSevenDays
);
router.get(
  '/get/drivers/last-four-weeks',
  historyController.getDriversLastFourWeeks
);
router.get(
  '/get/cards-distribution/today',
  historyController.getCardsDistributionToday
);
router.get('/delete/driver/:driverId', driverController.deleteDriver);
router.post(
  '/inspectors/create',
  createInspectorValidator,
  inspectorController.createInspector
);
router.get(
  '/delete/inspector/:inspectorId',
  inspectorController.deleteInspector
);
router.post(
  '/inspectors/update/:inspectorId',
  editInspectorValidator,
  inspectorController.editInspector
);
router.post('/address/create', addressController.createAddress);
router.post('/edit/address/:addressId', addressController.editAddress);
router.get('/delete/address/:addressId', addressController.deleteAddress);

export { router as adminMainRouter };
