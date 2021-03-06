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
		this.mainTheme = this.sound.add('level1');
		this.mainTheme.play();
		this.mainTheme.setLoop(this.loop);	
		// load the map 
		map = this.add.tilemap('map');
		this.load.image('map',  'assets/map.png');
		// tiles for the ground layer, background images
		let backdropTiles = map.addTilesetImage('tiles2');
		let backdrop = map.createStaticLayer('bkgnd', backdropTiles, 0, 0);
		let backdropTiles2 = map.addTilesetImage('tiles3');
		let backdropUnderground = map.createStaticLayer('bkgnd2', backdropTiles2, 0, 0);
		let groundTiles = map.addTilesetImage('tiles');
		groundLayer = map.createStaticLayer('World', groundTiles, 0, 0);
		groundLayer.setCollisionByExclusion([-1]);
		let macaroniItemTiles = map.addTilesetImage('coin');   
		macaroniPickupLayer = map.createDynamicLayer('Coins', macaroniItemTiles, 0, 0);
		//world parameters
		this.physics.world.bounds.width = groundLayer.width;   
		this.physics.world.bounds.height = groundLayer.height; 
	////hazards////
	//fire
/*		this.anims.create({
			key: 'fire_anims',
			frames:[
			{ key: 'fire1' },
				{ key: 'fire2' },
					{ key: 'fire3' },
						{ key: 'fire4' }, 
							{ key: 'fire5' , duration: 5 }
			],
			frameRate: 8,
			repeat: -1
			});
		this.fire = this.add.group();
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
		//weed item takes you to the next level (duhhhh)
		let weedfuck = this.physics.add.group();
		weedfuck.create(150, 1200, 'weed_block');
		
    // player sprite    
		player = this.physics.add.sprite(200, 300, 'player');
		player.setBounce(0.2); // our player will bounce from items
		player.setCollideWorldBounds(true); // don't go out of the map    
		player.body.setSize(player.width, player.height-8);
		
///////////////////////////	
////player weapons

	//rolling pin
	this.rollingPinWeapon = this.physics.add.group();
	//macaroni
		this.macaronis = this.physics.add.group();
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
					
//////////		
	// player walk animation
				
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 8, end: 3, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
	  // player jump animation
    this.anims.create({
        key: 'fall',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 10, end: 10, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
	});
    // idle with only one frame, so repeat is not neaded
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
	 // grab item
    this.anims.create({
        key: 'grab_item',
        frames: [{key: 'player', frame: 'p1_stand'}],
        frameRate: 1,
		repeat: -1
    });
	// rolling pin
			this.anims.create({
        	key: 'rolling_pin',
			frames:[
					{ key: 'player_weapon',  start: 1, end: 4, zeroPad: 2, duration: 50 }
		],
		frameRate: 8,
		repeat: -1
	});
  /*	this.anims.create({
			key: 'rolling_pin',
			frames: this.anims.generateFrameNames('player_weapon', { start: 1, end: 4, zeroPad: 2}),
			frameRate: 10,
			repeat: -1
	});*/	 
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
			key: 'loop_left2',
			frames:[
			{ key: 'left1_' },
				{ key: 'left2_' },
					{ key: 'left3_', duration: 50 }
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

	//meatballs facing left
		this.anims.create({
			key: 'loop_left',
			frames:[
			{ key: 'left1' },
				{ key: 'left2' },
					{ key: 'left3', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
});		
	//meatballs facing right
		this.anims.create({
			key: 'loop_right',
			frames:[
			{ key: 'right1' },
				{ key: 'right2' },
					{ key: 'right3', duration: 50 }
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
	 
	 	//chili facing left
		this.chili = this.enemyStatic.create(500, 450, 'left1_').play('loop_left2');	 
		this.chili2 = this.enemyStatic.create(1776, 450, 'left1_').play('loop_left2');
		this.chili3 = this.enemyStatic.create(1200, 450, 'left1_').play('loop_left2');
		// chili health points
		this.chiliHealth = 3;
		this.chili2Health = 3;
		this.chili3Health = 3;
		
	
		//cheese pits
		let cheese_pit = this.enemyStatic.create(1400, 600, 'cheese_pit1').play('cheese_pit_anims');
		cheese_pit.setScale(0.65, 0.7);
		let cheese_pit2 = this.enemyStatic.create(2240, 666, 'cheese_pit1').play('cheese_pit_anims');
		cheese_pit2.setScale(1.3);
	
		
		//meatball facing left
		this.meatball = this.enemyMoving.create(3200, 400, 'left1').play('loop_left');
		this.meatball2 = this.enemyMoving.create(3000, 700, 'left1').play('loop_left');
		// meatballs health points
		this.meatballHealth = 2;
		this.meatball2Health = 2;
		this.meatball3Health = 2;
		this.meatball4Health = 2;
		
		
		// meatballs right
		this.meatball3 = this.enemyMoving.create(800, 800, 'right1').play('loop_right');
		this.meatball4 = this.enemyMoving.create(1200, 900, 'right1').play('loop_right');
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
		this.levelBoss.setCollideWorldBounds(true);
		// level 1 boss health points
		this.levelBossHealth = 10;
		// boss fire
		this.bossFire = this.physics.add.group();
		

	
	

		
/////////// health, ammo, and lives text  ///////////////////////////////////////////////////////

	// health text
		this.text = this.add.text(20, 20,  '\u2764', { 	
		fontSize: '30px',
		fill: '#ffffff'
		});
		this.text.setScrollFactor(0);
		this.text2 = this.add.text(25, 50,  '3', {
		fontSize: '25px',
		fontFamily: 'Bangers',
		fill: '#ffffff'
		});
		this.text2.setScrollFactor(0);
		// macaroni available
		this.macaroniText = this.add.text(110, 15, 'Macaroni :', {
			fontSize: '25px',
			fontFamily: 'Bangers',
			fill: '#ffffff'
		});
		this.macaroniText.setScrollFactor(0);
		this.macaroniText2 = this.add.text(120, 50, '25', {
			fontSize: '25px',
			fontFamily: 'Bangers',
			fill: '#ffffff'
		});	
		this.macaroniText2.setScrollFactor(0);
		// lives available
		this.lives = this.add.image(260, 30, 'lives');
		this.lives.setScrollFactor(0);
		livesText = this.add.text(245, 50, '3', {
			fontSize: '25px',
			fontFamily: 'Bangers',
			fill: '#ffffff'
		});	
		livesText.setScrollFactor(0);
	
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
		this.physics.add.collider(weedfuck, groundLayer);
		this.physics.add.collider(this.macaronis, groundLayer);
		this.physics.add.collider(this.macaronis, player, ()=>{
		this.macaroniRing = this.sound.add('macaroni_ring');
		this.macaroniRing.play();
		macaroniAvailable++;
		this.macaroniText2.setText(macaroniAvailable);
		this.macaronis.getChildren().map(child => child.destroy());
		});
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
			}
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
			player.tint = 0xffffff;
		}
			healthScore--;
			this.text2.setText(healthScore);
			this.playerHit = this.sound.add('player_hit');
			this.playerHit.play();
		});
		// boss collison
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
			player.tint = 0xffffff;
		}
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
					
////you win (collision with weed)
		this.physics.add.collider(player, weedfuck, ()=>{
		this.mainTheme.stop()	
		this.scene.stop('PlayState');
		this.scene.start('PreloadState_lv2');
		});
		
		
		
//////  cameras  //////
		this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
		this.cameras.main.startFollow(player);  
		
		
		
		
/////////// game controls  /////////////////


//cursors and keys
		cursors = this.input.keyboard.createCursorKeys();
		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);		
		this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		
		
//virtual buttons

		//left button	
		this.leftButton =
		this.add.image(100, 500, 'left_button').setOrigin(0).setName('left_button').setInteractive();
		this.leftButton.setScrollFactor(0);
		this.leftButton.on('pointerover', ()=>{
		this.leftButton.tint = 0xff0000;	
		this.leftButtonState = true;
		}, this);
		this.leftButton.on('pointerout', ()=>{
			this.leftButton.tint = 0xffffff;
			this.leftButtonState = false;
		}, this);
		// jump button
		this.jumpButton = 
		this.add.image(200, 500, 'jump_button').setOrigin(0).setName('jump_button').setInteractive();
		this.jumpButton.setScrollFactor(0);
		this.jumpButton.on('pointerover', ()=>{
			this.jumpButton.tint = 0xff0000;
		}, this);
		this.jumpButton.on('pointerdown', ()=>{
			this.jumpButtonState = true;
		}, this);
		this.jumpButton.on('pointerup', ()=>{
			this.jumpButtonState = false;
		}, this);
		this.jumpButton.on('pointerout', ()=>{
			this.jumpButton.tint = 0xffffff;
			this.jumpButtonState = false;
		}, this);
		// right button
		this.rightButton = 
		this.add.image(300, 500, 'right_button').setOrigin(0).setName('right_button').setInteractive();
		this.rightButton.setScrollFactor(0);
		this.rightButton.on('pointerover', ()=>{
			this.rightButton.tint = 0xff0000;
			this.rightButtonState = true;
		}, this);
		this.rightButton.on('pointerout', ()=>{
		this.rightButton.tint = 0xffffff;
		this.rightButtonState = false;
		}, this);
		// A button (rolling pin weapon)
		this.A_button = 
		this.add.image(500, 500, 'A_button').setOrigin(0).setName('A_button').setInteractive();
		this.A_button.setScrollFactor(0);
		this.A_button.on('pointerover', ()=>{
			this.A_button.tint = 0xff0000;
		});
		this.A_button.on('pointerout', ()=>{
			this.A_button.tint = 0xffffff;
		});
		this.A_button.on('pointerdown', ()=>{
			this.A_buttonState = true;
		});
		this.A_button.on('pointerup', ()=>{
			this.A_buttonState = false;
		});
		
	//// B button (macaroni weapon)
		this.B_button = 
		this.add.image(620, 500, 'B_button').setOrigin(0).setInteractive();
		this.B_button.setScrollFactor(0);
				this.B_button.on('pointerover', ()=>{
				this.B_button.tint = 0x0c1ea5;
		});
				this.B_button.on('pointerout', ()=>{
				this.B_button.tint = 0xffffff;
		});
		this.B_button.on('pointerdown', ()=>{
				this.B_buttonState = true;
		});
		this.B_button.on('pointerup', ()=>{
			this.B_buttonState = false;
		});
	
	

	
	
/////////////////////		
}//end create function


////update

 update(time, delta) {
	
	 
////virtual controls 

//player movements

  //left
	if (this.leftButtonState === true && cursors.left.isUp){	
			player.body.setVelocityX(-250);
			player.anims.play('walk', true);
			player.flipX = true;		
	}
  //jump
  if (this.jumpButtonState === true && cursors.up.isUp && player.body.onFloor() === true){
			player.body.setVelocityY(-490);
			player.anims.play('fall', true);
			this.huh = this.sound.add('huh');
			this.huh.play();
  }
  //right
  if (this.rightButtonState === true &&  cursors.left.isUp){
			player.body.setVelocityX(250);
			player.anims.play('walk', true);
			player.flipX = false;
  }
  //A button
  if(this.A_buttonState === true && this.input.activePointer.isDown && cursors.space.isUp && player.flipX === false){
					player.anims.play('rolling_pin');
					this.huh = this.sound.add('huh');
					this.huh.play();
					player.anims.play('rolling_pin');	
					this.rollingPin = this.rollingPinWeapon.create(player.x + 45, player.y, 'rolling_pin');
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
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.chiliHit.play();
					}
							this.chiliHealth --;
							this.chili.tint = 0xff0000;
					return	this.chiliHit = this.sound.add('chili_hit', {volume:0.35});
					});
					this.physics.add.collider(this.rollingPin, this.chili2, ()=>{
					this.timedEvent = this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this
					});	
					function onEvent(){
							this.chiliHit.play();
					}
							this.chili2Health--;
							this.chili2.tint = 0xff0000;
					return	this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
					});
					this.physics.add.collider(this.rollingPin, this.chili3, ()=>{
					this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
							this.chiliHit.play();
					}
							this.chili3Health--;
							this.chili3.tint = 0xff0000;
					return	this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
							this.meatball.tint = 0xff0000;
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
							this.meatball2.tint = 0xff0000;	
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
							this.meatball3.tint = 0xff0000;
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
							this.meatball4.tint = 0xff0000;	
					return 	this.meatballHit = this.sound.add('meatball_hit');
					});
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						return this.rollingPin.destroy();
					});
				  }
		  else if (this.A_buttonState === true && this.input.activePointer.isDown && cursors.space.isUp && player.flipX === true){
			   player.anims.play('rolling_pin');
			   player.anims.play('rolling_pin');
			   this.huh = this.sound.add('huh');
			   this.huh.play();
			   this.rollingPin_left = this.rollingPinWeapon.create(player.x - 45, player.y, 'rolling_pin_left');
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
						this.physics.add.collider(this.rollingPin_left, this.chili, ()=>{
							this.chiliHealth--;	
							this.chili.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
						});	
						function onEvent(){
							this.chiliHit.play();
						}
						});
							this.physics.add.collider(this.rollingPin_left, this.chili2, ()=>{
							this.chili2Health--;	
							this.chili2.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
						});	
						function onEvent(){
							this.chiliHit.play();
						}
						});
						this.physics.add.collider(this.rollingPin_left, this.chili3, ()=>{
							this.chili3Health--;
							this.chili3.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
						this.physics.add.collider(this.rollingPin_left, this.meatball, ()=>{
							this.meatball.tint = 0xff0000;
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
						this.physics.add.collider(this.rollingPin_left, this.meatball2, ()=>{
							this.meatball2.tint = 0xff0000;	
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
						this.physics.add.collider(this.rollingPin_left, this.meatball3, ()=>{
							this.meatball3.tint = 0xff0000;	
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
						this.physics.add.collider(this.rollingPin_left, this.meatball4, ()=>{
							this.meatball4.tint = 0xff0000;
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
						this.physics.add.collider(this.rollingPin_left, this.levelBoss, ()=>{
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
							this.bossHit.play();
							this.levelBoss.tint = 0xffffff;
							}
							this.physics.add.collider(this.pepperoni2, groundLayer, ()=>{
								this.pepperoni2.destroy();
							});
						});	
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin_left, player, ()=>{
						this.rollingPin_left.destroy();
					});
				   }
		// B button
		 if (this.B_buttonState === true && this.input.activePointer.isDown && cursors.space.isUp && player.flipX === false && macaroniAvailable >= 1){
					player.anims.play('fire_macaroni');
					this.macaroni = this.macaronis.create(player.x + 30, player.y, 'macaroni').play('macaroni_loop');
					this.macaroni.setVelocityX(700);
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
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
					}
					});
					this.physics.add.collider(this.macaroni, this.chili2, ()=>{
						this.chili2Health--;
						this.chili2.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
					this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
					}
					});
						this.physics.add.collider(this.macaroni, this.chili3, ()=>{	
						this.chili3Health--;
						this.chili3.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
					}
					});
					//meatballs
					this.physics.add.collider(this.macaroni, this.meatball, ()=>{
						this.meatball.tint = 0xff0000;
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
						this.meatball2.tint = 0xff0000;
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
						this.meatball3.tint = 0xff0000;
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
						this.meatball4.tint = 0xff0000;
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
					
			}
			else if(this.B_buttonState === true && this.input.activePointer.isDown && cursors.space.isUp && player.flipX === true && macaroniAvailable >= 1){
				player.anims.play('fire_macaroni');
				this.huh = this.sound.add('huh');
				this.huh.play();
				this.macaroni_left = this.macaronis.create(player.x - 50, player.y, 'macaroni').play('macaroni_loop');
				this.macaroni_left.setVelocityX(-700);
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
					//// if run out of macaroni shots 
					if (macaroniAvailable <= 0){
						this.macaroniText2.setText(0);
					}
				//enemy collisions
			   //chilis
				this.physics.add.collider(this.macaroni_left, this.chili, ()=>{
				this.chiliHealth--;
				this.chili.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chili.destroy();
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				}
				});
				this.physics.add.collider(this.macaroni_left, this.chili2, ()=>{
				this.chili2Health--;
				this.chili2.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				}
				});
				this.physics.add.collider(this.macaroni_left, this.chili3, ()=>{
				this.chili3Health--;
				this.chili3.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
				this.physics.add.collider(this.macaroni_left, this.meatball, ()=>{
				this.meatball.tint = 0xff0000;
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
				this.macaronis.getChildren().map(child => child.destroy());
				}
				});
				this.physics.add.collider(this.macaroni_left, this.meatball2, ()=>{
				this.meatball2.tint = 0xff0000;
				this.macaroni_left.destroy();
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
				this.physics.add.collider(this.macaroni_left, this.meatball3, ()=>{
				this.meatball3.tint = 0xff0000;
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
				this.physics.add.collider(this.macaroni_left, this.meatball4, ()=>{
				this.meatball4.tint = 0xff0000;
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
				this.physics.add.collider(this.macaroni_left, this.levelBoss, ()=>{
					this.levelBossHealth--;
					this.levelBoss.tint = 0xff0000;
					this.macaronis.getChildren().map(child => child.destroy());
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
					this.levelBoss.tint = 0xffffff;
					}
				});	
		}

		
		
		

////////////////////////////////           cursors         ////////////////////////




	// player movements 
	
			//left
		if (cursors.left.isDown){
			player.body.setVelocityX(-250);
			player.anims.play('walk', true);
			player.flipX = true; 
		}
		//right
		else if (cursors.right.isDown){
			player.body.setVelocityX(250);
			player.anims.play('walk', true);
			player.flipX = false; 
		} else if (this.input.activePointer.isDown === false) {
			player.body.setVelocityX(0);
			player.anims.play('idle', true);
		}
		//jump 
		if (cursors.up.isDown && player.body.onFloor()){
			player.body.setVelocityY(-500); 
			player.anims.play('walk', true);
			this.huh = this.sound.add('huh');
			this.huh.play();
		}
		//fall
		  if (player.body.onFloor() == false){
			player.anims.play('fall', true);
		}	

//////weapons 

	//rolling pin weapon	

	 
	if (this.WKey.isDown && cursors.right.isUp && player.flipX === false){	
			player.anims.play('rolling_pin');
			this.huh = this.sound.add('huh');
			this.huh.play();	
			this.rollingPin = this.rollingPinWeapon.create(player.x + 50, player.y, 'rolling_pin');
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
			this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
			this.chili2Health--;
			this.chili2.tint = 0xff0000;
			this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
			this.chili3Health--;
			this.chili3.tint = 0xff0000;
			this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
			this.meatball.tint = 0xff0000;
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
			this.physics.add.collider(this.rollingPin, this.meatball2, ()=>{
			this.meatball2.tint = 0xff0000;	
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
			this.physics.add.collider(this.rollingPin, this.meatball3, ()=>{
			this.meatball3.tint = 0xff0000;
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
			this.physics.add.collider(this.rollingPin, this.meatball4, ()=>{
			this.meatball4.tint = 0xff0000;	
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
			// weapon collision with player because apparently I have no idea how to really make it disappear =[
			this.physics.add.collider(this.rollingPin, player, ()=>{
			this.rollingPin.destroy();
			});
			
		}	
	
// left	rolling pin weapon
	if (this.WKey.isDown && cursors.left.isUp && player.flipX === true){	
		player.anims.play('rolling_pin');
		this.huh = this.sound.add('huh');
		this.huh.play();
		this.rollingPin_left = this.rollingPinWeapon.create(player.x - 50, player.y, 'rolling_pin_left');
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
				this.physics.add.collider(this.rollingPin_left, this.chili, ()=>{
				this.chiliHealth--;	
				this.chili.tint = 0xff0000;
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				}
				});
				this.physics.add.collider(this.rollingPin_left, this.chili2, ()=>{
				this.chili2Health--;	
				this.chili2.tint = 0xff0000;
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				}
				});
				this.physics.add.collider(this.rollingPin_left, this.chili3, ()=>{
				this.chili3Health--;
				this.chili3.tint = 0xff0000;
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
				this.physics.add.collider(this.rollingPin_left, this.meatball, ()=>{
				this.meatball.tint = 0xff0000;
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
				this.physics.add.collider(this.rollingPin_left, this.meatball2, ()=>{
				this.meatball2.tint = 0xff0000;	
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
				this.physics.add.collider(this.rollingPin_left, this.meatball3, ()=>{
				this.meatball3.tint = 0xff0000;	
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
				this.physics.add.collider(this.rollingPin_left, this.meatball4, ()=>{
				this.meatball4.tint = 0xff0000;
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
				this.physics.add.collider(this.rollingPin_left, this.levelBoss, ()=>{
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
					this.levelBoss.tint = 0xffffff;
					}
				});	
				// weapon collision with player because apparently I have no idea how to really make it disappear =[
				this.physics.add.collider(this.rollingPin_left, player, ()=>{
				this.rollingPin_left.destroy();
				});

	}
			
////player fire weapon (macaroni)
	if (this.spaceKey.isDown && macaroniAvailable >= 1 && player.flipX === false){	
			player.anims.play('fire_macaroni');
			this.huh = this.sound.add('huh');
			this.huh.play();
			this.macaroni = this.macaronis.create(player.x + 30, player.y, 'macaroni').play('macaroni_loop');
			this.macaroni.setVelocityX(700);
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
				//// if run out of macaroni shots 
			if (macaroniAvailable <= 0){
			this.macaroniText2.setText(0);
			}
				//enemy collisions
				//chilis
				this.physics.add.collider(this.macaroni, this.chili, ()=>{
				this.chiliHealth--;
				this.chili.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				}
				});
				this.physics.add.collider(this.macaroni, this.chili2, ()=>{
				this.chili2Health--;
				this.chili2.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				}
				});
				this.physics.add.collider(this.macaroni, this.chili3, ()=>{	
				this.chili3Health--;
				this.chili3.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
				this.physics.add.collider(this.macaroni, this.meatball, ()=>{
				this.meatball.tint = 0xff0000;
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
				this.meatball2.tint = 0xff0000;
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
				this.meatball3.tint = 0xff0000;
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
				this.meatball4.tint = 0xff0000;
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
				
			}
	
// left macaroni weapon

	if (this.spaceKey.isDown && macaroniAvailable >= 1 && player.flipX === true){	
		player.anims.play('fire_macaroni');
		this.huh = this.sound.add('huh');
		this.huh.play();
		this.macaroni_left = this.macaronis.create(player.x - 50, player.y, 'macaroni').play('macaroni_loop');
		this.macaroni_left.setVelocityX(-700);
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
			//// if run out of macaroni shots 
			if (macaroniAvailable <= 0){
				this.macaroniText2.setText(0);
			}
				//enemy collisions
			   //chilis
				this.physics.add.collider(this.macaroni_left, this.chili, ()=>{
				this.chiliHealth--;
				this.chili.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chili.destroy();
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				}
				});
				this.physics.add.collider(this.macaroni_left, this.chili2, ()=>{
				this.chili2Health--;
				this.chili2.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				}
				});
				this.physics.add.collider(this.macaroni_left, this.chili3, ()=>{
				this.chili3Health--;
				this.chili3.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
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
				this.physics.add.collider(this.macaroni_left, this.meatball, ()=>{
				this.meatball.tint = 0xff0000;
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
				this.macaronis.getChildren().map(child => child.destroy());
				}
				});
				this.physics.add.collider(this.macaroni_left, this.meatball2, ()=>{
				this.meatball2.tint = 0xff0000;
				this.macaroni_left.destroy();
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
				this.physics.add.collider(this.macaroni_left, this.meatball3, ()=>{
				this.meatball3.tint = 0xff0000;
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
				this.physics.add.collider(this.macaroni_left, this.meatball4, ()=>{
				this.meatball4.tint = 0xff0000;
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
				this.physics.add.collider(this.macaroni_left, this.levelBoss, ()=>{
					this.levelBossHealth--;
					this.levelBoss.tint = 0xff0000;
					this.macaronis.getChildren().map(child => child.destroy());
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
					this.bossHit.play();
					this.levelBoss.tint = 0xffffff;
					this.pepperoni2.destroy();
					}
				});	
		}					
///////////////////////////		
if (healthScore <= 0){
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
			 this.chili.destroy();
		}
		if (this.chili2Health <= 0){
			 this.chili2.destroy();
		}
		if (this.chili3Health <= 0){
			this.chili3.destroy();
		}
		// meatballs are destroyed in one shot
		// level boss
		if (this.levelBossHealth <= 0){
		    this.levelBoss.destroy();
		}
		
		
				
 }//end update function
   
}//end state
