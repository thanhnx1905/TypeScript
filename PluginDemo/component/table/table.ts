module TableCommon {
    export class Table {

        lstHeader: Array<TableHeader> = [];
        dataSource: Array<DataSource> = [];
        option: any;
        lstRowUpdate: Array<CellUpdate> = [];

        constructor(option: TableOption) {
            let self = this;
            self.lstHeader = option.header;
            self.dataSource = option.dataSource;
            self.option = option.option;
            self.init();
            self.createEvent();
        }

        private init(): any {
            let self = this;
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
                    table_body += '<div class="row_data" edit_type="click" col_name=' + self.lstHeader[j].id + '>' + self.dataSource[i].valueCells[j] + '</div>'
                    table_body += '</td>';
                }
                table_body += '</tr>';
            }
            table_body += '</table>';
            self.option.html(table_body);
        }

        private createEvent(): any {
            let self = this;
            $(".row_data").click(function (event) {
                $(this).closest("div").attr('contenteditable', 'true');
                $(this).addClass('bg-warning').css('padding', '5px');
                $(this).focus();
            });

            $(".row_data").focusout(function () {
                $(this).removeClass('bg-warning').css('padding', '');
                let row_id: any = $(this).closest("tr"),
                    row_div = $(this),
                    id: any = row_div.attr("col_name"),
                    value: any = row_div.html();

                let cell: any = _.find(self.lstRowUpdate, (value: CellUpdate) => {
                    if (value.id == id && value.rowId == row_id) {
                        return true;
                    } else {
                        return false;
                    }
                });

                if (cell) {
                    _.remove(self.lstRowUpdate, cell);
                } else {
                    self.lstRowUpdate.push(new CellUpdate(row_id, id, value));
                }

            });
        }

        public loadTable(option: any) {
            let self = this;
            if (option == 'cellUpdates') {
                return self.lstRowUpdate;
            } else {
                return [];
            }
        }
    }

    export interface TableOption {
        header: Array<TableHeader>;
        dataSource: Array<DataSource>;
        option: any;
    }

    interface DataSource {
        rowId: any;
        valueCells: Array<any>;
    }

    interface TableHeader {
        id: any;
        headerName: any;
    }

    class CellUpdate {
        rowId: any;
        id: any;
        value: any;
        constructor(rowId: any, id: any, value: any) {
            this.id = id;
            this.rowId = rowId;
            this.value = value;
        }
    }
}
interface JQuery<TElement> {
    loadTable(option: TableCommon.TableOption): TableCommon.TableOption;
}

(function ($: any) {
    $.fn.loadTable = function (option: TableCommon.TableOption): any {
        option.option = this;
        var widget = new TableCommon.Table(option);
        return widget;
    }

    $.widget('nt.loadTable', $.fn.loadTable(this), {
        yourFunction: function () {
            console.log("aa");
        }
    });

}(jQuery));
