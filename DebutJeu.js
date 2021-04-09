class DebutJeu extends Phaser.Scene{
    constructor(){
        super("DebutJeu");
    }


    preload(){
    
        this.load.image('perso', 'assets/perso.png', { frameWidth: 101, frameHeight: 81});
        
    }
    
    create(){
        
    this.player = this.add.image(960, 540, 'perso');
    
    }   
        
    }
