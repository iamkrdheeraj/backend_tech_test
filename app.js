const express = require('express');
const app = express();
const appConfig=require("./config/appConfig");
const appRouter=require('./route/appRoute');
appRouter.setAppRouter(app);

app.listen(appConfig.port, () => {
    console.log("Listening application on port");

})
