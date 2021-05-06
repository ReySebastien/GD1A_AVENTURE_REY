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
        
        vie = 3;
        biere = false;
        pistolet = false;
        hache = false;
        victoire = false;
        argent = 0;
        
        this.add.image(640, 360, 'menu');
        
        this.input.once('pointerdown', function (event) {

            this.scene.start('DebutJeu', {x : 960, y : 540});

        }, this);
        
    } //FIN CREATE
    
    update(){
        
    } // FIN UPDATE
    
} // FIN DE LA CLASSE