var downState = false;
var upState = false;
var leftState = false;
var rightState = false;

document.onkeydown=function(e){
  var evt = e ? e:event;
  var keyCode = evt.keyCode;

  pacman.leftState  = false;
  pacman.rightState = false;
  pacman.upState    = false;
  pacman.downState  = false;

  switch (keyCode)
  {
    case 37: pacman.leftState = true; break;
    case 39: pacman.rightState = true; break;
    case 38: pacman.upState   = true; break;
    case 40: pacman.downState = true; break;
  }
  if (pacman.leftState || pacman.rightState || pacman.upState || pacman.downState) pacman.queuedMovement = true;
}