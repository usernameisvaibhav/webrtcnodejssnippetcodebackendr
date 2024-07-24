// // // var express = require('express');
// // // var router = express.Router();

// // // /* GET home page. */
// // // router.get('/', function(req, res, next) {
// // //   res.render('index', { title: 'Express' });
// // // });

// // // module.exports = router;

// // const express = require("express");
// // const app = express();
// // const mongoose = require("mongoose");
// // const { MONGO_DB_CONFIG } = require("./config/app.config")
// // const http = require("http");
// // const server = http.createServer(app);
// // const { initMeetingServer } = require("./meeting-server");

// // initMeetingServer(server);

// // mongoose.Promise = global.Promise;

// // mongoose.connect(MONGO_DB_CONFIG.DB, {

// //     // useUnifiedTopology: true
// // })
// //     .then(() => {
// //         console.log("Database connected");
// //     }, (error) => {
// //         console.log(error);
// //     });

// // app.use(express.json());
// // app.use("/api", require("./routes/app.routes"),);
// // console.log("Routes Loaded");


// // server.listen(process.env.port || 4000, function () {
// //     console.log("Ready to Go")
// // })
// // console.log("Routes not workin");


// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const { MONGO_DB_CONFIG } = require("./config/app.config");
// const http = require("http");
// const server = http.createServer(app);
// const { initMeetingServer } = require("./meeting-server");

// initMeetingServer(server);

// mongoose.Promise = global.Promise;

// mongoose.connect(MONGO_DB_CONFIG.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log("Database connected");
//     })
//     .catch((error) => {
//         console.log("Database connection error:", error);
//     });

// app.use(express.json());
// app.use("/api", require("./routes/app.routes"));
// console.log("Routes Loaded");

// const port = process.env.PORT || 4000;
// server.listen(port, function () {
//     console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const http = require("http");
const server = http.createServer(app);
const { initMeetingServer } = require("./meeting-server");

initMeetingServer(server);

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Database connection error:", error);
    });

app.use(express.json());
app.use("/api", require("./routes/app.routes"));
console.log("Routes Loaded");

const port = process.env.PORT || 4000;
server.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});
