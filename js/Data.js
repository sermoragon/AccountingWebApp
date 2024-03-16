class Data{
    static dataCounter_ = 0;

    constructor(description, value){
        this.description_ = description;
        this.value_ = value;
        this.id_ = Data.dataCounter_++;
    }

    get description(){
        return this.description_;
    }

    set description(description){
        this.description_ = description;
    }

    get value(){
        return this.value_;
    }

    set value(value){
        this.value_ = value;
    }
    
    get id(){
        return this.id_;
    }

}