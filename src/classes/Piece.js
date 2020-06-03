import _ from "lodash";
module.exports = class Piece{
    constructor(position){
        this.startPosition = position;
        this.position = position;
        this.symbol = "1";
        
        this.vectorsAxial=[{x:-1,y:-1}, {x:-1, y:1}, {x:1, y:1}, {x: 1, y:-1}];
        this.vectorsDiagonal=[{x:1, y:0}, {x:-1, y:0}, {x:0,y:-1}, {x:0, y:1}];
        this.vector={x:1,y:1};
    }
    setStartPosition(position){
       
        this.position = position;
        this.startPosition = position;
    }
    getPosition(){
        return this.position;
    }
    checkTheDirectionAxially(vector){
        this.vectorsAxial.forEach(item=>{
            if(_.isEqual(item,vector)){
                this.vector=item;
            }
        })
       
    }
    changeVector(vector, diagonal, random, axial){
            if(random===true){
                this.vector = this.vectorsAxial[Math.floor(Math.random()*4)]
            }else if(axial===true){
                this.checkTheDirectionAxially(vector);
                
            }else{
            switch(vector){
                case this.vectorsAxial[0]:
                    diagonal===this.vectorsDiagonal[2] ? this.vector=this.vectorsAxial[1] : this.vector=this.vectorsAxial[3];
                    break;
                case this.vectorsAxial[1]:
                    diagonal===this.vectorsDiagonal[3] ? this.vector=this.vectorsAxial[0] : this.vector=this.vectorsAxial[2];
                    break;
                case this.vectorsAxial[2]: 
                    diagonal===this.vectorsDiagonal[3] ? this.vector=this.vectorsAxial[3] : this.vector=this.vectorsAxial[1]; 
                    break;
                case this.vectorsAxial[3]:
                    diagonal===this.vectorsDiagonal[0] ? this.vector=this.vectorsAxial[0] : this.vector=this.vectorsAxial[2];
                    break;
                default:
                    break;
                    
            }
        }   
    }
   
    
}