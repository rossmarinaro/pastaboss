////Retry Preez lmao Pastaboss game

class RetryState extends Phaser.Scene{
  constructor(){
    super("RetryState");
  }
  create(){
	 
	this.add.image(420, 600, "ulooked");
	this.add.text(230, 250, "Retry Preez Lmao", {font: "25px Arial", fill: "#ffff00"}); 
	this.continue_button = this.add.image(320, 110, 'continue');
			this.continue_button.setInteractive();
			this.continue_button.setScrollFactor(0);
			this.continue_button.setScale(0.25);
	this.losing_text = this.add.text( 150, 10, 'STOP SUCKING',
			{fontSize:'50px', fontFamily: 'Courier', fill:'#ffff00'});   
	this.losing_text.setScrollFactor(0);
	this.retry_text = this.add.text( 159, 45, 'RETRY PREEZ',
			{fontSize:'50px', fontFamily: 'Courier', fill: '#ffff00'});		
	this.ring = this.sound.add('ring');
	this.continue_button.on('pointerdown', function(){
	this.ring.play();
	this.scene.start('MenuState');        
	}, this);	

  }
  
  update(time, delta){
	  
	  healthScore = 3;
	  macaroniAvailable = 25;
	  livesAvailable = 3;
	  livesLeft = 3;
	  
  }
}


