let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('dayField');
for (let i = 0; i < 18*32; i++) {
  let excel = document.createElement('div');
  field.appendChild(excel);
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

let snakeBody = new Array();
function createSnake() {
  function generateSnake() {
  	let posX = Math.round(Math.random()*15 + 3);
  	let posY = Math.round(Math.random()*13 + 19);
  	return [posX, posY];
  }
  let snakeCoordinates = generateSnake();
  snakeBody = [document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + snakeCoordinates[1] + '"]'), document.querySelector('[posX = "' + (snakeCoordinates[0]-1) + '"][posY = "' + snakeCoordinates[1] + '"]'), document.querySelector('[posX = "' + (snakeCoordinates[0]-2) + '"][posY = "' + snakeCoordinates[1] + '"]')];
  for (let i = 0; i < snakeBody.length; i++) {
  	snakeBody[i].classList.add('snakeBody');
  }
  snakeBody[0].classList.add('snakeHead');
}

let mouse;
function createMouse() {
	function generateMouse() {
		let posX = Math.round(Math.random()*17 + 1);
		let posY = Math.round(Math.random()*31 + 1);
		return [posX, posY];
	}
	let mouseCoordinates = generateMouse();
	mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

	while(mouse.classList.contains('snakeBody') || mouse.classList.contains('alpaca')) {
		let mouseCoordinates = generateMouse();
		mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
	}
	mouse.classList.add('mouse');
}

let alpaca = new Array();
function createAlpaca() {
	function generateAlpaca() {
		let posX = Math.round(Math.random()*17 + 1);
		let posY = Math.round(Math.random()*31 + 1);
		return [posX, posY];
	}
	let alpacaCoordinates = generateAlpaca();
	let newAlpaca = document.querySelector('[posX = "' + alpacaCoordinates[0] + '"][posY = "' + alpacaCoordinates[1] + '"]');

	while(newAlpaca.classList.contains('snakeBody') || newAlpaca.classList.contains('mouse')) {
		alpacaCoordinates = generateAlpaca();
		newAlpaca = document.querySelector('[posX = "' + alpacaCoordinates[0] + '"][posY = "' + alpacaCoordinates[1] + '"]');
	}
  alpaca.push(document.querySelector('[posX = "' + alpacaCoordinates[0] + '"][posY = "' + alpacaCoordinates[1] + '"]'));
  alpaca[alpaca.length - 1].classList.add('alpaca');
}

function start() {
  switch (stage) {
    case 'game':
      switch (state) {
        case 'day':
// Игра днем
          if (startGame) {
            createSnake();
            createMouse();
            createAlpaca();
            startGame = false;
          }
          // Начало движения
          coordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        	snakeBody[0].classList.remove('snakeHead');
        	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        	snakeBody.pop();
        	// Смена направления
        	switch (touch) {
        		case 'right':
        			if (coordinates[0]==18) { coordinates[0]=0; }
        			snakeBody.unshift(document.querySelector('[posX = "' + (+coordinates[0] + 1) + '"][posY = "' + coordinates[1] + '"]'));
        			break;
        		case 'up':
        			if (coordinates[1]==32) { coordinates[1]=0; }
        			snakeBody.unshift(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + (+coordinates[1] + 1) + '"]'));
        			break;
        		case 'left':
        			if (coordinates[0]==1) { coordinates[0]=19; }
        			snakeBody.unshift(document.querySelector('[posX = "' + (+coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'));
        			break;
        		case 'down':
        			if (coordinates[1]==1) { coordinates[1]=33; }
        			snakeBody.unshift(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + (+coordinates[1] -1) + '"]'));
        			break;
        	}
          // Условия окончания игры
        	if (snakeBody[0].classList.contains('snakeBody') || snakeBody[0].classList.contains('alpaca')) {
            clearInterval(interval);
            snakeBody[0].style.background = 'url("src/cry.png") center no-repeat';
    				snakeBody[0].style.backgroundSize = 'cover';
    				snakeBody[0].style.border = '0px';
        		if (snakeBody.length == 3) { setTimeout(() => {alert(`IT'S OVER!!\nYou scored NOTHING.... \n\n\nP.S. Do not eat alpacas.`);}, 600); }
        		else { setTimeout(() => { alert(`IT'S OVER!!\nYou collect ${snakeBody.length-3} dead mouses.`);}, 1000); }
          }
          snakeBody[0].classList.add('snakeHead');
        	for (let i = 0; i < snakeBody.length; i++) {
        		snakeBody[i].classList.add('snakeBody');
        	}
          // Клик по мыши
          if (touchClick) {
            mouse.classList.remove('mouse');
            createMouse();
            touchClick = false;
          }
        	// Поедание мыши
        	if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY') ) {
        		mouse.classList.remove('mouse');
        		snakeBody[0].classList.add('snakeHead');
        		let a = snakeBody[snakeBody.length-1].getAttribute('posX');
        		let b = snakeBody[snakeBody.length-1].getAttribute('posY');
        		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b +'"]'));
        		createMouse();
            createAlpaca();
        	}
          break;
        case 'night':
// Игра ночью
          if (startGame) {
            createSnake();
            createMouse();
            createAlpaca();
            startGame = false;
          }
          // Начало движения
          coordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
          snakeBody[0].classList.remove('snakeHead');
          snakeBody[snakeBody.length-1].classList.remove('snakeBody');
          snakeBody.pop();
          // Смена направления
          switch (touch) {
            case 'right':
              if (coordinates[0]==18) { coordinates[0]=0; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+coordinates[0] + 1) + '"][posY = "' + coordinates[1] + '"]'));
              break;
            case 'up':
              if (coordinates[1]==32) { coordinates[1]=0; }
              snakeBody.unshift(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + (+coordinates[1] + 1) + '"]'));
              break;
            case 'left':
              if (coordinates[0]==1) { coordinates[0]=19; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'));
              break;
            case 'down':
              if (coordinates[1]==1) { coordinates[1]=33; }
              snakeBody.unshift(document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + (+coordinates[1] -1) + '"]'));
              break;
          }
          // Условия окончания игры
          if (snakeBody[0].classList.contains('snakeBody') || snakeBody[0].classList.contains('alpaca')) {
            clearInterval(interval);
            snakeBody[0].style.background = 'url("src/cry.png") center no-repeat';
            snakeBody[0].style.backgroundSize = 'cover';
            snakeBody[0].style.border = '0px';
            if (snakeBody.length == 3) { setTimeout(() => {alert(`IT'S OVER!!\nYou scored NOTHING.... \n\n\nP.S. Do not eat alpacas.`);}, 600); }
            else { setTimeout(() => { alert(`IT'S OVER!!\nYou collect ${snakeBody.length-3} dead mouses.`);}, 1000); }
          }
          snakeBody[0].classList.add('snakeHead');
          for (let i = 0; i < snakeBody.length; i++) {
            snakeBody[i].classList.add('snakeBody');
          }
          // Клик по мыши
          if (touchClick) {
            mouse.classList.remove('mouse');
            createMouse();
            touchClick = false;
          }
          // Поедание мыши
          if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY') ) {
            mouse.classList.remove('mouse');
            snakeBody[0].classList.add('snakeHead');
            let a = snakeBody[snakeBody.length-1].getAttribute('posX');
            let b = snakeBody[snakeBody.length-1].getAttribute('posY');
            snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b +'"]'));
            createMouse();
            createAlpaca();
          }
          break;
      }
      break;
    case 'story':
      switch (state) {
        case 'day':
// Сторик днем
          field.classList.remove('nightField');
          if (startStory) {
            createSnake();
            startStory = false;
          }
          // Рандомное движения
          сoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        	snakeBody[0].classList.remove('snakeHead');
        	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        	snakeBody.pop();
          if (randomTime % (randomMove*5) == 0) {
            if  (randomMove > 2) { randomMove = Math.round(Math.random()+1); }
            else { randomMove = Math.round(Math.random()+1) + 2; }
          }
          switch (randomMove) {
            case 1:
              if (сoordinates[0]==18) { сoordinates[0]=0; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+сoordinates[0] + 1) + '"][posY = "' + сoordinates[1] + '"]'));
              break;
            case 2:
              if (сoordinates[0]==1) { сoordinates[0]=19; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+сoordinates[0] - 1) + '"][posY = "' + сoordinates[1] + '"]'));
              break;
            case 3:
              if (сoordinates[1]==32) { сoordinates[1]=18; }
              snakeBody.unshift(document.querySelector('[posX = "' + сoordinates[0] + '"][posY = "' + (+сoordinates[1] + 1) + '"]'));
              break;
            case 4:
              if (сoordinates[1]==19) { сoordinates[1]=33; }
              snakeBody.unshift(document.querySelector('[posX = "' + сoordinates[0] + '"][posY = "' + (+сoordinates[1] -1) + '"]'));
              break;
          }
          snakeBody[0].classList.add('snakeHead');
        	for (let i = 0; i < snakeBody.length; i++) {
        		snakeBody[i].classList.add('snakeBody');
        	}
          // Стрелочки
          for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.add('mouse'); }
          for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.add('alpaca'); }
          // Переключение между режимами
          switch (touch) {
            case 'up':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.remove('mouse'); }
              for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.remove('alpaca'); }
              startGame = true;
              stage = 'game'
              break;
            case 'down':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.remove('mouse'); }
              for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.remove('alpaca'); }
              startGame = true;
              stage = 'game'
              break;
            case 'left':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.remove('mouse'); }
              for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.remove('alpaca'); }
              startStory = true;
              state = 'night'
              touch = 'none'
              break;
            case 'right':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.remove('mouse'); }
              for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.remove('alpaca'); }
              startStory = true;
              state = 'night'
              touch = 'none'
              break;
          }
          break;
        case 'night':
// Сторик ночью
          field.classList.add('nightField');
          if (startStory) {
            createSnake();
            startStory = false;
          }
          // Рандомное движения
          сoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        	snakeBody[0].classList.remove('snakeHead');
        	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        	snakeBody.pop();
          if (randomTime % (randomMove*5) == 0) {
            if  (randomMove > 2) { randomMove = Math.round(Math.random()+1); }
            else { randomMove = Math.round(Math.random()+1) + 2; }
          }
          switch (randomMove) {
            case 1:
              if (сoordinates[0]==18) { сoordinates[0]=0; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+сoordinates[0] + 1) + '"][posY = "' + сoordinates[1] + '"]'));
              break;
            case 2:
              if (сoordinates[0]==1) { сoordinates[0]=19; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+сoordinates[0] - 1) + '"][posY = "' + сoordinates[1] + '"]'));
              break;
            case 3:
              if (сoordinates[1]==32) { сoordinates[1]=18; }
              snakeBody.unshift(document.querySelector('[posX = "' + сoordinates[0] + '"][posY = "' + (+сoordinates[1] + 1) + '"]'));
              break;
            case 4:
              if (сoordinates[1]==19) { сoordinates[1]=33; }
              snakeBody.unshift(document.querySelector('[posX = "' + сoordinates[0] + '"][posY = "' + (+сoordinates[1] -1) + '"]'));
              break;
          }
          snakeBody[0].classList.add('snakeHead');
        	for (let i = 0; i < snakeBody.length; i++) {
        		snakeBody[i].classList.add('snakeBody');
        	}
          // Стрелочки
          for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.add('mouse'); }
          for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.add('alpaca'); }
          // Переключение между режимами
          switch (touch) {
            case 'up':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.remove('mouse'); }
              for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.remove('alpaca'); }
              startGame = true;
              stage = 'game'
              break;
            case 'down':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.remove('mouse'); }
              for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.remove('alpaca'); }
              startGame = true;
              stage = 'game'
              break;
            case 'left':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.remove('mouse'); }
              for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.remove('alpaca'); }
              startStory = true;
              state = 'day'
              touch = 'none'
              break;
            case 'right':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              for (let i = 0; i < arrowMouse.length; i++) { arrowMouse[i].classList.remove('mouse'); }
              for (let i = 0; i < arrowAlpaca.length; i++) { arrowAlpaca[i].classList.remove('alpaca'); }
              startStory = true;
              state = 'day'
              touch = 'none'
              break;
          }
          break;
      }
      break;
  }
  touchStep = true;
  randomTime++;
}

// Запуск
let arrowMouse = [document.querySelector('[posX = "13"][posY = "6"]'),document.querySelector('[posX = "14"][posY = "6"]'),document.querySelector('[posX = "13"][posY = "7"]'),document.querySelector('[posX = "14"][posY = "7"]'),document.querySelector('[posX = "15"][posY = "7"]'),document.querySelector('[posX = "11"][posY = "8"]'),document.querySelector('[posX = "12"][posY = "8"]'),document.querySelector('[posX = "13"][posY = "8"]'),document.querySelector('[posX = "15"][posY = "8"]'),document.querySelector('[posX = "16"][posY = "8"]'),document.querySelector('[posX = "11"][posY = "9"]'),document.querySelector('[posX = "16"][posY = "9"]'),document.querySelector('[posX = "17"][posY = "9"]'),document.querySelector('[posX = "5"][posY = "13"]'),document.querySelector('[posX = "6"][posY = "13"]'),document.querySelector('[posX = "4"][posY = "12"]'),document.querySelector('[posX = "5"][posY = "12"]'),document.querySelector('[posX = "6"][posY = "12"]'),document.querySelector('[posX = "3"][posY = "11"]'),document.querySelector('[posX = "4"][posY = "11"]'),document.querySelector('[posX = "6"][posY = "11"]'),document.querySelector('[posX = "7"][posY = "11"]'),document.querySelector('[posX = "8"][posY = "11"]'),document.querySelector('[posX = "2"][posY = "10"]'),document.querySelector('[posX = "3"][posY = "10"]'),document.querySelector('[posX = "8"][posY = "10"]')];
let arrowAlpaca = [document.querySelector('[posX = "5"][posY = "6"]'),document.querySelector('[posX = "6"][posY = "6"]'),document.querySelector('[posX = "4"][posY = "7"]'),document.querySelector('[posX = "5"][posY = "7"]'),document.querySelector('[posX = "6"][posY = "7"]'),document.querySelector('[posX = "3"][posY = "8"]'),document.querySelector('[posX = "4"][posY = "8"]'),document.querySelector('[posX = "6"][posY = "8"]'),document.querySelector('[posX = "7"][posY = "8"]'),document.querySelector('[posX = "8"][posY = "8"]'),document.querySelector('[posX = "2"][posY = "9"]'),document.querySelector('[posX = "3"][posY = "9"]'),document.querySelector('[posX = "8"][posY = "9"]'),document.querySelector('[posX = "13"][posY = "13"]'),document.querySelector('[posX = "14"][posY = "13"]'),document.querySelector('[posX = "13"][posY = "12"]'),document.querySelector('[posX = "14"][posY = "12"]'),document.querySelector('[posX = "15"][posY = "12"]'),document.querySelector('[posX = "11"][posY = "11"]'),document.querySelector('[posX = "12"][posY = "11"]'),document.querySelector('[posX = "13"][posY = "11"]'),document.querySelector('[posX = "15"][posY = "11"]'),document.querySelector('[posX = "16"][posY = "11"]'),document.querySelector('[posX = "11"][posY = "10"]'),document.querySelector('[posX = "16"][posY = "10"]'),document.querySelector('[posX = "17"][posY = "10"]')];
let startStory = true, startGame = false, touchStep = true, touchClick = false, touch = 'none', state = 'day', stage = 'story', coordinates, randomMove = 4, randomTime = 0;
let interval = setInterval(start, 250);
// Нажатие клавиш
window.addEventListener('keydown', function(e) {
  if (touchStep) {
    switch (e.keyCode) {
      case 13:
  		case 32:
  			touchClick = true;
  			break;
  		case 37:
  		case 65:
        if (stage == 'story') { touch = 'left'; }
        else if (touch != 'right') { touch = 'left' }
  			break;
      case 38:
      case 87:
        if (stage == 'story') { touch = 'up'; }
        else if (touch != 'down') { touch = 'up' }
        break;
  		case 39:
  		case 68:
        if (stage == 'story') { touch = 'right'; }
        else if (touch != 'left') { touch = 'right' }
  			break;
      case 40:
      case 83:
        if (stage == 'story') { touch = 'down'; }
        else if (touch != 'up') { touch = 'down' }
        break;
  	}
    touchStep = false;
  }
});
// Свайпинг
window.addEventListener('load', function(){
  let touchsurface = document.getElementById('touchsurface');
  let startX, startY, elapsedTime, startTime;
  touchsurface.addEventListener('touchstart', function(e){
    let touchObject = e.changedTouches[0];
    startX = touchObject.pageX;
    startY = touchObject.pageY;
    startTime = new Date().getTime();
  }, false);
  touchsurface.addEventListener('touchend', function(e){
    let touchObject = e.changedTouches[0];
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= 111) { touchClick = true; }
    if ( (elapsedTime <= 666) && touchStep ) {
      if (Math.abs(touchObject.pageY - startY) < 66) {
        if ( (touchObject.pageX-startX) > 66) {
          if (stage == 'story') { touch = 'right'; }
          else if (touch != 'left') { touch = 'right' }
        }
        if ( (touchObject.pageX-startX) < -66) {
          if (stage == 'story') { touch = 'left'; }
          else if (touch != 'right') { touch = 'left' }
        }
      }
      if (Math.abs(touchObject.pageX - startX) < 66) {
        if ( (touchObject.pageY-startY) > 66) {
          if (stage == 'story') { touch = 'down'; }
          else if (touch != 'up') { touch = 'down' }
        }
        if ( (touchObject.pageY-startY) < -66) {
          if (stage == 'story') { touch = 'up'; }
          else if (touch != 'down') { touch = 'up' }
        }
      }
      touchStep = false;
    }
    e.preventDefault();
  }, false);
}, false);
