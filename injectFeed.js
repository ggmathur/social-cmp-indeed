var parentDiv = document.getElementById('company_sidebar_container');
parentDiv.appendChild(createDiv());
function createDiv() {
    var socialDiv = document.createElement("div");
    socialDiv.id = "socialFeed";
    socialDiv.innerHTML = "<iframe src='https://raw.github.com/ggmathur/social-cmp-indeed/master/animation_test.html'></iframe>";
    return socialDiv;
}
