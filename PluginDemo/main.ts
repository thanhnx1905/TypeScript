$(function () {
  new Main();
});

class Main {
  lstHeader: Array<TableHeader> = [];
  lstDataSource: Array<DataSource> = [];
  constructor() {
    let self = this;
    self.mockData();
    self.createData();
  }

  createData(): any {
    let self = this;
    let object: any = {
      header: self.lstHeader,
      dataSource: self.lstDataSource
    }
    new demo.plugin.Table($("#table")[0], object);
    //$("#table").loadTable(object);
  }

  mockData(): void {
    let self = this;
    for (let i = 0; i < 10; i++) {
      self.lstHeader.push(new TableHeader("A" + i, "Cot" + i, i == 5 ? self.inputProcess : null));
    }

    for (let i = 0; i < 20; i++) {
      let arrayValue: any = [];
      for (let j = 0; j < 10; j++) {
        arrayValue.push({ id: "A" + j, value: "Val" + j + i });
      }
      self.lstDataSource.push(new DataSource("r" + i, arrayValue));
    }
  }

  inputProcess(): JQueryPromise<any> {
    let dfd = $.Deferred();
    _.defer(() => {
      dfd.resolve("10:00");
    }, 1000);

    return dfd.promise();
  }

}

class DataSource {
  rowId: any;
  valueCells: Array<any> = [];
  constructor(rowId: any, valueCells: Array<any>) {
    this.rowId = rowId;
    this.valueCells = valueCells;
  }

}

class TableHeader {
  id: any;
  headerName: any;
  inputProcess: any;
  constructor(id: any, headerName: any, inputProcess: any) {
    this.id = id;
    this.headerName = headerName;
    this.inputProcess = inputProcess;
  }
}