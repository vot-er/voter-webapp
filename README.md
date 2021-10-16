# VotER Webapp

[Vot-ER](https://vot-er.org) is an organization at the crossroads of health and democracy that helps patients register to vote in healthcare settings. Vot-ER experienced rapid growth last year and partners with 500+ hospitals and 20,000+ healthcare workers to help register 50,000 voters. The VotER webapp is the primary platform for our healthcare partners to order Healthy Democracy Kits, learn how to help their patients register to vote, and track their impact.

## Get Started
1. **Initial Machine Setup**. First time running the starter kit? Then complete the [Initial Machine Setup](https://github.com/coryhouse/react-slingshot#initial-machine-setup).
2. **Clone the project**. `git clone https://github.com/vot-er/voter-webapp.git`.
3. **Install Yarn package manager** `npm install --global yarn`
4. **Install dependencies** `yarn install`
5. **Copy local environment file** Copy `server/config/local.env.sample.js` to `server/config/local.env.js` and point `DATABASE_URL` to your local Postgres database. Your postgres url will be set up during installation, and should be something like `postgresql://postgres:{password_here}}@localhost`. 
6. **Initialize the databse** `npm run postinstall` which will kick off the npm script `postinstall` (see `package.json`) to initialize the database on your local machine. 
7. **Run the example app**. `npm run dev -s`
This will run the automated build process, start up a webserver, and start up Jest testing. When doing development with this kit, this command will continue watching all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.
8. **Open in browser** Open in browser, by default `http://localhost:3000`

## Initial Machine Setup
1. **Install [Node 14.16.0](https://nodejs.org)** - Use [nvm](https://github.com/creationix/nvm) to manage multiple node environments
2. **Install [Git](https://git-scm.com/downloads)**.
3. **Install [Watchman](https://facebook.github.io/watchman/docs/install.html)**.
4. **Install [Postgres](https://www.postgresql.org/)**. Make sure it's running in the background.
5. **[Disable safe write in your editor](https://webpack.js.org/guides/development/#adjusting-your-text-editor)** to assure hot reloading works properly.
6. On a Mac? You're all set. If you're on Linux or Windows, complete the steps for your OS below.  

**On Linux:**  

 * Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

**On Windows:**

* **Install [Python](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
* **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows. [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler. Or, if you already have Visual Studio installed: Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

## Having Issues? Try these things first.
1. Make sure you ran all steps in [Get started](https://github.com/vot-er/voter-webapp/blob/master/README.md#get-started) including the [initial machine setup](https://github.com/vot-er/voter-webapp/blob/master/README.md#initial-machine-setup).
2. Run `npm install` - If you forget to do this, you'll see this: `babel-node: command not found`.
3. Make sure files with names that begin with a dot (.babelrc, .editorconfig, .eslintrc) are copied to the project directory root. This is easy to overlook if you copy this repository manually.
4. Don't run the project from a symbolic link. It may cause issues with file watches.
5. Delete any .eslintrc that you're storing in your user directory. Also, disable any ESLint plugin / custom rules that you've enabled within your editor. These will conflict with the ESLint rules defined in this project.
6. Make sure you don't have NODE_ENV set to production on your machine.
7. Tip: Things to check if you get an `npm run lint` error or build error:

    * If ESW found an error or warning in your project (e.g. console statement or a missing semi-colon), the lint thread will exit with `Exit status 1`. To fix:

      1. Change the `npm run lint` script to `"esw webpack.config.* src tools; exit 0"`
      1. Change the `npm run lint:watch` script to `"esw webpack.config.* src tools --watch; exit 0"`

      > Note: Adding `exit 0` will allow the npm scripts to ignore the status 1 and allow ESW to print all warnings and errors.

    * Ensure the `eslint`/`esw` globally installed version matches the version used in the project. This will ensure the `esw` keyword is resolved.

The starter kit includes a working example app that puts all of the above to use.
## Questions?
Check out the [FAQ](/docs/FAQ.md)
