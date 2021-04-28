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
        
    } // FIN PRELOAD
    
    create(){
        
    this.add.image(960,540, 'fond_test');
    this.player = this.physics.add.image(960, 540, 'perso_test');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    var bordure_gauche = this.physics.add.image(1,540, 'bordure_gauche');
    var bordure_haut = this.physics.add.image(960,1, 'bordure_haut');
    var bordure_droite = this.physics.add.image(1919, 540, 'bordure_gauche');
    var bordure_bas = this.physics.add.image(960, 1079, 'bordure_haut');
    this.physics.add.collider(this.player, bordure_gauche, this.hitBordureGauche, null, this);
    this.physics.add.collider(this.player, bordure_haut, this.hitBordureHaut, null, this);
    this.physics.add.collider(this.player, bordure_droite, this.hitBordureDroite, null, this);
    this.physics.add.collider(this.player, bordure_bas, this.hitBordureBas, null, this);
    this.hp = this.add.image(1800,100, "barre_de_vie_3hp").setScrollFactor(0);
        
    this.cameras.main.setBounds(0, 0, 5760, 3283)
    this.cameras.main.setSize(1920, 1080);
    this.cameras.main.startFollow(this.player);

    } // FIN CREATE   
     
    update(){
        
    if (this.cursors.left.isDown)
    {
        
        this.player.setVelocityX(-500);
        
    }
    else if (this.cursors.right.isDown)
    {
        
        this.player.setVelocityX(500);

    }
    else
    {
        
        this.player.setVelocityX(0);  
        
    }
    
    if(this.cursors.up.isDown)
    {
            
        this.player.setVelocityY(-500);
    
    }
    
        
    else if (this.cursors.down.isDown)
    {
        
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
        
        // AJOUT CONTROLES MANETTE --------------------------------------------------
    
    this.input.gamepad.once('connected', function (pad) {
    this.paddleConnected = true;
    this.paddle = pad;
    });

    if (this.paddleConnected == true)
    {
        if (this.paddle.A)
        {
        this.player.setVelocityY(-500);
        }

        else if (this.paddle.Y)
        {
            this.player.setVelocityX(500);
        }

        else if (this.paddle.X)
        {
            this.player.setVelocityX(500);
        }

        else if (this.paddle.B)
        {   
            this.player.setVelocityX(-500);
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
    
    
    } // FIN DE LA CLASSE
