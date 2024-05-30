class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        
        // Load characters spritesheet
        this.load.atlas("hops_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");


        // Load tilemap info
        this.load.image("tilemap_backgrounds", "tilemap_backgrounds_packed.png");
        this.load.image("tilemap_stone", "tilemap_stone_packed.png");
        this.load.image("tilemap_rock", "tilemap_rock_packed.png");
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("map", "hops_tiledmap.tmj");
        this.load.audio('sfxJump','jumpingHOPS.ogg')
        this.load.audio('sfxCoin','coinsHOPS.ogg')

        //Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
    }





    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('hops_characters', {
                prefix: "tile_",
                start: 0,
                end: 1,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "hops_characters",
            frames: [
                { frame: "tile_0000.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "hops_characters",
            frames: [
                { frame: "tile_0001.png" }
            ],
        });




        //this helps connect with the other scene......
        this.scene.start("hopsScene");
    }


    
    update() {
    }
}