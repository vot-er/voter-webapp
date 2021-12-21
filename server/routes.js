/**
 * Main application routes
 */

"use strict";

import errors from "./components/errors";
import path from "path";
import cors from "cors";

export default function (app) {
  // Insert routes below

  app.use("/api/users", require("./api/user"));
  app.use("/api/kits", require("./api/kit"));
  app.use("/api/organizations", require("./api/organization"));

  app.options("/api/events", cors());
  app.use("/api/events", cors(), require("./api/event"));

  app.use("/auth", require("./auth").default);

  // All undefined asset or api routes should return a 404
  app
    .route("/:url(api|auth|components|app|bower_components|assets)/*")
    .get(errors[404]);

  // All other routes should redirect to the app.html
  app.route("/*").get((req, res) => {
    if (app.get("env") === "production") {
      res.render(path.resolve(`${app.get("appPath")}/index.html`));
    } else {
      res.render(path.resolve(`${app.get("appPath")}/index.js`));
    }
  });
}
