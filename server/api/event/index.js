import {Router} from 'express';
import * as controller from './event.controller';

var router = new Router();

router.post('/', controller.create);
