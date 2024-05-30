class Hops extends Phaser.Scene {
    constructor() {
        super("hopsScene");
    }

    init() {
        // Variables and settings
        this.ACCELERATION = 400;
        this.DRAG = 3000; // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500; //noral setting is 1500 
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;

        this.leftBoundary = 0; // Left boundary of the map
        this.rightBoundary = 18 * 20; // Right boundary of the map (width of the map in pixels)

        // Initialize score variables
        this.score = 0;
        this.scoreText;
    }

    create() {
        // Create a new tilemap game object
        this.map = this.add.tilemap("map", 18, 18, 20, 160);

        // Add tilesets to the map
        const backgroundtileset = this.map.addTilesetImage("generalBackground", "tilemap_backgrounds");
        const rocktileset = this.map.addTilesetImage("rockBackground", "tilemap_rock");
        const stonetileset = this.map.addTilesetImage("stoneBackground", "tilemap_stone");
        const generaltileset = this.map.addTilesetImage("Ground-n-Platforms", "tilemap_tiles");

        // Create layers
        this.backgroundLayer = this.map.createLayer("Background", [backgroundtileset, rocktileset, stonetileset], 0, 0);
        this.decorLayer = this.map.createLayer("Decor", generaltileset, 0, 0);
        this.groundLayer = this.map.createLayer("Platforms", generaltileset, 0, 0);
        this.levelLayer = this.map.createLayer("Levels", generaltileset, 0, 0);

        // Make ground layer collidable
        this.groundLayer.setCollisionByProperty({ collide: true });

        // Find and create coins
        this.coins = this.map.createFromObjects("Objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151
        });

        // Enable Arcade Physics for coins
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);

        // Create a Phaser group for coins
        this.coinGroup = this.add.group(this.coins);

        // Set up player avatar
        my.sprite.player = this.physics.add.sprite(150, 2700, "hops_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(false);

        // Display the initial message "JUMP UP!"
        this.displayTemporaryText("     JUMP UP!,\n press r to reset", my.sprite.player.x - 150, my.sprite.player.y - 125, 3000);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // Add coin collision handler
        this.physics.add.overlap(my.sprite.player, this.coinGroup, this.collectCoin, null, this);

        // Set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        this.rKey = this.input.keyboard.addKey('R');

        // Debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true;
            this.physics.world.debugGraphic.clear();
        }, this);

        // Create the score text
        this.scoreBox = this.add.rectangle(260, 242, 150, 18, 0x2cc5f6).setScrollFactor(0);
//        this.scoreText = this.add.text(185, 230,'Coins Collected ' + this.score + '/6', { fontSize: '12px', fill: '#000' }).setScrollFactor(0);
        this.scoreText = this.add.text(190, 235,'Coins Collected ' + this.score + '/12', { fontSize: '12px', fill: '#000' }).setScrollFactor(0);

        // Add camera code
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
//        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25);
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

        // Fixing camera
        // https://gamedev.stackexchange.com/questions/157869/one-pixel-lines-flash-on-tile-map-when-camera-moves
        // used code from this site 
        // Removes lines that render when sprite player is being followed, anchors the camera to a point instead of the sprite 
        this.cameraDolly = new Phaser.Geom.Point(my.sprite.player.x, my.sprite.player.y);
        this.cameras.main.startFollow(this.cameraDolly);

    }

    update() {
        // calculating sprite point for camera 
        this.cameraDolly.x = Math.floor(my.sprite.player.x);
        this.cameraDolly.y = Math.floor(my.sprite.player.y);
        // Check boundaries
        if (my.sprite.player.x < this.leftBoundary) {
            my.sprite.player.x = this.leftBoundary;
            my.sprite.player.setVelocityX(0);
        }

        if (my.sprite.player.x > this.rightBoundary) {
            my.sprite.player.x = this.rightBoundary;
            my.sprite.player.setVelocityX(0);
        }

        // Handle player movement
        if (cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
        } else if (cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
        } else {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
        }

        // Handle player jump
        if (!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }
        if (my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.sound.play('sfxJump');
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }

        // Restart scene on 'R' key press
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }

;
    }

    collectCoin(player, coin) {
        this.sound.play('sfxCoin');
        coin.destroy(); // Remove coin on overlap
        this.score +=1;
        this.scoreText.setText('Coins Collected ' + this.score + '/12');
    }

    displayTemporaryText(text, x, y, duration) {
        // Create text at the specified position
        let tempText = this.add.text(x, y, text, { fontSize: '32px', fill: '#000000' });

        // Remove text after the specified duration
        this.time.delayedCall(duration, () => {
            tempText.destroy();
        });
    }
}
