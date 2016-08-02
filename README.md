# react-redux-meteor
A demo for using meteor (only) as your backend and react-redux as your frontend

## How to run

This app consists of a client and a server, we need to start both separately. This might sound trivial to you if you don't come from meteor 😉.

### Starting the client

This will start your a `webpack-dev-server` so you can access your frontend at http://localhost:8080
```sh
cd client
npm i
npm start
```

### Starting the backend

To start the meteor backend you first need to install meteor if you haven't already:
```sh
curl https://install.meteor.com/ | sh
```
Then you can start your backend by simply running the `meteor` command
