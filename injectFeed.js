var parentDiv = document.getElementById('company_sidebar_container');
parentDiv.appendChild(createDiv());
function createDiv() {
    var socialDiv = document.createElement("div");
    socialDiv.id = "socialFeed";
    socialDiv.innerHTML = "Alright, let's do stuff!";
}
