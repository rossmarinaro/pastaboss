//// Pastaboss game Playstate 3 script

class PlayState_lv3 extends Phaser.Scene {
  constructor() {
    super("PlayState_lv3");
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
		// map
	    let map2 = this.add.tilemap('map3');
		// tiles for the ground layer, background images
		let backdropTiles3 = map2.addTilesetImage('tiles');
		let backdropUnderground2 = map2.createStaticLayer('bkgnd3', backdropTiles3, 0, 0);
		let backdropTiles = map2.addTilesetImage('tiles4');
		let backdrop = map2.createStaticLayer('bkgnd', backdropTiles, 0, 0);
		let backdropTiles2 = map2.addTilesetImage('tiles2');
		let backdropUnderground = map2.createStaticLayer('bkgnd2', backdropTiles2, 0, 0);
		let groundTiles = map2.addTilesetImage('tiles4');
		let groundLayer = map2.createStaticLayer('World', groundTiles, 0, 0);
		groundLayer.setCollisionByExclusion([-1]);
		let macaroniItemTiles = map2.addTilesetImage('coin');   
		macaroniPickupLayer = map2.createDynamicLayer('Coins', macaroniItemTiles, 0, 0);
		//world parameters
		this.physics.world.bounds.width = groundLayer.width;   
		this.physics.world.bounds.height = groundLayer.height; 
	//hazards
		this.hazardStatic = this.physics.add.staticGroup();
		this.hazardMoving = this.physics.add.group();
		this.obstacle = this.physics.add.group();
		//ice block 
		 this.iceBlock = this.hazardStatic.create(6150, 2240, 'ice_block_fr1');	
		 this.iceBlockHitBoxState = false;
		 //ice patches
		 this.ice1 = this.hazardStatic.create(560, 642, 'ice');
		 this.ice2 = this.hazardStatic.create(6600, 1950, 'ice');
		 this.ice3 = this.hazardStatic.create(5500, 2300, 'ice');
		 //snow particles
		 this.snowParticles1 = this.add.particles('snow');
		 this.snowParticles1.createEmitter({
			 x: {min: 100, max: 2420}, y: 200, 
			 lifespan: 3000, speedY: { min: 10, max: 200},
			 scale: 0.4, quantity: 50, blendMode: 'ADD'
		 });
		 this.snowParticles2 = this.add.particles('snow');
		 this.snowParticles2.createEmitter({
			 x: {min: 100, max: 2000}, y: 1000, 
			 lifespan: 6000, speedY: { min: 10, max: 200},
			 scale: 0.4, quantity: 50, blendMode: 'ADD'
		 });
		 this.snowParticles3 = this.add.particles('snow');
		 this.snowParticles3.createEmitter({
			 x: {min: 100, max: 3500}, y: 1700, 
			 lifespan: 2000, speedY: { min: 10, max: 200},
			 scale: 0.4, quantity: 50, blendMode: 'ADD'
		 });
	// level pick ups
		let pickups = this.physics.add.group();
        this.healthPickup = pickups.create(450, 400, 'ikura');
		this.healthPickup2 = pickups.create(3075, 400, 'salmon');
		this.healthPickup3 = pickups.create(1150, 400, 'ikura');
		this.healthPickup4 = pickups.create(980, 900, 'salmon');
	    this.healthPickup5 = pickups.create(2160, 400, 'ikura');
		this.healthPickup6 = pickups.create(900, 900, 'salmon');
	    this.healthPickup7 = pickups.create(3650, 200, 'ikura');
		this.healthPickup8 = pickups.create(1070, 900, 'salmon');
		this.healthPickup9 = pickups.create(6600, 200, 'ikura');
		this.healthPickup10 = pickups.create(2650, 2000, 'salmon');
	// extra lives pickups
		let extraLife = pickups.create(3100, 700, 'lives2').setScale(0.25);
		let extraLife2 = pickups.create(2800, 1600, 'lives2').setScale(0.25);
		let pickaxe = this.physics.add.sprite(8400, 1600, 'pickaxe');
		this.pickaxePickedUp = false;
	//level complete door
		let exit = this.physics.add.staticGroup();
		exit.create(420, 1260, 'exit');
		
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
					{ key: 'rollinng_pin_fr3' },
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
///////enemy animations//////
   // ice cream anims
		this.anims.create({
			key: 'icecream_anims',
			frames:[
			{ key: 'icecream_fr1' },
				{ key: 'icecream_fr2' },
					{ key: 'icecream_fr3' },
						{ key: 'icecream_fr4' },
							{ key: 'icecream_fr3' },
								{ key: 'icecream_fr2' },
										{ key: 'icecream_fr1' , duration: 50 } 				
		],
		frameRate: 8,
		repeat: -1
	});
//meatballs 
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
//pickles
		this.anims.create({
			key: 'pickle_loop',
			frames:[
			{ key: 'pickle_fr1' },
				{ key: 'pickle_fr2' },
					{ key: 'pickle_fr3' },
						{ key: 'pickle_fr4' },
							{ key: 'pickle_fr5', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
	});
// cupcakes
	this.anims.create({
			key: 'cupcake_loop',
			frames:[
			{ key: 'cupcake_fr1' },
				{ key: 'cupcake_fr2' },
					{ key: 'cupcake_fr3' },
						{ key: 'cupcake_fr2' },
							{ key: 'cupcake_fr1' , duration: 50 }
		],
		frameRate: 8,
		repeat: -1
	});
// level 2 boss
	this.anims.create({
			key: 'boss_loop',
			frames:[
			{ key: 'boss_fr1' },
				{ key: 'boss_fr2' },
					{ key: 'boss_fr3' },
						{ key: 'boss_fr2' },
							{ key: 'boss_fr1', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
	});
	//destroy boss
	   this.anims.create({
        key: 'boss_hit_anim',
        frames: [{key: 'boss_fr3'}],
        frameRate: 0
    });
	// ice block
			this.anims.create({
			key: 'ice_block_anims',
			frames:[
			{ key: 'ice_block_fr1' },
				{ key: 'ice_block_fr2' },
					{ key: 'ice_block_fr3' , duration: 5 }
		],
		frameRate: 8,
		repeat: -1
});
	// rubble
				this.anims.create({
			key: 'rubble_anims',
			frames:[
			{ key: 'rubble_fr1' },
				{ key: 'rubble_fr2' },
					{ key: 'rubble_fr3' , duration: 5 }
		],
		frameRate: 8,
		repeat: -1
});
		// icicle
				this.anims.create({
			key: 'icicle_anims',
			frames:[
			{ key: 'icicle_fr1' },
					{ key: 'icicle_fr2', duration: 2 }
		],
		frameRate: 2,
		repeat: -0
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////						
		// enemy movement groups 
		this.enemyStatic = this.physics.add.staticGroup();
		this.enemyMoving = this.physics.add.group();	
	//	let x = (player.x < 0) ? Phaser.Math.Between(2200, 3200 ) : Phaser.Math.Between(2200, 3200);
///////////////enemy spawns	
		//icle
		 this.icicle1Prop = this.enemyStatic.create (550, 280, 'icicle_fr1');
	 	//ice cream cones
		this.icecream1 = this.enemyMoving.create(500, 1980, 'icecream_fr1').play('icecream_anims');
		this.icecream1.flipX = true;		
		this.icecream2 = this.enemyMoving.create(2000, 450, 'icecream_fr1').play('icecream_anims');
		this.icecream3 = this.enemyMoving.create(2500, 1500, 'icecream_fr1').play('icecream_anims');   
		this.icecream3.flipX = true;
		this.icecream1Tween = this.tweens.add({
			targets: this.icecream1, x: 1000, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true
		});    
		this.icecream2Tween = this.tweens.add({
			targets: this.icecream2, x: 1300, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true
		});
		this.icecream3Tween = this.tweens.add({
			targets: this.icecream3, x: 3000, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true
		});    
		// ice cream health points
		this.icecream1Health = 3;
		this.icecream2Health = 3;
		this.icecream3Health = 3;	
		//meatballs
		this.meatball = this.enemyMoving.create(5200, 400, 'meatball_fr1').play('meatball_loop');
		this.meatball2 = this.enemyMoving.create(3000, 700, 'meatball_fr1').play('meatball_loop');
		this.meatball3 = this.enemyMoving.create(4500, 800, 'meatball_fr1').play('meatball_loop');
		this.meatball4 = this.enemyMoving.create(3800, 600, 'meatball_fr1').play('meatball_loop');
		this.meatball2.flipX = true;
		// meatballs health points
		this.meatballHealth = 2;
		this.meatball2Health = 2;
		this.meatball3Health = 2;
		this.meatball4Health = 2;		
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
		//pickles
		this.pickle1 = this.enemyMoving.create(5550, 950, 'pickle_fr1').play('pickle_loop').setScale(0.75);
		this.pickle2 = this.enemyMoving.create(6800, 950, 'pickle_fr1').play('pickle_loop').setScale(0.75);
		//pickle tweens   
		this.pickle1Tween = this.tweens.add({
			targets: this.pickle1, x: 5000, ease: 'Linear', duration: 5000, repeat: -1, yoyo: true, onRepeat: function(){
		this.pickle1.flipX = false;
		this.time.addEvent({
				delay: 5000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.pickle1.flipX = true;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		}); 	
		this.pickle2Tween = this.tweens.add({
			targets: this.pickle2, x: 6400, ease: 'Linear', duration: 5000, repeat: -1, yoyo: true, onRepeat: function(){
		this.pickle2.flipX = false;
		this.time.addEvent({
				delay: 5000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.pickle2.flipX = true;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		}); 
		//pickle health
		this.pickle1Health = 3;
		this.pickle2Health = 3;
		//cupcakes
		this.cupcake1 = this.enemyMoving.create(2550, 2000, 'cupcake_fr1').play('cupcake_loop', true);
		this.cupcake2 = this.enemyMoving.create(4800, 1700, 'cupcake_fr1').play('cupcake_loop', true);
		this.cupcake3 = this.enemyMoving.create(1000, 1450, 'cupcake_fr1').play('cupcake_loop', true);
		this.cupcake4 = this.enemyMoving.create(6400, 1950, 'cupcake_fr1').play('cupcake_loop', true); 
		this.cupcake5 = this.enemyMoving.create(4400, 1950, 'cupcake_fr1').play('cupcake_loop', true); 
		//cupcake tweens
		this.cupcake1Tween = this.tweens.add({
			targets: this.cupcake1, x: 3000, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cupcake1.flipX = false;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cupcake1.flipX = true;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		}); 
		this.cupcake2Tween = this.tweens.add({
			targets: this.cupcake2, x: 5300, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cupcake2.flipX = false;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cupcake2.flipX = true;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
		this.cupcake3Tween = this.tweens.add({
			targets: this.cupcake3, x: 1500, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cupcake3.flipX = false;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cupcake3.flipX = true;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
		this.cupcake4Tween = this.tweens.add({
			targets: this.cupcake4, x: 6800, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cupcake4.flipX = false;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cupcake4.flipX = true;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
		this.cupcake5Tween = this.tweens.add({
			targets: this.cupcake5, x: 4800, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cupcake5.flipX = false;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cupcake5.flipX = true;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
		//cupcake health
		this.cupcake1Health = 3;
		this.cupcake2Health = 3;
		this.cupcake3Health = 3;
		this.cupcake4Health = 3;
		this.cupcake5Health = 3;
		// level boss
		this.levelBoss = this.enemyMoving.create(400, 1170, 'boss_fr1').play('boss_loop').setScale(0.7);
		this.levelBoss.setCollideWorldBounds(true);
		this.levelBossTween = this.tweens.add({
			targets: this.levelBoss, x: 800, ease: 'Linear', duration: 2000, repeat: -1, yoyo: true, onYoyo: ()=>{
				//piece of cake (boss weapon)
				this.levelBossWeapon = this.enemyMoving.create(800, 1150 , 'boss_weapon')
				this.levelBossWeapon.setVelocityX(250);
				}, onRepeat: ()=>{
				this.levelBossWeapon.destroy();	
				this.levelBoss.flipX = false;
				this.time.addEvent({
						delay: 2000,
						callback: onEvent,
						callbackScope: this
					});
		function onEvent(){
			this.levelBoss.flipX = true;
		}
	}, onRepeatScope: this, onYoyoScope: this, onRepeatParams: [], repeatDelay: 0
		});
		// level boss health points
		this.levelBossHealth = 10;
		//boss icicles
		this.icicle2Prop = this.enemyStatic.create(1300, 1050, 'icicle_fr1').setScale(0.5).setSize(120, 120);   //1300, 1050
		this.hitbox = this.physics.add.sprite(1300, 1200, 'hitbox');      //1300, 1200
		this.hitbox.alpha = 0;
		this.physics.add.collider(this.hitbox, groundLayer);
		this.physics.add.collider(this.hitbox, player, ()=>{
			this.hitbox.destroy();
			this.time.addEvent({
				delay: 50,
				callback: callBack,
				callbackScope: this,			
			});
			function callBack(){
				this.icicle2 = this.hazardMoving.create(1300, 1050, 'icicle_fr1').setScale(0.5);
				this.physics.add.collider(this.icicle2, groundLayer, ()=>{
					this.iceBreakSound = this.sound.add('ice_break', {volume: 0.35});
					this.iceBreakSound.play();
					this.icicle2.play('icicle_anims', true);
					this.time.addEvent({
						delay: 150,
						callback: onEvent,
						callbackScope: this,
						loop: true
				});
				function onEvent(){
					this.icicle2.destroy();
				}
			});
		}
	});						

/////////// health, ammo, and lives text  ///////////////////////////////////////////////////////

	// health text
		this.add.image(150, 60, 'player_interface').setScrollFactor(0);
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
		//ice
		this.physics.add.collider(groundLayer, player, ()=>{
				player.body.setGravityX(0);
		});
		this.physics.add.collider(player, this.ice1, ()=>{
				player.body.setGravityX(40000);		
		});
		this.physics.add.collider(player, this.ice2, ()=>{
				player.body.setGravityX(40000);		
		});
		this.physics.add.collider(player, this.ice3, ()=>{
				player.body.setGravityX(-40000);		
		});
		
		this.physics.add.collider(player, this.hazardStatic);
		this.physics.add.collider(pickaxe, groundLayer);
		this.physics.add.collider(this.obstacle, groundLayer);
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
		this.physics.add.collider(extraLife, groundLayer);
		this.physics.add.collider(exit, groundLayer);
		this.physics.add.collider(this.macaronis, groundLayer);
		this.physics.add.collider(pickups, groundLayer);				
		this.physics.add.collider(this.macaronis, player, ()=>{
		this.macaroniRing = this.sound.add('macaroni_ring');
		this.macaroniRing.play();
		macaroniAvailable++;
		this.macaroniText2.setText(macaroniAvailable);
		this.macaronis.getChildren().map(child => child.destroy());
		});
////pickaxe player interface
this.obstacle2 = this.physics.add.staticGroup();
		this.C_buttonState = false;
		this.physics.add.collider(player, pickaxe, ()=>{
			this.pickaxePickedUp = true;
			pickaxe.destroy();
			this.iceBlockHitBox = this.obstacle2.create(6220, 2360/*2240*/, 'hitbox');
			this.invisibleBox1 = this.obstacle2.create(6375, 2335, 'hitbox').setSize(100, 50, true);
			this.physics.add.collider(player, this.invisibleBox1, ()=>{
				this.iceBlockHitBoxState = false;
			});
			this.physics.add.collider(player, this.iceBlockHitBox, ()=>{
				if (this.iceBlockHitBoxState === false){
					this.iceBlockHitBoxState = true;		
				}
				else{
					this.iceBlockHitBoxState = false;
				}
			});
			this.C_button = 
		this.add.image(560, 420, 'C_button').setOrigin(0).setInteractive();
		this.C_button.setScrollFactor(0);
		this.pickaxe_UI = this.add.image(595, 455, 'pickaxe').setScale(0.4).setScrollFactor(0).setInteractive();
		this.pickaxe_UI.on('pointerdown', ()=>{
			this.C_buttonState = true;
		});
		this.pickaxe_UI.on('pointerover', ()=>{
				this.pickaxe_UI.tint = 0x08511B;
				this.C_button.tint = 0x08511B;
		});
		this.pickaxe_UI.on('pointerout', ()=>{
				this.pickaxe_UI.tint = 0xffffff;	
				this.C_button.tint = 0xffffff;
				this.C_buttonState = false;
		});
		this.C_button.on('pointerover', ()=>{
				this.pickaxe_UI.tint = 0x08511B;	
				this.C_button.tint = 0x08511B;
		});
				this.C_button.on('pointerout', ()=>{
				this.pickaxe_UI.tint = 0xffffff;	
				this.C_button.tint = 0xffffff;
				this.C_buttonState = false;
		});
		this.pickaxe_UI.on('pointerdown', ()=>{
			if (player.flipX === true && this.iceBlockHitBoxState === true){
			player.anims.play('rolling_pin_loop', true);
				player.setVelocityX(0);
					   this.huh = this.sound.add('huh');
					   this.huh.play();
					   let pickAxe = this.rollingPinWeapon.create(player.x - 45, player.y, 'pickaxe');
					   this.timedEvent = this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this
							});	
						function onEvent(){
									this.huh.stop();
									this.rollingPinWeapon.getChildren().map(child => child.destroy());
							}
						//ice blocks 
					this.physics.add.collider(pickAxe, this.iceBlock, ()=>{
						this.iceBlockBreak = this.sound.add('ice_break');
						this.iceBlockBreak.play();
						this.iceBlock.play('ice_block_anims');
						this.time.addEvent({
							delay:250,
							callback: onEvent,
							callbackScope: this
						});
						function onEvent(){
							this.iceBlock.destroy();
							pickAxe.destroy();
						this.iceBlockHitBoxState = false;
						this.pickaxe_UI.destroy();
						}
					});
			}
		});
		
	});
		
////hazard collisons
		this.physics.add.collider(player, this.hazardMoving, ()=>{
			this.hazardMoving.getChildren().map(child => child.destroy());
			player.tint = 0xff0000;
			healthScore--;
			this.text2.setText(healthScore);
			this.playerHit = this.sound.add('player_hit');
			this.playerHit.play();
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
	
////player picks up items for health
			this.physics.add.collider(player, this.healthPickup, ()=>{	
			this.healthPickup.disableBody(true, true);
			this.healthPickup.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			this.time.addEvent({
				delay: 150,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.icicle = this.hazardMoving.create (550, 20, 'icicle_fr1').play('icicle_anims');
				this.icicle.body.setVelocityY(800);
				this.physics.add.collider(this.icicle, groundLayer, ()=>{
				this.iceBreakSound = this.sound.add('ice_break', {volume: 0.35});
				this.iceBreakSound.play();
				this.time.addEvent({
				delay: 150,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.icicle.destroy();
			}				
			});
				}
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
			this.physics.add.collider(player, this.healthPickup9, ()=>{
			this.healthPickup9.disableBody(true, true);
			this.healthPickup9.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
			this.physics.add.collider(player, this.healthPickup10, ()=>{
			this.healthPickup10.disableBody(true, true);
			this.healthPickup10.destroy();
			healthScore++;
			this.text2.setText(healthScore);
			this.healthRing = this.sound.add('health_ring');
			this.healthRing.play();
			});
      // extra life pickups
			this.physics.add.collider(player, extraLife, ()=>{
				this.extraLifeSound = this.sound.add('extra_life_sound');
				this.extraLifeSound.play();
				extraLife.disableBody(true, true);
				extraLife.destroy();
				livesAvailable++;	
				livesText.setText(livesAvailable);
				livesLeft++;
			});
			this.physics.add.collider(player, extraLife2, ()=>{
				this.extraLifeSound = this.sound.add('extra_life_sound');
				this.extraLifeSound.play();
				extraLife2.disableBody(true, true);
				extraLife2.destroy();
				livesAvailable++;	
				livesText.setText(livesAvailable);
				livesLeft++;
			});
					
/////////////////////////////////////////////////////////////   LEVEL COMPLETE!  ///////////////////////////
		this.physics.add.overlap(player, exit, ()=>{
			this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
				if(progress > .9){
					this.mainTheme.stop();
					this.scene.stop('PlayState_lv3');
				   // this.scene.start('PreloadState_lv3');	
				}
			});	
    	});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////cameras
		this.cameras.main.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);
		this.cameras.main.startFollow(player);  
		
/////////// game controls  /////////////////

//cursors and keys
		cursors = this.input.keyboard.createCursorKeys();
		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);		
		this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);	
		this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);	
//virtual buttons
		this.input.addPointer(1);
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
		}, this);
		this.leftButton.on('pointerout', ()=>{
		this.leftButtonState = false;
		}, this);
		this.leftButton.on('pointerdown', ()=>{	
		this.leftButton.tint = 0xff0000;
		this.leftButtonState = true;
		}, this);
		this.leftButton.on('pointerup', ()=>{
		this.leftButton.tint = 0xffffff;
		this.leftButtonState = false;
		}, this);
		// jump button
		this.jumpButton = 
		this.add.image(540, 500, 'jump_button').setOrigin(0).setName('jump_button').setInteractive();
		this.jumpButton.setScrollFactor(0);
		this.jumpButton.on('pointerover', ()=>{
		}, this);
		this.jumpButton.on('pointerout', ()=>{
		this.jumpButtonState = false;
		}, this);
		this.jumpButton.on('pointerdown', ()=>{
		this.jumpButton.tint = 0xff0000;
		this.jumpButtonState = true;
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
		this.rightButtonState = false;
		}, this);
		this.rightButton.on('pointerdown', ()=>{
		this.rightButton.tint = 0xff0000;
		this.rightButtonState = true;
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
			this.A_buttonState = false;
		});
		this.A_button.on('pointerdown', ()=>{
			this.A_button.tint = 0xff0000;
			this.A_buttonState = true;
			this.huh = this.sound.add('huh');
			this.huh.play();
			if(player.flipX === false && cursors.space.isUp && this.A_buttonState === true){
					player.anims.remove('idle', true);
					player.anims.play('rolling_pin_loop', true);
					this.rollingPin = this.rollingPinWeapon.create(player.x + 45, player.y, 'rolling_pin_fr1');	
					//enemy collisions
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
					//pickles
					this.physics.add.collider(this.rollingPin, this.pickle1, ()=>{
						this.pickle1.tint = 0xff0000;
						this.pickle1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle1.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.pickle2, ()=>{
						this.pickle2.tint = 0xff0000;
						this.pickle2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle2.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.pickle3, ()=>{
						this.pickle3.tint = 0xff0000;
						this.pickle3Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle3.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					//cheese
					this.physics.add.collider(this.rollingPin, this.cheese1, ()=>{
						this.cheese1.tint = 0xff0000;
						this.cheese1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cheese1.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cheese2, ()=>{
						this.cheese2.tint = 0xff0000;
						this.cheese2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cheese2.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});		 
					this.physics.add.collider(this.rollingPin, this.cheese3, ()=>{
						this.cheese3.tint = 0xff0000;
						this.cheese3Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cheese3.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cheese4, ()=>{
						this.cheese4.tint = 0xff0000;
						this.cheese4Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cheese4.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(player, this.rollingPin, ()=>{
							this.time.addEvent({
								delay:100,
								callback: onEvent,
								callbackScope: this
							});
						function onEvent(){
							this.rollingPin.destroy();
						}
					});
				  }
			// A button weapon 1 (rolling pin)
		  else if (player.flipX === true && cursors.space.isUp && this.A_buttonState === true){
			  player.anims.remove('idle', true);
			   player.anims.play('rolling_pin_loop', true);
			   this.rollingPin = this.rollingPinWeapon.create(player.x - 45, player.y, 'rolling_pin_fr1');
			   this.rollingPin.flipX = true;
		
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
						//meatballs
						this.physics.add.collider(this.rollingPin, this.meatball, ()=>{
							this.meatball.tint = 0x000000;
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
							this.meatball2.tint = 0x000000;	
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
							this.meatball3.tint = 0x000000;	
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
							this.meatball4.tint = 0x000000;
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
						//pickles
						this.physics.add.collider(this.rollingPin, this.pickle1, ()=>{
							this.pickle1.tint = 0xff0000;
							this.pickle1Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.pickle1.tint = 0xffffff;
							this.enemyOw1 = this.sound.add('enemy_ow1');
							this.enemyOw1.play();
						}
						});
						this.physics.add.collider(this.rollingPin, this.pickle2, ()=>{
							this.pickle2.tint = 0xff0000;
							this.pickle2Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.pickle2.tint = 0xffffff;
							this.enemyOw1 = this.sound.add('enemy_ow1');
							this.enemyOw1.play();
						}
					});
					this.physics.add.collider(this.rollingPin, this.pickle3, ()=>{
						this.pickle3.tint = 0xff0000;
						this.pickle3Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle3.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					//cheese
					this.physics.add.collider(this.rollingPin, this.cheese1, ()=>{
						this.cheese1.tint = 0xff0000;
						this.cheese1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cheese1.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cheese2, ()=>{
						this.cheese2.tint = 0xff0000;
						this.cheese2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cheese2.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});		 
					this.physics.add.collider(this.rollingPin, this.cheese3, ()=>{
						this.cheese3.tint = 0xff0000;
						this.cheese3Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cheese3.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cheese4, ()=>{
						this.cheese4.tint = 0xff0000;
						this.cheese4Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cheese4.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
						// level boss
						this.physics.add.collider(this.rollingPin, this.levelBoss, ()=>{
							if (this.levelBoss.flipX === true){
							this.levelBossHealth--;
							this.levelBoss.tint = 0xff0000;
							this.bossHit = this.sound.add('boss_hit');
							this.time.addEvent({
							delay: 500,
							callback: onEvent,
							callbackScope: this
							});	
							function onEvent(){
							this.bossHit.play();
							this.levelBoss.tint = 0xffffff;
							}
						  }
						   else{
							  this.rollingPin.tint = 0xff0000;
						  }
						});	
					//breakable brick
					this.physics.add.collider(this.rollingPin, this.breakableBrick, ()=>{
						this,breakableBrick.destroy();
					});
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						this.time.addEvent({
								delay:100,
								callback: onEvent,
								callbackScope: this
							});
						function onEvent(){
							this.rollingPin.destroy();
						}
					});
				   }
		});
		this.A_button.on('pointerup', ()=>{
			this.A_button.tint = 0xffffff;
			this.A_buttonState = false;
		});		
	//// B button (macaroni weapon)
		this.B_button = 
		this.add.image(700, 450, 'B_button').setOrigin(0).setInteractive();
		this.B_button.setScrollFactor(0);
		this.B_button.on('pointerover', ()=>{
		});
		this.B_button.on('pointerout', ()=>{
		this.B_buttonState = false;
		});
		this.B_button.on('pointerdown', ()=>{
		this.huh = this.sound.add('huh');
		this.huh.play();
		this.B_button.tint = 0x0c1ea5;
		this.B_buttonState = true;
				// B button weapon 2 (macaroni)
		 if (player.flipX === false && macaroniAvailable >= 1 && this.B_buttonState === true){
					player.anims.play('fire_macaroni', true);
							this.macaroni = this.macaronis.create(player.x + 30, player.y, 'macaroni').play('macaroni_loop');
							this.macaroni.setVelocityX(700);
							this.time.addEvent({
								delay: 1000,
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
					//ice cream cones
					this.physics.add.collider(this.macaroni, this.icecream1, ()=>{
						this.icecream1Health--;
						this.icecream1.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.icecream1.tint = 0xffffff;
					}
					});
					this.physics.add.collider(this.macaroni, this.icecream2, ()=>{
						this.icecream2Health--;
						this.icecream2.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
					this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.icecream2.tint = 0xffffff;
					}
					});
						this.physics.add.collider(this.macaroni, this.icecream3, ()=>{	
						this.icecream3Health--;
						this.icecream3.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.icecream3.tint = 0xffffff;
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
					//pickles
					this.physics.add.collider(this.macaroni, this.pickle1, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle1.tint = 0xff0000;
						this.pickle1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle1.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					this.physics.add.collider(this.macaroni, this.pickle2, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle2.tint = 0xff0000;
						this.pickle2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle2.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
						//cupcakes
						this.physics.add.collider(this.macaroni, this.cupcake1, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake1.tint = 0xff0000;
							this.cupcake1Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake1.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						this.physics.add.collider(this.macaroni, this.cupcake2, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake2.tint = 0xff0000;
							this.cupcake2Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake2.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});		 
						this.physics.add.collider(this.macaroni, this.cupcake3, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake3.tint = 0xff0000;
							this.cupcake3Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake3.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						this.physics.add.collider(this.macaroni, this.cupcake4, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake4.tint = 0xff0000;
							this.cupcake4Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake4.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						this.physics.add.collider(this.macaroni, this.cupcake5, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake5.tint = 0xff0000;
							this.cupcake4Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake5.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});					
			}
			// B button weapon 2 (macaroni) left
			else if (player.flipX === true && macaroniAvailable >= 1 && this.B_buttonState === true ){
				player.anims.play('fire_macaroni', true);
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
				//enemy collisions
			   //ice cream cones
				this.physics.add.collider(this.macaroni, this.icecream1, ()=>{
				this.icecream1Health--;
				this.icecream1.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				this.icecream1.tint = 0xffffff;
				}
				});
				this.physics.add.collider(this.macaroni, this.icecream2, ()=>{
				this.icecream2Health--;
				this.icecream2.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();;
				this.icecream2.tint = 0xffffff;
				}
				});
				this.physics.add.collider(this.macaroni, this.icecream3, ()=>{
				this.icecream3Health--;
				this.icecream3.tint = 0xff0000;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
				this.timedEvent = this.time.addEvent({
				delay: 50,
				callback: onEvent,
				callbackScope: this
				});	
				function onEvent(){
				this.chiliHit.play();
				this.icecream3.tint = 0xffffff;
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
				//pickles
					this.physics.add.collider(this.macaroni, this.pickle1, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle1.tint = 0xff0000;
						this.pickle1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle1.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					this.physics.add.collider(this.macaroni, this.pickle2, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle2.tint = 0xff0000;
						this.pickle2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle2.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
						//cupcakes
						this.physics.add.collider(this.macaroni, this.cupcake1, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake1.tint = 0xff0000;
							this.cupcake1Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake1.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						this.physics.add.collider(this.macaroni, this.cupcake2, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake2.tint = 0xff0000;
							this.cupcake2Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake2.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});		 
						this.physics.add.collider(this.macaroni, this.cupcake3, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake3.tint = 0xff0000;
							this.cupcake3Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake3.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						this.physics.add.collider(this.macaroni, this.cupcake4, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake4.tint = 0xff0000;
							this.cupcake4Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake4.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
								this.physics.add.collider(this.macaroni, this.cupcake5, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake5.tint = 0xff0000;
							this.cupcake5Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake5.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
					// level boss
					this.physics.add.collider(this.macaroni, this.levelBoss, ()=>{
						if (this.levelBoss.flipX === true){
						this.levelBossHealth--;
						this.levelBoss.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.bossHit = this.sound.add('boss_hit');
						this.time.addEvent({
						delay: 500,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.bossHit.play();
						this.levelBoss.tint = 0xffffff;
						}
					  }
					   else{
						  this.macaroni.tint = 0xff0000;
						  this.macaroni.setVelocityX(0).setVelocityY(0);
						 }
					});	
		}
		});
		this.B_button.on('pointerup', ()=>{
		this.B_button.tint = 0xffffff;
		this.B_buttonState = false;
		});		
//weapon keyboard (macaroni)	
	this.input.keyboard.on('keydown-' + 'SPACE', ()=>{	
		if (player.flipX === false && macaroniAvailable >= 1 && cursors.space.isDown){ 
					player.anims.play('fire_macaroni', true);
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
					//enemy collisions
					//ice cream cones
					this.physics.add.collider(this.macaroni, this.icecream1, ()=>{
						this.icecream1Health--;
						this.icecream1.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.icecream1.tint = 0xffffff;
					}
					});
					this.physics.add.collider(this.macaroni, this.icecream2, ()=>{
						this.icecream2Health--;
						this.icecream2.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
					this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.chiliHit.play();
						this.icecream2.tint = 0xffffff;
					}
					});
						this.physics.add.collider(this.macaroni, this.icecream3, ()=>{	
						this.icecream3Health--;
						this.icecream3.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
					});	
					function onEvent(){
						this.icecream3.tint = 0xffffff;
						this.chiliHit.play();
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
					//pickles
					this.physics.add.collider(this.macaroni, this.pickle1, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle1.tint = 0xff0000;
						this.pickle1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle1.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					this.physics.add.collider(this.macaroni, this.pickle2, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle2.tint = 0xff0000;
						this.pickle2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle2.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});	
					//cupcakes
					this.physics.add.collider(this.macaroni, this.cupcake1, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.cupcake1.tint = 0xff0000;
						this.cupcake1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake1.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.macaroni, this.cupcake2, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.cupcake2.tint = 0xff0000;
						this.cupcake2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake2.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});		 
					this.physics.add.collider(this.macaroni, this.cupcake3, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.cupcake3.tint = 0xff0000;
						this.cupcake3Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake3.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.macaroni, this.cupcake4, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.cupcake4.tint = 0xff0000;
						this.cupcake4Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake4.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});		 
					this.physics.add.collider(this.macaroni, this.cupcake5, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake5.tint = 0xff0000;
							this.cupcake5Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake5.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
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
						//enemy collisions
					   //ice cream cones
						this.physics.add.collider(this.macaroni, this.icecream1, ()=>{
						this.icecream1Health--;
						this.icecream1.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.chiliHit.play();
						this.icecream1.tint = 0xffffff;
						}
						});
						this.physics.add.collider(this.macaroni, this.icecream2, ()=>{
						this.icecream2Health--;
						this.icecream2.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.chiliHit.play();
						this.icecream2.tint = 0xffffff;
						}
						});
						this.physics.add.collider(this.macaroni, this.icecream3, ()=>{
						this.icecream3Health--;
						this.icecream3.tint = 0xff0000;
						this.macaronis.getChildren().map(child => child.destroy());
						this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
						delay: 50,
						callback: onEvent,
						callbackScope: this
						});	
						function onEvent(){
						this.chiliHit.play();
						this.icecream3.tint = 0xffffff;
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
						//pickles
							this.physics.add.collider(this.macaroni, this.pickle1, ()=>{
								this.macaronis.getChildren().map(child => child.destroy());
								this.pickle1.tint = 0xff0000;
								this.pickle1Health--;
								this.time.addEvent({
										delay: 50,
										callback: onEvent,
										callbackScope: this							
								});
								function onEvent(){
								this.pickle1.tint = 0xffffff;
								this.enemyOw1 = this.sound.add('enemy_ow1');
								this.enemyOw1.play();
							}
							});
							this.physics.add.collider(this.macaroni, this.pickle2, ()=>{
								this.macaronis.getChildren().map(child => child.destroy());
								this.pickle2.tint = 0xff0000;
								this.pickle2Health--;
								this.time.addEvent({
										delay: 50,
										callback: onEvent,
										callbackScope: this							
								});
								function onEvent(){
								this.pickle2.tint = 0xffffff;
								this.enemyOw1 = this.sound.add('enemy_ow1');
								this.enemyOw1.play();
							}
							});
							//cupcakes
						this.physics.add.collider(this.macaroni, this.cupcake1, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake1.tint = 0xff0000;
							this.cupcake1Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake1.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						this.physics.add.collider(this.macaroni, this.cupcake2, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake2.tint = 0xff0000;
							this.cupcake2Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake2.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});		 
						this.physics.add.collider(this.macaroni, this.cupcake3, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake3.tint = 0xff0000;
							this.cupcake3Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake3.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						this.physics.add.collider(this.macaroni, this.cupcake4, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake4.tint = 0xff0000;
							this.cupcake4Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake4.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						this.physics.add.collider(this.macaroni, this.cupcake5, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
							this.cupcake5.tint = 0xff0000;
							this.cupcake5Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake5.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						// level boss
						this.physics.add.collider(this.macaroni, this.levelBoss, ()=>{
						if (this.levelBoss.flipX === true){
							this.levelBossHealth--;
							this.levelBoss.tint = 0xff0000;
							this.macaronis.getChildren().map(child => child.destroy());
							this.bossHit = this.sound.add('boss_hit');
							this.time.addEvent({
							delay: 500,
							callback: onEvent,
							callbackScope: this
							});	
							function onEvent(){	
							this.bossHit.play();
							this.levelBoss.tint = 0xffffff;
							}
						  }
						  else{
							  this.macaroni.tint = 0xff0000;
							  
						  }
						});	
					}
						
	});//end weapon (macaroni)

}//end create function
//////////////////////////////////////////////////////////////////////////////////////////// update///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 update(time, delta) {

////////////////////////////////////////////////////////////////////end virtual controls
		//weapon keyboard (rolling pin)
				// W key weapon 1 rolling pin
		   if (player.flipX === false && cursors.space.isUp && this.WKey.isDown){
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
					//enemy collisions
					//ice cream cones
					this.physics.add.collider(this.rollingPin, this.icecream1, ()=>{
							this.icecream1Health --;
							this.icecream1.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume:0.35});
					this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
					});	
					function onEvent(){
							this.chiliHit.play();
							this.icecream1.tint = 0xffffff;
					}
					});
					this.physics.add.collider(this.rollingPin, this.icecream2, ()=>{
							this.icecream2Health--;
							this.icecream2.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
							this.timedEvent = this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this
							});	
							function onEvent(){
							this.chiliHit.play();
							this.icecream2.tint = 0xffffff;
							}
					});
					this.physics.add.collider(this.rollingPin, this.icecream3, ()=>{
							this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
							this.icecream3Health--;
							this.icecream3.tint = 0xff0000;
							this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
							});	
							function onEvent(){
							this.icecream3.tint = 0xffffff;	
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
					//pickles
					this.physics.add.collider(this.rollingPin, this.pickle1, ()=>{
						this.pickle1.tint = 0xff0000;
						this.pickle1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle1.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.pickle2, ()=>{
						this.pickle2.tint = 0xff0000;
						this.pickle2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle2.tint = 0xffffff;
					}
					});
					//cupcakes
					this.physics.add.collider(this.rollingPin, this.cupcake1, ()=>{
						this.cupcake1.tint = 0xff0000;
						this.cupcake1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake1.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cupcake2, ()=>{
						this.cupcake2.tint = 0xff0000;
						this.cupcake2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake2.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});		 
					this.physics.add.collider(this.rollingPin, this.cupcake3, ()=>{
						this.cupcake3.tint = 0xff0000;
						this.cupcake3Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake3.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cupcake4, ()=>{
						this.cupcake4.tint = 0xff0000;
						this.cupcake4Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake4.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cupcake5, ()=>{
							this.cupcake5.tint = 0xff0000;
							this.cupcake5Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake5.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						return this.rollingPin.destroy();
					});
		}
//////////// W key weapon 1 rolling pin left
		 else if (player.flipX === true && cursors.space.isUp && this.WKey.isDown){
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
					//enemy collisions
						//ice cream cones
						this.physics.add.collider(this.rollingPin, this.icecream1, ()=>{
							this.icecream1Health--;	
							this.icecream1.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
						});	
						function onEvent(){
							this.chiliHit.play();
							this.icecream1.tint = 0xffffff;
						}
						});
							this.physics.add.collider(this.rollingPin, this.icecream2, ()=>{
							this.icecream2Health--;	
							this.icecream2.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
						});	
						function onEvent(){
							this.chiliHit.play();
							this.icecream2.tint = 0xffffff;
						}
						});
						this.physics.add.collider(this.rollingPin, this.icecream3, ()=>{
							this.icecream3Health--;
							this.icecream3.tint = 0xff0000;
							this.chiliHit = this.sound.add('chili_hit', {volume: 0.35});
						this.timedEvent = this.time.addEvent({
							delay: 50,
							callback: onEvent,
							callbackScope: this
						});	
						function onEvent(){
							this.chiliHit.play();
							this.icecream3.tint = 0xffffff;
						}
						});
						//meatballs
						this.physics.add.collider(this.rollingPin, this.meatball, ()=>{
							this.meatball.tint = 0x000000;
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
							this.meatball2.tint = 0x000000;	
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
							this.meatball3.tint = 0x000000;	
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
							this.meatball4.tint = 0x000000;
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
						//pickles
						this.physics.add.collider(this.rollingPin, this.pickle1, ()=>{
							this.pickle1.tint = 0xff0000;
							this.pickle1Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.pickle1.tint = 0xffffff;
							this.enemyOw1 = this.sound.add('enemy_ow1');
							this.enemyOw1.play();
						}
						});
						this.physics.add.collider(this.rollingPin, this.pickle2, ()=>{
							this.pickle2.tint = 0xff0000;
							this.pickle2Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.pickle2.tint = 0xffffff;
							this.enemyOw1 = this.sound.add('enemy_ow1');
							this.enemyOw1.play();
						}
					});
					//cupcakes
					this.physics.add.collider(this.rollingPin, this.cupcake1, ()=>{
						this.cupcake1.tint = 0xff0000;
						this.cupcake1Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake1.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cupcake2, ()=>{
						this.cupcake2.tint = 0xff0000;
						this.cupcake2Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake2.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});		 
					this.physics.add.collider(this.rollingPin, this.cupcake3, ()=>{
						this.cupcake3.tint = 0xff0000;
						this.cupcake3Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake3.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cupcake4, ()=>{
						this.cupcake4.tint = 0xff0000;
						this.cupcake4Health--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.cupcake4.tint = 0xffffff;
						this.enemyOw2 = this.sound.add('enemy_ow2');
						this.enemyOw2.play();
					}
					});
					this.physics.add.collider(this.rollingPin, this.cupcake5, ()=>{
							this.cupcake5.tint = 0xff0000;
							this.cupcake5Health--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.cupcake5.tint = 0xffffff;
							this.enemyOw2 = this.sound.add('enemy_ow2');
							this.enemyOw2.play();
						}
						});
						// level boss
						this.physics.add.collider(this.rollingPin, this.levelBoss, ()=>{
							if (this.levelBoss.flipX === true){
							this.levelBossHealth--;
							this.levelBoss.tint = 0xff0000;
							this.bossHit = this.sound.add('boss_hit');
							this.time.addEvent({
							delay: 500,
							callback: onEvent,
							callbackScope: this
							});	
							function onEvent(){
							this.bossHit.play();
							this.levelBoss.tint = 0xffffff;
							}	
						  }
						   else{
							  this.rollingPin.tint = 0xff0000;
						  }
						});	
					// weapon collision with player because apparently I have no idea how to really make it disappear =[
					this.physics.add.collider(this.rollingPin, player, ()=>{
						this.rollingPin.destroy();
					});
		 }
//end weapon (rolling pin)

	// pickaxe
			if (player.flipX === true && this.pickaxePickedUp === true && this.iceBlockHitBoxState === true && this.AKey.isDown && this.WKey.isUp ){
				player.anims.play('rolling_pin_loop', true);
				player.setVelocityX(0);
					   this.huh = this.sound.add('huh');
					   this.huh.play();
					   let pickAxe = this.rollingPinWeapon.create(player.x - 45, player.y, 'pickaxe');
					   this.timedEvent = this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this
							});	
						function onEvent(){
									this.huh.stop();
									this.rollingPinWeapon.getChildren().map(child => child.destroy());
							}
						//ice blocks 
					 this.physics.add.collider(pickAxe, this.iceBlock, ()=>{
						 this.iceBlockHitBox.destroy();
						this.iceBlockHitBoxState = false;
						this.iceBlockBreak = this.sound.add('ice_break');
						this.iceBlockBreak.play();
						this.iceBlock.play('ice_block_anims');
						this.time.addEvent({
							delay:250,
							callback: onEvent,
							callbackScope: this
						});
						function onEvent(){
							this.iceBlock.destroy();
							pickAxe.destroy();
						this.iceBlockHitBoxState = false;
						this.pickaxe_UI.destroy();
						}
					});
			   }
				
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
      if (player.body.onFloor() === false && this.WKey.isDown === true || this.A_buttonState === true){
			player.anims.remove('fall');
			player.anims.play('rolling_pin_loop', true);

   }
 //idle
   if (player.body.onFloor() === true && cursors.up.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false
   && this.rightButtonState === false && this.jumpButtonState === false && this.leftButtonState === false
   && this.WKey.isUp && this.A_buttonState === false){
	   player.body.setVelocityX(0);
	   player.anims.play('idle', true);
   }


	
		if (player.body.onFloor() === true && this.WKey.isDown){
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
		if (player.body.onFloor() === false && this.right_buttonState === true && this.WKey.isDown){
			player.anims.play('rolling_pin_loop', true);
		}
		if (healthScore <= 0){
			this.mainTheme.stop()	
			this.scene.stop('PlayState_lv3');
			this.scene.start('LivesState_lv3');
			livesAvailable--;
			livesText.setText(livesAvailable);
		}
		if (livesAvailable <= 2){
		livesText.setText(livesAvailable);
		}		

//// enemy health update on collision	
//icecream

			if (this.icecream1Health <= 0){
				this.icecream1.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.icecream1.destroy();
				}
			}
			if (this.icecream2Health <= 0){
				this.icecream2.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.icecream2.destroy();
				}
			}
			if (this.icecream3Health <= 0){
				this.icecream3.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.icecream3.destroy();
				}
			}   
//pickle
			if (this.pickle1Health <= 0){
				this.pickle1.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.pickle1.destroy();
				}
			}
			if (this.pickle2Health <= 0){
				this.pickle2.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.pickle2.destroy();
				}
			}	
		// cupcakes
			if (this.cupcake1Health <= 0){
				this.cupcake1.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cupcake1.destroy();
				}
			}
			if (this.cupcake2Health <= 0){
				this.cupcake2.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cupcake2.destroy();
				}
			}
			if (this.cupcake3Health <= 0){
				this.cupcake3.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cupcake3.destroy();
				}
			}  
			if (this.cupcake4Health <= 0){
				this.cupcake4.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cupcake4.destroy();
				}
			}
			if (this.cupcake5Health <= 0){
				this.cupcake5.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cupcake5.destroy();
				}
			} 
		// level boss
			if (this.levelBossHealth <= 0){
				this.levelBoss.destroy();
				this.levelBossTween.stop();
			}

			
				
 }//end update function
 
 //////////// end state //////////////////
}