class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("tilemap_backgrounds", "tilemap_backgrounds_packed.png");
        this.load.image("tilemap_stone", "tilemap_stone_packed.png");
        this.load.image("tilemap_rock", "tilemap_rock_packed.png");
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("map", "hops_tiledmap.tmj");

        //Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
    }





    create() {
 
    }


    
    update() {
    }
}