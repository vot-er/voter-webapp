import {Router} from 'express';
import * as controller from './user.controller';

var router = new Router();

router.post('/', controller.create);
