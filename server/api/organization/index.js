'use strict';

import {Router} from 'express';
import * as controller from './organization.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:organizationId', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasGlobalRole('admin'), controller.create);
router.patch('/:organizationId', auth.hasGlobalRole('admin'), controller.patch);

module.exports = router;
