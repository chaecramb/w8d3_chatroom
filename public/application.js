
$(document).ready(function() {

  function updateElement($element, content) {
    $($element).prepend(content);
  };

  $("#chat-form").on('submit', function(e){
    e.preventDefault();
    $('button').attr('disabled', 'disabled');
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
          updateElement($("ul"), '<li><span title=""><span class="username">&lt;' + message.username + '&gt;</span><span class="message"> ' + message.message + '</span></span></li>');
        });
        $("#since").val(data[data.length-1].timestamp);
        $("#message").val('');
      },
      complete: function(response) {
        console.log(response.responseText);
        setTimeout(function(){
          $('button').removeAttr('disabled');
        }, 1000);
      }
    });
  });


  postEmoticon = function(emoticon) {
    if($("img").hasClass('processing'))
              return;
    $("img").addClass('processing');

    var username = $("#username").val();
    var message = emoticon
    var since = $("#since").val();

    $.ajax({
      type: "POST",
      url: "/chat",
      data: {
        "username": username,
        "message": message,
        "since": since
      },
      success: function(data){
        $.each(data, function(i, message){
          updateElement($("ul"), '<li><span title=""><span class="username">&lt;' + message.username + '&gt;</span><span class="message"> ' + message.message + '</span></span></li>');
        });
        $("#since").val(data[data.length-1].timestamp);
        $("#message").val('');
      },
      complete: function(response) {
        setTimeout(function(){$("img").removeClass('processing');}, 1000);
      }
    });

  };

  $("#happy").on('click', function(){
    postEmoticon('<img class="emoticon" src="http://vignette4.wikia.nocookie.net/clubpenguin/images/c/c4/CPNext_Emoticon_-_Laughing_Face.png/revision/latest?cb=20140214222055">')
  });

  $("#wink").on('click', function(){
    postEmoticon('<img class="emoticon" src="http://img1.wikia.nocookie.net/__cb20140214223249/clubpenguin/images/e/e1/CPNext_Emoticon_-_Winking_Face.png">')
  });

  $("#love").on('click', function(){
    postEmoticon('<img class="emoticon" src="http://findicons.com/files/icons/2386/networking/256/emoticon_inlove.png">')
  });

});