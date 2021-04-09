class menu extends Phaser.Scene {
    constructor ()
    {
        super("menu");
    } 
    

    preload (){    
//////////////////////////////////////////////////////////////////
////////// Initiation de certaine Variable pour valeur pas defaut     
        
    //////////////////////////////////////
    /////// Controles
        this.bas = false;
        this.haut = false;
        this.space = false;
        
        this.xAxis = 0;
        this.yAxis = 0;
        
    //////////////////////////////////////
    /////// Main Menu 
        this.mainMenuEtat = 0;
        this.MainMenuToggelBas = false;
        this.MainMenuToggelHaut = false;
        
        
        
//////////////////////////////////////////////////////////////////
////////// Debut du Preload         
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.load.image('mainMenu', 'assets/mainMenu.png',);
        this.load.spritesheet('mainMenuCursor', 'assets/mainMenuCursor.png',{frameWidth:1920, frameHeight:1080});
        
    } // Fin de Preload
    
    
    create (){
//////////////////////////////////////////////////////////////////
////////// Debut du Create  
        
    //////////////////////////////////////
    /////// Creation d'Objet
        
        this.add.image(960, 540, 'mainMenu');
        this.mainMenuCursor = this.add.sprite(960,540, 'mainMenuCursor');

        this.mainMenuEtatText = this.add.text(20,20,(''), { fontSize: '22px', fill: '#FFF' }).setScrollFactor(0,0);
        
        
    //////////////////////////////////////
    /////// Animations
        this.anims.create({
            key: 'mainMenuEtat0',
            frames: [ { key: 'mainMenuCursor', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'mainMenuEtat1',
            frames: [ { key: 'mainMenuCursor', frame: 1. } ],
        });
        
        this.anims.create({
            key: 'mainMenuEtat2',
            frames: [ { key: 'mainMenuCursor', frame: 2. } ],
        });
        
    } // Fin de Create
    
    
    update(){
    //////////////////////////////////////////////////////////////////
////////// Update score
        
        this.mainMenuEtatText.setText('Choix = ' + this.mainMenuEtat);
        
//////////////////////////////////////////////////////////////////
////////// Controles 
        
        let pad = Phaser.Input.Gamepad.Gamepad;

        if(this.input.gamepad.total){
            pad = this.input.gamepad.getPad(0)
            this.xAxis = pad ? pad.axes[0].getValue() : 0;
            this.yAxis = pad ? pad.axes[1].getValue() : 0;
        }
        
        
        if (this.cursors.up.isDown || this.yAxis < 0){
            this.haut = true
        }
        else{
            this.haut = false
        }
        
        
        if (this.cursors.down.isDown || this.yAxis > 0){
            this.bas = true
        }
        else{
            this.bas = false
        }
        
         if (this.cursors.space.isDown || pad.A ){
            this.space = true
        }
        else{
            this.space = false
        }

//////////////////////////////////////////////////////////////////
////////// Logique    
        
    //////////////////////////////////////
    /////// Bas
        
        if(this.mainMenuEtat < 2){
            if (this.bas == true && this.MainMenuToggelBas == false){
                this.mainMenuEtat = this.mainMenuEtat + 1
                this.MainMenuToggelBas = true
            }
            if (this.bas == false && this.MainMenuToggelBas == true){
                this.MainMenuToggelBas = false
            }
        }
        
    //////////////////////////////////////
    /////// Haut
        
        if(this.mainMenuEtat > 0){
            if (this.haut == true && this.MainMenuToggelHaut == false){
                this.mainMenuEtat = this.mainMenuEtat - 1
                this.MainMenuToggelHaut = true
            }
            if (this.haut == false && this.MainMenuToggelHaut == true){
                this.MainMenuToggelHaut = false
            }
        }
        
    //////////////////////////////////////
    /////// Menu Output 
        
        if(this.mainMenuEtat == 0){
            this.mainMenuCursor.anims.play('mainMenuEtat0'); 
            if(this.space == true){
                this.scene.start("zone");
            } 
            
            
        }
        else if(this.mainMenuEtat == 1){
            this.mainMenuCursor.anims.play('mainMenuEtat1');
        }
        else if(this.mainMenuEtat == 2){
            this.mainMenuCursor.anims.play('mainMenuEtat2');
        }
        
        
    }  // Fin de Update
} // Fin de la Class