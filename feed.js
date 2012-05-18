JQTWEET = {
    // Set twitter username, number of tweets & id/class to append tweets
    user: 'DisneyParks',
    numTweets: 5,
    appendTo: '#jstwitter',
 
    // core function of jqtweet
    loadTweets: function() {
        /*
        $.ajax({
            url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                screen_name: JQTWEET.user,
                include_rts: true,
                count: JQTWEET.numTweets,
                include_entities: true
            },
            success: function(data, textStatus, xhr) {
 
                 var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';
         
                 // append tweets into page
                 for (var i = 0; i < data.length; i++) {
                    $(JQTWEET.appendTo).append(
                        html.replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text) )
                            .replace(/USER/g, data[i].user.screen_name)
                            .replace('AGO', JQTWEET.timeAgo(data[i].created_at) )
                            .replace(/ID/g, data[i].id_str)
                    );
                 }                  
            }   
 
        });
        */
        cleanData();
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
    JQTWEET.loadTweets();
});

function cleanData() {
     var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';

     data = [{
  "created_at": "Thu May 17 22:59:56 +0000 2012",
  "id": 203258580281999361,
  "id_str": "203258580281999361",
  "text": "@DisneyParks Blog author Gary received his @StarWars \"Carbon-Freeze Me\" from @waltdisneyworld. What do you think? http:\/\/t.co\/466KgrQk",
  "source": "\u003ca href=\"http:\/\/yfrog.com\" rel=\"nofollow\"\u003eYfrog\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": 29484644,
  "in_reply_to_user_id_str": "29484644",
  "in_reply_to_screen_name": "DisneyParks",
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 13,
  "entities": {
    "hashtags": [],
    "urls": [{
      "url": "http:\/\/t.co\/466KgrQk",
      "expanded_url": "http:\/\/yfrog.com\/69h1idj",
      "display_url": "yfrog.com\/69h1idj",
      "indices": [114, 134]
    }],
    "user_mentions": [{
      "screen_name": "DisneyParks",
      "name": "Disney Parks",
      "id": 29484644,
      "id_str": "29484644",
      "indices": [0, 12]
    }, {
      "screen_name": "starwars",
      "name": "Star Wars",
      "id": 20106852,
      "id_str": "20106852",
      "indices": [43, 52]
    }, {
      "screen_name": "WaltDisneyWorld",
      "name": "Walt Disney World",
      "id": 15220473,
      "id_str": "15220473",
      "indices": [77, 93]
    }]
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Thu May 17 20:57:23 +0000 2012",
  "id": 203227741200465921,
  "id_str": "203227741200465921",
  "text": "Mandy Monorail can't wait to welcome her new #CarsLand friends to Disney California Adventure.  via http:\/\/t.co\/CZs9yRaJ",
  "source": "\u003ca href=\"http:\/\/yfrog.com\" rel=\"nofollow\"\u003eYfrog\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 13,
  "entities": {
    "hashtags": [{
      "text": "CarsLand",
      "indices": [45, 54]
    }],
    "urls": [{
      "url": "http:\/\/t.co\/CZs9yRaJ",
      "expanded_url": "http:\/\/fro.gy\/1xv8j",
      "display_url": "fro.gy\/1xv8j",
      "indices": [100, 120]
    }],
    "user_mentions": []
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Thu May 17 20:47:00 +0000 2012",
  "id": 203225125758320640,
  "id_str": "203225125758320640",
  "text": "VIDEO: #DisneysArt of Animation Resort opens two weeks from today! http:\/\/t.co\/WlUKyfR9",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 12,
  "entities": {
    "hashtags": [{
      "text": "DisneysArt",
      "indices": [7, 18]
    }],
    "urls": [{
      "url": "http:\/\/t.co\/WlUKyfR9",
      "expanded_url": "http:\/\/bit.ly\/LbbwOf",
      "display_url": "bit.ly\/LbbwOf",
      "indices": [67, 87]
    }],
    "user_mentions": []
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Thu May 17 18:32:34 +0000 2012",
  "id": 203191296272244736,
  "id_str": "203191296272244736",
  "text": "Star Wars Weekends kicks off tomorrow at Disney's Hollywood Studios. Are you planning a trip to #sww2012?",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 26,
  "entities": {
    "hashtags": [{
      "text": "sww2012",
      "indices": [96, 104]
    }],
    "urls": [],
    "user_mentions": []
  },
  "favorited": false,
  "retweeted": false
}, {
  "created_at": "Thu May 17 16:17:01 +0000 2012",
  "id": 203157180986310656,
  "id_str": "203157180986310656",
  "text": "Take a look back at the opening of @WaltDisneyWorld's miniature golf course, Fantasia Gardens: http:\/\/t.co\/I35QZupk",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 13,
  "entities": {
    "hashtags": [],
    "urls": [{
      "url": "http:\/\/t.co\/I35QZupk",
      "expanded_url": "http:\/\/bit.ly\/KSROdr",
      "display_url": "bit.ly\/KSROdr",
      "indices": [95, 115]
    }],
    "user_mentions": [{
      "screen_name": "WaltDisneyWorld",
      "name": "Walt Disney World",
      "id": 15220473,
      "id_str": "15220473",
      "indices": [35, 51]
    }]
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Wed May 16 20:18:12 +0000 2012",
  "id": 202855491137847299,
  "id_str": "202855491137847299",
  "text": "Look back on two decades of Muppet*Vision 3D at Disney's Hollywood Studios! http:\/\/t.co\/CWVv508m",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 26,
  "entities": {
    "hashtags": [],
    "urls": [{
      "url": "http:\/\/t.co\/CWVv508m",
      "expanded_url": "http:\/\/bit.ly\/IYyGXZ",
      "display_url": "bit.ly\/IYyGXZ",
      "indices": [76, 96]
    }],
    "user_mentions": []
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Wed May 16 18:53:16 +0000 2012",
  "id": 202834118134857728,
  "id_str": "202834118134857728",
  "text": "Mouseketeer\u00a0Julie Piekarski visits @WaltDisneyWorld Resort and shares her \"Mickey Mouse Club\" memories.\u00a0http:\/\/t.co\/Xb8maELQ",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 4,
  "entities": {
    "hashtags": [],
    "urls": [{
      "url": "http:\/\/t.co\/Xb8maELQ",
      "expanded_url": "http:\/\/bit.ly\/Jwi4fT",
      "display_url": "bit.ly\/Jwi4fT",
      "indices": [104, 124]
    }],
    "user_mentions": [{
      "screen_name": "WaltDisneyWorld",
      "name": "Walt Disney World",
      "id": 15220473,
      "id_str": "15220473",
      "indices": [35, 51]
    }]
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Wed May 16 18:33:47 +0000 2012",
  "id": 202829212258795520,
  "id_str": "202829212258795520",
  "text": "Did you know? Jim Henson's Muppet*Vision 3-D opened at @WaltDisneyWorld on this day 1991. #DisneyHistory http:\/\/t.co\/d1vKd2a2",
  "source": "\u003ca href=\"http:\/\/yfrog.com\" rel=\"nofollow\"\u003eYfrog\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 68,
  "entities": {
    "hashtags": [{
      "text": "DisneyHistory",
      "indices": [90, 104]
    }],
    "urls": [{
      "url": "http:\/\/t.co\/d1vKd2a2",
      "expanded_url": "http:\/\/yfrog.com\/n8z0m7j",
      "display_url": "yfrog.com\/n8z0m7j",
      "indices": [105, 125]
    }],
    "user_mentions": [{
      "screen_name": "WaltDisneyWorld",
      "name": "Walt Disney World",
      "id": 15220473,
      "id_str": "15220473",
      "indices": [55, 71]
    }]
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Wed May 16 18:25:12 +0000 2012",
  "id": 202827051605045248,
  "id_str": "202827051605045248",
  "text": "@cassiez76\u00a0@lj4adotcomdan\u00a0Awesome! What characters are you looking forward to seeing at #SWW2012?",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": 202795377429200897,
  "in_reply_to_status_id_str": "202795377429200897",
  "in_reply_to_user_id": 66054280,
  "in_reply_to_user_id_str": "66054280",
  "in_reply_to_screen_name": "cassiez76",
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 0,
  "entities": {
    "hashtags": [{
      "text": "SWW2012",
      "indices": [88, 96]
    }],
    "urls": [],
    "user_mentions": [{
      "screen_name": "cassiez76",
      "name": "crazy eyed girl",
      "id": 66054280,
      "id_str": "66054280",
      "indices": [0, 10]
    }, {
      "screen_name": "lj4adotcomdan",
      "name": "Dan Zimmerman",
      "id": 62421328,
      "id_str": "62421328",
      "indices": [11, 25]
    }]
  },
  "favorited": false,
  "retweeted": false
}, {
  "created_at": "Wed May 16 17:49:00 +0000 2012",
  "id": 202817942868598784,
  "id_str": "202817942868598784",
  "text": "First look: We've got new renderings for Disney Phineas &amp; Ferb: Agent P\u2019s World Showcase Adventure! http:\/\/t.co\/y3asUwSK",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 12,
  "entities": {
    "hashtags": [],
    "urls": [{
      "url": "http:\/\/t.co\/y3asUwSK",
      "expanded_url": "http:\/\/bit.ly\/MkEyjS",
      "display_url": "bit.ly\/MkEyjS",
      "indices": [104, 124]
    }],
    "user_mentions": []
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Wed May 16 15:20:00 +0000 2012",
  "id": 202780447309172736,
  "id_str": "202780447309172736",
  "text": "VIDEO: Let @StarWars Correspondent John take you inside the new Droid Factory at Disney's Hollywood Studios! http:\/\/t.co\/Enh1bPsq #SWW2012",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 16,
  "entities": {
    "hashtags": [{
      "text": "SWW2012",
      "indices": [130, 138]
    }],
    "urls": [{
      "url": "http:\/\/t.co\/Enh1bPsq",
      "expanded_url": "http:\/\/bit.ly\/JvMjDM",
      "display_url": "bit.ly\/JvMjDM",
      "indices": [109, 129]
    }],
    "user_mentions": [{
      "screen_name": "starwars",
      "name": "Star Wars",
      "id": 20106852,
      "id_str": "20106852",
      "indices": [11, 20]
    }]
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}, {
  "created_at": "Wed May 16 14:51:04 +0000 2012",
  "id": 202773164126773249,
  "id_str": "202773164126773249",
  "text": "@claudiamm85\u00a0@Brave Great photo! Thanks for sharing.",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": 202768784270950400,
  "in_reply_to_status_id_str": "202768784270950400",
  "in_reply_to_user_id": 255334154,
  "in_reply_to_user_id_str": "255334154",
  "in_reply_to_screen_name": "claudiamm85",
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 0,
  "entities": {
    "hashtags": [],
    "urls": [],
    "user_mentions": [{
      "screen_name": "claudiamm85",
      "name": "claudia miranda",
      "id": 255334154,
      "id_str": "255334154",
      "indices": [0, 12]
    }, {
      "screen_name": "brave",
      "name": "\ub538\uae30",
      "id": 257245904,
      "id_str": "257245904",
      "indices": [13, 19]
    }]
  },
  "favorited": false,
  "retweeted": false
}, {
  "created_at": "Wed May 16 14:28:08 +0000 2012",
  "id": 202767392307281920,
  "id_str": "202767392307281920",
  "text": "We hope you have a magical stay! RT @ecait21\u00a0My @DisneyParks vacation starts TODAY! \"We're too excited to sleep!\"",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": 202713510323564544,
  "in_reply_to_status_id_str": "202713510323564544",
  "in_reply_to_user_id": 47374111,
  "in_reply_to_user_id_str": "47374111",
  "in_reply_to_screen_name": "ecait21",
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 2,
  "entities": {
    "hashtags": [],
    "urls": [],
    "user_mentions": [{
      "screen_name": "ecait21",
      "name": "Emily Tharp",
      "id": 47374111,
      "id_str": "47374111",
      "indices": [36, 44]
    }, {
      "screen_name": "DisneyParks",
      "name": "Disney Parks",
      "id": 29484644,
      "id_str": "29484644",
      "indices": [48, 60]
    }]
  },
  "favorited": false,
  "retweeted": false
}, {
  "created_at": "Wed May 16 14:20:15 +0000 2012",
  "id": 202765410540601344,
  "id_str": "202765410540601344",
  "text": "@EvoFreestyle\u00a0Those sound like wonderful souvenirs!",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": 202524680496746496,
  "in_reply_to_status_id_str": "202524680496746496",
  "in_reply_to_user_id": 561527806,
  "in_reply_to_user_id_str": "561527806",
  "in_reply_to_screen_name": "EvoFreestyle",
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 0,
  "entities": {
    "hashtags": [],
    "urls": [],
    "user_mentions": [{
      "screen_name": "EvoFreestyle",
      "name": "Evolution Ambitions",
      "id": 561527806,
      "id_str": "561527806",
      "indices": [0, 13]
    }]
  },
  "favorited": false,
  "retweeted": false
}, {
  "created_at": "Tue May 15 23:29:09 +0000 2012",
  "id": 202541155144056833,
  "id_str": "202541155144056833",
  "text": "Check out the model for the #NewFantasyland expansion being placed into the One Man\u2019s Dream exhibit. http:\/\/t.co\/Ac5fwsYf",
  "source": "\u003ca href=\"http:\/\/www.exacttarget.com\/products\/social.aspx?utm_source=sp1\" rel=\"nofollow\"\u003eSocialEngage\u003c\/a\u003e",
  "truncated": false,
  "in_reply_to_status_id": null,
  "in_reply_to_status_id_str": null,
  "in_reply_to_user_id": null,
  "in_reply_to_user_id_str": null,
  "in_reply_to_screen_name": null,
  "user": {
    "id": 29484644,
    "id_str": "29484644",
    "name": "Disney Parks",
    "screen_name": "DisneyParks",
    "location": "Orlando, FL",
    "description": "The official Twitter feed for Disney Parks & Resorts - covering Disneyland Resort, Walt Disney World, Disney Cruise Line and properties worldwide",
    "url": "http:\/\/disneyparks.com",
    "protected": false,
    "followers_count": 239977,
    "friends_count": 747,
    "listed_count": 5089,
    "created_at": "Tue Apr 07 16:38:44 +0000 2009",
    "favourites_count": 1,
    "utc_offset": -18000,
    "time_zone": "Eastern Time (US & Canada)",
    "geo_enabled": false,
    "verified": true,
    "statuses_count": 8559,
    "lang": "en",
    "contributors_enabled": true,
    "is_translator": false,
    "profile_background_color": "B4E3F7",
    "profile_background_image_url": "http:\/\/a0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_image_url_https": "https:\/\/si0.twimg.com\/profile_background_images\/430899317\/Background.jpg",
    "profile_background_tile": false,
    "profile_image_url": "http:\/\/a0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_image_url_https": "https:\/\/si0.twimg.com\/profile_images\/1843543471\/Avatar_normal.jpg",
    "profile_banner_url": "https:\/\/si0.twimg.com\/brand_banners\/DisneyParks\/1329840996\/live",
    "profile_link_color": "026489",
    "profile_sidebar_border_color": "DCF3FA",
    "profile_sidebar_fill_color": "DCF3FA",
    "profile_text_color": "3C3940",
    "profile_use_background_image": true,
    "show_all_inline_media": false,
    "default_profile": false,
    "default_profile_image": false,
    "following": null,
    "follow_request_sent": null,
    "notifications": null
  },
  "geo": null,
  "coordinates": null,
  "place": null,
  "contributors": null,
  "retweet_count": 21,
  "entities": {
    "hashtags": [{
      "text": "NewFantasyland",
      "indices": [28, 43]
    }],
    "urls": [{
      "url": "http:\/\/t.co\/Ac5fwsYf",
      "expanded_url": "http:\/\/bit.ly\/IWJ9Da",
      "display_url": "bit.ly\/IWJ9Da",
      "indices": [101, 121]
    }],
    "user_mentions": []
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false
}]

     // append tweets into page
     for (var i = 0; i < data.length; i++) {
        $(JQTWEET.appendTo).append(
            html.replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text) )
                .replace(/USER/g, data[i].user.screen_name)
                .replace('AGO', JQTWEET.timeAgo(data[i].created_at) )
                .replace(/ID/g, data[i].id_str)
        );
     }
}
