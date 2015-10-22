(function() {
  var gamedata = {
    points: 0,
    gameOn: false,
    time: 0,
    matchValue: null
  };
  
  var game = {
    button: document.getElementById('button'),
    counter: document.getElementById('counter'),
    points: document.getElementById('points'),
    gameinfo: document.getElementById('game-info'),
    matchbar: document.getElementById('match-bar'),
    userbar: document.getElementById('user-bar'),
    
    init: function() {
      document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27 || e.keyCode === 83) {
          game.toggle(); 
        }
      });
      game.button.addEventListener('click', function() {
        game.toggle();
      });
      document.addEventListener('webkitmouseforcewillbegin', function(e) {
        e.preventDefault();
        game.updateForce(e.webkitForce);
      });
      document.addEventListener('webkitmouseforcechanged', function(e) {
        game.updateForce(e.webkitForce);
      });
    },
    
    toggle: function() {
      if (game.gameOn) {
        clearInterval(game.timer);
        game.matchbar.style.height = '0px';
        game.gameOn = false;
        game.gameinfo.classList.remove('hide');
        game.button.innerHTML = 'Start';
      } else {
        game.gameOn = true;
        game.gameinfo.classList.add('hide');
        game.button.innerHTML = 'Stop';
        game.start();
      }
    },
    
    start: function() {
      gamedata.points = 0;
      gamedata.time = 0;
      game.points.innerHTML = gamedata.points;
      game.timer = setInterval(function() {
        gamedata.time += 100;
        game.counter.innerHTML = gamedata.time;
      }, 100);
      game.setMatch();
    },
    
    setMatch: function() {
      game.userbar.style.height = '0%';
      gamedata.time = 0;
      gamedata.matchValue = (Math.random() * (85 - 1) + 1).toFixed(0);
      game.matchbar.style.height = gamedata.matchValue + '%';
    },
    
    updateForce: function(force) {
      if (game.gameOn) {
        var value = force-1, // normalize value from basic click
            validvalue = null;
        if (value > 0) {
          validvalue = ((value*100)/2).toFixed(0);
          game.userbar.style.height = validvalue + '%';
        } else {
          game.userbar.style.height = '0%';
        }
        if (validvalue === gamedata.matchValue) {
          var currentscore = parseInt(gamedata.points),
              newscore = parseInt((10000/gamedata.time).toFixed(0));
          if (newscore > 0) {
            gamedata.points = currentscore + newscore;
          }
          game.points.innerHTML = gamedata.points;
          game.setMatch();
        }
      }
    }
    
  };
  
  game.init();
})();