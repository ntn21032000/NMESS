var socket = io("https://nmess.herokuapp.com");
// https://nmess.herokuapp.com
socket.on("login-fail", function () {
  alert("Tên bị trùng");
})

$(document).ready(function(){
  $("#btnLogin").click(function () {
    if($("#txtUsername").val() == 'nn' && $("#txtPassword").val() == 'na')
    {
      socket.emit("client-login", {Username:$("#txtUsername").val(), Password:$("#txtPassword").val(),Name:$("#txtName").val()});
      url = "https://nmess.herokuapp.com/home";
      // https://nmess.herokuapp.com
      window.location = url;
    }
  });

});
