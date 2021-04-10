class Menu extends Phaser.Scene {
    constructor()
    {
        super("Menu");
    }


    preload()
    {
        this.load.image('menu', 'assets/menu.png');
        
    } // FIN PRELOAD
    
    create(){
        
        this.add.image(960, 540, 'menu');
        
        this.input.once('pointerdown', function (event) {

            this.scene.start('DebutJeu');

        }, this);
        
    } //FIN CREATE
    
    update(){
        
    } // FIN UPDATE
    
} // FIN DE LA CLASSE