       //run api
var invocation = new XMLHttpRequest();
       //<![CDATA[
function callOtherDomain() {
    //access api
    //single test
           var url = 'https://filterbubbleflask.azurewebsites.net/api/tasks/trending/';
           console.log(url);
           var invocationHistoryText;
           if (invocation) {
               invocation.open('GET', url, true);
               invocation.onreadystatechange = handler;
               invocation.send();
           } else {
               invocationHistoryText = "No Invocation TookPlace At All";
           }
       }

function handler(evtXHR) {
    if (invocation.readyState == 4) {
        if (invocation.status == 200) {
            //get API json
            var response = JSON.parse(invocation.response);
            console.log(response);
            var i = 0;
            for(var key in response){
                console.log(key);
                console.log(response[key]);
                var td_rank = document.createElement("td");
                var text_rank = document.createTextNode(response[key] + ".");
                td_rank.appendChild(text_rank);
                var td_hashtag = document.createElement("td");
                var text_hashtag = document.createTextNode(key);
                td_rank.appendChild(text_hashtag);
                var tr = document.createElement("tr");
                tr.appendChild(td_rank);
                tr.appendChild(td_hashtag);
                tr.setAttribute("align","center");
                var table = document.getElementsByTagName("table")[0];
                table.appendChild(tr);
                i += 1;
                console.log(i);
                if (i == 5){
                    break;
                }
            }
        } else
        console.log("Invocation Errors Occured");
    } else
        console.log("currently the aspplication is at" + invocation.readyState);
}
       //]]>
$('#index').each(function () {
            callOtherDomain();
});
       