////Pastaboss game preload assets


class PreloadState extends Phaser.Scene {
  constructor() {
    super("PreloadState");
  }
   
 //////preload//////

  preload(){
	//loading text
	this.loadingText =  this.add.text(300, 300, "Loading...", {font: "35px Digitizer", fill: '#ffff00'}).setStroke("#ff0000", 4);
	 	//tween alpha loading pulse
		this.pulseTween = this.tweens.add({
				targets: this.loadingText,
				alpha: {value: 0.2, duration: 1000, ease: 'Power1'},
				yoyo: true,
				repeat: -1
			});
	//// gamepad buttons
    this.load.image('left_button', 'assets/buttons/left_button.png',64,64);
	this.load.image('jump_button', 'assets/buttons/jump_button.png',96,64);
	this.load.image('down_button', 'assets/buttons/down_button.png',96,64);
    this.load.image('right_button', 'assets/buttons/right_button.png',64,64);
	this.load.image('A_button', 'assets/buttons/a_button.png',96,64);
	this.load.image('B_button', 'assets/buttons/b_button.png',96,64);
	//start, retry
	this.load.image('continue', 'assets/buttons/continue.png',96,64); 
//// text/image
	this.load.image('logo', 'assets/images/logo.png');
	this.load.image('pastaboss_text', 'assets/images/pastaboss_text.png');
////map, environment, and background
	this.load.image('pixel', 'assets/backgrounds/pixel.png');
	this.load.tilemapTiledJSON('map',  'assets/maps/map.json');
	this.load.image('map',  'assets/maps/map.png'); 
    this.load.spritesheet('tiles', 'assets/maps/tile_sheet_files/tiles.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles2', 'assets/maps/tile_sheet_files/tiles2.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles3', 'assets/maps/tile_sheet_files/tiles3.png', {frameWidth: 70, frameHeight: 70});
	////lives icon
	this.load.image('player_interface', 'assets/images/player_interface.png');
	this.load.image('lives', 'assets/images/lives.png');
	this.load.image('lives2', 'assets/images/lives2.png');
	//// items to pick up
    this.load.image('coin', 'assets/items/coinGold.png'); //macaroni ammo
	this.load.image('ikura', 'assets/items/ikura_maki.png');
	this.load.image('salmon', 'assets/items/salmon_nigiri.png');
	this.load.image('weed_block', 'assets/items/weed_block.png');
////// enemies
	//meatballs 
	//facing left
	this.load.image('meatball_fr1', 'assets/enemies/meatball/1.png');
	this.load.image('meatball_fr2', 'assets/enemies/meatball/2.png');
	this.load.image('meatball_fr3', 'assets/enemies/meatball/3.png');
	//chili peppers facing left
	this.load.image('chili_fr1', 'assets/enemies/chili/1.png');
	this.load.image('chili_fr2', 'assets/enemies/chili/2.png');
	this.load.image('chili_fr3', 'assets/enemies/chili/3.png');
	//level 1 boss
	this.load.image('boss1', 'assets/enemies/bosses/pizza_boss/1.png');
	this.load.image('boss2', 'assets/enemies/bosses/pizza_boss/2.png');
	this.load.image('boss3', 'assets/enemies/bosses/pizza_boss/3.png');	
	this.load.image('boss4', 'assets/enemies/bosses/pizza_boss/4.png');
	this.load.image('boss5', 'assets/enemies/bosses/pizza_boss/5.png');
	this.load.image('boss6', 'assets/enemies/bosses/pizza_boss/6.png');
	this.load.image('boss7', 'assets/enemies/bosses/pizza_boss/7.png');
	this.load.image('boss8', 'assets/enemies/bosses/pizza_boss/8.png');
	this.load.image('pepperoni', 'assets/enemies/bosses/pizza_boss/pepperoni.png');
////// hazards
	//cheese pits
	this.load.image('cheese_pit1', 'assets/hazards/cheese_pits/1.png');
	this.load.image('cheese_pit2', 'assets/hazards/cheese_pits/2.png');
	this.load.image('cheese_pit3', 'assets/hazards/cheese_pits/3.png');
	//fire
	this.load.image('fire_fr1', 'assets/hazards/fire/1.png');
	this.load.image('fire_fr2', 'assets/hazards/fire/2.png');
	this.load.image('fire_fr3', 'assets/hazards/fire/3.png');	
	this.load.image('fire_fr4', 'assets/hazards/fire/4.png');
	this.load.image('fire_fr5', 'assets/hazards/fire/5.png');
////// weapons
	//rolling pin
	this.load.image('rolling_pin_fr1', 'assets/weapons/rolling_pin/1.png');
	this.load.image('rolling_pin_fr2', 'assets/weapons/rolling_pin/2.png');
	this.load.image('rolling_pin_fr3', 'assets/weapons/rolling_pin/3.png');
	this.load.image('rolling_pin_fr4', 'assets/weapons/rolling_pin/4.png');
	this.load.image('macaroni', 'assets/weapons/macaroni/macaroni.png');
	this.load.image('macaroni2', 'assets/weapons/macaroni/macaroni2.png');
	this.load.image('macaroni3', 'assets/weapons/macaroni/macaroni3.png');
	this.load.image('macaroni4', 'assets/weapons/macaroni/macaroni4.png');
///// player 
	this.load.image('ulooked', 'assets/images/ulooked.png');
    this.load.atlas('player', 'assets/player/player.png', 'assets/player/player.json');
	//player weapon
	this.load.image('player_weapon_fr1', 'assets/player/player_weapon/1.png');
	this.load.image('player_weapon_fr2', 'assets/player/player_weapon/2.png');
	this.load.image('player_weapon_fr3', 'assets/player/player_weapon/3.png');
	this.load.image('player_weapon_fr4', 'assets/player/player_weapon/4.png');
	//idle
	this.load.image('idle1', 'assets/player/idle/1.png');
	this.load.image('idle2', 'assets/player/idle/2.png');
	this.load.image('idle3', 'assets/player/idle/3.png');
	this.load.image('idle4', 'assets/player/idle/4.png');
/////sound effects
	//misc
	this.load.audio('ring', 'assets/audio/sounds/ring.mp3');
	//items
	this.load.audio('macaroni_ring', 'assets/audio/sounds/macaroni_ring.ogg');
	this.load.audio('health_ring', 'assets/audio/sounds/ring.mp3');
	//collision sounds
	this.load.audio('huh', 'assets/audio/sounds/huh.mp3');
	this.load.audio('player_hit', 'assets/audio/sounds/ouch.ogg');
	this.load.audio('chili_hit', 'assets/audio/sounds/chili_hit.ogg');
	this.load.audio('meatball_hit', 'assets/audio/sounds/meatball_hit.ogg');
	this.load.audio('boss_hit', 'assets/audio/sounds/boss_hit.ogg');
	////music
	this.load.audio('level1', 'assets/audio/music/deep_in_the_sauce.ogg');
	this.load.audio('menu', 'assets/audio/music/pastafarimon.ogg');
	this.load.audio('game_over', 'assets/audio/music/game_over.ogg');
	this.load.audio('menu_music', 'assets/audio/music/pastafarimon.ogg');
	this.load.audio('dead', 'assets/audio/music/dead.ogg');
	//level 1 end background
	this.load.image('ramen', 'assets/images/rubberglovedub.png');
	this.load.atlas('bkgnd', 'assets/images/bkgnd.png', 'assets/images/bkgnd.json');
	this.load.atlas('bkgnd2', 'assets/images/bkgnd2.png', 'assets/images/bkgnd2.json');
	this.load.image('exit', 'assets/doors/exit.png');
  }



  //////create///////
  
  create() {
		this.scene.start('Preload_IntroState');
	}
 
}

/////////////////
