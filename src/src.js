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


function start() {

  switch (count) {
    case 1:
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('snake') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('monkey') };

      break;
    case 2:
      for (let i = 0; i < excel.length; i++) { excel[i].classList.add('snake') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('monkey') };

      break;
    case 3:
      for (let i = 0; i < excel.length; i++) { excel[i].classList.add('monkey') };
      for (let i = 0; i < excel.length; i++) { excel[i].classList.remove('snake') };

      break;
  }
  console.log(count, excel.length);

}

// Запуск
let count = 1, pages = 3;
let steps = true;
let interval = setInterval(start, 200);

// Нажатие клавиш
window.addEventListener('keydown', function(e) {
	if (steps) {
		switch (e.keyCode) {
			case 37:
			case 65:
				if (count == 1 ) {
					count = pages;
				} else {
          count--;
        }

				break;
			case 39:
			case 83:
        if (count == pages ) {
          count = 1;
        } else {
          count++;
        }

				break;
		}
	}
});

window.addEventListener('load', function(){
    let touchsurface = document.getElementById('touchsurface');
    let startX, startY, allowedTime = 666, elapsedTime, startTime;

    touchsurface.addEventListener('touchstart', function(e){
        var touchObject = e.changedTouches[0];
        startX = touchObject.pageX;
        startY = touchObject.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    }, false);

    touchsurface.addEventListener('touchmove', function(e){ e.preventDefault() }, false)

    touchsurface.addEventListener('touchend', function(e){
          var touchObject = e.changedTouches[0];
          elapsedTime = new Date().getTime() - startTime;
          if (elapsedTime <= allowedTime) {
            if (Math.abs(touchObject.pageY - startY) < 66) {
              if ( (touchObject.pageX-startX) > 66) {
                if (count == pages ) {
                  count = 1;
                } else {
                  count++;
                }
              }
              if ( (touchObject.pageX-startX) < -66) {
                if (count == 1 ) {
        					count = pages;
        				} else {
                  count--;
                }
              }
            }
          }
          e.preventDefault();
      }, false);
}, false);
