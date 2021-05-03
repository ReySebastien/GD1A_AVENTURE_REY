class DebutJeu extends Phaser.Scene{
    constructor(){
        super("DebutJeu");
    }


    preload(){
    
        this.load.image('perso_test', 'assets_test/perso_test.png');
        this.load.image('fond_test', 'assets_test/fond_test.png');
        this.load.image('bordure_gauche', 'assets_test/bordure_test.png');
        this.load.image('bordure_haut', 'assets_test/bordure_test_2.png');
        this.load.image('barre_de_vie_3hp', 'assets/barre_de_vie_3hp.png');
        this.load.image('barre_de_vie_2hp', 'assets/barre_de_vie_2hp.png');
        this.load.image('barre_de_vie_1hp', 'assets/barre_de_vie_1hp.png');
        this.load.image('game_over', 'assets/game_over.png');
        this.load.image('laser', 'assets/balle.png');
        
    } // FIN PRELOAD
    
    create(){
        
    this.add.image(960,540, 'fond_test');
    this.player = this.physics.add.image(960, 540, 'perso_test');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.boutonFeu = this.input.keyboard.addKey('space');
    this.groupeBullets = this.physics.add.group();

    var bordure_gauche = this.physics.add.image(1,540, 'bordure_gauche');
    var bordure_haut = this.physics.add.image(960,1, 'bordure_haut');
    var bordure_droite = this.physics.add.image(1919, 540, 'bordure_gauche');
    var bordure_bas = this.physics.add.image(960, 1079, 'bordure_haut');
    
    this.physics.add.overlap(this.groupeBullets, this.ennemi, this.hit, null,this);
    this.physics.add.collider(this.player, bordure_gauche, this.hitBordureGauche, null, this);
    this.physics.add.collider(this.player, bordure_haut, this.hitBordureHaut, null, this);
    this.physics.add.collider(this.player, bordure_droite, this.hitBordureDroite, null, this);
    this.physics.add.collider(this.player, bordure_bas, this.hitBordureBas, null, this);
    this.hp = this.add.image(1600,100, "barre_de_vie_3hp").setScrollFactor(0);
    this.physics.add.overlap(this.player, this.ennemi, this.hitEnnemi, null, this);

        
    this.cameras.main.setBounds(0, 0, 5760, 3283)
    this.cameras.main.setSize(1920, 1080);
    this.cameras.main.startFollow(this.player);


    } // FIN CREATE   
     
    update(){
        
    if (this.cursors.left.isDown)
    {
        this.player.direction = 'left';
        this.player.setVelocityX(-500);
        
    }
    else if (this.cursors.right.isDown)
    {
        
        this.player.direction = 'right';
        this.player.setVelocityX(500);

    }
    else
    {
        
        this.player.setVelocityX(0);  
        
    }
    
    if(this.cursors.up.isDown)
    {
        this.player.direction = 'up';    
        this.player.setVelocityY(-500);
    
    }
    
        
    else if (this.cursors.down.isDown)
    {
        
        this.player.direction = 'down';
        this.player.setVelocityY(500)
        
    }
        
    else
    {
        
        this.player.setVelocityY(0);  
        
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
    

    hitBordureGauche(bordure_gauche, player){
         
        this.scene.start('SceneGauche');
        this.cursors.left.isDown = false;
        this.cursors.right.isDown = false;
     }
    
    hitBordureHaut(bordure_haut, player){
        
        this.scene.start('SceneHaut');
        this.cursors.up.isDown = false;
        this.cursors.down.isDown = false;
     }
    
    hitBordureDroite(bordure_droite, player){
        
        this.scene.start('SceneDroite');
        this.cursors.right.isDown = false;
        this.cursors.left.isDown = false;
    }
    
    hitBordureBas(bordure_bas, player){
        
        this.scene.start('SceneBas');
        this.cursors.up.isDown = false;
        this.cursors.down.isDown = false;
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
        this.ennemi.destroy();    
    }

    tirer(player) {
	    var coefDirX;
        var coefDirY;
        if (this.player.direction == 'left') { coefDirX = -1; } else if(this.player.direction == 'right') { coefDirX = 1 } else {coefDirX = 0}
        if (this.player.direction == 'up') {coefDirY = -1;} else if(this.player.direction == 'down') {coefDirY = 1} else {coefDirY =0}
        // on crée la balle a coté du joueur
        var bullet = this.groupeBullets.create(this.player.x + (25 * coefDirX), this.player.y - 4 , 'laser');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(false);
        bullet.body.allowGravity =false;
        bullet.setVelocity(1000 * coefDirX, 1000 * coefDirY); // vitesse en x et en y
    }
    
    } // FIN DE LA CLASSE
