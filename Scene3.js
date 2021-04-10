class Scene3 extends Phaser.Scene{
    constructor(){
        super("Scene3");
    }
    
preload(){
    
    this.load.image('fond_test_2', 'assets_test/fond_test_2.png');
    
} // FIN PRELOAD
    
create(){
        
    this.add.image(960,540, 'fond_test_2');

} // FIN CREATE
    
} // FIN DE LA CLASSE