class Hops extends Phaser.Scene {
    constructor() {
        super("hops");
    }

    init() {
        // variables and settings
        // this.ACCELERATION = 400;
        // this.DRAG = 500;    // DRAG < ACCELERATION = icy slide
        // this.physics.world.gravity.y = 1500;
        // this.JUMP_VELOCITY = -600;
        // this.PARTICLE_VELOCITY = 50;
        // this.SCALE = 2.0;
    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("hops", 18, 18, 20, 180);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        const backgroundtileset = this.map.addTilesetImage("generalBackground", "tilemap_backgrounds");
        const rocktileset = this.map.addTilesetImage("rockBackground", "tilemap_rock");
        const stonetileset = this.map.addTilesetImage("stoneBackground", "tilemap_stone");
        const generaltileset = this.map.addTilesetImage("Ground-n-Platforms", "tilemap_tiles");
    
        //Create layer
        this.backgroundLayer = this.map.createLayer("Platforms", [backgroundtileset, rocktileset, stonetileset], 0, 0);
        this.decorLayer = this.map.createLayer("Decor", generaltileset, 0, 0);
        this.groundLayer = this.map.createLayer("Platforms", generaltileset, 0, 0);
        this.levelLayer = this.map.createLayer("Levels", generaltileset, 0, 0);


        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        // TODO: Add createFromObjects here
        // Find coins in the "Objects" layer in Phaser
        // Look for them by finding objects with the name "coin"
        // Assign the coin texture from the tilemap_sheet sprite sheet
        // Phaser docs:
        // https://newdocs.phaser.io/docs/3.80.0/focus/Phaser.Tilemaps.Tilemap-createFromObjects

        this.coins = this.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });

        

    }
    update() {
    
    }

}