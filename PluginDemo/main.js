$(function () {
    new Main();
});
var Main = /** @class */ (function () {
    function Main() {
        var self = this;
        this.createData();
    }
    Main.prototype.createData = function () {
        var object = {
            header: ["CotA", "CotB", "CotC", "CotD"],
            dataSource: [
                ["ValA", "ValB", "ValC", "ValD"],
                ["ValA2", "Val2", "ValC1", "ValD1",]
            ]
        };
        $("#table").loadTable(object);
    };
    return Main;
}());
//# sourceMappingURL=main.js.map