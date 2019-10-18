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
            self.lstHeader.push(new TableHeader("A" + i, "Cot" + i, i == 5 ? self.inputProcess : null));
        }
        for (var i = 0; i < 20; i++) {
            var arrayValue = [];
            for (var j = 0; j < 10; j++) {
                arrayValue.push({ id: "A" + j, value: "Val" + j + i });
            }
            self.lstDataSource.push(new DataSource("r" + i, arrayValue));
        }
    };
    Main.prototype.inputProcess = function () {
        var dfd = $.Deferred();
        _.defer(function () {
            dfd.resolve("10:00");
        }, 1000);
        return dfd.promise();
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
    function TableHeader(id, headerName, inputProcess) {
        this.id = id;
        this.headerName = headerName;
        this.inputProcess = inputProcess;
    }
    return TableHeader;
}());
//# sourceMappingURL=main.js.map