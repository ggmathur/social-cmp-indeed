JQFBPOST = {
    //https://graph.facebook.com/DisneyParksBlog/posts?limit=5&access_token=AAACEdEose0cBANZCjocDjDZCrHlDDmWG9kRFZCSCOmx56PIVvPXLSpSUmZCUMksK75ZCilUX1ElCgTwewAE1svEUaPPie5TkInjpSFmFg9ANIJY1mYNW1

    // Set twitter username, number of tweets & id/class to append tweets
    user: 'DisneyParksBlog',
    numPosts: 5,
    token: 'AAACEdEose0cBAG0HRI4xY3OUYqnzuqiNMogl85dku3bWHE75e9jk5lV8qDbOUrPj6u8ir3lD0eM69yfBJG7NlinOdQUFT0TXNqNPxa4Iydrf9ThZB',
    appendTo: '#jsfacebook',
 
    // core function of jqtweet
    loadPosts: function() {
        $.ajax({
            url: 'https://graph.facebook.com/'+JQFBPOST.user+'/posts/',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                limit: JQFBPOST.numPosts,
                access_token: JQFBPOST.token,
            },
            success: function(data, textStatus, xhr) {
                 var html = '<div class="post">POST_TEXT<div class="time">AGO</div>';
         
                 // append tweets into page
                 for (var i = 0; i < data.data.length; i++) {
                    $(JQFBPOST.appendTo).append(
                        /*
                        html.replace('POST_TEXT', JQFBPOST.ify.clean(data[i].text) )
                            .replace(/USER/g, data[i].from.name)
                            .replace('AGO', JQFBPOST.timeAgo(data[i].created_time) )
                            .replace(/ID/g, data[i].from.name)
                        */
                        html.replace('POST_TEXT', JQFBPOST.ify.clean(data.data[i].message) )
                            .replace(/USER/g, data.data[i].from.name)
                            .replace('AGO', JQFBPOST.timeAgo(data.data[i].created_time) )
                            .replace(/ID/g, data.data[i].from.name)
                    );
                 }                  
            }   
 
        });
         
    }, 
     
         
    /**
      * relative time calculator FROM TWITTER
      * @param {string} twitter date string returned from Twitter API
      * @return {string} relative time like "2 minutes ago"
      */
    timeAgo: function(dateString) {
        var rightNow = new Date();
        var then = new Date(dateString);
         
        if ($.browser.msie) {
            // IE can't parse these crazy Ruby dates
            then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
        }
 
        var diff = rightNow - then;
 
        var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
 
        if (isNaN(diff) || diff < 0) {
            return ""; // return blank string if unknown
        }
 
        if (diff < second * 2) {
            // within 2 seconds
            return "right now";
        }
 
        if (diff < minute) {
            return Math.floor(diff / second) + " seconds ago";
        }
 
        if (diff < minute * 2) {
            return "about 1 minute ago";
        }
 
        if (diff < hour) {
            return Math.floor(diff / minute) + " minutes ago";
        }
 
        if (diff < hour * 2) {
            return "about 1 hour ago";
        }
 
        if (diff < day) {
            return  Math.floor(diff / hour) + " hours ago";
        }
 
        if (diff > day && diff < day * 2) {
            return "yesterday";
        }
 
        if (diff < day * 365) {
            return Math.floor(diff / day) + " days ago";
        }
 
        else {
            return "over a year ago";
        }
    }, // timeAgo()
     
     
    /**
      * The Twitalinkahashifyer!
      * http://www.dustindiaz.com/basement/ify.html
      * Eg:
      * ify.clean('your tweet text');
      */
    ify:  {
      link: function(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
      },
 
      at: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
      },
 
      list: function(tweet) {
        return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
      },
 
      hash: function(tweet) {
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
      },
 
      clean: function(tweet) {
        return this.hash(this.at(this.list(this.link(tweet))));
      }
    } // ify
 
     
};

$(document).ready(function () {
    // start jqtweet!
    JQFBPOST.loadPosts();
});
