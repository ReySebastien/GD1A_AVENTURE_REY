class SceneGauche extends Phaser.Scene{
    constructor(){
        super("SceneGauche");
    }
    
preload(){
    
    this.load.image('fond_test_2', 'assets_test/fond_test_2.png');
    this.load.image('perso_test', 'assets_test/perso_test.png');
    this.load.image('bordure_droite2', 'assets_test/bordure_test.png');
    this.load.image('ennemi_test', 'assets_test/ennemi_test.png');
    
} // FIN PRELOAD
    
create(){
        
    this.add.image(960,540, 'fond_test_2');
    this.player = this.physics.add.image(960, 540, 'perso_test');
    this.player.setCollideWorldBounds(true);
    this.ennemi = this.physics.add.image(500, 540, 'ennemi_test');
    this.ennemi.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    var bordure_droite2 = this.physics.add.image(1919,540, 'bordure_droite2');
    this.physics.add.collider(this.player, bordure_droite2, this.hitBordureDroite2, null, this);
    this.physics.add.overlap(this.player, this.ennemi, this.hitEnnemi, null, this);
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
    
    hitBordureDroite2(bordure_droite2, player){
         
        this.scene.start('DebutJeu');
        this.cursors.right.isDown = false;
        this.cursors.left.isDown = false;

     }
    
    hitEnnemi(player, ennemi){
     
    if (!this.invulnerabilite){
        this.vie -= 1;
        this.invulnerabilite = true;
        
        if(this.vie > 0){
            clignotement = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player.visible = !this.player.visible;}, callbackScope: this});
        }
        
        //tempsInvulnerabilite = this.time.addEvent({ delay : 2000, callback: function(){this.invulnerabilite = false}, callbackScope: this});
    }
     
     if(this.vie == 0){
        this.player.setTint(0xff0000);
        this.physics.pause();
        this.gameOver = true;
    }
 }
    
} // FIN DE LA CLASSE