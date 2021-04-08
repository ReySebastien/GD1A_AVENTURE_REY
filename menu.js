class Menu extends Phaser.Scene {
    constructor()
    {
        super("Menu");
    }


    preload()
    {
        this.load.image('menu', 'assets/menu.png');
        
    }
    
    create(){
        
        this.add.image(960, 540, 'menu');
        //this.scene.start("LoadingGame");
    }
}