$(function(){ 
    new Main();
});

class Main{
  constructor(){
    let self = this;
    this.createData();
  }

  createData(): any{
    let object: any =  {
        header: ["CotA", "CotB", "CotC", "CotD"],
        dataSource: [
            ["ValA", "ValB", "ValC", "ValD"],
            ["ValA2", "Val2", "ValC1", "ValD1",]
        ]
    }
    $("#table").loadTable(object);   
  }
  
}