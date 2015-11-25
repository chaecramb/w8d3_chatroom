
$(document).ready(function() {



  // function updateElement($element, content) {
  //   $($element).prepend('<li><span title=' + content.since + '><span class="username">&lt;' + content.username + '&gt;</span><span class="message">' + content.message + '</span></span></li>');
  // };


  $("#chat-form").on('submit', function(e){
    e.preventDefault();
    console.log("form submitted");

    var username = $("#username").val();
    var message = $("#message").val();
    var since = $("#since").val();
    console.log(username + " " + message + " " + since);

    $.ajax({
      type: "POST",
      url: "/chat",
      data: {
        "username": username,
        "message": message,
        "since": since
      },
      success: function(data){
        console.log("that all worked fine");
        console.log(data);
        $.each(data, function(i, message){
          $("ul").prepend('<li><span title=""><span class="username">&lt;' + message.username + '&gt;</span><span class="message">' + message.message + '</span></span></li>');
        });
        $("#since").val(data[data.length-1].timestamp);
        $("#message").val('');
      },
      complete: function(response) {
        console.log(response.responseText);

      }
    });
    
  });



});