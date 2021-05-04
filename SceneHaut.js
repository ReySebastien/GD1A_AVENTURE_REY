class SceneHaut extends Phaser.Scene{
    constructor(){
        super("SceneHaut");
    }
    preload(){
    
    this.load.image('fond_test_3', 'assets_test/fond_test_3.png');
    this.load.image('perso_test', 'assets_test/perso_test.png');
    this.load.image('bordure_bas2', 'assets_test/bordure_test_2.png');
    this.load.image('barre_de_vie_3hp', 'assets/barre_de_vie_3hp.png');
    this.load.image('barre_de_vie_2hp', 'assets/barre_de_vie_2hp.png');
    this.load.image('barre_de_vie_1hp', 'assets/barre_de_vie_1hp.png');
    this.load.image('game_over', 'assets/game_over.png');
    this.load.image('gold_coin', 'assets/gold_coin.png');

    
} // FIN PRELOAD
    
create(){
        
    this.add.image(960,540, 'fond_test_3');
    this.player = this.physics.add.sprite(960, 540, 'dude');
    this.player.direction = 'down';
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.boutonFeu = this.input.keyboard.addKey('space');
    this.groupeBullets = this.physics.add.group();
    var bordure_bas2 = this.physics.add.image(960,1079, 'bordure_bas2');
    this.sceneText = this.add.text(1900, 540, argent, { fontSize: '32px', fill: '#fff' }).setScrollFactor(0);
    this.goldCoin = this.physics.add.group();


    
    this.physics.add.overlap(this.groupeBullets, this.ennemi, this.hit, null,this);
    this.physics.add.collider(this.player, bordure_bas2, this.hitBordureBas2, null, this);
    this.hp = this.add.image(1600,100, "barre_de_vie_3hp").setScrollFactor(0);
    this.physics.add.overlap(this.player, this.ennemi, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.groupeBullets, this.ennemi, this.hit, null,this);
    this.physics.add.overlap(this.player, this.goldCoin, this.getGoldCoin, null, this);
    
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
        
    if (this.cursors.left.isDown)
    {
        this.player.direction = 'left';
        this.player.setVelocityX(-300);
        this.player.anims.play('left', true);
        
    }
    else if (this.cursors.right.isDown)
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
    
    if(this.cursors.up.isDown)
    {
        this.player.direction = 'up';    
        this.player.setVelocityY(-300);
        this.player.anims.play('dos', true);
    
    }
    
        
    else if (this.cursors.down.isDown)
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
        this.add.image(960, 540, 'game_over').setScrollFactor(0);
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.boutonFeu)) {
        if(pistolet == true){
            this.tirer(this.player);
        }
    }    
     
    
    } // FIN UPDATE
    
    hitBordureBas2(bordure_bas2, player){
         
        this.scene.start('DebutJeu');
        this.cursors.down.isDown = false;
        this.cursors.up.isDown = false;
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
    
}
    