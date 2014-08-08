var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('key', 'assets/key.png');
    game.load.spritesheet('crate', 'assets/crate.png', 32, 32);
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;

var keys;
var crates;
var score = 0;
var numberOfItems = 5;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some keys to collect
    keys = game.add.group();

    //  We will enable physics for any key that is created in this group
    keys.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < numberOfItems; i++)
    {
        //  Create a key inside of the 'keys' group
        var key = keys.create(i * 180, 0, 'key');

        //  Let gravity do its thing
        key.body.gravity.y = 800;

        //  This just gives each key a slightly random bounce value
        key.body.bounce.y = 0.4 + Math.random() * 0.1;
    }

    //  The score
    scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });


    crates = game.add.group();
    crates.enableBody = true;

    for (var i = 0; i < numberOfItems; i++) {
        var crate = crates.create((Math.random() * 800), (Math.random() * 400), 'crate');
        crate.body.gravity.y = 500;
        crate.body.immovable = false;
        crate.animations.add('open', [0, 1, 2, 3], 8, true);
        crate.isClosed = true;
        crate.rotation = Math.random();
        console.log(crate);
    }

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    //  Collide the player and the keys with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(keys, platforms);
    game.physics.arcade.collide(crates, platforms);

    // Crates are stackable because I'm lazy
    game.physics.arcade.collide(crates, crates);
    // game.physics.arcade.collide(player, crates);

    //  Checks to see if the player overlaps with any of the keys, if he does call the collectKey function
    game.physics.arcade.overlap(player, keys, collectKey, null, this);
    game.physics.arcade.overlap(player, crates, openCrate, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;



    // if (crates.body.y > 10) {
    //     crates.kill();
    // }

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -250;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 250;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

    // Check if any of the crates is opened
    crates.children.map(function(crate) {
        if (crate.animations.currentFrame.index > 3) {
            crate.kill();
        }
    })
}

function openCrate (player, crate) {
    if((score > 0) && (crate.isClosed)) {
        crate.body.velocity.y = -350;
        crate.animations.play('open');
        crate.lifespan = 300;
        crate.isClosed = false;
        score -= 1;
    }
    updateScoreText();
}

function collectKey (player, key) {
    key.kill();
    score += 1;
    updateScoreText();
}
function updateScoreText() {
    scoreText.text = score + '⚿';
}
