class Scene2 extends Phaser.Scene{
    constructor(){
        super("LoadingGame");
    }


    create(){
        this.add.text(20,20, "Loading Game", {font: "25px Arial", fill: "yellow"});
    }
}