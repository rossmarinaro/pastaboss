////Pastaboss game preload assets


class PreloadState extends Phaser.Scene {
  constructor() {
    super("PreloadState");
  }
   
 //////preload//////

  preload(){
	
	this.add.text(260, 300, "Loading game...", {font: "35px Bangers", fill: '#ffff00'});
	//// gamepad buttons
    this.load.image('left_button', 'assets/buttons/left_button.png',64,64);
	this.load.image('jump_button', 'assets/buttons/jump_button.png',96,64);
	this.load.image('down_button', 'assets/buttons/down_button.png',96,64);
    this.load.image('right_button', 'assets/buttons/right_button.png',64,64);
	this.load.image('A_button', 'assets/buttons/a_button.png',96,64);
	this.load.image('B_button', 'assets/buttons/b_button.png',96,64);
	//start, retry
	this.load.image('continue', 'assets/buttons/continue.png',96,64); 
    //// text	  
	this.load.image('pastaboss_text', 'assets/pastaboss_text.png');
    ////map, environment, and background
	this.load.image('pixel', 'assets/backgrounds/pixel.png');;
	this.load.tilemapTiledJSON('map',  'assets/map.json');
	this.load.image('map',  'assets/map.png'); 
    this.load.spritesheet('tiles', 'assets/tile_sheet_files/tiles.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles2', 'assets/tile_sheet_files/tiles2.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles3', 'assets/tile_sheet_files/tiles3.png', {frameWidth: 70, frameHeight: 70});
	////lives icon
	this.load.image('lives', 'assets/lives.png');
	this.load.image('lives2', 'assets/lives2.png');
	//// items to pick up
    this.load.image('coin', 'assets/items/coinGold.png'); //macaroni ammo
	this.load.image('ikura', 'assets/items/ikura_nigiri.png');
	this.load.image('salmon', 'assets/items/salmon_nigiri.png');
	this.load.image('weed_block', 'assets/items/weed_block.png');
	//// enemies
	//cheese pits
	this.load.image('cheese_pit1', 'assets/enemies/cheese_pits/1.png');
	this.load.image('cheese_pit2', 'assets/enemies/cheese_pits/2.png');
	this.load.image('cheese_pit3', 'assets/enemies/cheese_pits/3.png');
	//meatballs facing both directions
	//facing left
	this.load.image('left1', 'assets/enemies/meatball_left/1.png');
	this.load.image('left2', 'assets/enemies/meatball_left/2.png');
	this.load.image('left3', 'assets/enemies/meatball_left/3.png');
	//facing right
	this.load.image('right1', 'assets/enemies/meatball_right/1.png');
	this.load.image('right2', 'assets/enemies/meatball_right/2.png');
	this.load.image('right3', 'assets/enemies/meatball_right/2.png');
	//chili peppers facing left
	this.load.image('left1_', 'assets/enemies/chili_left/1.png');
	this.load.image('left2_', 'assets/enemies/chili_left/2.png');
	this.load.image('left3_', 'assets/enemies/chili_left/3.png');
	//level 1 boss
	this.load.image('boss1', 'assets/bosses/pizza_boss/1.png');
	this.load.image('boss2', 'assets/bosses/pizza_boss/2.png');
	this.load.image('boss3', 'assets/bosses/pizza_boss/3.png');	
	this.load.image('boss4', 'assets/bosses/pizza_boss/4.png');
	this.load.image('boss5', 'assets/bosses/pizza_boss/5.png');
	this.load.image('boss6', 'assets/bosses/pizza_boss/6.png');
	this.load.image('boss7', 'assets/bosses/pizza_boss/7.png');
	this.load.image('boss8', 'assets/bosses/pizza_boss/8.png');
	this.load.image('pepperoni', 'assets/bosses/pizza_boss/pepperoni.png');
	
	//// weapons
	this.load.image('player_weapon', 'assets/weapons/rolling_pin/player_weapon.png');
	this.load.image('rolling_pin', 'assets/weapons/rolling_pin/rollingpin.png');
	this.load.image('rolling_pin_left', 'assets/weapons/rolling_pin/rollingpin_left.png');
	this.load.image('macaroni', 'assets/weapons/macaroni/macaroni.png');
	this.load.image('macaroni2', 'assets/weapons/macaroni/macaroni2.png');
	this.load.image('macaroni3', 'assets/weapons/macaroni/macaroni3.png');
	this.load.image('macaroni4', 'assets/weapons/macaroni/macaroni4.png');
    //// player 
	this.load.image('ulooked', 'assets/ulooked.png');
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');
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
	//level 1 end background
	this.load.image('ramen', 'assets/images/rubberglovedub.png');
		
  }

  //////create///////
  
  create() {
	  
	  this.scene.start('MenuState');
	
	}
 
}
//global variables
var map;
var player;
var cursors;
var groundLayer, macaroniPickupLayer /*codliverTileLayer*/; //tiles
var text;
var healthScore = 3;
var macaroniAvailable = 25;
var livesAvailable = 3;
var livesLeft = 3;
var livesText;
var ring;
var continue_button;

/////////////////
