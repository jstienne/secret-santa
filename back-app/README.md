This project contains 2 parts : front-app and back-app.

## Build and start the front app

To build the front app, you must run the following commands from the front-app folder:
```
npm install
npm run build
```

## Build and start the back app

To launch the database, you must run the following command from the back-app folder:
```
docker-compose up -d
```

To build the back app, you must run the following command from the back-app folder:
```
npm i -D ts-node-dev
npm install
```

To start the back app, you must run the following command from the back-app folder:
```
npm start
```