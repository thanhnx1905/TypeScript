//import * as $ from "jquery";
module TableCommon {
    export class Table {

        lstHeader: Array<string> = [];
        dataSource: any = [];
        option: any;

        constructor(option: TableOption) {
            let self = this;
            self.lstHeader = option.header;
            self.dataSource = option.dataSource;
            self.option = option.option;
            self.init();
        }

        init(): any {
            let self = this;
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
        }
    }

    export interface TableOption {
        header: Array<string>;
        dataSource: Array<Array<string>>;
        option: any;
    }
    interface DataSource {

    }
}
interface JQuery <TElement>{
    loadTable(option: TableCommon.TableOption): TableCommon.TableOption;
}

(function ($: any) {
    $.fn.loadTable = function (option: TableCommon.TableOption): any {
        option.option = this;
        var widget = new TableCommon.Table(option);

        // Return.
        return widget;
    }
}(jQuery));
