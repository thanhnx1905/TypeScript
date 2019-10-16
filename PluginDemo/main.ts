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
    $("#table").loadTable(object);
  }

  mockData(): void {
    let self = this;
    for (let i = 0; i < 10; i++) {
      self.lstHeader.push(new TableHeader("A" + i, "Cot" + i));
    }

    for (let i = 0; i < 20; i++) {
      let arrayValue: any = [];
      for (let j = 0; j < 10; j++) {
        arrayValue.push("Val" + j + i);
      }
      self.lstDataSource.push(new DataSource("r" + i, arrayValue));
    }
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
  constructor(id: any, headerName: any) {
    this.id = id;
    this.headerName = headerName;
  }
}