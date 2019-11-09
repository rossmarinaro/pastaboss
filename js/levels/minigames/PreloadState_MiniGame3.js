////Preload mini game 1


class PreloadState_MiniGame3 extends Phaser.Scene {
  constructor() {
    super("PreloadState_MiniGame3");
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
	this.load.image('C_button', 'assets/buttons/c_button.png',96,64);
	//start, retry
	this.load.image('continue', 'assets/buttons/continue.png',96,64); 
//// text	  
	this.load.image('pastaboss_text', 'assets/images/pastaboss_text.png');
////map, environment, and background
	this.load.image('pixel2', 'assets/backgrounds/pixel2.png');;
	this.load.tilemapTiledJSON('miniGame3', 'assets/maps/miniGame3.json');
	this.load.image('miniGame3',  'assets/maps/miniGame3.png'); 
	this.load.spritesheet('tiles', 'assets/maps/tile_sheet_files/tiles.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles2', 'assets/maps/tile_sheet_files/tiles2.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles4', 'assets/maps/tile_sheet_files/tiles4.png', {frameWidth: 70, frameHeight: 70});   
	//particles
	this.load.image('snow',  'assets/particles/snow.png'); 
	this.load.image('rubble_fr1', 'assets/particles/rubble/1.png');
	this.load.image('rubble_fr2', 'assets/particles/rubble/2.png');
	this.load.image('rubble_fr3', 'assets/particles/rubble/3.png');
	////lives icon
	this.load.image('this.player_interface', 'assets/images/this.player_interface.png');
	this.load.image('lives', 'assets/images/lives.png');
	this.load.image('lives2', 'assets/images/lives2.png');
	//// items to pick up
    this.load.image('coin', 'assets/items/coinGold.png'); //macaroni ammo
	this.load.image('ikura', 'assets/items/ikura_maki.png');
	this.load.image('salmon', 'assets/items/salmon_nigiri.png');
	this.load.image('pickaxe', 'assets/items/pickaxe.png');
	this.load.image('weed_block', 'assets/items/weed_block.png');
////// enemies
	//meatballs 
	this.load.image('meatball_fr1', 'assets/enemies/meatball/1.png');
	this.load.image('meatball_fr2', 'assets/enemies/meatball/2.png');
	this.load.image('meatball_fr3', 'assets/enemies/meatball/3.png');
	//ice cream cone
	this.load.image('icecream_fr1', 'assets/enemies/icecream/1.png');
	this.load.image('icecream_fr2', 'assets/enemies/icecream/2.png');
	this.load.image('icecream_fr3', 'assets/enemies/icecream/3.png');
	this.load.image('icecream_fr4', 'assets/enemies/icecream/4.png');
	//pickles
	this.load.image('pickle_fr1', 'assets/enemies/pickle/1.png');
	this.load.image('pickle_fr2', 'assets/enemies/pickle/2.png');
	this.load.image('pickle_fr3', 'assets/enemies/pickle/3.png');
	this.load.image('pickle_fr4', 'assets/enemies/pickle/4.png');
	this.load.image('pickle_fr5', 'assets/enemies/pickle/5.png');
	//cupcakes
	this.load.image('cupcake_fr1', 'assets/enemies/cupcakes/1.png');
	this.load.image('cupcake_fr2', 'assets/enemies/cupcakes/2.png');
	this.load.image('cupcake_fr3', 'assets/enemies/cupcakes/3.png');
	//level 2 boss
	this.load.image('boss_fr1', 'assets/enemies/bosses/cake_boss/1.png');
	this.load.image('boss_fr2', 'assets/enemies/bosses/cake_boss/2.png');
	this.load.image('boss_fr3', 'assets/enemies/bosses/cake_boss/3.png');	
	this.load.image('boss_weapon', 'assets/enemies/bosses/cake_boss/piece_of_cake.png');	
	this.load.image('chef_fr1', 'assets/enemies/bosses/chef/1.png');
	this.load.image('chef_fr2', 'assets/enemies/bosses/chef/2.png');
	this.load.image('chef_fr3', 'assets/enemies/bosses/chef/3.png');
	this.load.image('table', 'assets/objects/table/1.png');
	this.load.image('pot', 'assets/objects/pot/1.png');
////// weapons
	//rolling pin
	this.load.image('rolling_pin_fr1', 'assets/weapons/rolling_pin/1.png');
	this.load.image('rolling_pin_fr2', 'assets/weapons/rolling_pin/2.png');
	this.load.image('rolling_pin_fr3', 'assets/weapons/rolling_pin/3.png');
	this.load.image('rolling_pin_fr4', 'assets/weapons/rolling_pin/4.png');
	//macaroni
	this.load.image('macaroni', 'assets/weapons/macaroni/macaroni.png');
	this.load.image('macaroni2', 'assets/weapons/macaroni/macaroni2.png');
	this.load.image('macaroni3', 'assets/weapons/macaroni/macaroni3.png');
	this.load.image('macaroni4', 'assets/weapons/macaroni/macaroni4.png');
///// player 
	this.load.image('ulooked', 'assets/images/ulooked.png');
    this.load.atlas('player', 'assets/player/player.png', 'assets/player/player.json');
	//weapon stance
	this.load.image('this.player_weapon_fr1', 'assets/player/this.player_weapon/1.png');
	this.load.image('this.player_weapon_fr2', 'assets/player/this.player_weapon/2.png');
	this.load.image('this.player_weapon_fr3', 'assets/player/this.player_weapon/3.png');
	this.load.image('this.player_weapon_fr4', 'assets/player/this.player_weapon/4.png');
	//this.load.atlas('this.player_weapon', 'assets/this.player_weapon/tmp.png', 'assets/this.player_weapon/tmp.json');
	//idle
	this.load.image('idle1', 'assets/player/idle/1.png');
	this.load.image('idle2', 'assets/player/idle/2.png');
	this.load.image('idle3', 'assets/player/idle/3.png');
	this.load.image('idle4', 'assets/player/idle/4.png');
/////sound effects
	//misc
	this.load.audio('ring', 'assets/audio/sounds/ring.mp3');
	this.load.audio('ice_break', 'assets/audio//sounds/ice_break.ogg');
	//items
	this.load.audio('macaroni_ring', 'assets/audio/sounds/macaroni_ring.ogg');
	this.load.audio('health_ring', 'assets/audio/sounds/ring.mp3');
	this.load.audio('extra_life_sound', 'assets/audio/sounds/record_scratch.ogg');
	//collision sounds
	this.load.audio('huh', 'assets/audio/sounds/huh.mp3');
	this.load.audio('this.player_hit', 'assets/audio/sounds/ouch.ogg');
	this.load.audio('chili_hit', 'assets/audio/sounds/chili_hit.ogg');
	this.load.audio('meatball_hit', 'assets/audio/sounds/meatball_hit.ogg');
	this.load.audio('boss_hit', 'assets/audio/sounds/boss_hit.ogg');
	this.load.audio('enemy_ow1', 'assets/audio/sounds/enemy_ow1.ogg');
	this.load.audio('enemy_ow2', 'assets/audio/sounds/enemy_ow2.ogg');
	////music
	this.load.audio('level2', 'assets/audio/music/level2.ogg');
	this.load.audio('menu', 'assets/audio/music/pastafarimon.ogg');
	this.load.audio('game_over', 'assets/audio/music/game_over.ogg');
	this.load.audio('menu_music', 'assets/audio/music/pastafarimon.ogg');
	this.load.audio('dead', 'assets/audio/music/dead.ogg');
	//level 1 end background
	this.load.image('ramen', 'assets/images/rubberglovedub.png');
	//hitbox
	this.load.image('hitbox', 'assets/hitbox/1.png');
	//exit door
	this.load.image('exit', 'assets/doors/exit.png');
		
  }

  //////create/////// 
  create() {
	  this.scene.start('PlayState_MiniGame3');
	
	}
// end state 
}

/////////////////