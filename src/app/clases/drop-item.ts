export class DropItem {
    id : number;
    label : string;
    options : string[];
    repeat : number;
    paramSelected : string;
    constructor(id : number,label : string, options? : string [],repeat? : number){
        this.id=id;
        this.label=label;
        if (options){
            this.options=options;
            this.paramSelected=options[0];
        }else{
            this.options=[];
        }
        if(repeat && repeat > 0){
            this.repeat=repeat;
        }else{
            this.repeat=1;
        }

    }
}
