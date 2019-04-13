function scoreKeeper(){
  this.score = 0;

  this.scoreList = {
    pac: 10,
    bigPac: 50,
    ghost: 200,
    cherry: 100,
    strawberry: 500,
    peach: 1000,
    apple: 2000,
    watermelon: 5000
  }
}

scoreKeeper.prototype.add = function(type, multi){
  var curLiveBenefit = (this.score / 10000) | 0;
  this.score = this.score + (this.scoreList[type] * multi);
  var newLiveBenefit = (this.score / 10000) | 0;
  if(newLiveBenefit > curLiveBenefit)
    pacman.lives++;
}

scoreKeeper.prototype.total = function(){
  return this.score;
}