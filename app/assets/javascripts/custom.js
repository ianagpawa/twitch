function startPage(){


  
  var onlineListingStart = '<div class="online-list"><ul class="list-inline info"><li style="float:left" class="status"> Status:</br>Online</li></ul></div>';
  var onlineInfo = '<li style="float" align="center" class="content"><a id="address" href="%address%" target="_blank">%data% is streaming %game%.</a></li>';
  var onlineLogo = "<li style='float:left'><a target='_blank' href='https://www.twitch.tv/%add%/profile'><img class='small-logo' src=%data%></a></li>"
  var offlineLi = '<div class="offline-list"><ul class="list-inline"><li style="float:left" class="status"> Status:</br>Offline</li><li style="float" class="content">%data%</li></ul></div>';
  var accountdeactivated = "<div class='deactivated-account'><ul class='deactivated-list list-inline'></ul></div>";
  var accountList = "<li>%data%</li>";
  
  var streamers = ["freecodecamp", 'OgamingSC2', "storbeck", "terakilobyte", 'streamerhouse', 'schviftyfive', "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", 'djwayfarer', 'comster404', 'broughy1322', 'brunofin'];
  
  function getAjax(username) {
    var addy = 'https://api.twitch.tv/kraken/streams/' + username;
    $.ajax({
        url: addy,
        dataType: "jsonp",
        success: function(data) {
            if (data.error) {  // no active account
              $(".deactivated:last").append(accountdeactivated);
              var change = accountList.replace("%data%", username + " has no active account.");
              $(".deactivated-list:last").append(change);
            } else { 
              if (data.stream) { //acount active
                $(".online").append(onlineListingStart);
                //logo
                var logo = data.stream.channel.logo;
                var formattedLogo = onlineLogo.replace("%data%", logo);
                var formattedProfile = formattedLogo.replace("%add%", username)
                $(".info:last").append(formattedProfile);     
                // channel info and username
                var channelName = data.stream.channel.name;
                var formattedUser = onlineInfo.replace("%data%", channelName);
                var content = data.stream.game;
                var formattedContent =  formattedUser.replace("%game%", content);
                var link = data.stream.channel.url;
                var formattedLink = formattedContent.replace("%address%", link);
                $(".info:last").append(formattedLink);
              } else { //account offline
                var change = offlineLi.replace("%data%", username + ' is not online at the moment.');
                $(".offline").append(change);
                $(".offfline:last").append(formattedLogo);
              } //if else online/offline
            } // no account?
          } //success
      }) //ajax
  } // function
  
  function twitchIt() {
    for (i = 0; i < streamers.length; i += 1) {
      var user = streamers[i];
      getAjax(user);
    } // for loop
  } // function
  
  window.onload = twitchIt;
  
  $("#all").on("click", function(){
    $(".online").show();
    $(".offline").show();
    $(".deactivated").show();
  });
  
  $("#on").on("click", function(){
    $(".online").show();
    $(".offline").css('display', 'none');
    $(".deactivated").css('display', 'none');
  })
  
  $("#off").on("click", function(){
    $(".offline").show();
    $(".online").css('display', 'none');
    $(".deactivated").css('display', 'none');
  })
  
  $("#de").on("click", function(){
    $(".deactivated").show();
    $(".offline").css('display', 'none');
    $(".online").css('display', 'none');
  })
  
}



$(document).ready(startPage);
$(document).on('page:load', startPage);