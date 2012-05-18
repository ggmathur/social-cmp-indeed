JQ = {
    user: 'DisneyParks',
    numTweets: 5,
    appendTo: '#jspost',
 
    loadFeeds: function() {
        /*
        $.ajax({
            url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                screen_name: JQ.user,
                include_rts: true,
                count: JQ.numTweets,
                include_entities: true
            },
            success: function(data, textStatus, xhr) {
 
                 var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';
         
                 // append tweets into page
                 for (var i = 0; i < data.length; i++) {
                    $(JQ.appendTo).append(
                        html.replace('TWEET_TEXT', JQ.ify.clean(data[i].text) )
                            .replace(/USER/g, data[i].user.screen_name)
                            .replace('AGO', JQ.timeAgo(data[i].created_at) )
                            .replace(/ID/g, data[i].id_str)
                    );
                 }                  
            }   
 
        });
        */

        //////////////
        // spoof data
        //////////////

         var html = '<div class="post">POST_TEXT<div class="time">AGO</div>';

         // get tweets
         data = tData;

         // append tweets
         for (var i = 0; i < data.length; i++) {
            var post = {
                text: JQ.ify.clean(data[i].text),
                name: data[i].user.screen_name,
                age: JQ.timeAgo(data[i].created_at),
                id: data[i].id_str,
                creationTime: new Date(data[i].created_at)
            };
            posts.push(post);
         }

         // get fb
         data = fbData;

         // append fb
         for (var i = 0; i < data.data.length; i++) {
            var post = {
                text: JQ.ify.clean(data.data[i].message),
                name: data.data[i].from.name,
                age: JQ.timeAgo(data.data[i].created_time),
                id: data.data[i].from.name,
                creationTime: new Date(data.data[i].created_time)
            };
            posts.push(post);
         }

         // sort posts
         posts.sort(function(a,b) {
             return b.creationTime - a.creationTime
         })

         // iterate through posts and place on page
         for (var i = 0; i < posts.length; i++) {
             $(JQ.appendTo).append(
                 html.replace('POST_TEXT', posts[i].text )
                     .replace(/USER/g, posts[i].name )
                     .replace('AGO', posts[i].age )
                     .replace(/ID/g, posts[i].id )
             );
         }
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
}

var posts = [];

$(document).ready(function () {
    // start jqtweet!
    JQ.loadFeeds();
});




////////////////////////
// Pre Populated Data //
////////////////////////

var tData = [{
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

var fbData =
    {
    "data": [
        {
        "id": "143728699029618_128374817298139",
        "from": {
            "name": "Disney Parks Blog",
            "category": "Entertainment",
            "id": "143728699029618"
        },
        "message": "Go behind the scenes with Bill Cantos who arranged the tunes you’ll hear in the Carthay Circle Restaurant at Disney California Adventure park.",
        "picture": "http://external.ak.fbcdn.net/safe_image.php?d=AQARA2Hs4PrqVawx&w=90&h=90&url=http%3A%2F%2Fparksandresorts.wdpromedia.com%2Fmedia%2Fdisneyparks%2Fblog%2Fwp-content%2Fuploads%2F2012%2F05%2Fcarthaymusic.jpg",
        "link": "http://bit.ly/MpmZiC",
        "name": "Cue the Dining Music at Carthay Circle Restaurant in Disney California Adventure Park « Disney Park",
        "caption": "disneyparks.disney.go.com",
        "description": "Nothing sets the mood over a tasty meal like just the right music. In this video, we take you behind the scenes and into the recording studio with Bill Cantos. Cantos is the music arranger of all the tunes that you’ll hear in the new Carthay Circle Restaurant in Disney California Adventure park.",
        "icon": "http://static.ak.fbcdn.net/rsrc.php/v1/yD/r/aS8ecmYRys0.gif",
        "actions": [
            {
            "name": "Comment",
            "link": "http://www.facebook.com/143728699029618/posts/128374817298139"
        },
        {
            "name": "Like",
            "link": "http://www.facebook.com/143728699029618/posts/128374817298139"
        }
        ],
        "type": "link",
        "created_time": "2012-05-17T23:31:26+0000",
        "updated_time": "2012-05-17T23:31:26+0000",
        "likes": {
            "data": [
                {
                "name": "Mariah Sjolund",
                "id": "566109870"
            }
            ],
            "count": 20
        },
        "comments": {
            "count": 0
        }
    },
    {
        "id": "143728699029618_440164919328318",
        "from": {
            "name": "Disney Parks Blog",
            "category": "Entertainment",
            "id": "143728699029618"
        },
        "message": "Take a look at some great merchandise inspired by the Red Car Trolley that will be featured in Los Feliz Five & Dime when Buena Vista Street opens June 15 at Disney California Adventure park.",
        "picture": "http://external.ak.fbcdn.net/safe_image.php?d=AQCWGgvxuUcv6X4V&w=90&h=90&url=http%3A%2F%2Fparksandresorts.wdpromedia.com%2Fmedia%2Fdisneyparks%2Fblog%2Fwp-content%2Fuploads%2F2012%2F05%2Frcm201095SMALL.jpg",
        "link": "http://bit.ly/KUMjed",
        "name": "Get on Board with the Red Car Trolley Collection at Disney California Adventure Park « Disney Parks",
        "caption": "disneyparks.disney.go.com",
        "description": "Can you believe how quickly the time has gone? We are just less than one month away from the opening of Buena Vista Street and Cars Land at Disney California Adventure park, and I’ll tell you I’m not sure what I’m more excited for. It seems like it was only yesterday that we made a trek out to see s...",
        "icon": "http://static.ak.fbcdn.net/rsrc.php/v1/yD/r/aS8ecmYRys0.gif",
        "actions": [
            {
            "name": "Comment",
            "link": "http://www.facebook.com/143728699029618/posts/440164919328318"
        },
        {
            "name": "Like",
            "link": "http://www.facebook.com/143728699029618/posts/440164919328318"
        }
        ],
        "type": "link",
        "created_time": "2012-05-17T22:35:07+0000",
        "updated_time": "2012-05-17T22:35:07+0000",
        "likes": {
            "data": [
                {
                "name": "Mabel Mastro",
                "id": "624070807"
            }
            ],
            "count": 60
        },
        "comments": {
            "count": 0
        }
    },
    {
        "id": "143728699029618_411215732243217",
        "from": {
            "name": "Disney Parks Blog",
            "category": "Entertainment",
            "id": "143728699029618"
        },
        "message": "Star Wars Weekends returns to Disney's Hollywood Studios tomorrow. Whom is Chewbacca most hoping to meet?",
        "picture": "http://external.ak.fbcdn.net/safe_image.php?d=AQDMFNEWcBtGnNlf&w=130&h=130&url=http%3A%2F%2Fi2.ytimg.com%2Fvi%2FMCFkEtrLeHw%2Fhqdefault.jpg",
        "link": "http://www.youtube.com/watch?v=MCFkEtrLeHw&list=UU1xwwLwm6WSMbUn_Tp597hQ&index=11&feature=plpp_video",
        "source": "http://www.youtube.com/embed/videoseries?index=15&list=UU1xwwLwm6WSMbUn_Tp597hQ&autoplay=1",
        "name": "Ashley Eckstein meets one of her biggest fans, Chewbacca, at Star Wars Weekends",
        "caption": "www.youtube.com",
        "description": "Go behind the scenes and check out some of the fun we're having planning Star Wars Weekends. Read more at the Disney Parks Blog: http://bit.ly/IFwgi5 Check o...",
        "icon": "http://static.ak.fbcdn.net/rsrc.php/v1/yj/r/v2OnaTyTQZE.gif",
        "actions": [
            {
            "name": "Comment",
            "link": "http://www.facebook.com/143728699029618/posts/411215732243217"
        },
        {
            "name": "Like",
            "link": "http://www.facebook.com/143728699029618/posts/411215732243217"
        }
        ],
        "type": "video",
        "created_time": "2012-05-17T20:01:01+0000",
        "updated_time": "2012-05-17T20:01:01+0000",
        "shares": {
            "count": 1
        },
        "likes": {
            "data": [
                {
                "name": "Gloria Wilson De Vore",
                "id": "100000107741339"
            }
            ],
            "count": 36
        },
        "comments": {
            "count": 0
        }
    },
    {
        "id": "143728699029618_333989606674249",
        "from": {
            "name": "Disney Parks Blog",
            "category": "Entertainment",
            "id": "143728699029618"
        },
        "message": "Curiouser and curiouser...this magical, mystical passageway is unlike any other and it leads to a party that is unlike any other! The \"Mad T Party\" awaits at Disney California Adventure park!",
        "picture": "http://external.ak.fbcdn.net/safe_image.php?d=AQB50ZvGqydeKAXJ&w=90&h=90&url=http%3A%2F%2Fparksandresorts.wdpromedia.com%2Fmedia%2Fdisneyparks%2Fblog%2Fwp-content%2Fuploads%2F2012%2F05%2Fdrh110210SMALL.jpg",
        "link": "http://disneyparks.disney.go.com/blog/2012/05/down-the-rabbit-hole-the-mad-t-party-awaits-at-disney-california-adventure-park/",
        "name": "Down the Rabbit Hole … The Mad T Party Awaits at Disney California Adventure Park! « Disney Parks B",
        "caption": "disneyparks.disney.go.com",
        "description": "By now, you may have heard that a funderful new party is in the making at Disney California Adventure park … the Mad T Party! But, before experiencing the assortment of joyfulutionary entertainment that awaits you, you must make your way down the Rabbit Hole!",
        "icon": "http://static.ak.fbcdn.net/rsrc.php/v1/yD/r/aS8ecmYRys0.gif",
        "actions": [
            {
            "name": "Comment",
            "link": "http://www.facebook.com/143728699029618/posts/333989606674249"
        },
        {
            "name": "Like",
            "link": "http://www.facebook.com/143728699029618/posts/333989606674249"
        }
        ],
        "type": "link",
        "created_time": "2012-05-17T17:32:01+0000",
        "updated_time": "2012-05-17T22:26:48+0000",
        "shares": {
            "count": 16
        },
        "likes": {
            "data": [
                {
                "name": "Kazumi Yoshikawa",
                "id": "100003522658456"
            }
            ],
            "count": 168
        },
        "comments": {
            "data": [
                {
                "id": "143728699029618_333989606674249_2759029",
                "from": {
                    "name": "Tina Pancoast Cooper",
                    "id": "100000650495079"
                },
                "message": "Wish Disney would do stuff like this for WDW ....they do wayyyy more new stuff in CA ...our only upgrade lately is bigger fantasyland and that's taking forever!",
                "created_time": "2012-05-17T19:30:22+0000"
            },
            {
                "id": "143728699029618_333989606674249_2759440",
                "from": {
                    "name": "Stephanie Swanberg",
                    "id": "100000772038646"
                },
                "message": "I want to go:) we they have any earlier ? I'm going in two weeks!!!!",
                "created_time": "2012-05-17T22:26:48+0000"
            }
            ],
            "count": 12
        }
    },
    {
        "id": "143728699029618_413760408654796",
        "from": {
            "name": "Disney Parks Blog",
            "category": "Entertainment",
            "id": "143728699029618"
        },
        "message": "We've got an update on the 20th anniversary of the Walt Disney World Marathon. ",
        "picture": "http://external.ak.fbcdn.net/safe_image.php?d=AQAvThw60yLnsEiU&w=90&h=90&url=http%3A%2F%2Fparksandresorts.wdpromedia.com%2Fmedia%2Fdisneyparks%2Fblog%2Fwp-content%2Fuploads%2F2012%2F05%2Fmarathoncourse.jpg",
        "link": "http://disneyparks.disney.go.com/blog/2012/05/new-twists-and-turns-coming-to-20th-anniversary-walt-disney-world-marathon-course",
        "name": "New Twists and Turns Coming to 20th Anniversary Walt Disney World Marathon Course « Disney Parks Bl",
        "caption": "disneyparks.disney.go.com",
        "description": "The countdown has begun to the 20th anniversary of the Walt Disney World Marathon on Jan. 13, 2013, and not surprisingly, our runDisney folks are hard at work putting their creative juices together to come up with some fun new twists for the race. So far they have added some special entertainment al...",
        "icon": "http://static.ak.fbcdn.net/rsrc.php/v1/yD/r/aS8ecmYRys0.gif",
        "actions": [
            {
            "name": "Comment",
            "link": "http://www.facebook.com/143728699029618/posts/413760408654796"
        },
        {
            "name": "Like",
            "link": "http://www.facebook.com/143728699029618/posts/413760408654796"
        }
        ],
        "type": "link",
        "created_time": "2012-05-17T15:45:20+0000",
        "updated_time": "2012-05-17T15:57:28+0000",
        "shares": {
            "count": 27
        },
        "likes": {
            "data": [
                {
                "name": "Aditya Devdhar",
                "id": "100000793731871"
            }
            ],
            "count": 105
        },
        "comments": {
            "data": [
                {
                "id": "143728699029618_413760408654796_4878626",
                "from": {
                    "name": "Amanda Wynne",
                    "id": "652757785"
                },
                "message": "Wowziers that looks amazing - my first time with Anjuli Leahy this is gonna rock !!!!!!",
                "message_tags": [
                    {
                    "id": "555520624",
                    "name": "Anjuli Leahy",
                    "type": "user",
                    "offset": 49,
                    "length": 12
                }
                ],
                "created_time": "2012-05-17T15:56:32+0000",
                "likes": 2
            },
            {
                "id": "143728699029618_413760408654796_4878628",
                "from": {
                    "name": "Jj Jc",
                    "id": "1157079108"
                },
                "message": "Hoping to see all the new things this summer!",
                "created_time": "2012-05-17T15:57:28+0000"
            }
            ],
            "count": 2
        }
    }
    ],
    "paging": {
        "previous": "https://graph.facebook.com/DisneyParksBlog/posts?limit=5&access_token=AAACEdEose0cBAKKx6zvpNdEnZAAZC0tZBIGWWoeB6f8VFEdsLq8UZB9mn5YRpVnmiSpdurhi2VZBWZCn7JRnQ2rPsg2xWlJ7NqfIvWXcFgO0XZCzLXNPLJl&since=1337297486&__previous=1",
        "next": "https://graph.facebook.com/DisneyParksBlog/posts?limit=5&access_token=AAACEdEose0cBAKKx6zvpNdEnZAAZC0tZBIGWWoeB6f8VFEdsLq8UZB9mn5YRpVnmiSpdurhi2VZBWZCn7JRnQ2rPsg2xWlJ7NqfIvWXcFgO0XZCzLXNPLJl&until=1337269519"
    }
}
