module demo.plugin {
    let _lstCellUpdate: any = [],
        _lstDataSource: any = [];

    export class Table {

        lstHeader: Array<TableHeader> = [];
        dataSource: Array<DataSource> = [];
        option: any;
        lstRowUpdate: Array<CellUpdate> = [];

        constructor(container: HTMLElement, option: TableOption) {
            let self = this;
            self.lstHeader = option.header;
            _lstDataSource = self.dataSource = option.dataSource;
            self.option = container;
            self.init();
            self.createEvent();
        }

        private init(): any {
            let self = this;
            var table_body = '<table id =' + self.option.id + '>';
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
                    table_body += '<div class="row_data" edit_type="click" col_name=' + self.lstHeader[j].id + '>' + self.dataSource[i].valueCells[j].value + '</div>'
                    table_body += '</td>';
                }
                table_body += '</tr>';
            }
            table_body += '</table>';
            //self.option.outerHTML = table_body;
            $("#" + self.option.id).html(table_body);
            $("#" + self.option.id).loadTable();
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

                let inHeader: TableHeader = _.find(self.lstHeader, (value) => {
                    return value.id == id;
                });

                if (inHeader && inHeader.inputProcess) {
                    let process = inHeader.inputProcess;
                    process().done((valueResolve: any) => {
                        alert(valueResolve);
                    })
                }

                let cell: any = _.find(self.lstRowUpdate, (value: CellUpdate) => {
                    if (value.id == id && value.rowId == row_id) {
                        return true;
                    } else {
                        return false;
                    }
                });

                if (cell) {
                    _.remove(self.lstRowUpdate, (item) => {
                        return item.id == id && item.rowId == row_id;
                    });

                } else {
                    self.lstRowUpdate.push(new CellUpdate(row_id, id, value));
                }

                _lstCellUpdate = self.lstRowUpdate;

                self.changeDataSource(row_id, id, value);

            });

            $(".header").resize((event: any, ui: any) => {
                console.log(ui);
            })

            $('.header').bind('resize', function () {
                console.log('resized');
            });
        }


        private changeDataSource(rowId: any, id: any, value: any): any {
            let self = this;
            _.map(self.dataSource, function (a) {
                if (a.rowId != rowId) {
                    return a;
                }
                a.valueCells = _.map(a.valueCells, (cell: Cell) => {
                    return cell.id == id ? new Cell(id, value) : cell;
                });
                return a;
            });
            _lstDataSource = self.dataSource;
        }
    }

    export interface TableOption {
        header: Array<TableHeader>;
        dataSource: Array<DataSource>;
        option: any;
    }

    interface DataSource {
        rowId: any;
        valueCells: Array<Cell>;
    }

    interface TableHeader {
        id: any;
        headerName: any;
        inputProcess: any;
    }

    class Cell {
        id: any;
        value: any;
        constructor(id: any, value: any) {
            this.id = id;
            this.value = value;
        }
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

        function makeResizableDiv(div) {
            const element = document.querySelector(div);
            const resizers = document.querySelectorAll(div + ' .resizer')
            for (let i = 0; i < resizers.length; i++) {
                const currentResizer = resizers[i];
                currentResizer.addEventListener('mousedown', function (e) {
                    e.preventDefault()
                    window.addEventListener('mousemove', resize)
                    window.addEventListener('mouseup', stopResize)
                })

                function resize(e) {
                    if (currentResizer.classList.contains('bottom-right')) {
                        element.style.width = e.pageX - element.getBoundingClientRect().left + 'px'
                    }
                }

                function stopResize() {
                    window.removeEventListener('mousemove', resize)
                }
            }
        }

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
            _init: function (data) {
                console.log(data);
            },
            _dragging: function (event: any, ui: any) {
                var data = $(ui.helper).data('position');
                var parent = $(ui.helper).data('parent');
                var width = 0;

                if (event.clientX < data.left) {
                    width = (parent.width() - (data.left - event.clientX));
                }
                else {
                    width = parent.width() + (event.clientX - data.left);
                }
                parent.css('width', width);
                data.width = width;
                data.left = event.clientX;
                $(ui.helper).data('position', data);
            },

            cellUpdates: function () {
                return _lstCellUpdate;
            },

            dataSource: () => {
                return _lstDataSource;
            }
        });
    }(jQuery));

}
interface JQuery<TElement> {
    loadTable(option: demo.plugin.TableOption): demo.plugin.TableOption;
}

