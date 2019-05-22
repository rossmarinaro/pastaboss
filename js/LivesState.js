////pastaboss lives state


class LivesState extends Phaser.Scene{
  constructor(){
    super("LivesState");
  }
  create(){

	
	//text
	this.oof = this.add.text(320, 400, "OOF!", {font: "45px Bangers", fill: '#ffff00'});
	this.livesLeftText = this.add.text(480, 280, "3", {font: "45px Bangers", fill: '#ffffff'});
	livesLeft--;
	this.livesLeftText.setText(livesLeft);
	// start game button
	this.face = this.add.sprite(350, 280, 'lives2');
	this.face.setInteractive();
	this.face.on('pointerdown', function(){
	if (livesAvailable >= 1){
	this.ring = this.sound.add('ring');	
	this.ring.play();
	this.scene.start('PlayState');

	}
	// if player lives score is 0 you lose
	if (livesAvailable <= 0){	
			this.scene.start('RetryState');
			this.gameOver = this.sound.add('game_over');
			this.gameOver.play();
		}
	}, this);   
	// menu audio
	this.menuMusic = this.sound.add('menu_music');
	// score
	


  }// end create function
  
    update(time, delta){
	  
	  healthScore = 3;
	  macaroniAvailable = 25;
	  
  }
  
////////////
}