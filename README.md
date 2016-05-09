# YHOO stock chart and CRUD

This repository consists of a Rails backend with a simple JSON API and an Ember.js client that charts the data and allows to perform CRUD operations. The root directory contains the Rails app and the `/frontend` directory the ember client.

## Running the applications

- Clone the repository: `$ git clone https://github.com/andres-fortier/visible.git`
- `cd` in the directory (if you are using RVM it should create the gemset and install the required ruby).

We will need two consoles, one to run each application.

In the Rails console:
- Install the required gems: `$ bundle install`
- Prepare the DB: `$ bin/rake db:reset`
- Run the server: `$ bin/rails s`

In the ember console:
- Go the the `/frontend` directory: `$ cd frontend`
- Install npm modules `$ npm install`
- Install bower modules `$ bower install`
- Run the ember server `$ ember serve`

You should now be able to point your browser to `http://localhost:4200/` and see the app running.
