module demo.plugin {
    let _lstCellUpdate: any = [];
    export class Table {

        lstHeader: Array<TableHeader> = [];
        dataSource: Array<DataSource> = [];
        option: any;
        lstRowUpdate: Array<CellUpdate> = [];

        constructor(container: HTMLElement, option: TableOption) {
            let self = this;
            self.lstHeader = option.header;
            self.dataSource = option.dataSource;
            self.option = container;
            self.init();
            self.createEvent();
        }

        private init(): any {
            let self = this;
            var table_body = '<table id =' + self.option.id+ '>';
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
            //self.option.outerHTML = table_body;
            $("#"+self.option.id).html(table_body);  
            $("#"+self.option.id).loadTable();
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
                let row_id: any = $(this).closest('tr').attr('row_id'),
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
                    _.remove(self.lstRowUpdate, (item) =>{
                        return item.id == id && item.rowId == row_id;
                    });
                } else {
                    self.lstRowUpdate.push(new CellUpdate(row_id, id, value));
                }
                _lstCellUpdate = self.lstRowUpdate;

            });
        }

        // public loadTable(option: any) {
        //     let self = this;
        //     if (option == 'cellUpdates') {
        //         return self.lstRowUpdate;
        //     } else {
        //         return [];
        //     }
        // }
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

    (function ($: any) {
        // $.fn.loadTable = function (option: TableCommon.TableOption): any {
        //     option.option = this;
        //     var widget = new TableCommon.Table(option);
        //     return widget;
        // }
    
        $.widget('nt.loadTable', {
            options: {
                value: 0
            },
            _create: function (data) {
                console.log(data);
                //this.options.value = data.value;
            },
            _destroy: function (data) {
                console.log(data);
            },
            _setOption: function (key, value) {
                console.log(key);
                console.log(value);
            },
            _init: function(data){
                console.log(data);
            },
    
            cellUpdates: function () {
                return _lstCellUpdate;
             },
        });


    
    }(jQuery));

}
interface JQuery<TElement> {
    loadTable(option: demo.plugin.TableOption): demo.plugin.TableOption;
}

// (function ($: any) {
//     // $.fn.loadTable = function (option: TableCommon.TableOption): any {
//     //     option.option = this;
//     //     var widget = new TableCommon.Table(option);
//     //     return widget;
//     // }

//     $.widget('nt.loadTable', {
//         options: function (data){
//             console.log(data);
//         },
//         _create: function (data) {
//            console.log(data);
//         },
//         _destroy: function (data) {
//             console.log(data);
//         },
//         _setOption: function (key, value) {
//             console.log(key);
//             console.log(value);
//         },

//         cellUpdates: function () {
//             return demo.plugin._lstCellUpdate;
//          },
//     });

// }(jQuery));
