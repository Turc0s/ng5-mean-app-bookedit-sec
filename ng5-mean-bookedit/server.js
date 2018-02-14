var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

// mongoose
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost:23100/mean-angular5", { promiseLibrary: require("bluebird")})
        .then(() => console.log("Connection successfull"))
        .catch((err) => console.log(err));

var book = require("./routes/book");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : "false"}));
app.use(express.static(path.join(__dirname, "dist")))
// app.use("/book", express.static(path.join(__dirname, "dist")));
app.use("/book", book);

// 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

const port = 3000;

app.listen(port, () => {
    console.log("Server started at port: " + port);
});



// error handler
// app.use((err, req, res, next) => {
//     // set local, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};
// });



module.exports = app;
