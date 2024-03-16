class Income extends Data{
    constructor(description = "", value){
        super(description, value);
    }

    get id(){
        return super.id;
    }

    get description(){
        return super.description;
    }

    set description(description){
        super.description = description;
    }

    get value(){
        return super.value;
    }

    set value(value){
        super.value = value;
    }
}