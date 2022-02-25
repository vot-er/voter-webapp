"use strict";

import { Router } from "express";
import * as controller from "./redirect.controller";

var router = new Router();

router.get("/:code", controller.redirect);

module.exports = router;
