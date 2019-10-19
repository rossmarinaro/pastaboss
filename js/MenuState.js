//pastaboss game menu screen


class MenuState extends Phaser.Scene{
  constructor(){
    super("MenuState");
  }   

  create(){
		// trippy background
	
			this.time.addEvent({
				delay: 2000,
				callback: onEventEnd,
				callbackScope: this
			});
			function onEventEnd(){		
			let frames = ['bkgnd', 'cheese_pit3', 'p3', 'p4', 'p5'];
				for (var r = 0; r < frames.length; ++r){
					tilesprites[r] = this.add.tileSprite(r * 160, 0, 160, 600, 'bkgnd', frames[r]);
					tilesprites[r].setOrigin(0);
					tilesprites[r].setTint(0xff0ff, 0xffff00, 0x0000ff, 0xff0000);
				}
			}
	this.anims.create({
	key: 'walk',
	frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 8, end: 3, zeroPad: 2}),
	frameRate: 5,
	repeat: 3
	   //animated characters
    });
							let blocks = this.add.group({ key:'player', repeat: 191 });
						Phaser.Actions.GridAlign(blocks.getChildren(), {
							width: 16,
							cellWidth: 50, cellHeight: 50, x: 25, y: 25
						});
						let _this = this;
						let i = 0;
						blocks.children.iterate(function (child) {
							_this.tweens.add({
								targets: child,
								scaleX: 0,
								scaleY: 0,
								alpha: 0,
								y: '+=64',
								angle: 180,
								ease: 'Power3',
								duration: 1000,
								delay: 1000 + (i * 100)
							});
							
							i++;
							if(i % 16 === 0){
								i = 0;
							}
						});
	// start game buttons
		this.input.keyboard.on('keydown', ()=>{
				this.ring = this.sound.add('ring');
				this.ring.play();
				this.scene.start('PlayState');
			}, this);
	this.time.addEvent({
		delay: 2000,
		callback: onEvent,
		callbackScope: this
	});
	function onEvent(){
		this.pastabossText = this.add.image(385, 50, 'pastaboss_text'); 
		this.pastabossText.setScale(0.35);
		this.pastabossText.setInteractive();
		this.pastabossText.on('pointerdown', function(){
		this.ring.play();
		this.scene.start('PlayState');        
		}, this);
		this.logoImage = this.add.image(385, 300, 'logo').setScale(0.8);
		this.startGameText = this.add.text(330, 120, "Start game", {font: "25px Bangers", fill: '#ffff00'}); 
		this.startGameText.setInteractive();
		this.startGameText.on('pointerdown', function(){
		this.ring.play();
		this.scene.start('PlayState');        
		}, this);
		this.add.text(185, 500, `You are some sort of spaghetti monster humanoid hybrid!`, {font: "15px Arial", fill: "#ffff00"});
		this.add.text(215, 520, `Go on and frolic about, the world is your oyster...`, {font: "15px Arial", fill: "#ffff00"});
		this.add.text(105, 540, `use arrow keys, "W,A,S,D" and spacebar on desktop, or on-screen controls for mobile.`, {font: "15px Arial", fill: "#ffff00"});
		player = this.add.sprite(250, 460, 'player').anims.play('walk').setInteractive();
		this.tweens.add({
			targets: player, x: 550, ease: 'Linear', duration: 5000, repeat: -1, yoyo: true, onYoyo: function(){
			player.flipX = true;
			player.anims.play('walk');
		this.time.addEvent({
				delay: 5000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				player.flipX = false;
				player.anims.play('walk');
			}
			}, onYoyoScope: this, onYoyoParams: [], yoyoDelay: 0
		});
		this.ring = this.sound.add('ring');
		player.on('pointerdown', function(){
		this.ring.play();
		this.scene.start('PlayState');        
	}, this); 
	}
	// menu audio
	this.menuMusic = this.sound.add('menu_music');

  } // end create method
  
  update(){
	  var x = 1;
	  for (var i = 0; i < tilesprites.length; ++i){
		  tilesprites[i].tilePositionX += x;
		  tilesprites[i].tilePositionY += x;
		  x *= -1;
	  }
	  iter += 0.01;
  }
	
////////////
}