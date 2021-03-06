//// Pastaboss game Playstate script

class PlayState extends Phaser.Scene {
  constructor() {
    super("PlayState");
  }


////create
  
create() {
		
		
		//background
		this.bkgnd = 
		this.add.image(500, 200, 'pixel').setScale(270);
		//music
		this.ring = this.sound.add('ring');
		this.ring.play();
		this.mainTheme = this.sound.add('level1');
		this.mainTheme.play();
		this.mainTheme.setLoop(this.loop);	
		// load the map 
		let map = this.add.tilemap('map');
		this.load.image('map',  'assets/map.png');
		// tiles for the ground layer, background images
		let backdropTiles = map.addTilesetImage('tiles2');
		let backdrop = map.createStaticLayer('bkgnd', backdropTiles, 0, 0);
		let backdropTiles2 = map.addTilesetImage('tiles3');
		let backdropUnderground = map.createStaticLayer('bkgnd2', backdropTiles2, 0, 0);
		let groundTiles = map.addTilesetImage('tiles');
		let groundLayer = map.createStaticLayer('World', groundTiles, 0, 0);
		groundLayer.setCollisionByExclusion([-1]);
		let macaroniItemTiles = map.addTilesetImage('coin');   
		macaroniPickupLayer = map.createDynamicLayer('Coins', macaroniItemTiles, 0, 0);
		//world parameters
		this.physics.world.bounds.width = groundLayer.width;   
		this.physics.world.bounds.height = groundLayer.height; 
		// game instruction text
		this.gameInstructionTxt = this.add.text(100, 300, 'CARB UP!', {font: "35px Bangers", fill: '#FFFF00'}).setStroke("#ff0000", 4).setShadow(2, 2, '#000000', true, false);
		this.input.keyboard.once('keydown', ()=>{	
			this.gameInstructionTxt.destroy();
			this.scene.resume('PlayState');
		});
		this.input.once('pointerdown', ()=>{	
			this.gameInstructionTxt.destroy();
			this.scene.resume('PlayState');
		});
	//fire
		this.anims.create({
			key: 'fireball_anims',
			frames:[
			{ key: 'fire_fr1' },
				{ key: 'fire_fr2' },
					{ key: 'fire_fr3' },
						{ key: 'fire_fr4' }, 
							{ key: 'fire_fr5' , duration: 5 }
			],
			frameRate: 8,
			repeat: -1
			});
/*		this.fire = this.add.group();
		const xCoord = Math.random() * 1400;
		this.fire.create(1390, 570, 'fire1').play('fire_anims').setScale(1.2);
		this.fire.create(2160, 580, 'fire1').play('fire_anims').setScale(1.2);
		this.fire.create(2230, 580, 'fire1').play('fire_anims').setScale(1.2);
		this.fire.create(2300, 580, 'fire1').play('fire_anims').setScale(1.2);      */
	// level pick ups
		let healthPickups = this.physics.add.group();
        this.healthPickup = healthPickups.create(430, 400, 'ikura');
		this.healthPickup2 = healthPickups.create(3075, 400, 'salmon');
		this.healthPickup3 = healthPickups.create(1130, 400, 'ikura');
		this.healthPickup4 = healthPickups.create(980, 900, 'salmon');
	    this.healthPickup5 = healthPickups.create(2160, 400, 'ikura');
		this.healthPickup6 = healthPickups.create(900, 900, 'salmon');
	    this.healthPickup7 = healthPickups.create(3650, 200, 'ikura');
		this.healthPickup8 = healthPickups.create(1070, 900, 'salmon');
		//exit
		let doorLv1 = this.physics.add.staticGroup();
		doorLv1.create(145, 1185, 'exit');	
	// player sprite    
		player = this.physics.add.sprite(200, 300, 'player');
		player.setBounce(0.2); // our player will bounce from items
		player.setCollideWorldBounds(true); // don't go out of the map    
		player.body.setSize(player.width, player.height-8);
///////////////////////////	
////player weapons

	//rolling pin
	this.rollingPinWeapon = this.physics.add.staticGroup();
	//macaroni
		// Get bullet from bullets group
		this.macaronis = this.physics.add.group();
		//macaroni animation
		this.anims.create({
			key: 'macaroni_loop',
			frames:[
			{ key: 'macaroni' },
				{ key: 'macaroni2' },
					{ key: 'macaroni3' },
						{ key: 'macaroni4', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
});
						
//////////	player animations
	
	// walk
				
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 3, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
	  // jump 
    this.anims.create({
        key: 'fall',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 10, end: 10, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
	});
    // idle 
	this.anims.create({
			key: 'idle',
			frames:[
			{ key: 'idle1' },
				{ key: 'idle2' },
					{ key: 'idle3' },
						{ key: 'idle4', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
});
	// player rolling pin 
	this.anims.create({
        	key: 'rolling_pin_loop',
			frames:[
					{ key: 'player_weapon_fr1' },
						{ key: 'player_weapon_fr2' },
							{ key: 'player_weapon_fr3' },
								{ key: 'player_weapon_fr4', duration: 50 }
		],
		frameRate: 25,
		repeat: -1
	}); 
		
	// fire noodle
		this.anims.create({
			key: 'fire_macaroni',
			frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 4, zeroPad: 2}),
			frameRate: 10,
			repeat: -1
	});	
	
///////enemy animations//////

   //chili peppers facing left
		this.anims.create({
			key: 'chili_loop',
			frames:[
			{ key: 'chili_fr1' },
				{ key: 'chili_fr2' },
					{ key: 'chili_fr3', duration: 25 }
		],
		frameRate: 8,
		repeat: -1
});

 //cheese pits
		this.anims.create({
			key: 'cheese_pit_anims',
			frames:[
			{ key: 'cheese_pit1' },
				{ key: 'cheese_pit2' },
					{ key: 'cheese_pit3', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
});
//meatballs facing right
		this.anims.create({
			key: 'meatball_loop',
			frames:[
			{ key: 'meatball_fr1' },
				{ key: 'meatball_fr2' },
					{ key: 'meatball_fr3', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
});	
	// level 1 boss
	this.anims.create({
			key: 'boss_idle',
			frames:[
			{ key: 'boss1' },
				{ key: 'boss2' },
					{ key: 'boss3' },
						{ key: 'boss4' },
							{ key: 'boss5' },
								{ key: 'boss6' },
									{ key: 'boss7', duration: 3000 }
		],
		frameRate: 3000,
		repeat: -1
});
	//destroy boss
	   this.anims.create({
        key: 'boss_hit_anim',
        frames: [{key: 'boss8'}],
        frameRate: 0
    });	
///////////////////
	
		// enemy movement groups 
		this.enemyStatic = this.physics.add.staticGroup();
		this.enemyMoving = this.physics.add.group();	
	//	let x = (player.x < 0) ? Phaser.Math.Between(2200, 3200 ) : Phaser.Math.Between(2200, 3200); 
	
///////////////enemy spawns	
	
	 	//chili facing left
		this.chili = this.enemyStatic.create(500, 450, 'chili_fr1').play('chili_loop');	 
		this.chili2 = this.enemyStatic.create(1776, 450, 'chili_fr1').play('chili_loop');
		this.chili3 = this.enemyStatic.create(1200, 450, 'chili_fr1').play('chili_loop');
		// chili fireballs
		this.fireBall1 = this.enemyMoving.create(500, 440, 'fire_fr1').play('fireball_anims').setScale(0.4);
		this.fireBall1.angle = 90;
		this.fireBall1Tween = this.tweens.add({
			targets: this.fireBall1, x: 300, y: 440, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
		});
		this.fireBall2 = this.enemyMoving.create(1776, 440, 'fire_fr1').play('fireball_anims').setScale(0.4);
		this.fireBall2.angle = 90;
		this.fireBall2Tween = this.tweens.add({
			targets: this.fireBall2, x: 1576, y: 440, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
		});
		this.fireBall3 = this.enemyMoving.create(1200, 440, 'fire_fr1').play('fireball_anims').setScale(0.4);
		this.fireBall3.angle = 90;
		this.fireBall3Tween = this.tweens.add({
			targets: this.fireBall3, x: 1000, y: 440, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
		});
		    
		// chili health points
		this.chiliHealth = 3;
		this.chili2Health = 3;
		this.chili3Health = 3;
		//cheese pits
		let cheese_pit = this.enemyStatic.create(1400, 600, 'cheese_pit1').play('cheese_pit_anims').setOffset(0, 40);
		cheese_pit.setScale(0.65, 0.7);
		let cheese_pit2 = this.enemyStatic.create(2240, 666, 'cheese_pit1').play('cheese_pit_anims');
		cheese_pit2.setScale(1.3);	
		//meatball facing left
		this.meatball = this.enemyMoving.create(3200, 400, 'meatball_fr1').play('meatball_loop');
		this.meatball2 = this.enemyMoving.create(3000, 700, 'meatball_fr1').play('meatball_loop');
		// meatballs health points
		this.meatballHealth = 2;
		this.meatball2Health = 2;
		this.meatball3Health = 2;
		this.meatball4Health = 2;		
		// meatballs right
		this.meatball3 = this.enemyMoving.create(800, 800, 'meatball_fr1').play('meatball_loop');
		this.meatball3.flipX = true;
		this.meatball4 = this.enemyMoving.create(1200, 900, 'meatball_fr1').play('meatball_loop');
		this.meatball4.flipX = true;
		//
	    this.meatball.setBounce(1);
	    this.meatball.setCollideWorldBounds(true);
	    this.meatball.setVelocity(Phaser.Math.Between(-200, 200), 20);
	    this.meatball.allowGravity = true;
		//
	    this.meatball2.setBounce(1);
        this.meatball2.setCollideWorldBounds(true);
        this.meatball2.setVelocity(Phaser.Math.Between(-200, 200), 20);
        this.meatball2.allowGravity = true;
		//
	    this.meatball3.setBounce(1);
        this.meatball3.setCollideWorldBounds(true);
        this.meatball3.setVelocity(Phaser.Math.Between(-200, 200), 20);
        this.meatball3.allowGravity = true;
		//
	    this.meatball4.setBounce(1);
        this.meatball4.setCollideWorldBounds(true);
        this.meatball4.setVelocity(Phaser.Math.Between(-200, 200), 20);
        this.meatball4.allowGravity = true;
		//
		// level 1 boss
		this.levelBoss = this.enemyStatic.create(300, 1150, 'boss1').play('boss_idle').setScale(0.7);
		this.levelBoss.setSize(250, 300, true);
	
		// level 1 boss health points
		this.levelBossHealth = 10;
		// boss fire
		this.bossFire = this.physics.add.group();
	
/////////// health, ammo, and lives text  ///////////////////////////////////////////////////////

	// health text
		this.playerInterface = this.add.image(150, 60, 'player_interface').setScrollFactor(0);
		this.text = this.add.text(20, 20,  '\u2764', { 	
		fontSize: '30px',
		fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		this.text2 = this.add.text(25, 60,  '3', {
		fontSize: '20px',
		fontFamily: 'Digitizer',
		fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		// macaroni available
		this.macaroniText = this.add.text(110, 15, 'Macaroni :', {
			fontSize: '25px',
			fontFamily: 'Bangers',
			fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		this.macaroniText2 = this.add.text(130, 60, '25', {
			fontSize: '20px',
			fontFamily: 'Digitizer',
			fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);	
		// lives available
		this.lives = this.add.image(260, 30, 'lives').setScrollFactor(0);
		livesText = this.add.text(245, 60, '3', {
			fontSize: '20px',
			fontFamily: 'Digitizer',
			fill: '#ffffff'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		//low health
		this.text3 = this.add.text(10, 80,  'Low health!', {
		fontSize: '15px',
		fontFamily: 'Bangers',
		fill: '#ff0000'
		}).setScrollFactor(0).setShadow(2, 2, '#000000', true, false);
		this.tweens.add({
			targets: this.text3,
			scale: 1.2,
			ease: 'Linear',
			duration: 1000,
			repeat: -1,
			yoyo: true
		});
////collisions
		//general collisions 
		this.physics.add.collider(groundLayer, player);
		this.physics.add.collider(this.enemyStatic, groundLayer);
		this.physics.add.collider(this.enemyMoving, groundLayer);
		this.physics.add.collider(this.levelBoss, groundLayer);
		this.physics.add.collider(this.levelBoss, this.meatball);
		this.physics.add.collider(this.levelBoss, this.meatball2);
		this.physics.add.collider(this.levelBoss, this.meatball3);
		this.physics.add.collider(this.levelBoss, this.meatball4);
		this.physics.add.collider(this.meatball, this.meatball2);
		this.physics.add.collider(this.meatball, this.meatball3);
		this.physics.add.collider(this.meatball, this.meatball4);
		this.physics.add.collider(this.meatball2, this.meatball);
		this.physics.add.collider(this.meatball2, this.meatball3);
		this.physics.add.collider(this.meatball2, this.meatball4);
		this.physics.add.collider(this.meatball3, this.meatball);
		this.physics.add.collider(this.meatball3, this.meatball2);
		this.physics.add.collider(this.meatball3, this.meatball4);
		this.physics.add.collider(this.meatball4, this.meatball);
		this.physics.add.collider(this.meatball4, this.meatball2);
		this.physics.add.collider(this.meatball4, this.meatball3);
		this.physics.add.collider(doorLv1, groundLayer);
		this.physics.add.collider(healthPickups, groundLayer);	
////enemy damage collisons
		//moving enemy collision
		this.physics.add.collider(this.enemyMoving, player, ()=>{
		this.timedEvent = this.time.addEvent({
		delay: 250,
		callback: onEvent,
		callbackScope: this
		});	
			player.on('turnRed', handler);
			player.emit('turnRed', player);
			function handler(player){
			player.tint = 0xff0000;
			}
			function onEvent(){
			player.tint = 0xffffff;
			player.setBounce(0);
			}
			player.setBounce(1);
			healthScore--;
			this.text2.setText(healthScore);
			this.playerHit = this.sound.add('player_hit');
			this.playerHit.play();
		});
		
		//static enemy collision
		this.physics.add.collider(this.enemyStatic, player, ()=>{
		this.timedEvent = this.time.addEvent({
		delay: 250,
		callback: onEvent,
		callbackScope: this
		});	
			player.on('turnRed', handler);
			player.emit('turnRed', player);
			function handler(player){
			player.tint = 0xff0000;
			}
		function onEvent(){
			player.setBounce(0);
			player.tint = 0xffffff;
		}
			player.setBounce(1);
			healthScore--;
			this.text2.setText(healthScore);
			this.playerHit = this.sound.add('player_hit');
			this.playerHit.play();
		});
		// boss collision
		this.physics.add.collider(this.levelBoss, player, ()=>{
		this.timedEvent = this.time.addEvent({
		delay: 250,
		callback: onEvent,
		callbackScope: this
		});	
			player.on('turnRed', handler);
			player.emit('turnRed', player);
			function handler(player){
			player.tint = 0xff0000;
		}
		function onEvent(){
			player.setBounce(0);
			player.tint = 0xffffff;
		}
			player.setBounce(1);
			healthScore--;
			this.text2.setText(healthScore);
			this.playerHit = this.sound.add('player_hit');
			this.playerHit.play();
		});	
		// boss fire (pepperoni)
		this.physics.add.collider(this.bossFire, groundLayer, ()=>{
		this.timedEvent = this.time.addEvent({
		delay: 3000,
		callback: onEvent,
		callbackScope: this
		});	
		function onEvent(){
			this.bossFire.getChildren().map(child => child.destroy());
		}
		});
		this.physics.add.collider(this.bossFire, player, ()=>{
			healthScore--;
			this.text2.setText(healthScore);
			player.tint = 0xff0000;
			this.bossFire.getChildren().map(child => child.destroy());
		this.timedEvent = this.time.addEvent({
		delay: 250,
		callback: onEvent,
		callbackScope: this
		});
		function onEvent(){
			player.tint = 0xffffff;
		}
		});			
			//// pick up items	     		 
//macaroni (coin) tile collision
		macaroniPickupLayer.setTileIndexCallback(17, collectmacaroni, this);   
		this.physics.add.overlap(player, macaroniPickupLayer);
		function collectmacaroni(player, tile) {                 
		macaroniPickupLayer.removeTileAt(tile.x, tile.y);  
		this.macaroniRing = this.sound.add('macaroni_ring');
		this.macaroniRing.play();
		macaroniAvailable++; 
		this.macaroniText2.setText(macaroniAvailable); 
		return false;
		}
////player picks up items for health
			this.physics.add.collider(player, this.healthPickup, ()=>{	
			this.healthPickup.disableBody(true, true);
			this.healthPickup.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup2, ()=>{
			this.healthPickup2.disableBody(true, true);
			this.healthPickup2.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup3, ()=>{
			this.healthPickup3.disableBody(true, true);
			this.healthPickup3.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup4, ()=>{
			this.healthPickup4.disableBody(true, true);
			this.healthPickup4.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup5, ()=>{
			this.healthPickup5.disableBody(true, true);
			this.healthPickup5.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup6, ()=>{
			this.healthPickup6.disableBody(true, true);
			this.healthPickup6.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup7, ()=>{
			this.healthPickup7.disableBody(true, true);
			this.healthPickup7.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup8, ()=>{
			this.healthPickup8.disableBody(true, true);
			this.healthPickup8.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});	

			
/////////////////////////////////////////////////////////////   LEVEL 1 COMPLETE! (collision with weed)  ///////////////////////////
				this.physics.add.overlap(player, doorLv1, ()=>{
			this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
				if(progress > .9){
					this.socket.emit('level1_complete');
					this.mainTheme.stop();
					this.scene.stop('PlayState');
					this.scene.start('PreloadState_lv2');	
					onBegin = true;
				}
			});	
    	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
				
//////cameras 
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.startFollow(player);  
	//	this.cameras.main.setZoom(1.2);
/////////// game controls  /////////////////


//cursors and keys
		cursors = this.input.keyboard.createCursorKeys();
		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);		
		this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

//virtual buttons
		this.input.addPointer(1);
		//clear control states
		this.leftButtonState = false;
		this.jumpButtonState = false;
		this.rightButtonState = false;
		this.A_buttonState = false;
		this.B_buttonState = false;
		this.input.keyboard.on('keydown' + 'LEFT', ()=>{
			player.flipX = false;
		});
		this.input.keyboard.on('keydown' + 'RIGHT', ()=>{
			player.flipX = true;
		});
		//left button	
		this.leftButton =
		this.add.image(100, 500, 'left_button').setOrigin(0).setName('left_button').setInteractive();
		this.leftButton.setScrollFactor(0);
		this.leftButton.on('pointerover', ()=>{	
		}, this);
		this.leftButton.on('pointerout', ()=>{
		this.leftButton.tint = 0xffffff;	
		this.leftButtonState = false;
		}, this);
		this.leftButton.on('pointerdown', ()=>{	
		player.flipX = true;
		this.leftButton.tint = 0xff0000;
		this.leftButtonState = true;
		}, this);
		this.leftButton.on('pointerup', ()=>{
		this.leftButtonState = false;
		this.leftButton.tint = 0xffffff;
		}, this);
		// jump button
		this.jumpButton = 
		this.add.image(540, 500, 'jump_button').setOrigin(0).setName('jump_button').setInteractive();
		this.jumpButton.setScrollFactor(0);
		this.jumpButton.on('pointerover', ()=>{
		}, this);
		this.jumpButton.on('pointerout', ()=>{
		this.jumpButton.tint = 0xffffff;	
		this.jumpButtonState = false;
		}, this);
		this.jumpButton.on('pointerdown', ()=>{
		this.jumpButtonState = true;
		this.jumpButton.tint = 0xff0000;
		}, this);
		this.jumpButton.on('pointerup', ()=>{
		this.jumpButton.tint = 0xffffff;
		this.jumpButtonState = false;
		}, this);
		// right button
		this.rightButton = 
		this.add.image(200, 500, 'right_button').setOrigin(0).setName('right_button').setInteractive();
		this.rightButton.setScrollFactor(0);
		this.rightButton.on('pointerover', ()=>{
		}, this);
		this.rightButton.on('pointerout', ()=>{
		this.rightButton.tint = 0xffffff;	
		this.rightButtonState = false;
		}, this);
		this.rightButton.on('pointerdown', ()=>{
		this.rightButtonState = true;
		this.rightButton.tint = 0xff0000;
		player.flipX = false;
		}, this);
		this.rightButton.on('pointerup', ()=>{
		this.rightButton.tint = 0xffffff;
		this.rightButtonState = false;
		}, this);
		// A button (rolling pin weapon)
		this.A_button = 
		this.add.image(630, 500, 'A_button').setOrigin(0).setName('A_button').setInteractive();
		this.A_button.setScrollFactor(0);
		this.A_button.on('pointerover', ()=>{
		});
		this.A_button.on('pointerout', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
				if (this.A_buttonState === false){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());					
			}
		}, this);
		this.A_button.on('pointerdown', ()=>{	
			this.A_button.tint = 0xff0000;
			this.A_buttonState = true;
			player.anims.play('rolling_pin_loop', true);
			player.setVelocityX(0);
					this.huh = this.sound.add('huh');
					this.huh.play();	
					let weaponX = player.flipX === true ? player.x - 45 : player.x + 45;
					this.rollingPin = this.rollingPinWeapon.create(weaponX , player.y, 'rolling_pin_fr1');
					this.rollingPin.flipX = player.flipX === true;
					this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});
					function onEvent(){
						player.anims.play('idle');
						this.rollingPinWeapon.getChildren().map(child => child.destroy());
					}
					//enemy collisions
						//chilis
						this.physics.add.collider(this.rollingPin, this.chili, ()=>{
						this.chili.tint = 0xff0000;
						this.chiliHealth--;
						this.chiliHit = this.sound.add('chili_hit');
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.chiliHit.play();
						}
						});
						this.physics.add.collider(this.rollingPin, this.chili2, ()=>{
						this.chili2.tint = 0xff0000;
						this.chiliHealth--;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit');
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.chiliHit.play();
						}
						});
						this.physics.add.collider(this.rollingPin, this.chili3, ()=>{
						this.chili3.tint = 0xff0000;
						this.chili3Health--;
						this.chiliHit = this.sound.add('chili_hit');
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.chiliHit.play();
						}
						});
					//meatballs
					this.physics.add.collider(this.rollingPin, this.meatball, ()=>{
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.meatballHit.play();
							this.meatball.destroy();
					}
							this.meatball.tint = 0x000000;
					return	this.meatballHit = this.sound.add('meatball_hit');
					});
					this.physics.add.collider(this.rollingPin, this.meatball2, ()=>{
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.meatballHit.play();
							this.meatball2.destroy();
					}
							this.meatball2.tint = 0x000000;	
					 return this.meatballHit = this.sound.add('meatball_hit');
					});
					this.physics.add.collider(this.rollingPin, this.meatball3, ()=>{
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.meatballHit.play();
							this.meatball3.destroy();
					}
							this.meatball3.tint = 0x000000;
					return	this.meatballHit = this.sound.add('meatball_hit');
					});
					this.physics.add.collider(this.rollingPin, this.meatball4, ()=>{
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.meatballHit.play();
							this.meatball4.destroy();
					}
							this.meatball4.tint = 0x000000;	
					return 	this.meatballHit = this.sound.add('meatball_hit');
					});
						// level boss
						this.physics.add.collider(this.rollingPin, this.levelBoss, ()=>{
							this.levelBossHealth--;
							this.levelBoss.tint = 0xff0000;
							this.bossHit = this.sound.add('boss_hit');
							this.levelBoss.anims.play('boss_hit_anim');
							this.pepperoni2 =  
							this.bossFire.create(this.levelBoss.x + 50, this.levelBoss.y + 80 , 'pepperoni');
							this.pepperoni2.setVelocityX(800).setVelocityY(-350);
								this.time.addEvent({
								delay: 500,
								callback: onEvent,
								callbackScope: this
								});		
								function onEvent(){
								this.pepperoni2.destroy();	
								this.bossHit.play();
								}
						if (this.levelBossHealth >= 3){ 	
								this.time.addEvent({
								delay: 500,
								callback: onEvent2,
								callbackScope: this
								});	
								function onEvent2(){
								if (this.levelBoss.active){
								this.pepperoni2.destroy();	
								this.bossHit.play();
								this.levelBoss.tint = 0xffffff;
								this.levelBoss.anims.play('boss_idle');
								}
							} 
						}
					});
				  });

		this.A_button.on('pointerup', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
			if (this.A_buttonState === false){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());
			}
		});	
		// B button (macaroni weapon)
		this.B_button = 
		this.add.image(700, 450, 'B_button').setOrigin(0).setInteractive();
		this.B_button.setScrollFactor(0);
		this.B_button.on('pointerover', ()=>{
		});
		this.B_button.on('pointerout', ()=>{
		this.B_button.tint = 0xffffff;	
		this.B_buttonState = false;
		});
		this.B_button.on('pointerdown',  ()=>{
		this.B_button.tint = 0x0c1ea5;
		this.B_buttonState = true;
		// B button weapon 2 (macaroni)
					if (player.active === false){
						return;
					}
					if (macaroniAvailable >=1)
					{
					player.anims.play('fire_macaroni', true);
					player.flipX === true ? this.macaroni =	this.macaronis.create(player.x - 30, player.y, 'macaroni').play('macaroni_loop').setVelocityX(-700).setBounce(0.5) : this.macaroni = this.macaronis.create(player.x + 30, player.y, 'macaroni').play('macaroni_loop').setBounce(0.5).setVelocityX(700);
					this.huh = this.sound.add('huh');
					this.huh.play();
					macaroniAvailable--;	
					this.macaroniText2.setText(macaroniAvailable);
					// if run out of macaroni shots 
					 if (macaroniAvailable <= 0){
						this.macaroniText2.setText(0);
					}
					// world, ground, and player colliders
					this.physics.add.collider(this.macaroni, groundLayer, ()=>{
					//timer until they disappear
					this.time.addEvent({
						delay: 10000,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.macaronis.getChildren().map(child => child.destroy());
					}
					});
					this.physics.add.collider(this.macaroni, player, ()=>{
					this.macaroniRing = this.sound.add('macaroni_ring');
					this.macaroniRing.play();
					macaroniAvailable++;
					this.macaroniText2.setText(macaroniAvailable);
					this.macaronis.getChildren().map(child => child.destroy());
					});
					//enemy collisions
					//chilis
					this.physics.add.collider(this.macaroni, this.chili, ()=>{
						this.chiliHealth--;
						this.chili.tint = 0xff0000;
						this.chiliHit = this.sound.add('chili_hit');
						this.macaronis.getChildren().map(child => child.destroy());
						this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.chili.tint = 0xffffff;
					}
					});
					this.physics.add.collider(this.macaroni, this.chili2, ()=>{
						this.chili2Health--;
						this.chili2.tint = 0xff0000;
						this.chiliHit = this.sound.add('chili_hit');
						this.macaronis.getChildren().map(child => child.destroy());
					this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.chili2.tint = 0xffffff;
					}
					});
						this.physics.add.collider(this.macaroni, this.chili3, ()=>{	
						this.chili3Health--;
						this.chili3.tint = 0xff0000;
						this.chiliHit = this.sound.add('chili_hit');
						this.macaronis.getChildren().map(child => child.destroy());
						this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.chili3.tint = 0xffffff;
					}
					});
					//meatballs
					this.physics.add.collider(this.macaroni, this.meatball, ()=>{
						this.meatball.tint = 0x000000;
						this.meatballHit = this.sound.add('meatball_hit');
						this.macaronis.getChildren().map(child => child.destroy());
						this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.meatballHit.play();
						this.meatball.destroy();
					}
					});
					this.physics.add.collider(this.macaroni, this.meatball2, ()=>{
						this.meatball2.tint = 0x000000;
						this.meatballHit = this.sound.add('meatball_hit');
						this.macaronis.getChildren().map(child => child.destroy());
					this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.meatballHit.play();
						this.meatball2.destroy();
					}
					});
					this.physics.add.collider(this.macaroni, this.meatball3, ()=>{
						this.meatball3.tint = 0x000000;
						this.meatballHit = this.sound.add('meatball_hit');
						this.macaronis.getChildren().map(child => child.destroy());
						this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.meatballHit.play();
						this.meatball3.destroy();
					}
					});
					this.physics.add.collider(this.macaroni, this.meatball4, ()=>{
						this.meatball4.tint = 0x000000;
						this.meatballHit = this.sound.add('meatball_hit');
						this.macaronis.getChildren().map(child => child.destroy());
					this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.meatballHit.play();
						this.meatball4.destroy();
						}
					});	
									// level boss
					this.physics.add.collider(this.macaroni, this.levelBoss, ()=>{
						this.levelBossHealth--;
						this.levelBoss.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.bossHit = this.sound.add('boss_hit');
						this.levelBoss.anims.play('boss_hit_anim');
						this.pepperoni2 =  
						this.bossFire.create(this.levelBoss.x + 50, this.levelBoss.y + 80 , 'pepperoni');
						this.pepperoni2.setVelocityX(800).setVelocityY(-350);
					if (this.levelBossHealth >= 3){
						this.time.addEvent({
						delay: 500,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.pepperoni2.destroy();	
						this.bossHit.play();
						this.levelBoss.tint = 0xffffff;
						this.levelBoss.anims.play('boss_idle', true);
						}
					} else{
						this.time.addEvent({
						delay: 500,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.pepperoni2.destroy();	
						this.bossHit.play();
						}	
					}
				});		
			}
		}, this);
		this.B_button.on('pointerup', ()=>{
		this.B_button.tint = 0xffffff;
		this.B_buttonState = false;
		});		
//weapon keyboard (macaroni)	
	this.input.keyboard.on('keydown-' + 'SPACE', ()=>{	
		if (macaroniAvailable >= 1){ 
					player.anims.play('fire_macaroni', true);
					this.huh = this.sound.add('huh');
					this.huh.play();
					player.flipX === true ? this.macaroni = this.macaronis.create(player.x - 50, player.y, 'macaroni').play('macaroni_loop').setVelocityX(-700) : this.macaroni = this.macaronis.create(player.x + 50, player.y, 'macaroni').play('macaroni_loop').setVelocityX(700);
					this.macaroni.flipX = player.flipX === true;
					this.macaroni.setBounce(0.5);
					this.time.addEvent({
						delay: 10000,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.macaronis.getChildren().map(child => child.destroy());
					}
					macaroniAvailable--;	
					this.macaroniText2.setText(macaroniAvailable);
					// if run out of macaroni shots 
				 if (macaroniAvailable <= 0){
						this.macaroniText2.setText(0);
				}
					//enemy collisions
					//chilis
					this.physics.add.collider(this.macaroni, this.chili, ()=>{
						this.chiliHealth--;
						this.chili.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit');
						this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.chili.tint = 0xffffff;
					}
					});
					this.physics.add.collider(this.macaroni, this.chili2, ()=>{
						this.chili2Health--;
						this.chili2.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit');
					this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.chili2.tint = 0xffffff;
					}
					});
						this.physics.add.collider(this.macaroni, this.chili3, ()=>{	
						this.chili3Health--;
						this.chili3.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit');
						this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.chili3.tint = 0xffffff;
					}
					});
					//meatballs
					this.physics.add.collider(this.macaroni, this.meatball, ()=>{
						this.meatball.tint = 0x000000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.meatballHit = this.sound.add('meatball_hit');
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.meatballHit.play();
						this.meatball.destroy();
					}
					});
					this.physics.add.collider(this.macaroni, this.meatball2, ()=>{
						this.meatball2.tint = 0x000000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.meatballHit = this.sound.add('meatball_hit');
					this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.meatballHit.play();
						this.meatball2.destroy();
					}
					});
					this.physics.add.collider(this.macaroni, this.meatball3, ()=>{
						this.meatball3.tint = 0x000000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.meatballHit = this.sound.add('meatball_hit');
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.meatballHit.play();
						this.meatball3.destroy();
					}
					});
					this.physics.add.collider(this.macaroni, this.meatball4, ()=>{
						this.meatball4.tint = 0x000000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.meatballHit = this.sound.add('meatball_hit');
					this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.meatballHit.play();
						this.meatball4.destroy();
						}
					});
						// level boss
						this.physics.add.collider(this.macaroni, this.levelBoss, ()=>{
							this.levelBossHealth--;
							this.levelBoss.tint = 0xff0000;
							this.bossHit = this.sound.add('boss_hit');
							this.levelBoss.anims.play('boss_hit_anim');
							this.pepperoni2 =  
							this.bossFire.create(this.levelBoss.x + 50, this.levelBoss.y + 80 , 'pepperoni');
							this.macaronis.getChildren().map(child => child.destroy());
							this.pepperoni2.setVelocityX(800).setVelocityY(-350);
								this.time.addEvent({
								delay: 500,
								callback: onEvent,
								callbackScope: this
								});		
								function onEvent(){
								this.pepperoni2.destroy();	
								this.bossHit.play();
								}
							if (this.levelBossHealth >= 3){ 	
								this.time.addEvent({
								delay: 500,
								callback: onEvent2,
								callbackScope: this
								});	
								function onEvent2(){
								if (this.levelBoss.active){
								this.pepperoni2.destroy();	
								this.bossHit.play();
								this.levelBoss.tint = 0xffffff;
								this.levelBoss.anims.play('boss_idle');
								}
								} 
							}
					});
				}
		
			});	
/////////////////////	
	this.timer = false;
	
}//end create function
//////////////////////////////////////////////////////////////////////////////////////////// update/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 update(time, delta) {

			//weapon keyboard (rolling pin)
				// W key weapon 1 rolling pin
		   if (cursors.space.isUp && this.WKey.isDown){
					player.anims.play('rolling_pin_loop', true);
					this.huh = this.sound.add('huh');
					this.huh.play();	
					let weaponX = player.flipX === true ? player.x - 45 : player.x + 45;
					this.rollingPin = this.rollingPinWeapon.create(weaponX , player.y, 'rolling_pin_fr1');
					this.rollingPin.flipX = player.flipX === true;
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.huh.stop();
							this.rollingPinWeapon.getChildren().map(child => child.destroy());
					}
					//enemy collisions					
					//chilis
					this.physics.add.collider(this.rollingPin, this.chili, ()=>{
							this.chiliHealth --;
							this.chili.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume:0.35});
					this.timedEvent = this.time.addEvent({
							delay: 150,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.chiliHit.play();
							this.chili.tint = 0xffffff;
					}
					});
					this.physics.add.collider(this.rollingPin, this.chili2, ()=>{
							this.chili2Health--;
							this.chili2.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit');
					this.timedEvent = this.time.addEvent({
								delay: 150,
								callback: onEvent,
								callbackScope: this
					});
					function onEvent(){
							this.chiliHit.play();
							this.chili2.tint = 0xffffff;
					}
					});
					this.physics.add.collider(this.rollingPin, this.chili3, ()=>{
							this.chili3Health--;
							this.chili3.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit');
					this.timedEvent = this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
							this.chiliHit.play();
							this.chili3.tint = 0xffffff;
					}
					});
					//meatballs
					this.physics.add.collider(this.rollingPin, this.meatball, ()=>{
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.meatballHit.play();
							this.meatball.destroy();
					}
							this.meatball.tint = 0x000000;
					return	this.meatballHit = this.sound.add('meatball_hit');
					});
					this.physics.add.collider(this.rollingPin, this.meatball2, ()=>{
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.meatballHit.play();
							this.meatball2.destroy();
					}
							this.meatball2.tint = 0x000000;	
					 return this.meatballHit = this.sound.add('meatball_hit');
					});
					this.physics.add.collider(this.rollingPin, this.meatball3, ()=>{
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.meatballHit.play();
							this.meatball3.destroy();
					}
							this.meatball3.tint = 0x000000;
					return	this.meatballHit = this.sound.add('meatball_hit');
					});
					this.physics.add.collider(this.rollingPin, this.meatball4, ()=>{
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.meatballHit.play();
							this.meatball4.destroy();
					}
							this.meatball4.tint = 0x000000;	
					return 	this.meatballHit = this.sound.add('meatball_hit');
					});
					// level boss
				this.physics.add.collider(this.rollingPin, this.levelBoss, ()=>{
					this.levelBossHealth--;
					this.levelBoss.tint = 0xff0000;
					this.macaronis.getChildren().map(child => child.destroy());
					this.bossHit = this.sound.add('boss_hit');
					this.levelBoss.anims.play('boss_hit_anim');
					this.pepperoni2 =  
					this.bossFire.create(this.levelBoss.x + 50, this.levelBoss.y + 80 , 'pepperoni');
					this.pepperoni2.setVelocityX(800).setVelocityY(-350);
			if (this.levelBossHealth >= 3){
						this.time.addEvent({
						delay: 500,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						if (this.levelBoss.active){
						this.pepperoni2.destroy();	
						this.bossHit.play();
						this.levelBoss.tint = 0xffffff;
						this.levelBoss.play('boss_idle', true);
						}
					}
					} else{
						this.time.addEvent({
						delay: 500,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.pepperoni2.destroy();	
						this.bossHit.play();
						}	
					}
				});	
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						return this.rollingPin.destroy();
					});
				  }	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

	//player movements
		if (this.WKey.isDown && player.body.onFloor() === true){
				player.body.setVelocityX(0);
		}
		if (player.body.onFloor() && this.A_buttonState === true && this.rightButtonState === true){
			player.setVelocityX(0);
		
		}
		
		if (player.body.onFloor() && this.A_buttonState === true && this.leftButtonState === true){
			player.setVelocityX(0);
		
		}
		if (player.body.onFloor() && this.A_buttonState === true && cursors.right.isDown){
			player.setVelocityX(0);
		
		}
		if (player.body.onFloor() && this.A_buttonState === true && cursors.left.isDown){
			player.setVelocityX(0);
		
		}
	
	 //left (ground)
	if (this.leftButtonState === true || cursors.left.isDown === true && player.body.onFloor() === true && this.WKey.isDown === false && this.A_buttonState === false){	
			player.body.setVelocityX(-250);
			player.anims.play('walk', true);
			player.flipX = true;		
	}//(air)
	 if (this.leftButtonState === true && player.body.onFloor() === false && this.WKey.isDown === false){	
			player.body.setVelocityX(-250);
			player.anims.play('fall', true);
			player.flipX = true;		
	}
	 if (player.body.onFloor() === false && this.WKey.isDown === true){
		player.anims.play('rolling_pin_loop', true);
	}
	 //right (ground)
    if (this.rightButtonState === true || cursors.right.isDown === true && player.body.onFloor() === true && this.WKey.isDown === false && this.A_buttonState === false){
			player.body.setVelocityX(250);
			player.anims.play('walk', true);
			player.flipX = false;
	}
	//(air)
	 if (this.rightButtonState === true || cursors.right.isDown === true && player.body.onFloor() === false){
			player.body.setVelocityX(250);
			player.flipX = false;
	}	
   //jump
    if (this.jumpButtonState === true && cursors.up.isDown === false && player.body.onFloor() === true ){
			player.body.setVelocityY(-490);
			player.anims.play('fall', true);
			this.huh = this.sound.add('huh');
			this.huh.play();
   }
    if (cursors.up.isDown === true && this.jumpButtonState === false && player.body.onFloor() === true ){
			player.body.setVelocityY(-490);
			player.anims.play('fall', true);
			this.huh = this.sound.add('huh');
			this.huh.play();
   }
	if (player.body.onFloor() === false && this.leftButtonState === true ){
			player.anims.play('fall', true);
	}
   if (player.body.onFloor() === false && this.rightButtonState === true){
			player.anims.play('fall', true);
	}
   if (player.body.onFloor() === false && this.A_buttonState === true){
			player.anims.play('rolling_pin_loop', true);
	}
	if (player.body.onFloor() === false && this.WKey.isDown === false && cursors.isUp && this.rightButtonState === false && this.jumpButtonState === false
	&& this.rightButtonState === false && this.A_buttonState === false && this.B_buttonState === false){
		player.anims.play('fall');
	}
	//idle
   if (player.body.onFloor() === true && cursors.up.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false
   && this.rightButtonState === false && this.jumpButtonState === false && this.leftButtonState === false
   && this.WKey.isUp && this.A_buttonState === false){
	   player.body.setVelocityX(0);
	   player.anims.play('idle', true);
	   }
	if (player.body.onFloor() && this.A_buttonState === true && this.rightButtonState === true){
		player.setVelocityX(0);
	
	}
	if (player.body.onFloor() && this.A_buttonState === true && this.leftButtonState === true){
		player.setVelocityX(0);
	
	}

	if (player.body.onFloor() === false && cursors.left.isDown && this.A_buttonState === false){
		player.setVelocityX(-250);
	}
	if (player.body.onFloor() === false && cursors.left.isDown){
		player.flipX = true;
	}
	if (player.body.onFloor() === false && this.A_buttonState === false && this.B_buttonState === false
			&& player.body.velocity.y >= 1){
				player.anims.play('fall');
				this.rollingPinWeapon.getChildren().map(child => child.destroy());
			}
	if (player.body.onFloor() === false && this.A_buttonState === true){
		player.setVelocityX(0);
		player.setVelocityY(0);
		this.time.addEvent({
			delay: 250,
			callback: onEvent,
			callbackScope: this
		});
		function onEvent(){
				this.rollingPinWeapon.getChildren().map(child => child.destroy());
				player.anims.play('fall');
					player.body.velocity.y = 300;
		}
	}
///////////////////////////	
if (healthScore === 1){
	this.text3.visible = true;
}	
else if (healthScore >= 2){
	this.text3.visible = false;
}
else if (healthScore <= 0){
			this.mainTheme.stop()	
			this.scene.stop('PlayState');
			this.scene.start('LivesState');
			livesAvailable--;
			livesText.setText(livesAvailable);
		}
		if (livesAvailable <= 2){
		livesText.setText(livesAvailable);
		}		

//// enemy health update on collision		
		// if enemy health is 0 or less, destroy enemy
		// chili
		if (this.chiliHealth <= 0){
			this.chili.tint = 0x000000;
			 this.fireBall1Tween.stop();
			 this.fireBall1.destroy();
			 this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.chili.destroy();
				}
		}
		if (this.chili2Health <= 0){
			this.chili2.tint = 0x000000;
			 this.fireBall2Tween.stop();
			 this.fireBall2.destroy();
			 this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.chili2.destroy();
				}
		}
		if (this.chili3Health <= 0){
			this.chili3.tint = 0x000000;
			this.fireBall3Tween.stop();
			this.fireBall3.destroy();
			this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.chili3.destroy();
				}
		}
		// meatballs are destroyed in one shot
		// level boss
		if (this.levelBossHealth <= 0){
		    this.levelBoss.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent2,
					callbackScope: this
				});
				function onEvent2(){
				  this.levelBoss.destroy();
			//	  this.particleEmitter.explode();
				} 
		}		
 }//end update function
   
}//end state
