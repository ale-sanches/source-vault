const board = document.querySelector('#board');
const colors = ['#0081a7', '#00afb9', '#fed9b7', '#f07167', '#c1121f', '#335c67', '#99582a'];
const SQUARES_NUMBER = 400;

for (let i = 0; i <SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () =>
        setColor(square));

    square.addEventListener('mouseleave', () =>
        removeColor(square));

    board.append(square);
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

}

function removeColor(element) {
    element.style.backgroundColor = '#97b0c7';
    element.style.boxShadow = '0 0 2px #000';

}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index]
}