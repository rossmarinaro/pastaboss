////PlayState mini game 1


class PlayState_MiniGame2 extends Phaser.Scene {
  constructor() {
    super("PlayState_MiniGame2");
  }
  



////create
  
create() {
		
		//background
		this.bkgnd = 
		this.add.image(500, 200, 'pixel2').setScale(1000);
		this.bkgnd2 = 
		this.cameras.main.setBackgroundColor('#DFF5F7');
		//music
		this.mainTheme = this.sound.add('level2');
		this.mainTheme.play();
		this.mainTheme.setLoop(this.loop);	
		// load the map 
	    let miniGameMap1 = this.add.tilemap('miniGame2');
		// tiles for the ground layer, background images
		let backdropTiles3 = miniGameMap1.addTilesetImage('tiles');
		let backdropUnderground2 = miniGameMap1.createStaticLayer('bkgnd3', backdropTiles3, 0, 0);
		let backdropTiles = miniGameMap1.addTilesetImage('tiles');
		let backdrop = miniGameMap1.createStaticLayer('bkgnd', backdropTiles, 0, 0);
		let backdropTiles2 = miniGameMap1.addTilesetImage('tiles3');
		let backdropUnderground = miniGameMap1.createStaticLayer('bkgnd2', backdropTiles2, 0, 0);
		let groundTiles = miniGameMap1.addTilesetImage('tiles4');
		let ground = miniGameMap1.createStaticLayer('World', groundTiles, 0, 0);
		ground.setCollisionByExclusion([-1]);
		let macaroniItemTiles = miniGameMap1.addTilesetImage('coin');   
		macaroniPickupLayer = miniGameMap1.createDynamicLayer('Coins', macaroniItemTiles, 0, 0);
		//world parameters
		this.physics.world.bounds.width = ground.width;   
		this.physics.world.bounds.height = ground.height; 
	//hazards
		this.hazardStatic = this.physics.add.staticGroup();
		this.hazardMoving = this.physics.add.group();
		this.obstacle = this.physics.add.group();
		// enemy movement groups 
		this.enemyStatic = this.physics.add.staticGroup();
		this.enemyMoving = this.physics.add.group();	
    // player sprite    
		player = this.physics.add.sprite(200, 300, 'player');
		player.setBounce(0.2); // our player will bounce from items
		player.setCollideWorldBounds(true); // don't go out of the map    
		player.body.setSize(player.width, player.height-8);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
////animations
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
	// player walk 				
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 8, end: 3, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
    });
	  // player jump 
    this.anims.create({
        key: 'fall',
        frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 10, end: 10, zeroPad: 2}),
        frameRate: 10,
        repeat: -1
	});
    // player idle
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
// rolling pin stance
		this.anims.create({
			key: 'rolling_pin_loop',
		frames:[
			{ key: 'player_weapon_fr1' },
				{ key: 'player_weapon_fr2' },
					{ key: 'player_weapon_fr3' },
						{ key: 'player_weapon_fr4', duration: 50 } 				
		],
		frameRate: 25,
		repeat: 1
	}); // rolling pin animation
		this.anims.create({
			key: 'rolling_pin_loop2',
		frames:[
			{ key: 'rolling_pin_fr1' },
				{ key: 'rolling_pin_fr2' },
					{ key: 'rolling_pin_fr3' },
						{ key: 'rolling_pin_fr4', duration: 50 } 				
		],
		frameRate: 100,
		repeat: 1
	});
		// fire noodle
		this.anims.create({
			key: 'fire_macaroni',
			frames: this.anims.generateFrameNames('player', {prefix: 'p1_walk', start: 1, end: 4, zeroPad: 2}),
			frameRate: 10,
			repeat: -1
	});			

	
/////////// health, ammo, and lives text  ///////////////////////////////////////////////////////

	// health text
		this.add.image(150, 60, 'this.player_interface').setScrollFactor(0);
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
this.physics.add.collider(player, ground);
		this.physics.add.collider(player, this.hazardStatic);
		this.physics.add.collider(this.macaronis, player, ()=>{
		this.macaroniRing = this.sound.add('macaroni_ring');
		this.macaroniRing.play();
		macaroniAvailable++;
		this.macaroniText2.setText(macaroniAvailable);
		this.macaronis.getChildren().map(child => child.destroy());
		});

////hazard collisons
		this.physics.add.collider(player, this.hazardMoving, ()=>{
			this.hazardMoving.getChildren().map(child => child.destroy());
			player.tint = 0xff0000;
			healthScore--;
			this.text2.setText(healthScore);
			this.this.playerHit = this.sound.add('this.player_hit');
			this.this.playerHit.play();
			this.timedEvent = this.time.addEvent({
			delay: 250,
			callback: onEvent,
			callbackScope: this
			});	
			function onEvent(){
				player.tint = 0xffffff;
				}
			});
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
			this.this.playerHit = this.sound.add('this.player_hit');
			this.this.playerHit.play();
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
			this.this.playerHit = this.sound.add('this.player_hit');
			this.this.playerHit.play();
		});
		
		
///////////////////////////////////////////////////////////////////////////////////////////////
		
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
	

/////////////////////////////////////////////////////////////   LEVEL COMPLETE!  ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////cameras
		this.cameras.main.setBounds(0, 0, miniGameMap1.widthInPixels, miniGameMap1.heightInPixels);
		this.cameras.main.startFollow(player);  
		
/////////// game controls  /////////////////
//cursors and keys
		cursors = this.input.keyboard.createCursorKeys();
		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);		
		this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);	
		this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);	
//virtual buttons
		// clear control states
		this.leftButtonState = false;
		this.jumpButtonState = false;
		this.rightButtonState = false;
		this.A_buttonState = false;
		this.B_buttonState = false;
		//left button	
		this.leftButton =
		this.add.image(100, 500, 'left_button').setOrigin(0).setName('left_button').setInteractive();
		this.leftButton.setScrollFactor(0);
		this.leftButton.on('pointerover', ()=>{
		player.flipX = true;
		this.leftButton.tint = 0xff0000;	
		}, this);
		this.leftButton.on('pointerout', ()=>{
			this.leftButton.tint = 0xffffff;
			this.leftButtonState = false;
		}, this);
			this.leftButton.on('pointerdown', ()=>{	
		this.leftButtonState = true;
		}, this);
		this.leftButton.on('pointerup', ()=>{
			this.leftButtonState = false;
		}, this);
		// jump button
		this.jumpButton = 
		this.add.image(200, 500, 'jump_button').setOrigin(0).setName('jump_button').setInteractive();
		this.jumpButton.setScrollFactor(0);
		this.jumpButton.on('pointerover', ()=>{
			this.jumpButton.tint = 0xff0000;
		}, this);
		this.jumpButton.on('pointerout', ()=>{
			this.jumpButton.tint = 0xffffff;
			this.jumpButtonState = false;
		}, this);
		this.jumpButton.on('pointerdown', ()=>{
			this.jumpButtonState = true;
		}, this);
		this.jumpButton.on('pointerup', ()=>{
			this.jumpButtonState = false;
		}, this);
		// right button
		this.rightButton = 
		this.add.image(300, 500, 'right_button').setOrigin(0).setName('right_button').setInteractive();
		this.rightButton.setScrollFactor(0);
		this.rightButton.on('pointerover', ()=>{
			player.flipX = false;
			this.rightButton.tint = 0xff0000;
		}, this);
		this.rightButton.on('pointerout', ()=>{
		this.rightButton.tint = 0xffffff;
		this.rightButtonState = false;
		}, this);
			this.rightButton.on('pointerdown', ()=>{
			this.rightButtonState = true;
		}, this);
		this.rightButton.on('pointerup', ()=>{
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
			this.A_buttonState = false;
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
				this.B_buttonState = false;
		});
		this.B_button.on('pointerdown',  (pointer, time, lastFired)=>{
					this.B_buttonState = true;
					// Get bullet from bullets group
					var playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
					var bullet = playerBullets.get().setActive(true).setVisible(true);
					if (player.active === false){
						return;
					}
					if (bullet)
					{
						player.flipX === true ? this.macaroni = this.macaronis.create(player.x - 50, player.y, 'macaroni').play('macaroni_loop').setVelocityX(-700) : this.macaroni = this.macaronis.create(player.x + 50, player.y, 'macaroni').play('macaroni_loop').setVelocityX(700);
					/*	bullet.fire(player);
						this.physics.add.collider(enemy, bullet, enemyHitCallback);   */
					}
		}, this);
		this.B_button.on('pointerup', ()=>{
			this.B_buttonState = false;
		});		
//weapon keyboard (macaroni)	
	this.input.keyboard.on('keydown-' + 'SPACE', ()=>{	
		if (player.flipX === false && macaroniAvailable >= 1 && cursors.space.isDown){ 
					player.anims.play('fire_macaroni', true);
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
				
					
		}
		//end macaroni keyboard right
	 else if (player.flipX === true && macaroniAvailable >= 1 && cursors.space.isDown){
						player.anims.play('fire_macaroni', true);
						this.huh = this.sound.add('huh');
						this.huh.play();
						this.macaroni = this.macaronis.create(player.x - 50, player.y, 'macaroni').play('macaroni_loop');
						this.macaroni.flipX = true;
						this.macaroni.setVelocityX(-700);
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
					
					}
						
	});//end weapon (macaroni)

}//end create function
//////////////////////////////////////////////////////////////////////////////////////////// update///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 update(time, delta) {

////////////////////////////////////////////////////virtual controls	
  //A button weapon 1 (rolling pin) 
   if(player.flipX === false && cursors.space.isUp && this.A_buttonState === true && player.body.onFloor()){
					player.anims.play('rolling_pin_loop', true);
					this.huh = this.sound.add('huh');
					this.huh.play();	
					this.rollingPin = this.rollingPinWeapon.create(player.x + 45, player.y, 'rolling_pin_fr1');
					
				  }
			// A button weapon 1 (rolling pin)
		  else if (player.flipX === true && cursors.space.isUp && this.A_buttonState === true && player.body.onFloor()){
			   player.anims.play('rolling_pin_loop', true);
			   this.huh = this.sound.add('huh');
			   this.huh.play();
			   this.rollingPin = this.rollingPinWeapon.create(player.x - 45, player.y, 'rolling_pin_fr1').play('rolling_pin_loop2', true);
			   this.rollingPin.flipX = true;
					
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						this.rollingPin.destroy();
					});
				   }

		
////////////////////////////////////////////////////////////////////end virtual controls
		//weapon keyboard (rolling pin)
				// W key weapon 1 rolling pin
		   if (this.WKey.isDown && player.flipX === false && cursors.space.isUp && this.A_buttonState === false && player.body.onFloor()){
					player.anims.play('rolling_pin_loop', true);
					this.huh = this.sound.add('huh');
					this.huh.play();	
					this.rollingPin = this.rollingPinWeapon.create(player.x + 45, player.y, 'rolling_pin_fr1');
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.huh.stop();
							this.rollingPinWeapon.getChildren().map(child => child.destroy());
					}
					
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						return this.rollingPin.destroy();
					});
		}
//////////// W key weapon 1 rolling pin left
		 else if (player.flipX === true && cursors.space.isUp && this.WKey.isDown && this.AKey.isUp && this.A_buttonState === false && player.body.onFloor()){
			   player.anims.play('rolling_pin_loop', true);
			   this.huh = this.sound.add('huh');
			   this.huh.play();
			   this.rollingPin = this.rollingPinWeapon.create(player.x - 45, player.y, 'rolling_pin_fr1');
			   this.rollingPin.flipX = true;
			   this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.huh.stop();
							this.rollingPinWeapon.getChildren().map(child => child.destroy());
					}
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						this.rollingPin.destroy();
					});
		 }
//end weapon (rolling pin)

	
				
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////player movements
	 //left (ground)
	if (this.leftButtonState === true || cursors.left.isDown === true && player.body.onFloor() === true && this.WKey.isDown === false){	
			player.body.setVelocityX(-250);
			player.anims.play('walk', true);
			player.flipX = true;		
	}//(air)
	else if (this.leftButtonState === true || cursors.left.isDown === true && player.body.onFloor() === false && this.WKey.isDown === false){	
			player.body.setVelocityX(-250);
			player.anims.play('fall', true);
			player.flipX = true;		
	}
	else if (player.body.onFloor() === false){
		player.anims.play('fall', true);
	}
	 //right (ground)
    if (this.rightButtonState === true || cursors.right.isDown === true && player.body.onFloor() === true && this.WKey.isDown === false){
			player.body.setVelocityX(250);
			player.anims.play('walk', true);
			player.flipX = false;
	}//(air)
	else if (this.rightButtonState === true || cursors.right.isDown === true && player.body.onFloor() === false){
			player.body.setVelocityX(250);
			player.anims.play('fall', true);
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
 //idle
   if (player.body.onFloor() === true && cursors.up.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false
   && this.rightButtonState === false && this.jumpButtonState === false && this.leftButtonState === false
   && this.WKey.isUp && this.A_buttonState === false){
	   player.body.setVelocityX(0);
	   player.anims.play('idle', true);
   }

if (this.B_buttonState === true && macaroniAvailable === true){
	player.anims.play('walk', true);
}
	
		if (player.body.onFloor() === true && this.WKey.isDown){
			player.body.setVelocityX(0);
		//	player.anims.play('rolling_pin_loop', true);
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
		if (player.body.onFloor() === false && this.right_buttonState === true && this.WKey.isDown){
			player.anims.play('rolling_pin_loop', true);
		}
		if (healthScore <= 0){
			this.mainTheme.stop()	
			this.scene.stop('PlayState_lv2');
			this.scene.start('LivesState_lv2');
			livesAvailable--;
			livesText.setText(livesAvailable);
		}
		if (livesAvailable <= 2){
		livesText.setText(livesAvailable);
		}		

			if (macaroniAvailable <= 0){ 
			this.iceBlockCollider.active = false;
			}
				
 }//end update function
 

// end state 
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////