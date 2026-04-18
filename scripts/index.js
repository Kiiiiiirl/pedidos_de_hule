const TireOptions = ['DLM','TA','ELO','TI','GRL','LDD','HPT','SA','WSA'];
const sizeOptions = [80,85,90,94,215];

class Info {
  constructor(parent,LineNum,count,diseno='',medida='',cantidad=''){
    this.parent = parent;
    this.id = `${LineNum}${count}`;
    this.diseno = diseno;
    this.medida = medida;
    this.cantidad = parseInt(cantidad);
    this.createInfoLine();
  }
  createInfoLine() {
    this.element= document.createElement("div");
    this.element.className = "info-container";

    const select = document.createElement("select");
    var escoge, i=0;
    select.id = `s${this.id}`;
    TireOptions.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.text = element;
        select.appendChild(option);

        if(element==this.diseno){
          escoge=i;
        };
        i++;
    });
    select.selectedIndex=escoge;

    const sizesel = document.createElement("select");
    sizesel.id = `z${this.id}`;
    i=0;
    sizeOptions.forEach(element => {
      const option = document.createElement("option");
      option.value = element;
      option.text = element;
      sizesel.appendChild(option);

      if(element==this.medida){
        escoge=i;
      };
      i++;
    });
    sizesel.selectedIndex=escoge;

    const  input = document.createElement("input");
    input.type = "number"
    input.id = this.id;
    input.min = 0;
    input.placeholder = "Amount..";
    input.value = this.cantidad;

    this.element.appendChild(select);
    this.element.appendChild(sizesel);
    this.element.appendChild(input);

    this.parent.appendChild(this.element);
  }
}

class Line {
  constructor(parent,LineCount,cliente='',datos={}) {
    this.parent = parent;
    this.LineNum = LineCount;
    this.count =0;
    this.cliente = cliente;
    this.datos = datos;
    this.createLine();
    this.autoinfo();
  }

  createLine() {
    this.element = document.createElement("div");
    this.element.className = "line-container";

    this.lineLine = document.createElement("div");
    this.lineLine.className = "line-line";

    const cliente = document.createElement("input");
    cliente.type = "text";
    cliente.id = this.LineNum;
    cliente.placeholder = "Cliente...";
    cliente.value = this.cliente;

    const button = document.createElement("button");
    button.title="Crear una fila nueva";
    button.className = "button-line";
    
    const icon = document.createElement("img");
    icon.src= "assets/plus-circle-svgrepo-com.svg";
    icon.className = "iconn";
    button.appendChild(icon);

    this.childrenContainer = document.createElement("div");

    button.addEventListener("click", () => {
      this.count++;
      new Info(this.childrenContainer,this.LineNum,this.count);
    });
    
    this.element.appendChild(this.lineLine);
    this.lineLine.appendChild(cliente);
    this.lineLine.appendChild(button);
    this.element.appendChild(this.childrenContainer);
    
    this.parent.appendChild(this.element);
  }
  autoinfo() {
  
    Object.values(this.datos).forEach(element => {
      this.count++;
      new Info(this.childrenContainer,this.LineNum,this.count,element['diseno'],element['medida'],element['cantidad']);
    });
  }
}

var data = {};
var saveFile = {};
var LinesCount = 0;
const jsonStringGet = localStorage.getItem('llantasApp');

if(jsonStringGet==null){
  console.log('No se pudo compa lo siento')

}else{
  data = JSON.parse(jsonStringGet);
}

const container = document.getElementById("container");
const mainButton = document.getElementById("newBtn");
const saveButton = document.getElementById("saveBtn");
const sideba = document.getElementById("sidebar");

var LINES = [];

mainButton.addEventListener("click", () => {
  LinesCount++;
  LINES.push(new Line(container,LinesCount));
});

saveButton.addEventListener("click", () => {
  i=1;
  LINES.forEach((lain) => {
    var co = lain.count;
    var naem = document.getElementById(`${i}`).value;
    
    saveFile[naem]={};

    for (let j = 0; j < co; j++){
      saveFile[naem][j]={ 
        diseno: document.getElementById(`s${i}${j+1}`).value, 
        medida: document.getElementById(`z${i}${j+1}`).value, 
        cantidad: document.getElementById(`${i}${j+1}`).value
      };
    }
    i++;
  }); 

  var today = new Date();


  var month,day,year;
  year = today.getFullYear();
  month = today.getMonth() + 1;
  day = today.getDate();  

  let keyId = parseInt(`${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`)
  
  data[keyId] = saveFile;

  const jsonString = JSON.stringify(data);
  localStorage.setItem(`llantasApp`, jsonString);

  updatePage();
  
});

function updateSidebar(){
  document.getElementById('sidebar').innerHTML = '';
  Object.keys(data).forEach(key => {
    const pap = document.createElement("div");
    pap.textContent = key;
    pap.addEventListener("click", () => {
      updateContent(key);
    });
    sideba.appendChild(pap);
  });
}

function updateContent(papid=''){
  if (papid !== ''){
    document.getElementById('container').innerHTML= '';
    const cntnr = document.getElementById('container');
    
    var LinCou= 0;
    Object.keys(data[papid]).forEach(client => {

      LinCou++;
      new Line(cntnr,LinCou,client,data[papid][client]);

    });

  //new Line(container,LinesCount);
  }
}

function updatePage(){
  updateSidebar();
  updateContent();
}

function myFunction() {
  alert("IT WORRRKSSS!");
}

updatePage();


