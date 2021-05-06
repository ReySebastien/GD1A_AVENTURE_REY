class SceneGauche extends Phaser.Scene{
    constructor(){
        super("SceneGauche");
    }
    
preload(){
    
    this.load.image('scene_gauche', 'assets/tileset_scene_gauche.png');
    this.load.tilemapTiledJSON('map_gauche', 'MapGauche.json');
    this.load.image('perso_test', 'assets_test/perso_test.png');
    this.load.image('bordure_droite2', 'assets_test/bordure_test.png');
    this.load.image('ennemi_test', 'assets/bison.png');
    this.load.image('barre_de_vie_3hp', 'assets/barre_de_vie_3hp.png');
    this.load.image('barre_de_vie_2hp', 'assets/barre_de_vie_2hp.png');
    this.load.image('barre_de_vie_1hp', 'assets/barre_de_vie_1hp.png');
    this.load.image('game_over', 'assets/game_over.png');
    this.load.image('gold_coin', 'assets/gold_coin.png');
    
} // FIN PRELOAD
    
create(){
    
    this.map = this.make.tilemap({ key: 'map_gauche' });
    this.tileset = this.map.addTilesetImage('platformPack_tilesheet', 'scene_gauche');
    this.sol = this.map.createStaticLayer('Sol', this.tileset, 0, 0);
    this.objets = this.map.createDynamicLayer('Objets', this.tileset, 0, 0);
    
    this.player = this.physics.add.sprite(1880, 540, 'dude').setSize(28, 15).setOffset(2, 33);    this.player.direction = 'down';
    this.player.setCollideWorldBounds(true);
    
    this.ennemi = this.physics.add.image(700, 540, 'ennemi_test').setFlipX(true);
    var tween = this.tweens.add({
        targets: this.ennemi,
        x: 1000,
        duration: 2500,
        yoyo: true,
        repeat: -1,
        flipX: true,
        onStart: function () { console.log('onStart'); console.log(arguments); },
        onComplete: function () { console.log('onComplete'); console.log(arguments); },
        onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
        onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
    });
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.boutonFeu = this.input.keyboard.addKey('space');
    this.groupeBullets = this.physics.add.group();
    var bordure_droite2 = this.physics.add.image(1919,540, 'bordure_droite2');
    this.hp = this.add.image(1100,50, "barre_de_vie_3hp").setScrollFactor(0);
    this.goldCoin = this.physics.add.group();
    
    this.physics.add.collider(this.player, this.objets);
    this.objets.setCollisionByProperty({collides:true});
    
    this.physics.add.collider(this.player, bordure_droite2, this.hitBordureDroite2, null, this);
    this.physics.add.overlap(this.player, this.ennemi, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.groupeBullets, this.ennemi, this.hit, null,this);
    this.physics.add.overlap(this.player, this.goldCoin, this.getGoldCoin, null, this);
    
    this.inventaire = this.add.image(1200, 400, 'inventaire').setScrollFactor(0);
    this.revolver_vide = this.add.image(1200, 300, 'revolver_vide').setScrollFactor(0);
    this.gold_coin_inventaire = this.add.image(1180, 200, 'gold_coin_inventaire').setScrollFactor(0);
    this.sceneText = this.add.text(1220, 185, argent, { fontSize: '32px', fill: '#fff' }).setScrollFactor(0);
    this.hache_vide = this.add.image(1200, 450, 'hache_vide').setScrollFactor(0);
    this.biere_vide = this.add.image(1200, 600, 'biere_vide').setScrollFactor(0);
    
    this.cameras.main.setBounds(0, 0, 1920, 1080)
    this.cameras.main.setSize(1280, 720);
    this.cameras.main.startFollow(this.player);
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 10 }),
        frameRate: 10,
    });

    this.anims.create({
        key: 'face',
        frames: this.anims.generateFrameNumbers('dude', { start: 15, end: 22 }),
        frameRate: 10,
    });
        
    this.anims.create({
        key: 'dos',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 7 }),
        frameRate: 10,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 14 }),
        frameRate: 10,
    });
    
    this.anims.create({
        key: 'reste_right',
        frames: [ {key: 'dude', frame: 12}],
    });
    
    this.anims.create({
        key: 'reste_left',
        frames: [{key: 'dude', frame: 10}],
    });
        
    this.anims.create({
        key: 'reste_face',
        frames: [{key: 'dude', frame: 15}],
    }); 

    this.anims.create({
        key: 'reste_dos',
        frames: [{key: 'dude', frame: 7}],
    });


} // FIN CREATE
    
update(){
    
    let pad = Phaser.Input.Gamepad.Gamepad;

    if(this.input.gamepad.total){   //Si une manette est connecté
            pad = this.input.gamepad.getPad(0);  //pad récupère les inputs du joueur
    }
    if (this.cursors.left.isDown || pad.left)
    {
        this.player.direction = 'left';
        this.player.setVelocityX(-300);
        this.player.anims.play('left', true);
        
    }
    else if (this.cursors.right.isDown || pad.right)
    {
        
        this.player.direction = 'right';
        this.player.setVelocityX(300);
        this.player.anims.play('right', true);

    }
    else
    {
        
        this.player.setVelocityX(0);
        
        if(this.player.direction == 'left'){
            this.player.anims.play('reste_left', true);
        }
        
        else if (this.player.direction == 'right'){
            this.player.anims.play('reste_right', true);
        }
  
    }
    
    if(this.cursors.up.isDown || pad.up)
    {
        this.player.direction = 'up';    
        this.player.setVelocityY(-300);
        this.player.anims.play('dos', true);
    
    }
    
        
    else if (this.cursors.down.isDown || pad.down)
    {
        
        this.player.direction = 'down';
        this.player.setVelocityY(300);
        this.player.anims.play('face', true);
    }
        
    else
    {
        
        this.player.setVelocityY(0);
        if (this.player.direction == 'up'){
            this.player.anims.play('reste_dos', true);
        }
        
        else if (this.player.direction == 'down'){
            this.player.anims.play('reste_face', true);
        } 
        
    }
     
    if (vie == 3){
       this.hp.setTexture("barre_de_vie_3hp");
        
    }
    else if (vie == 2){
        this.hp.setTexture("barre_de_vie_2hp" );
        
    }
    
    else if (vie == 1){
        this.hp.setTexture("barre_de_vie_1hp");
    }
    
    else if (vie == 0){
        this.add.image(640, 360, 'game_over').setScrollFactor(0);
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.boutonFeu)|| pad.A) {
        if(pistolet == true){
            this.tirer(this.player);
        }
    }  

    if (hache == true){
        this.hache_vide.setTexture("hache");
    }
    if(pistolet == true){
        this.revolver_vide.setTexture('revolver');
    }
        
    if(biere == true){
        this.biere_vide.setTexture('biere');
    }
    
    } // FIN UPDATE
    
    hitBordureDroite2(bordure_droite2, player){
         
        this.scene.start('DebutJeu', {x : 40, y : 540});
        this.cursors.right.isDown = false;
        this.cursors.left.isDown = false;

     }
    
    hitEnnemi(player, ennemi){
     
    if (!invulnerabilite){
        vie -= 1;
        invulnerabilite = true;
        
        if(vie > 0){
            this.clignotement = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player.visible = !this.player.visible;}, callbackScope: this});
        }
        
        this.tempsInvulnerabilite = this.time.addEvent({ delay : 2000, callback: function(){invulnerabilite = false}, callbackScope: this});
    }
     
     if(vie == 0){
        this.player.setTint(0xff0000);
        this.physics.pause();
        this.gameOver = true;
    }
 }
    
    hit (bullet, ennemi) {
        bullet.destroy();
        this.goldCoin.create(ennemi.x, ennemi.y, 'gold_coin');
        ennemi.destroy();
    }
    
    getGoldCoin(player, goldCoin){
        goldCoin.destroy();
        argent += 1;
        this.sceneText.setText(argent);
    }

    tirer(player) {
	    var coefDirX;
        var coefDirY;
        if (this.player.direction == 'left') { coefDirX = -1; } else if(this.player.direction == 'right') { coefDirX = 1 } else {coefDirX = 0}
        if (this.player.direction == 'up') {coefDirY = -1;} else if(this.player.direction == 'down') {coefDirY = 1} else {coefDirY =0}
        // on crée la balle a coté du joueur
        var bullet = this.groupeBullets.create(this.player.x + (25 * coefDirX), this.player.y - 4 , 'balle');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(false);
        bullet.body.allowGravity =false;
        bullet.setVelocity(1000 * coefDirX, 1000 * coefDirY); // vitesse en x et en y
    }
    
    
} // FIN DE LA CLASSE