////Pastaboss game preload assets


class BootState extends Phaser.Scene {
  constructor() {
    super("BootState");
  }
   
 //////preload//////

  preload(){

  }

  //////create///////
  
  create() {
	  	this.add.text(-1000, -1000, "Loading game...", {font: "35px Bangers", fill: '#ffff00'});

		this.timedEvent = this.time.addEvent({
		delay: 250,
		callback: onEvent,
		callbackScope: this
		});	
function onEvent(){
	  this.scene.start('PreloadState');
	
	}
}
 
}
