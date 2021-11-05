# VotER Webapp

[Vot-ER](https://vot-er.org) is an organization at the crossroads of health and democracy that helps patients register to vote in healthcare settings. Vot-ER experienced rapid growth last year and partners with 500+ hospitals and 20,000+ healthcare workers to help register 50,000 voters. The VotER webapp is the primary platform for our healthcare partners to order Healthy Democracy Kits, learn how to help their patients register to vote, and track their impact.


## Get Started

1. Clone this repository with `git clone git@github.com:vot-er/voter-webapp.git`
2. Install and run [Docker Desktop](https://www.docker.com/products/docker-desktop)
3. Install [VSCode](https://code.visualstudio.com/) and use it to open the repository
4. Install [VSCode Pluglin Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (or look up 'Remote - Containers' in Extensions in VSCode)
5. Copy `server/config/local.env.sample.js` to `server/config/local.env.js`
6. Open the VSCode workspace in a development container with `View > Command Palette > Remote-Containers: Reopen in Container` (or click the green symbol in the bottom left corner)
7. Migrate your database using `npm run migrate`
7. Seed data using `npm run seed`
8. Go to `localhost:3000` and log in with the username `admin@vot-er.org` and password `admin`


## Questions?
Check out the [FAQ](/docs/FAQ.md)
