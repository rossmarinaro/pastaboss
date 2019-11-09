/////pastaboss game configuration

var config = {
    type: Phaser.AUTO,
    width: 800,
    height:600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
			useTicker: true,
            debug: false
        }
    },
    //array of stages/ minigames within the game
    scene: 
        [BootState, PreloadState, Preload_IntroState, IntroState, MenuState, PlayState, PreloadState_lv2, PlayState_lv2,
        PreloadState_lv3, PlayState_lv3, PreloadState_MiniGame1, 
        PlayState_MiniGame1, PreloadState_MiniGame2, PlayState_MiniGame2,
        PreloadState_MiniGame3, PlayState_MiniGame3,
        RetryState, LivesState, LivesState_lv2, LivesState_lv3,
        /////////////////////////////////////////////////////// 
            //extend
                { extend: {
                        player: null,
                        playerBullets: null,
                        time: 0,
                    }}
         ]
   
};
//////////////////////
const game = new Phaser.Game(config);
//global variables
var player;
var cursors;
var macaroniPickupLayer;
var text;
var healthScore = 3;
var macaroniAvailable = 25;
var livesAvailable = 3;
var livesLeft = 3;
var livesText;
var ring;
var continue_button;
var iter = 0;
var tilesprites = [];
var tilesprites2 = [];
var sprites = [];
var onBegin;
var introMusic; 
var musicIsPlaying;

///////////////////Macaroni class
