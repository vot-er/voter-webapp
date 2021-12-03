# VotER Webapp

[Vot-ER](https://vot-er.org) is an organization at the crossroads of health and democracy that helps patients register to vote in healthcare settings. Vot-ER experienced rapid growth last year and partners with 500+ hospitals and 20,000+ healthcare workers to help register 50,000 voters. The VotER webapp is the primary platform for our healthcare partners to order Healthy Democracy Kits, learn how to help their patients register to vote, and track their impact.

## Get Started
<<<<<<< HEAD
1. **Initial Machine Setup**. First time running the starter kit? Then complete the [Initial Machine Setup](https://github.com/coryhouse/react-slingshot#initial-machine-setup).
2. **Clone the project**. `git clone https://github.com/vot-er/voter-webapp.git`.
3. **Install Yarn package manager** `npm install --global yarn`
4. **Copy local environment file** Copy `server/config/local.env.sample.js` to `server/config/local.env.js` and point `DATABASE_URL` to your local Postgres database. Your postgres url will be set up during installation, and should be something like `postgresql://postgres:{password_here}}@localhost`. If you encounter trouble during with postgres, try connecting to psql (Windows: `psql -U postgres`, linux: `sudo -u postgres psql`,), creating a new user with an easy password by running a command like `CREATE USER user1 WITH password pw123;` then creating an empty database with `create DATABASE dev;`. For `DATABASE_URL` in `server/config/local.env.js`, you should have DATABASE_URL: `postgresql://user1:pw123@localhost/dev` (subbing in any changes you made to the username or password).
5. **Install dependencies** `yarn install`
6. **Initialize the database** `npm run postinstall` which will kick off the npm script `postinstall` (see `package.json`) to initialize the database on your local machine. 
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
=======

1. Clone this repository with `git clone git@github.com:vot-er/voter-webapp.git`
2. Install and run [Docker Desktop](https://www.docker.com/products/docker-desktop)
3. Install [VSCode](https://code.visualstudio.com/) and use it to open the repository
4. Install [VSCode Pluglin Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (or look up 'Remote - Containers' in Extensions in VSCode)
5. Copy `server/config/local.env.sample.js` to `server/config/local.env.js`
6. Open the VSCode workspace in a development container with `View > Command Palette > Remote-Containers: Reopen in Container` (or click the green symbol in the bottom left corner)
7. Migrate your database using `yarn install`
8. Migrate your database using `yarn run migrate`
9. Seed data using `yarn run seed`
10. Go to `localhost:3000` and log in with the username `admin@example.com` and password `admin`
>>>>>>> main

## Questions?

Check out the [FAQ](/docs/FAQ.md)
