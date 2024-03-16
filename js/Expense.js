class Expense extends Data{
    constructor(description = "", value){
        super(description, value);
    }
    
    get id(){
        return super.id;
    }
}