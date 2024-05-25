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
        this.load.tilemapTiledJSON("hops", "hops.tmj");
    }





    create() {
 
    }
    // Never get here since a new scene is started in create()
    update() {
    }
}