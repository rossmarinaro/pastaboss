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
            debug: false
        }
    },
	input: {
		activePointers: 1
	},
    scene: 
   [PreloadState, MenuState, PlayState, PreloadState_lv2, RetryState, LivesState]
   
};

var game = new Phaser.Game(config);


//////////////////////