var TireOptions = ['DLM','TA','ELO','TI','GRL','LDD','HPT','SA','WSA'];
var sizeOptions = [80,85,90,94,215];

class Info {
  constructor(parent,LineNum,count){
    this.parent = parent;
    this.id = `${LineNum}${count}`;
    this.createInfoLine();
  }
  createInfoLine() {
    this.element= document.createElement("div");
    this.element.className = "info-container";

    const select = document.createElement("select");
    select.id = `s${this.id}`;
    TireOptions.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.text = element;
        select.appendChild(option);
    });

    const sizesel = document.createElement("select");
    sizesel.id = `z${this.id}`;
    sizeOptions.forEach(element => {
      console.log(element)
        const option = document.createElement("option");
        option.value = element;
        option.text = element;
        sizesel.appendChild(option);
    });

    const  input = document.createElement("input");
    input.type = "number"
    input.id = this.id;
    input.placeholder = "Amount..";

    this.element.appendChild(select);
    this.element.appendChild(sizesel);
    this.element.appendChild(input);

    this.parent.appendChild(this.element);
  }
}

class Line {
  constructor(parent,LineCount) {
    this.parent = parent;
    this.LineNum = LineCount;
    this.count =0;
    this.createLine();
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

    const button = document.createElement("button");
    button.className = "button-line";
    button.textContent = "+";

    this.childrenContainer = document.createElement("div");

    button.addEventListener("click", () => {
      //new Line(this.childrenContainer);
      this.count++;
      new Info(this.childrenContainer,this.LineNum,this.count);
    });
    
    this.element.appendChild(this.lineLine);
    this.lineLine.appendChild(cliente);
    this.lineLine.appendChild(button);
    this.element.appendChild(this.childrenContainer);
    
    
    this.parent.appendChild(this.element);
  }
}

var data = {};
var LinesCount = 0;

const container = document.getElementById("container");
const mainButton = document.getElementById("newBtn");

mainButton.addEventListener("click", () => {
  LinesCount++;
  new Line(container,LinesCount);
});