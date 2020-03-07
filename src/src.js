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
  	let posY = Math.round(Math.random()*15 + 17);
  	return [posX, posY];
  }
  let coordinates = generateSnake();
  snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];
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
          let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        	snakeBody[0].classList.remove('snakeHead');
        	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        	snakeBody.pop();

        	// Смена направления
        	switch (touch) {
        		case 'right':
        			if (snakeCoordinates[0]==18) { snakeCoordinates[0]=0; }
        			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        			break;
        		case 'up':
        			if (snakeCoordinates[1]==32) { snakeCoordinates[1]=0; }
        			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
        			break;
        		case 'left':
        			if (snakeCoordinates[0]==1) { snakeCoordinates[0]=19; }
        			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        			break;
        		case 'down':
        			if (snakeCoordinates[1]==1) { snakeCoordinates[1]=33; }
        			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] -1) + '"]'));
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




        	// Поедание мышей
        	if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY') ) {
        		mouse.classList.remove('mouse');
        		snakeBody[0].classList.add('snakeHead');
        		let a = snakeBody[snakeBody.length-1].getAttribute('posX');
        		let b = snakeBody[snakeBody.length-1].getAttribute('posY');
        		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b +'"]'));
        		createMouse();
            createAlpaca();
        	}



          console.log(state,stage);
          break;
        case 'night':
// Игра ночью



          console.log(state,stage);
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
          let dayCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        	snakeBody[0].classList.remove('snakeHead');
        	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        	snakeBody.pop();
          switch (Math.round(Math.random()*3 + 1)) {
            case 1:
              if (dayCoordinates[0]==18) { dayCoordinates[0]=0; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+dayCoordinates[0] + 1) + '"][posY = "' + dayCoordinates[1] + '"]'));
              break;
            case 2:
              if (dayCoordinates[1]==32) { dayCoordinates[1]=0; }
              snakeBody.unshift(document.querySelector('[posX = "' + dayCoordinates[0] + '"][posY = "' + (+dayCoordinates[1] + 1) + '"]'));
              break;
            case 3:
              if (dayCoordinates[0]==1) { dayCoordinates[0]=19; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+dayCoordinates[0] - 1) + '"][posY = "' + dayCoordinates[1] + '"]'));
              break;
            case 4:
              if (dayCoordinates[1]==1) { dayCoordinates[1]=33; }
              snakeBody.unshift(document.querySelector('[posX = "' + dayCoordinates[0] + '"][posY = "' + (+dayCoordinates[1] -1) + '"]'));
              break;
          }
          snakeBody[0].classList.add('snakeHead');
        	for (let i = 0; i < snakeBody.length; i++) {
        		snakeBody[i].classList.add('snakeBody');
        	}


          switch (touch) {
            case 'up':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              startGame = true;
              stage = 'game'
              break;
            case 'down':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              startGame = true;
              stage = 'game'
              break;
            case 'left':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
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
              startStory = true;
              state = 'night'
              touch = 'none'
              break;
          }
          console.log(state,stage,touchStep);
          break;
        case 'night':
// Сторик ночью
          field.classList.add('nightField');
          if (startStory) {
            createSnake();
            startStory = false;
          }
          let nightCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        	snakeBody[0].classList.remove('snakeHead');
        	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        	snakeBody.pop();
          switch (Math.round(Math.random()*3 + 1)) {
            case 1:
              if (nightCoordinates[0]==18) { nightCoordinates[0]=0; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+nightCoordinates[0] + 1) + '"][posY = "' + nightCoordinates[1] + '"]'));
              break;
            case 2:
              if (nightCoordinates[1]==32) { nightCoordinates[1]=0; }
              snakeBody.unshift(document.querySelector('[posX = "' + nightCoordinates[0] + '"][posY = "' + (+nightCoordinates[1] + 1) + '"]'));
              break;
            case 3:
              if (nightCoordinates[0]==1) { nightCoordinates[0]=19; }
              snakeBody.unshift(document.querySelector('[posX = "' + (+nightCoordinates[0] - 1) + '"][posY = "' + nightCoordinates[1] + '"]'));
              break;
            case 4:
              if (nightCoordinates[1]==1) { nightCoordinates[1]=33; }
              snakeBody.unshift(document.querySelector('[posX = "' + nightCoordinates[0] + '"][posY = "' + (+nightCoordinates[1] -1) + '"]'));
              break;
          }
          snakeBody[0].classList.add('snakeHead');
        	for (let i = 0; i < snakeBody.length; i++) {
        		snakeBody[i].classList.add('snakeBody');
        	}


          switch (touch) {
            case 'up':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              startGame = true;
              stage = 'game'
              touch = 'none'
              break;
            case 'down':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
              startGame = true;
              stage = 'game'
              touch = 'none'
              break;
            case 'left':
              for (let i = 0; i < snakeBody.length; i++) {
                snakeBody[i].classList.remove('snakeBody');
              }
              snakeBody[0].classList.remove('snakeHead');
              delete snakeBody;
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
              startStory = true;
              state = 'day'
              touch = 'none'
              break;
          }
          console.log(state,stage,touchStep);
          break;
      }
      break;
  }
  touchStep = true;
}

// Запуск
let startStory = true, startGame = false, touchStep = true, touchClick = false; touch = 'none', state = 'day'; stage = 'story';
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
  			touch = 'left';
  			break;
      case 38:
      case 87:
        touch = 'up';
        break;
  		case 39:
  		case 68:
        touch = 'right'
  			break;
      case 40:
      case 83:
        touch = 'down';
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
          else {
            if (touch != 'left') { touch = 'right' }
          }
        }
        if ( (touchObject.pageX-startX) < -66) {
          if (stage == 'story') { touch = 'left'; }
          else {
            if (touch != 'right') { touch = 'left' }
          }
        }
      }
      if (Math.abs(touchObject.pageX - startX) < 66) {
        if ( (touchObject.pageY-startY) > 66) {
          if (stage == 'story') { touch = 'down'; }
          else {
            if (touch != 'up') { touch = 'down' }
          }
        }
        if ( (touchObject.pageY-startY) < -66) {
          if (stage == 'story') { touch = 'up'; }
          else {
            if (touch != 'down') { touch = 'up' }
          }
        }
      }
      touchStep = false;
    }
    e.preventDefault();
  }, false);
}, false);
