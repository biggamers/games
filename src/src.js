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
window.addEventListener('load', function(e){

    let touchsurface = document.getElementById('touchsurface'),
        startX,
        startY,
        dist,
        threshold = 60, //required min distance traveled to be considered swipe
        allowedTime = 400, // maximum time allowed to travel that distance
        elapsedTime,
        startTime

    console.log(touchsurface);

    function handleswipe(isrightswipe){
        if (isrightswipe) {
          if (count == pages ) {
            count = 1;
          } else {
            count++;
          }
          console.log(count);
        }

    }
    if (touchsurface) {
      touchsurface.addEventListener('touchstart', function(e){
          var touchobj = e.changedTouches[0]
          dist = 0
          startX = touchobj.pageX
          startY = touchobj.pageY
          startTime = new Date().getTime() // record time when finger first makes contact with surface
          e.preventDefault()
      }, false)
    }

    if (touchsurface) {
      touchsurface.addEventListener('touchmove', function(e){
          e.preventDefault() // prevent scrolling when inside DIV
      }, false)
    }

    if (touchsurface) {
      touchsurface.addEventListener('touchend', function(e){
          var touchobj = e.changedTouches[0]
          dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
          elapsedTime = new Date().getTime() - startTime // get time elapsed
          // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
          var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
          handleswipe(swiperightBol)
          e.preventDefault()
      }, false)
    }



}, false)
