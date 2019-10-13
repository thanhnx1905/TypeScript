//import * as $ from "jquery";
var TableCommon;
(function (TableCommon) {
    var Table = /** @class */ (function () {
        function Table(option) {
            this.lstHeader = [];
            this.dataSource = [];
            var self = this;
            self.lstHeader = option.header;
            self.dataSource = option.dataSource;
            self.option = option.option;
            self.init();
        }
        Table.prototype.init = function () {
            var self = this;
            var table_body = '<table border="1">';
            table_body += '<tr>';
            for (var j = 0; j < self.lstHeader.length; j++) {
                table_body += '<td>';
                table_body += self.lstHeader[j];
                table_body += '</td>';
            }
            table_body += '</tr>';
            for (var i = 0; i < self.dataSource.length; i++) {
                table_body += '<tr>';
                for (var j = 0; j < self.dataSource[i].length; j++) {
                    table_body += '<td>';
                    table_body += self.dataSource[i][j];
                    table_body += '</td>';
                }
                table_body += '</tr>';
            }
            table_body += '</table>';
            self.option.html(table_body);
        };
        return Table;
    }());
    TableCommon.Table = Table;
})(TableCommon || (TableCommon = {}));
(function ($) {
    $.fn.loadTable = function (option) {
        option.option = this;
        var widget = new TableCommon.Table(option);
        // Return.
        return widget;
    };
}(jQuery));
//# sourceMappingURL=table.js.map