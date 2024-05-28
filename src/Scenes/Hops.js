class Hops extends Phaser.Scene {
    constructor() {
        super("hopsScene");
    }


    init() {
        // variables and settings
        this.ACCELERATION = 400;
        this.DRAG = 500;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
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

        //make it collidable
        this.groundLayer.setCollisionByProperty({
            collide: true
        });


        // Find coins in the "Objects" layer in Phaser
        // Look for them by finding objects with the name "coin"
        // Assign the coin texture from the tilemap_sheet sprite sheet
        this.coins = this.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });

        // Add turn into Arcade Physics here
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);

        // Create a Phaser group out of the array this.coins
        // This will be used for collision detection below.
        this.coinGroup = this.add.group(this.coins);

        // Set up player avatar at the bottom of the tilemap
        const spawnX = 360; // Example X-coordinate
        const spawnY = this.map.heightInPixels - 100; // Adjust 100 to fit the player's height as needed
        my.sprite.player = this.physics.add.sprite(spawnX, spawnY, "hops_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);
 

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // Add coin collision handler
        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
        });
        
        
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        this.rKey = this.input.keyboard.addKey('R');

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);


        // add camera code here
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);        

    }

        

    
    update() {
    
    }

}