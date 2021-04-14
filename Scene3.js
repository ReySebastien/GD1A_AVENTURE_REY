class Scene3 extends Phaser.Scene{
    constructor(){
        super("Scene3");
    }
    
preload(){
    
    this.load.image('fond_test_2', 'assets_test/fond_test_2.png');
    this.load.image('perso_test', 'assets_test/perso_test.png');
    
} // FIN PRELOAD
    
create(){
        
    this.add.image(960,540, 'fond_test_2');
    this.player = this.physics.add.image(960, 540, 'perso_test');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
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
    
} // FIN DE LA CLASSE