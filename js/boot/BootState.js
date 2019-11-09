////Pastaboss boot state

class BootState extends Phaser.Scene {
	constructor() {
	  super("BootState");
	}
	//////create///////
	  create() {
				  //text preload
				  this.add.text(0, 0, "", {font: "1px Digitizer", fill: ''}).setAlpha(0);
				  this.add.text(0, 0, "", {font: "1px Bangers", fill: ''}).setAlpha(0);
				  // timer
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
