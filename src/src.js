let story = document.createElement('div');
document.body.appendChild(story);
story.classList.add('story');
for (let i = 0; i < 144; i++) {
	let excel = document.createElement('div');
	story.appendChild(excel);
	excel.classList.add('excel');
}
let excel = document.getElementsByClassName('excel');
let x = 1, y = 12;
for (let i = 0; i < 144; i++) {
	if (x>12) {
		x-=12;
		y--;
	}
	excel[i].setAttribute('posX', x);
	excel[i].setAttribute('posY', y);
	x++;
}
