class DebutJeu extends Phaser.Scene{
    constructor(){
        super("DebutJeu");
    }


    preload(){
    
        this.load.image('perso_test', 'assets_test/perso_test.png');
        this.load.image('fond_test', 'assets_test/fond_test.png');
        this.load.image('bordure_gauche', 'assets_test/bordure_test.png');
        
    } // FIN PRELOAD
    
    create(){
        
    this.add.image(960,540, 'fond_test');
    this.player = this.physics.add.image(960, 540, 'perso_test');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    var bordure_gauche = this.physics.add.image(1,540, 'bordure_gauche');
    this.physics.add.collider(this.player, bordure_gauche, this.hitBordureGauche, null, this);
    
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
        
    } // FIN UPDATE
    
     hitBordureGauche(bordure_gauche, player){
         
         this.scene.start('Scene3');
         
     }
    } // FIN DE LA CLASSE
