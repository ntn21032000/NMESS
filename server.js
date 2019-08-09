var express = require("express");
var app = express();

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

var Username = '';
var Password = '';
var ArUser = [];
var ArMess = [];
var L = '';

io.on("connection", function (socket) {
  setTimeout(function(){
    io.sockets.emit("server-online-user", {ArUser:ArUser, NameUser:ArUser[ArUser.length-1]});
    // console.log(ArUser[ArUser.length-1]);

    io.sockets.emit("user-message", ArMess);
  }, 1000);

  setTimeout(function(){
    if (L == 'H') {
      socket.emit("get-inf");
    }
  }, 1100);

  socket.on("inf-client", function (data) {
    socket.nameSK = data;
  });
  // console.log("co nguoi kn : " + socket.id);
  // console.log(ArUser);
  // console.log(ArUser[ArUser.length-1]);

  Username = '';
  Password = '';

  socket.on("client-login", function (data) {
    if (ArUser.indexOf(data.Name) >=0 ) {
      socket.emit("login-fail");
    }
    else {
      Username = data.Username;
      Password = data.Password;
      ArUser.push(data.Name);
    }

  });



  // socket.on("client-req-online-users",function () {
  //   io.sockets.emit("server-online-user", {ArUser:ArUser, NameUser:NameUser});
  // });

  socket.on("client-send-message", function (data) {
    ArMess.push({NAME:data.NameUser, MESSAGE:data.Message});

    io.sockets.emit("user-message", ArMess);
  });

  socket.on("logout", function () {
    ArUser.splice(
      ArUser.indexOf(socket.nameSK), 1
    );

    socket.broadcast.emit("client-logout", ArUser);
  });

  socket.on("disconnect", function () {
    if (L == 'H') {
      ArUser.splice(
        ArUser.indexOf(socket.nameSK), 1
      );

      socket.broadcast.emit("client-logout", ArUser);
    }
  });

});

app.get("/login", function (req, res) {
  res.render("login");
  L = 'L';
});

app.get("/home",function (req, res) {
    if (Username == 'nn' && Password == 'na') {
      res.render("home");
      setTimeout(function(){L = 'H';}, 1000);
    }
    else {
      res.render("login");
      L = 'L';
    }
});
