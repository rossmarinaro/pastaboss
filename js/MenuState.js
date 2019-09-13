//pastaboss game menu screen


class MenuState extends Phaser.Scene{
  constructor(){
    super("MenuState");
  }
  create(){
	  
	//text
	this.pastabossText = this.add.image(340, 130, 'pastaboss_text'); 
	this.pastabossText.setScale(0.25);
	this.pastabossText.setInteractive();
	this.pastabossText.on('pointerdown', function(){
	this.ring.play();
	this.scene.start('PlayState');        
	}, this);
	this.startGameText = this.add.text(290, 190, "Start game", {font: "25px Bangers", fill: '#ffff00'}); 
	this.startGameText.setInteractive();
	this.startGameText.on('pointerdown', function(){
	this.ring.play();
	this.scene.start('PlayState');        
	}, this);
	this.add.text(165, 350, `You are some sort of spaghetti monster humanoid hybrid!`, {font: "15px Arial", fill: "#ffff00"});
    this.add.text(195, 370, `Go on and frolic about, the world is your oyster...`, {font: "15px Arial", fill: "#ffff00"});
	this.add.text(85, 400, `use arrow keys, "W" and spacebar if on desktop, or on-screen controls for mobile.`, {font: "15px Arial", fill: "#ffff00"});
	this.anims.create({
	key: 'walk',
	frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 8, end: 3, zeroPad: 2}),
	frameRate: 5,
	repeat: 3
    });
	// start game button
	player = this.add.sprite(350, 280, 'player').anims.play('walk');
	player.setInteractive();
	this.ring = this.sound.add('ring');
	player.on('pointerdown', function(){
	this.ring.play();
	this.scene.start('PlayState');        
	}, this);   
	// menu audio
	this.menuMusic = this.sound.add('menu_music');

  }
  
 /*  update(){
	  
		 if (this){
		  this.menuMusic.play();
		 
		 }
	}
*/	
////////////
}