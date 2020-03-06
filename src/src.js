let story = document.createElement('div');
document.body.appendChild(story);
story.classList.add('story');
for (let i = 0; i < 18*32; i++) {
  let excel = document.createElement('div');
  story.appendChild(excel);
  excel.classList.add('excel');
}
let excel = document.getElementsByClassName('excel');
let x = 1, y = 32;
for (let i = 0; i < 18*32; i++) {
	if (x>18) {
  	x-=18;
  	y--;
  }
  excel[i].setAttribute('posX', x);
  excel[i].setAttribute('posY', y);
  x++;
}


function start() {

  switch (count) {
    case 1:
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('snake') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('dolphin') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('monkey') };
      break;
    case 2:
      for (let i = 0; i < excel.length; i++) { excel[i].classList.add('snake') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('dolphin') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('monkey') };
      break;
    case 3:
      for (let i = 0; i < excel.length; i++) { excel[i].classList.add('dolphin') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('monkey') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('snake') };
      break;
    case 4:
      for (let i = 0; i < excel.length; i++) { excel[i].classList.add('monkey') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('snake') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('dolphin') };
      break;
  }


}

// Запуск
let count = 1, pages = 4;
let interval = setInterval(start, 200);

// Нажатие клавиш
window.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
		case 37:
		case 65:
			if (count == 1 ) {count = pages;} else {count--;}
			break;
		case 39:
		case 68:
      if (count == pages ) {count = 1;} else {count++;}
			break;
	}
});
// Свайпинг
window.addEventListener('load', function(){
    let touchsurface = document.getElementById('touchsurface');
    let startX, startY, allowedTime = 666, elapsedTime, startTime;

    touchsurface.addEventListener('touchstart', function(e){
        var touchObject = e.changedTouches[0];
        startX = touchObject.pageX;
        startY = touchObject.pageY;
        startTime = new Date().getTime();
    }, false);

    touchsurface.addEventListener('touchend', function(e){
          var touchObject = e.changedTouches[0];
          elapsedTime = new Date().getTime() - startTime;
          if (elapsedTime <= allowedTime) {
            if (Math.abs(touchObject.pageY - startY) < 66) {
              if ( (touchObject.pageX-startX) > 66) {
                if (count == 1) {count = pages;} else {count--;}
              }
              if ( (touchObject.pageX-startX) < -66) {
                if (count == pages) {count = 1;} else {count++;}
              }
            }
          }
          e.preventDefault();
      }, false);
}, false);
