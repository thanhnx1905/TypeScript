var TableCommon;
(function (TableCommon) {
    var Table = /** @class */ (function () {
        function Table(option) {
            this.lstHeader = [];
            this.dataSource = [];
            this.lstRowUpdate = [];
            var self = this;
            self.lstHeader = option.header;
            self.dataSource = option.dataSource;
            self.option = option.option;
            self.init();
            self.createEvent();
        }
        Table.prototype.init = function () {
            var self = this;
            var table_body = '<table>';
            table_body += '<tr>';
            for (var j = 0; j < self.lstHeader.length; j++) {
                table_body += '<th class = "header"  id = ' + self.lstHeader[j].id + ' >';
                table_body += self.lstHeader[j].headerName;
                table_body += '</th>';
            }
            table_body += '</tr>';
            for (var i = 0; i < self.dataSource.length; i++) {
                table_body += '<tr row_id =' + self.dataSource[i].rowId + ' >';
                for (var j = 0; j < self.dataSource[i].valueCells.length; j++) {
                    table_body += '<td>';
                    table_body += '<div class="row_data" edit_type="click" col_name=' + self.lstHeader[j].id + '>' + self.dataSource[i].valueCells[j] + '</div>';
                    table_body += '</td>';
                }
                table_body += '</tr>';
            }
            table_body += '</table>';
            self.option.html(table_body);
        };
        Table.prototype.createEvent = function () {
            var self = this;
            $(".row_data").click(function (event) {
                $(this).closest("div").attr('contenteditable', 'true');
                $(this).addClass('bg-warning').css('padding', '5px');
                $(this).focus();
            });
            $(".row_data").focusout(function () {
                $(this).removeClass('bg-warning').css('padding', '');
                var row_id = $(this).closest("tr"), row_div = $(this), id = row_div.attr("col_name"), value = row_div.html();
                var cell = _.find(self.lstRowUpdate, function (value) {
                    if (value.id == id && value.rowId == row_id) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                if (cell) {
                    _.remove(self.lstRowUpdate, cell);
                }
                else {
                    self.lstRowUpdate.push(new CellUpdate(row_id, id, value));
                }
            });
        };
        Table.prototype.loadTable = function (option) {
            var self = this;
            if (option == 'cellUpdates') {
                return self.lstRowUpdate;
            }
            else {
                return [];
            }
        };
        return Table;
    }());
    TableCommon.Table = Table;
    var CellUpdate = /** @class */ (function () {
        function CellUpdate(rowId, id, value) {
            this.id = id;
            this.rowId = rowId;
            this.value = value;
        }
        return CellUpdate;
    }());
})(TableCommon || (TableCommon = {}));
(function ($) {
    $.fn.loadTable = function (option) {
        option.option = this;
        var widget = new TableCommon.Table(option);
        return widget;
    };
}(jQuery));
//# sourceMappingURL=table.js.map