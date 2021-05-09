// your code goes here
    var obj = [{
    "Twitter_ID": "NASA",
    "Tweet": "\u201cWhat a beautiful view.\u201d\n\nAlan Shepard became the first American in space 60 years ago (May 5, 1961) when Freedom 7\u2026 https:\/\/t.co\/QAPAZQWYE0",
    "Twitter_Photo": "http:\/\/pbs.twimg.com\/profile_images\/1321163587679784960\/0ZxKlEKB_normal.jpg",
    "Retweet_Count": 763,
    "Twitter_name": "NASA",
    "Tweet_id": "1389951533912109059"
}, {
    "Twitter_ID": "NASA",
    "Tweet": "60 years ago today, astronaut Alan Shepard became the first American to travel in space, climbing ~116 miles (188 k\u2026 https:\/\/t.co\/4FTb30QoAE",
    "Twitter_Photo": "http:\/\/pbs.twimg.com\/profile_images\/1321163587679784960\/0ZxKlEKB_normal.jpg",
    "Retweet_Count": 918,
    "Twitter_name": "NASA",
    "Tweet_id": "1390032805820870656"
}, {
    "Twitter_ID": "thehistoryguy",
    "Tweet": "60 years ago today, in 1961, Alan Shephard became the 2nd man to travel into space. When reporters asked Shepard wh\u2026 https:\/\/t.co\/MRu5mCW5YN",
    "Twitter_Photo": "http:\/\/pbs.twimg.com\/profile_images\/1324293698184761348\/9Q3PCxNh_normal.jpg",
    "Retweet_Count": 562,
    "Twitter_name": "Dan Snow",
    "Tweet_id": "1390038595503804419"
}, {
    "Twitter_ID": "NASAHubble",
    "Tweet": "#OTD 60 years ago today, Alan Shepard became the first American in space!\n\nSince then, many American astronauts hav\u2026 https:\/\/t.co\/ihtQOjXZiG",
    "Twitter_Photo": "http:\/\/pbs.twimg.com\/profile_images\/3468011581\/efb985f24af0a814a722457a768f3cc5_normal.jpeg",
    "Retweet_Count": 328,
    "Twitter_name": "Hubble",
    "Tweet_id": "1389958590933442578"
}, {
    "Twitter_ID": "NASAhistory",
    "Tweet": "Some heroes don't wear spacesuits!\n\nAlan Shepard's flight wouldn't have been possible without mathematician Katheri\u2026 https:\/\/t.co\/JE2LmWBP3V",
    "Twitter_Photo": "http:\/\/pbs.twimg.com\/profile_images\/695361954018275330\/RLTuGTD__normal.jpg",
    "Retweet_Count": 544,
    "Twitter_name": "NASA History Office",
    "Tweet_id": "1389958067102568450"
}]

var tweetrow = document.getElementById("tweetrow")

function getTweetId(json) {
    json = obj
    for(var i = 0 ; i < json.length ; i++){
        console.log(i);
        var id = json[i].Tweet_id;
        callTweetEmbedDomain(id);
    }
}

function callTweetEmbedDomain(id,callback) {
    var invocation = new XMLHttpRequest();
    //access api
    //single test
    var url =
        'https://fiterbubblespring.azurewebsites.net/getApi/TweetApi?id=' + id;
    var invocationHistoryText;
    if (invocation) {
        invocation.open('GET', url, false);
        invocation.onreadystatechange = function(){
            if (invocation.readyState == 4) {
                if (invocation.status == 200) {
                    //get API json
                    var response = invocation.response;
                    var html = JSON.parse(response).html
                    var creatediv = document.createElement("div");
                    creatediv.className = 'col';
                    creatediv.innerHTML= html;
                    tweetrow.appendChild(creatediv);
                    if (typeof callback === "function") {
                        // apply() sets the meaning of "this" in the callback
                        callback.apply(xhr);
                    }
                } else
                    alert("Invocation Errors Occured");
            } else
                console.log("currently the application is at" + invocation.readyState);
        };
        invocation.send();
    } else {
        invocationHistoryText = "No Invocation TookPlace At All";
    }
}


function loadScript() {
    var scriptInfoBox = document.createElement("script");
    scriptInfoBox.type = "text/javascript";
    scriptInfoBox.src =
        "https://platform.twitter.com/widgets.js";
    document.body.appendChild(scriptInfoBox);
}

// $('#trending').each(function () {
//     getTweetId(obj);
//     setTimeout("loadScript()",1000);
// });
//
// $('#trending').each(function(){
//     getTweetId(obj);
// });
