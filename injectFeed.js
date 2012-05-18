var account = ((document.getElementById('company_name')).textContent);
var parentDiv = document.getElementById('company_sidebar_container');
parentDiv.appendChild(createDiv());
function createDiv() {
    var socialDiv = document.createElement("div");
    socialDiv.id = "socialFeed";
    socialDiv.innerHTML = "<iframe id='socframe' src='~gaurav/social-cmp/animation_test.html?cmp="+ account + "' frameborder=0 scrolling=no height='400px'>" +
"<div id='cmp'>" + account + "</div>"
+ 
"</iframe>";
    return socialDiv;
}
