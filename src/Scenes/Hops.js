class Hops extends Phaser.Scene {
    constructor() {
        super("hopsScene");
    }


    init() {

    }


    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 20 tiles wide and 160 tiles tall.
        this.map = this.add.tilemap("map", 18, 18, 20, 160);



        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        const backgroundtileset = this.map.addTilesetImage("generalBackground", "tilemap_backgrounds");
        const rocktileset = this.map.addTilesetImage("rockBackground", "tilemap_rock");
        const stonetileset = this.map.addTilesetImage("stoneBackground", "tilemap_stone");
        const generaltileset = this.map.addTilesetImage("Ground-n-Platforms", "tilemap_tiles");
    
        //Create layer
        this.backgroundLayer = this.map.createLayer("Background", [backgroundtileset, rocktileset, stonetileset], 0, 0);
        this.decorLayer = this.map.createLayer("Decor", generaltileset, 0, 0);
        this.groundLayer = this.map.createLayer("Platforms", generaltileset, 0, 0);
        this.levelLayer = this.map.createLayer("Levels", generaltileset, 0, 0);



    }

        

    
    update() {
    
    }

}