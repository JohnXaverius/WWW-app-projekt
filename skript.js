//Testové příkazy
//console.log("First word");
//document.body.innerHTML += "<p>JavaScript byl načten a funguje.</p>";
//alert("JavaScript je načtený!");
//KONEC testu

let ziskaneBody = 0;
const clickButton = document.getElementById('click-button');
const scoreDisplay = document.getElementById('hodnota');
clickButton.addEventListener('click', () => {
    ziskaneBody++;
    scoreDisplay.textContent = ziskaneBody;
});
