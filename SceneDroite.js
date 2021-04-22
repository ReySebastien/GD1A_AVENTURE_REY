class SceneDroite extends Phaser.Scene{
    constructor(){
        super("SceneDroite");
    }
preload(){
    
    this.load.image('fond_test_4', 'assets_test/fond_test_4.png');
    this.load.image('perso_test', 'assets_test/perso_test.png');
    this.load.image('bordure_gauche2', 'assets_test/bordure_test.png');
    
} // FIN PRELOAD
    
create(){
        
    this.add.image(960,540, 'fond_test_4');
    this.player = this.physics.add.image(960, 540, 'perso_test');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    var bordure_gauche2 = this.physics.add.image(1,540, 'bordure_gauche2');
    this.physics.add.collider(this.player, bordure_gauche2, this.hitBordureGauche2, null, this);
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
    
    hitBordureGauche2(bordure_gauche2, player){
         
        this.scene.start('DebutJeu');
        this.cursors.right.isDown = false;
        this.cursors.left.isDown = false;

     }
    
} // FIN DE LA CLASSE