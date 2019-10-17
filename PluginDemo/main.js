$(function () {
    new Main();
});
var Main = /** @class */ (function () {
    function Main() {
        this.lstHeader = [];
        this.lstDataSource = [];
        var self = this;
        self.mockData();
        self.createData();
    }
    Main.prototype.createData = function () {
        var self = this;
        var object = {
            header: self.lstHeader,
            dataSource: self.lstDataSource
        };
        new demo.plugin.Table($("#table")[0], object);
        //$("#table").loadTable(object);
    };
    Main.prototype.mockData = function () {
        var self = this;
        for (var i = 0; i < 10; i++) {
            self.lstHeader.push(new TableHeader("A" + i, "Cot" + i));
        }
        for (var i = 0; i < 20; i++) {
            var arrayValue = [];
            for (var j = 0; j < 10; j++) {
                arrayValue.push("Val" + j + i);
            }
            self.lstDataSource.push(new DataSource("r" + i, arrayValue));
        }
    };
    return Main;
}());
var DataSource = /** @class */ (function () {
    function DataSource(rowId, valueCells) {
        this.valueCells = [];
        this.rowId = rowId;
        this.valueCells = valueCells;
    }
    return DataSource;
}());
var TableHeader = /** @class */ (function () {
    function TableHeader(id, headerName) {
        this.id = id;
        this.headerName = headerName;
    }
    return TableHeader;
}());
//# sourceMappingURL=main.js.map