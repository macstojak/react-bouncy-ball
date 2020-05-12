import Pizzicato from "pizzicato";

export default class MainTheme{
    constructor(){
        this.mainTheme = "";
        this.themeEffect = new Pizzicato.Effects.Distortion({gain: 0.4});
    }
 
    
    play(){
        this.mainTheme = new Pizzicato.Sound('./audio/mainTheme.wav',()=>{
            this.mainTheme.volume=0.3;
            this.mainTheme.loop=true;
            this.mainTheme.addEffect(this.themeEffect);
            this.mainTheme.play();
        });
    
    }
    stop(){
        this.mainTheme.volume = 0;
    }
}