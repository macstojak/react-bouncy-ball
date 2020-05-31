import Pizzicato from "pizzicato";

export default class MainTheme{
    constructor(){
        this.mainTheme = "";
        this.crashSound = "";
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
    crash(){
        this.crashSound = new Pizzicato.Sound('./audio/crash.wav', ()=>{
            this.crashSound.volume=1;
            this.crashSound.play();
        })
    }
    stop(){
        this.mainTheme.stop();
    }
}