class SceneHaut extends Phaser.Scene{
    constructor(){
        super("SceneHaut");
    }
    preload(){
    
    this.load.image('fond_test_3', 'assets_test/fond_test_3.png');
    this.load.image('perso_test', 'assets_test/perso_test.png');
    this.load.image('bordure_bas2', 'assets_test/bordure_test_2.png');
    
} // FIN PRELOAD
    
create(){
        
    this.add.image(960,540, 'fond_test_3');
    this.player = this.physics.add.image(960, 540, 'perso_test');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    var bordure_bas2 = this.physics.add.image(960,1079, 'bordure_bas2');
    this.physics.add.collider(this.player, bordure_bas2, this.hitBordureBas2, null, this);
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
    
    hitBordureBas2(bordure_bas2, player){
         
        this.scene.start('DebutJeu');
        this.cursors.down.isDown = false;
        this.cursors.up.isDown = false;
     }
    
}
    