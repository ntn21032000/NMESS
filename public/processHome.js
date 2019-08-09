var socket = io("https://nmess.herokuapp.com");
//https://nmess.herokuapp.com
var Inf = '';
var D = '';
var S = '';
var M = '';
var H = '';

socket.on("server-online-user", function (data) {
  $("#online_user").html("");
  if ( $("#nameTitle span").text() == 'Chat with NMESS') {
    $("#nameTitle span").html("");
    $("#nameTitle span").append(data.NameUser);
  }
  //alert($("#nameTitle span").text());
  data.ArUser.forEach(function (i) {
    //alert('aaaaaa');
    $("#online_user").append(
      "<li>"+
        "<div class='d-flex bd-highlight'>"+
          "<div class='img_cont'>"+
            "<img src='img/red-shopping.jpg' class='rounded-circle user_img'>"+
            "<span class='online_icon'></span>"+
          "</div>"+
          "<div class='user_info'>"+
            "<span>" + i +"</span>"+
            "<p>" + $("#nameTitle span").text() + " online" + "</p>"+
          "</div>"+
        "</div>"+
      "</li>"
    );
  });
});

socket.on("user-message", function (data) {
  $("#messages").html("");
  // console.log(NameUser);
  data.forEach(function (user_messages) {
    if ($("#nameTitle span").text() != user_messages.NAME) {
      $("#messages").append(
        "<div class='d-flex justify-content-start mb-4'>"+
          "<div class='img_cont_msg'>"+
            "<img src='img/red-shopping.jpg' class='rounded-circle user_img_msg'>"+
          "</div>"+
          "<div class='msg_cotainer'>"+
            user_messages.MESSAGE +
            "<span class='msg_time'>"+
            H+":"+M+":"+S+
            "</span>"+
          "</div>"+
        "</div>"
      );
    } else {
      $("#messages").append(
        "<div class='d-flex justify-content-end mb-4'>"+
          "<div class='msg_cotainer_send'>"+
            user_messages.MESSAGE +
            "<span class='msg_time'>"+
            H+":"+M+":"+S+
            "</span>"+
          "</div>"+
          "<div class='img_cont_msg'>"+
        "<img src='img/red-shopping.jpg' class='rounded-circle user_img_msg'>"+
          "</div>"+
        "</div>"
      );
    }
  });
});

socket.on("get-inf", function () {
  Inf = $("#nameTitle span").text();
  socket.emit("inf-client", Inf);
});

socket.on("client-logout", function (data) {
  $("#online_user").html("");
  data.forEach(function (i) {
    $("#online_user").append(
      "<li>"+
        "<div class='d-flex bd-highlight'>"+
          "<div class='img_cont'>"+
            "<img src='img/red-shopping.jpg' class='rounded-circle user_img'>"+
            "<span class='online_icon'></span>"+
          "</div>"+
          "<div class='user_info'>"+
            "<span>" + i +"</span>"+
            "<p>" + $("#nameTitle span").text() + " online" + "</p>"+
          "</div>"+
        "</div>"+
      "</li>"
    );
  });
});

$(document).ready(function(){
  $('#action_menu_btn').click(function(){
	  $('.action_menu').toggle();
  });

  // socket.emit("client-req-online-users");

  $("#btnSend").click(function () {
    socket.emit("client-send-message",{NameUser:$("#nameTitle span").text(), Message:$("#txtMessage").val()});
    $("#txtMessage").val("");

    D = new Date();
    S = D.getSeconds();
    M = D.getMinutes();
    H = D.getHours();
  });

  $("#btnLogout").click(function () {
    socket.emit("logout");
  });

});
