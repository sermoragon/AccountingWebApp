const myData = [
    new Income("Salary", 500),
    new Income("Second hand sell", 500),
    new Expense("Supermarket", -100),
    new Expense("Supermarket2", -20)
];

let loadApp = () => {
    refreshApp();
    loadLists();
}

let computeTotalMoney = () => {
    let sum = 0;
    for(let data of myData){
        sum += data.value;
    }
    return sum;
}

let computePercentage = () => {
    let sumIncome = 0;
    let sumExpense = 0;
    for(let data of myData){
        if (data instanceof Income) {
            sumIncome += data.value;
        } 
        else if (data instanceof Expense) {
            sumExpense += data.value;          
        }
    }
    return Math.abs(sumExpense/sumIncome);
}

let computeRelativePercentage = (relativeData) => {  
    return Math.abs(relativeData.value/computeIncome());
}

let computeIncome = () => {
    let sumIncome = 0;
    for(let data of myData){
        if (data instanceof Income) {
            sumIncome += data.value;
        } 
    }
    return sumIncome;
}

let computeExpenses = () => {
    let sumExpense = 0;
    for(let data of myData){
        if (data instanceof Expense) {
            sumExpense += data.value;
        } 
    }
    return sumExpense;
}

let refreshApp = () => {
    document.getElementById("total").innerHTML = coinFormat(computeTotalMoney());
    document.getElementById("percentage").innerHTML = computePercentage().toLocaleString("en-US",{style:"percent", minimumFractionDigits:2});
    document.getElementById("income").innerHTML = coinFormat(computeIncome());
    document.getElementById("expense").innerHTML = coinFormat(computeExpenses());

}

function coinFormat(value){
    return value.toLocaleString("en-US",{style:"currency", currency:"USD", minimumFractionDigits:2});
}

let loadLists = () => {
    let incomeHTML = "";
    let expenseHTML = "";
    for(let data of myData){
        if (data instanceof Income) {
            incomeHTML += createIncome(data);
        }
        else if (data instanceof Expense) {
            expenseHTML += createExpense(data);
        }
        else{
            console.log("error on loading data")
        }
    }

    document.getElementById("income-list").innerHTML = incomeHTML;
    document.getElementById("expense-list").innerHTML = expenseHTML;
}

function createIncome(data){
    return `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
            ${data.description}
        </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                ${coinFormat(data.value)}
            </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eraseData(${data.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
}

function createExpense(data){
    return `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
            ${data.description}
        </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                ${coinFormat(data.value)}
            </div>
            <div class="elemento_porcentaje">
                ${computeRelativePercentage(data).toLocaleString("en-US",{style:"percent", minimumFractionDigits:2})}
            </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick="eraseData(${data.id})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
}

function eraseData(id){
    let toErase = myData.findIndex(data => data.id === id);
    myData.splice(toErase, 1);
    loadApp();
}

function addNewData(){
    let appForm = document.forms["addNewDataForm"];
    let newData = evaluateData(document.getElementById("form_descrption").value, Number(appForm["form_value"].value));

    myData.push(newData);
    loadApp();
} 

function evaluateData(description, value){
    if(value > 0){
        return new Income(description, value);
    }
    else if(value < 0){
        return new Expense(description, value);
    }
    else{
        console.log("error creating new data");
    }
}

