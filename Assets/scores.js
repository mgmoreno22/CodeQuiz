// Document variables
var savedScores = localStorage.getItem("scores")
var clearScores = document.getElementById("clearScores")
var scoresList = document.getElementById("scoresList")

//return the scores as a readable array
savedScores = JSON.parse(savedScores)

//Run a loop to render saved scores onto screen
for (var i = 0; i < savedScores.length; i++) {
    var listEl = document.createElement("li");
    listEl.textContent = savedScores[i].name + ": " + savedScores[i].score;
    scoresList.appendChild(listEl);
}

// Remove saved scores and reload the page
clearScores.addEventListener("click", function(e) {
    localStorage.clear();
})