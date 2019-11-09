////pastaboss lives state
class LivesState extends Phaser.Scene{
  constructor(){
    super("LivesState");
  }
  create(){
	  
	 healthScore = 3;
	 macaroniAvailable = 25; 
	this.A_buttonState = false;
	this.B_buttonState = false;
	//audio (music)
	this.dead = this.sound.add('dead');
			this.dead.play();
	//text
	this.oof = this.add.text(320, 400, "OOF!", {font: "45px Bangers", fill: '#ffff00'});
	this.livesLeftText = this.add.text(480, 280, "3", {font: "45px Bangers", fill: '#ffffff'});
	livesLeft--;
	this.livesLeftText.setText(livesLeft);
	// start game buttons
	this.face = this.add.sprite(350, 280, 'lives2');
	this.face.setInteractive();
	// if player lives score is 0 you lose
	if (livesAvailable <= 0){	
	this.dead.stop();
			this.scene.start('RetryState');
			this.gameOver = this.sound.add('game_over');
			this.gameOver.play();
		
	}
	this.timedEvent = this.time.addEvent({
		delay: 2000,
		callback: onEvent,
		callbackScope: this
		});	
		function onEvent(){
				if (livesAvailable >= 1){
				this.input.keyboard.on('keydown', ()=>{
					this.dead.stop();
					this.ring = this.sound.add('ring');	
					this.ring.play();
					this.scene.start('PlayState');
				}, this);
				this.face.on('pointerdown', ()=>{
				this.dead.stop();
				this.ring = this.sound.add('ring');
				this.ring.play();
				this.scene.start('PlayState');	
				}, this);
		  }
		}
  }// end create function
////////////
}