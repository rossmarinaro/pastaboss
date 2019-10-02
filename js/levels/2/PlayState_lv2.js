//// Pastaboss game Playstate script

class PlayState_lv2 extends Phaser.Scene {
  constructor() {
    super("PlayState_lv2");
  }


////create
  
create() {

		//background
		this.bkgnd = 
	//	this.add.image(500, 200, 'pixel').setScale(1020);
		this.bkgnd2 = 
		this.cameras.main.setBackgroundColor('#6B6B6B');
		//music
	/*	this.mainTheme = this.sound.add('level2');
		this.mainTheme.play();
		this.mainTheme.setLoop(this.loop);	*/
		// map
	    let map2 = this.add.tilemap('map2');
		// tiles for the ground layer, background images
		let backdropTiles = map2.addTilesetImage('tiles3');
		let backdrop = map2.createStaticLayer('bkgnd', backdropTiles, 0, 0);
		let backdropTiles2 = map2.addTilesetImage('tiles4');
		let backdropUnderground = map2.createStaticLayer('bkgnd2', backdropTiles2, 0, 0);
		let backdropTiles3 = map2.addTilesetImage('tiles4');
		let backdropUnderground2 = map2.createStaticLayer('bkgnd3', backdropTiles3, 0, 0);
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
	//obstacles
		this.obstacleMoving= this.physics.add.group();
		this.obstacleStatic = this.physics.add.staticGroup();
	// level pick ups
		let pickups = this.physics.add.group();
        this.healthPickup = pickups.create(3160, 1400, 'ikura');
		this.healthPickup2 = pickups.create(1075, 400, 'salmon');
		this.healthPickup3 = pickups.create(1150, 400, 'ikura');
		this.healthPickup4 = pickups.create(1340, 900, 'salmon');
	    this.healthPickup5 = pickups.create(3060, 1000, 'ikura');
		this.healthPickup6 = pickups.create(1380, 900, 'salmon');
	    this.healthPickup7 = pickups.create(1500, 1300, 'ikura');
		this.healthPickup8 = pickups.create(1400, 900, 'salmon');
		this.healthPickup9 = pickups.create(6600, 200, 'ikura');
		this.healthPickup10 = pickups.create(3100, 1400, 'salmon');
	// extra lives pickups
		let extraLife = pickups.create(3100, 700, 'lives2').setScale(0.25);
		let pickaxe = this.physics.add.sprite(8400, 1600, 'pickaxe');
		this.pickaxePickedUp = false;
	//brick obstacle and hidden door to mini game
		let miniGameDoor = this.physics.add.staticGroup();
		miniGameDoor.create(90, 1120, 'exit');
		this.breakableBrick = this.obstacleStatic.create(70, 1120, 'breakable_brick');
	//level complete door
		let exit = this.physics.add.staticGroup();
		exit.create(4235, 490, 'exit');	
    // player sprite    
		player = this.physics.add.sprite(200, 2500, 'player');
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
//sauce lava
		this.anims.create({
			key: 'sauce_lava_anims',
			frames:[
			{ key: 'sauce_lava1' },
				{ key: 'sauce_lava2' },
					{ key: 'sauce_lava3', duration: 50 }
		],
		frameRate: 8,
		repeat: -1
});
 //chili peppers 
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
//fire from chilis
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
//pickle juice
		this.anims.create({
			key: 'pickle_juice_loop',
			frames:[
			{ key: 'pickle_juice_fr1' },
				{ key: 'pickle_juice_fr2' },
					{ key: 'pickle_juice_fr3' , duration: 50 }
		],
		frameRate: 8,
		repeat: -1
	});
//pickle puke
		this.anims.create({
			key: 'pickle_puke_loop',
			frames:[
			{ key: 'pickle_fr3' },
				{ key: 'pickle_fr4' },
					{ key: 'pickle_fr5' , duration: 50 }
		],
		frameRate: 8,
		repeat: -1
	});
//pickle juice splat
		this.anims.create({
			key: 'pickle_juice_splat_loop',
			frames:[
			{ key: 'pickle_juice_splat_fr1' },
				{ key: 'pickle_juice_splat_fr2' , duration: 50 }
		],
		frameRate: 8,
		repeat: -1
	});
// cheese
	this.anims.create({
			key: 'cheese_loop',
			frames:[
			{ key: 'cheese_fr1' },
				{ key: 'cheese_fr2' },
					{ key: 'cheese_fr1' , duration: 50 }
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
		this.enemyFire = this.physics.add.group();
	//	let x = (player.x < 0) ? Phaser.Math.Between(2200, 3200 ) : Phaser.Math.Between(2200, 3200);
		let platform = this.obstacleMoving.create(600, 2050, 'platform');
		// platform tween
		this.platformTween = this.tweens.add({
			targets: platform, x: 1530, ease: 'Linear', duration: 5000, repeat: -1, yoyo: true, onRepeat: function(){
		this.time.addEvent({
				delay: 5000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
///////////////enemy spawns	
	//cheese pits
		let cheese_pit = this.enemyStatic.create(1155, 2735, 'cheese_pit1').play('cheese_pit_anims').setScale(1.66).setSize(350, 230).setOffset(-60, -11);
		let cheese_pit2 = this.enemyStatic.create(1857, 2735, 'cheese_pit1').play('cheese_pit_anims').setScale(1.66).setSize(350, 230).setOffset(-60, -11);
		let cheese_pit3 = this.enemyStatic.create(2557, 2735, 'cheese_pit1').play('cheese_pit_anims').setScale(1.66).setSize(350, 230).setOffset(-60, -11);
		let cheese_pit4 = this.enemyStatic.create(3327, 2735, 'cheese_pit1').play('cheese_pit_anims').setScale(1.66).setSize(350, 230).setOffset(-60, -11);
	//sauce lava
		let sauceLava = this.enemyStatic.create(1085, 2205, 'sauce_lava1').play('sauce_lava_anims');
		//pickles
		this.pickle = this.enemyMoving.create(2000, 450, 'pickle_fr1').play('pickle_loop').setScale(0.75);
		//pickle tweens    	
		this.pickleTween = this.tweens.add({
			targets: this.pickle, x: 2500, ease: 'Linear', duration: 2500, repeat: -1, yoyo: true, onRepeat: function(){
		this.pickle.flipX = true;
		this.time.addEvent({
				delay: 2500,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.pickle.flipX = false;
			}
			this.time.addEvent({
					delay:4000,
					callback: pickleEvent,
					callbackScope: this,
			});
			function pickleEvent(){
			//	this.pickle.anims.play('pickle_puke_loop', true);
				this.pickleJuice = this.enemyFire.create(this.pickle.x, this.pickle.y, 'pickle_juice_fr1').play('pickle_juice_loop', true).setScale(1);
				this.pickleJuice.setVelocityX(-400);
				this.huh = this.sound.add('huh');
				this.huh.play();
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
					this.pickle.anims.play('pickle_loop', true);
				}
			}
			this.physics.add.collider(this.enemyFire, groundLayer, ()=>{
					this.pickleJuice.play('pickle_juice_splat_loop', true);
					this.time.addEvent({
						delay: 40,
						callback: onEvent,
						callbackScope: this
					});
					function onEvent(){
				this.enemyFire.getChildren().map(child => child.destroy());
					}
			});
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
			});
			
		//pickle health
		this.pickleHealth = 3;	
		//chili peppers
		this.chili = this.enemyStatic.create(1750, 2125, 'chili_fr1').play('chili_loop');
		this.chili.flipX = true;
		this.chili2 = this.enemyStatic.create(200, 2125, 'chili_fr1').play('chili_loop');
		this.chili2.flipX = true;
		//chili health 
		this.chiliHealth = 3;
		this.chili2Health = 3;
		//fire from chilis
		this.fireBall1 = this.enemyMoving.create(1750, 2120, 'fire_fr1').play('fireball_anims').setScale(0.4);
		this.fireBall1.flipY = true;
		this.fireBall1.angle = 90;
		this.fireBall1Tween = this.tweens.add({
			targets: this.fireBall1, x: 2000, y: 2110, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
		});
		this.fireBall2 = this.enemyMoving.create(200, 2120, 'fire_fr1').play('fireball_anims').setScale(0.4);
		this.fireBall2.flipY = true;
		this.fireBall2.angle = 90;
		this.fireBall2Tween = this.tweens.add({
			targets: this.fireBall2, x: 500, y: 2110, ease: 'Linear', duration: 1000, repeat: -1, yoyo: false
		});
		//meatballs
		this.meatball = this.enemyMoving.create(4800, 400, 'meatball_fr1').play('meatball_loop');
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
		//
		//cheese
		this.cheese1 = this.enemyMoving.create(2550, 2000, 'cheese_fr1').play('cheese_loop', true);
		this.cheese2 = this.enemyMoving.create(4800, 1700, 'cheese_fr1').play('cheese_loop', true);
		this.cheese3 = this.enemyMoving.create(500, 1450, 'cheese_fr1').play('cheese_loop', true);
		this.cheese4 = this.enemyMoving.create(2400, 1000, 'cheese_fr1').play('cheese_loop', true); 
		//cheese tweens
		this.cheese1Tween = this.tweens.add({
			targets: this.cheese1, x: 2900, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cheese1.flipX = true;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cheese1.flipX = false;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		}); 
		this.cheese2Tween = this.tweens.add({
			targets: this.cheese2, x: 5200, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cheese2.flipX = true;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cheese2.flipX = false;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
		this.cheese3Tween = this.tweens.add({
			targets: this.cheese3, x: 800, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cheese3.flipX = true;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cheese3.flipX = false;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
		this.cheese4Tween = this.tweens.add({
			targets: this.cheese4, x: 2800, ease: 'Linear', duration: 3000, repeat: -1, yoyo: true, onRepeat: function(){
		this.cheese4.flipX = true;
		this.time.addEvent({
				delay: 3000,
				callback: onEvent,
				callbackScope: this
			});
			function onEvent(){
				this.cheese4.flipX = false;
			}
			}, onRepeatScope: this, onRepeatParams: [], repeatDelay: 0
		});
		//cheese
		this.cheese1Health = 3;
		this.cheese2Health = 3;
		this.cheese3Health = 3;
		this.cheese4Health = 3;
		
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
		//platform and player
		this.physics.add.collider(player, this.hazardStatic);
		this.physics.add.collider(player, groundLayer);
		this.physics.add.collider(pickaxe, groundLayer);
		this.physics.add.collider(this.obstacleMoving, sauceLava);
		this.physics.add.collider(player, this.obstacleStatic);
		this.physics.add.collider(this.obstacleMoving, player, ()=>{
			player.anims.play('idle', true);
			player.body.setVelocityX(-200);
		});
		this.physics.add.collider(this.obstacleMoving, groundLayer);
		this.physics.add.collider(platform, player);
		this.physics.add.collider(this.enemyStatic, groundLayer);
		this.physics.add.collider(this.enemyMoving, groundLayer);
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
		//enemy fire collision
		this.physics.add.collider(this.enemyFire, player, ()=>{
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
/////////////////////////////////////////////////////////////   LEVEL COMPLETE!  ///////////////////////////
		this.physics.add.overlap(player, exit, ()=>{
			this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
				if(progress > .9){
				//	this.mainTheme.stop();
					this.scene.stop('PlayState_lv2');
				    this.scene.start('PreloadState_lv3');	
				}
			});	
    	});
		// exit to mini game
		this.physics.add.overlap(player, miniGameDoor, ()=>{
			this.cameras.main.fade(300, 0, 0, 0, false, function(camera, progress){
				if(progress > .9){
				//	this.mainTheme.stop();
					this.scene.stop('PlayState_lv2');
				    this.scene.start('PreloadState_lv3');	
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
		this.leftButton.tint = 0xffffff;	
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
		this.jumpButton.tint = 0xffffff;	
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
		this.rightButton.tint = 0xffffff;	
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
			this.A_button.tint = 0xffffff;
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
					this.time.addEvent({
								delay:350,
								callback: onEvent,
								callbackScope: this
							});
						function onEvent(){
						this.rollingPinWeapon.getChildren().map(child => child.destroy());	
						}   
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
					//pickles
					this.physics.add.collider(this.rollingPin, this.pickle, ()=>{
						this.pickle.tint = 0xff0000;
						this.pickleHealth--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle.tint = 0xffffff;
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
				this.physics.add.collider(this.rollingPin, player,  ()=>{
					return this.rollingPin.destroy();
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
						//pickles
						this.physics.add.collider(this.rollingPin, this.pickle, ()=>{
						this.pickle.tint = 0xff0000;
						this.pickleHealth--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle.tint = 0xffffff;
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
			this.rollingPinWeapon.getChildren().map(child => child.destroy());
		});	
	//// B button (macaroni weapon)
		this.B_button = 
		this.add.image(700, 450, 'B_button').setOrigin(0).setInteractive();
		this.B_button.setScrollFactor(0);
				this.B_button.on('pointerover', ()=>{
		});
		this.B_button.on('pointerout', ()=>{
		this.B_button.tint = 0xffffff;	
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
					//pickles
					this.physics.add.collider(this.macaroni, this.pickle, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle.tint = 0xff0000;
						this.pickleHealth--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
						//cheese
						this.physics.add.collider(this.macaroni, this.cheese1, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese2, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese3, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese4, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
				//chilis
				this.physics.add.collider(this.macaroni, this.chili, ()=>{
				this.chili.tint = 0xff0000;
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
				this.physics.add.collider(this.macaroni, this.chili2, ()=>{
				this.chili2.tint = 0xff0000;
				this.chili2Health--;
				this.macaronis.getChildren().map(child => child.destroy());
				this.chili2Hit = this.sound.add('chili_hit');
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
				//pickles
					this.physics.add.collider(this.macaroni, this.pickle, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle.tint = 0xff0000;
						this.pickleHealth--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
						//cheese
						this.physics.add.collider(this.macaroni, this.cheese1, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese2, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese3, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese4, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
					this.physics.add.collider(this.macaroni, this.pickle, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
						this.pickle.tint = 0xff0000;
						this.pickleHealth--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle.tint = 0xffffff;
						this.enemyOw1 = this.sound.add('enemy_ow1');
						this.enemyOw1.play();
					}
					});
					//cheese
					this.physics.add.collider(this.macaroni, this.cheese1, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
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
					this.physics.add.collider(this.macaroni, this.cheese2, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
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
					this.physics.add.collider(this.macaroni, this.cheese3, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
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
					this.physics.add.collider(this.macaroni, this.cheese4, ()=>{
						this.macaronis.getChildren().map(child => child.destroy());
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
						//chilis
							this.physics.add.collider(this.macaroni, this.chili, ()=>{
							this.chili.tint = 0xff0000;
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
							this.physics.add.collider(this.macaroni, this.chili2, ()=>{
							this.chili2.tint = 0xff0000;
							this.chili2Health--;
							this.macaronis.getChildren().map(child => child.destroy());
							this.chili2Hit = this.sound.add('chili_hit');
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
							this.physics.add.collider(this.macaroni, this.pickle, ()=>{
								this.macaronis.getChildren().map(child => child.destroy());
								this.pickle.tint = 0xff0000;
								this.pickleHealth--;
								this.time.addEvent({
										delay: 50,
										callback: onEvent,
										callbackScope: this							
								});
								function onEvent(){
								this.pickle.tint = 0xffffff;
								this.enemyOw1 = this.sound.add('enemy_ow1');
								this.enemyOw1.play();
							}
							});
						//cheese
						this.physics.add.collider(this.macaroni, this.cheese1, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese2, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese3, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
						this.physics.add.collider(this.macaroni, this.cheese4, ()=>{
							this.macaronis.getChildren().map(child => child.destroy());
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
					}
						
	});//end weapon (macaroni)

}//end create function
//////////////////////////////////////////////////////////////////////////////////////////// update///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 update(time, delta) {

////////////////////////////////////////////////////virtual controls	
 

		
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
							this.meatball4.tint = 0xff0000;	
					return 	this.meatballHit = this.sound.add('meatball_hit');
					});
					//pickles
					this.physics.add.collider(this.rollingPin, this.pickle, ()=>{
						this.pickle.tint = 0xff0000;
						this.pickleHealth--;
						this.time.addEvent({
								delay: 50,
								callback: onEvent,
								callbackScope: this							
						});
						function onEvent(){
						this.pickle.tint = 0xffffff;
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
						this.physics.add.collider(this.rollingPin, this.pickle, ()=>{
							this.pickle.tint = 0xff0000;
							this.pickleHealth--;
							this.time.addEvent({
									delay: 50,
									callback: onEvent,
									callbackScope: this							
							});
							function onEvent(){
							this.pickle.tint = 0xffffff;
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
					//breakable brick
						this.physics.add.collider(this.rollingPin, this.breakableBrick, ()=>{
							this.breakableBrick.destroy();
						});
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
	if (player.body.onFloor() === false && this.leftButtonState === true ){
			player.anims.play('fall', true);
	}
	else if (player.body.onFloor() === false && this.rightButtonState === true){
			player.anims.play('fall', true);
	}//idle
   if (player.body.onFloor() === true && cursors.up.isDown === false && cursors.right.isDown === false && cursors.left.isDown === false
   && this.rightButtonState === false && this.jumpButtonState === false && this.leftButtonState === false
   && this.WKey.isUp && this.A_buttonState === false){
	   player.body.setVelocityX(0);
	   player.anims.play('idle', true);
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
		if (healthScore <= 0){
		//	this.mainTheme.stop()	
			this.scene.stop('PlayState_lv2');
			this.scene.start('LivesState_lv2');
			livesAvailable--;
			livesText.setText(livesAvailable);
		}
		if (livesAvailable <= 2){
		livesText.setText(livesAvailable);
		}		

//// enemy health update on collision
//chilis	 
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
//pickle			
			if (this.pickleHealth <= 0){
				this.pickle.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.pickleTween.stop();
				  this.pickle.destroy();
				  this.enemyFire.getChildren().map(child => child.destroy());
				}
			}
		// cheese
			if (this.cheese1Health <= 0){
				this.cheese1.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cheese1.destroy();
				}
			}
			if (this.cheese2Health <= 0){
				this.cheese2.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cheese2.destroy();
				}
			}
			if (this.cheese3Health <= 0){
				this.cheese3.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cheese3.destroy();
				}
			}  
			if (this.cheese4Health <= 0){
				this.cheese4.tint = 0x000000;
				this.time.addEvent({
					delay: 150,
					callback: onEvent,
					callbackScope: this
				});
				function onEvent(){
				  this.cheese4.destroy();
				}
			} 	
	 	
 }//end update function

 //////////// end state //////////////////
}