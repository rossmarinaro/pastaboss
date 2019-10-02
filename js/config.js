/////pastaboss game configuration

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
			useTicker: true,
            debug: true
        }
    },
	/*input: {
		activePointers: 1
	},  */
    scene: //array of stages/ minigames within the game
   [/*BootState, PreloadState, MenuState, PlayState,*/ PreloadState_lv2, PlayState_lv2,
   PreloadState_lv3, PlayState_lv3, PreloadState_MiniGame1, PlayState_MiniGame1,
   RetryState, LivesState, LivesState_lv2, LivesState_lv3
   ]
   
};

const game = new Phaser.Game(config);


//////////////////////

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

////////////////////