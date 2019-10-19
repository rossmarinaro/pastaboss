////Pastaboss game preload assets lv 2


class PreloadState_lv2 extends Phaser.Scene {
  constructor() {
    super("PreloadState_lv2");
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
	this.load.image('C_button', 'assets/buttons/c_button.png',96,64);
	//start, retry
	this.load.image('continue', 'assets/buttons/continue.png',96,64); 
//// text	  
	this.load.image('pastaboss_text', 'assets/images/pastaboss_text.png');
////map, environment, and background
	this.load.image('pixel', 'assets/backgrounds/pixel.png');;
	this.load.tilemapTiledJSON('map2',  'assets/maps/map2.json');
	this.load.image('map2',  'assets/maps/map.png'); 
	this.load.spritesheet('tiles3', 'assets/maps/tile_sheet_files/tiles3.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles2', 'assets/maps/tile_sheet_files/tiles2.png', {frameWidth: 70, frameHeight: 70});
	this.load.spritesheet('tiles4', 'assets/maps/tile_sheet_files/tiles4.png', {frameWidth: 70, frameHeight: 70});
	//objects
	this.load.image('breakable_brick', 'assets/objects/breakable_brick.png');
	this.load.image('platform', 'assets/objects/platforms/1.png');
	////lives icon
	this.load.image('player_interface', 'assets/images/player_interface.png');
	this.load.image('lives', 'assets/images/lives.png');
	this.load.image('lives2', 'assets/images/lives2.png');
	//// items to pick up
    this.load.image('coin', 'assets/items/coinGold.png'); //macaroni ammo
	this.load.image('ikura', 'assets/items/ikura_maki.png');
	this.load.image('salmon', 'assets/items/salmon_nigiri.png');
	this.load.image('pickaxe', 'assets/items/pickaxe.png');
	this.load.image('weed_block', 'assets/items/weed_block.png');
////// hazards
	//cheese pits
	this.load.image('cheese_pit1', 'assets/hazards/cheese_pits/1.png');
	this.load.image('cheese_pit2', 'assets/hazards/cheese_pits/2.png');
	this.load.image('cheese_pit3', 'assets/hazards/cheese_pits/3.png');	
	//sauce lava
	this.load.image('sauce_lava1', 'assets/hazards/sauce_lava/1.png');	
	this.load.image('sauce_lava2', 'assets/hazards/sauce_lava/2.png');
	this.load.image('sauce_lava3', 'assets/hazards/sauce_lava/3.png');
////// enemies
	//chili peppers 
	this.load.image('chili_fr1', 'assets/enemies/chili/1.png');
	this.load.image('chili_fr2', 'assets/enemies/chili/2.png');
	this.load.image('chili_fr3', 'assets/enemies/chili/3.png');
	//fire
	this.load.image('fire_fr1', 'assets/hazards/fire/1.png');
	this.load.image('fire_fr2', 'assets/hazards/fire/2.png');
	this.load.image('fire_fr3', 'assets/hazards/fire/3.png');	
	this.load.image('fire_fr4', 'assets/hazards/fire/4.png');
	this.load.image('fire_fr5', 'assets/hazards/fire/5.png');
	//meatballs 
	this.load.image('meatball_fr1', 'assets/enemies/meatball/1.png');
	this.load.image('meatball_fr2', 'assets/enemies/meatball/2.png');
	this.load.image('meatball_fr3', 'assets/enemies/meatball/3.png');
	//pickles
	this.load.image('pickle_fr1', 'assets/enemies/pickle/1.png');
	this.load.image('pickle_fr2', 'assets/enemies/pickle/2.png');
	this.load.image('pickle_fr3', 'assets/enemies/pickle/3.png');
	this.load.image('pickle_fr4', 'assets/enemies/pickle/4.png');
	this.load.image('pickle_fr5', 'assets/enemies/pickle/5.png');
	//cheese
	this.load.image('cheese_fr1', 'assets/enemies/cheese/1.png');
	this.load.image('cheese_fr2', 'assets/enemies/cheese/2.png');
	this.load.image('cheese_fr3', 'assets/enemies/cheese/3.png');
	//level 2 boss
	this.load.image('boss_fr1', 'assets/enemies/bosses/hotdog/1.png');
	this.load.image('boss_fr2', 'assets/enemies/bosses/hotdog/2.png');
	this.load.image('boss_fr3', 'assets/enemies/bosses/hotdog/3.png');	
	// boss attack
	this.load.image('boss_attack_fr1', 'assets/enemies/bosses/hotdog/attack/1.png');
	this.load.image('boss_attack_fr2', 'assets/enemies/bosses/hotdog/attack/2.png');
	this.load.image('boss_attack_fr3', 'assets/enemies/bosses/hotdog/attack/3.png');
	this.load.image('boss_attack_fr4', 'assets/enemies/bosses/hotdog/attack/4.png');
////// hazards                                                                                    
	//ice block
	this.load.image('ice_block_fr1', 'assets/hazards/ice_block/1.png');
	this.load.image('ice_block_fr2', 'assets/hazards/ice_block/2.png');
	this.load.image('ice_block_fr3', 'assets/hazards/ice_block/3.png');
	//icicle
	this.load.image('icicle_fr1', 'assets/hazards/icicle/1.png');
	this.load.image('icicle_fr2', 'assets/hazards/icicle/2.png');
	//ice
	this.load.image('ice', 'assets/hazards/ice/1.png');
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
	this.load.image('player_weapon_fr1', 'assets/player/player_weapon/1.png');
	this.load.image('player_weapon_fr2', 'assets/player/player_weapon/2.png');
	this.load.image('player_weapon_fr3', 'assets/player/player_weapon/3.png');
	this.load.image('player_weapon_fr4', 'assets/player/player_weapon/4.png');
	//this.load.atlas('player_weapon', 'assets/player_weapon/tmp.png', 'assets/player_weapon/tmp.json');
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
	this.load.audio('player_hit', 'assets/audio/sounds/ouch.ogg');
	this.load.audio('chili_hit', 'assets/audio/sounds/chili_hit.ogg');
	this.load.audio('meatball_hit', 'assets/audio/sounds/meatball_hit.ogg');
	this.load.audio('boss_hit', 'assets/audio/sounds/boss_hit.ogg');
	this.load.audio('enemy_ow1', 'assets/audio/sounds/enemy_ow1.ogg');
	this.load.audio('enemy_ow2', 'assets/audio/sounds/enemy_ow2.ogg');
	////music
	this.load.audio('lv2ext', 'assets/audio/music/lv2ext.ogg');
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
	  
	  this.scene.start('PlayState_lv2');
	
	}
 
}


/////////////////
