'use strict';

import {Router} from 'express';
import * as controller from './kit.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:kitId', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/bulk-assign', auth.isAuthenticated(), controller.bulkAssign);
router.patch('/:kitId', auth.isAuthenticated(), auth.hasGlobalRole('admin'), controller.patch);
router.patch('/:kitId/shipped', auth.isAuthenticated(), auth.hasGlobalRole('admin'), controller.patch);
router.patch('/:kitId/doNotFulfill', auth.isAuthenticated(), auth.hasGlobalRole('admin'), controller.patch);


module.exports = router;
