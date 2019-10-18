var demo;
(function (demo) {
    var plugin;
    (function (plugin) {
        var _lstCellUpdate = [], _lstDataSource = [];
        var Table = /** @class */ (function () {
            function Table(container, option) {
                this.lstHeader = [];
                this.dataSource = [];
                this.lstRowUpdate = [];
                var self = this;
                self.lstHeader = option.header;
                _lstDataSource = self.dataSource = option.dataSource;
                self.option = container;
                self.init();
                self.createEvent();
            }
            Table.prototype.init = function () {
                var self = this;
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
                        table_body += '<div class="row_data" edit_type="click" col_name=' + self.lstHeader[j].id + '>' + self.dataSource[i].valueCells[j].value + '</div>';
                        table_body += '</td>';
                    }
                    table_body += '</tr>';
                }
                table_body += '</table>';
                //self.option.outerHTML = table_body;
                $("#" + self.option.id).html(table_body);
                $("#" + self.option.id).loadTable();
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
                    var row_id = $(this).closest('tr').attr('row_id'), row_div = $(this), id = row_div.attr("col_name"), value = row_div.html();
                    var inHeader = _.find(self.lstHeader, function (value) {
                        return value.id == id;
                    });
                    if (inHeader && inHeader.inputProcess) {
                        var process_1 = inHeader.inputProcess;
                        process_1().done(function (valueResolve) {
                            alert(valueResolve);
                        });
                    }
                    var cell = _.find(self.lstRowUpdate, function (value) {
                        if (value.id == id && value.rowId == row_id) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                    if (cell) {
                        _.remove(self.lstRowUpdate, function (item) {
                            return item.id == id && item.rowId == row_id;
                        });
                    }
                    else {
                        self.lstRowUpdate.push(new CellUpdate(row_id, id, value));
                    }
                    _lstCellUpdate = self.lstRowUpdate;
                    self.changeDataSource(row_id, id, value);
                });
                $(".header").resize(function (event, ui) {
                    console.log(ui);
                });
                $('.header').bind('resize', function () {
                    console.log('resized');
                });
            };
            Table.prototype.changeDataSource = function (rowId, id, value) {
                var self = this;
                _.map(self.dataSource, function (a) {
                    if (a.rowId != rowId) {
                        return a;
                    }
                    a.valueCells = _.map(a.valueCells, function (cell) {
                        return cell.id == id ? new Cell(id, value) : cell;
                    });
                    return a;
                });
                _lstDataSource = self.dataSource;
            };
            return Table;
        }());
        plugin.Table = Table;
        var Cell = /** @class */ (function () {
            function Cell(id, value) {
                this.id = id;
                this.value = value;
            }
            return Cell;
        }());
        var CellUpdate = /** @class */ (function () {
            function CellUpdate(rowId, id, value) {
                this.id = id;
                this.rowId = rowId;
                this.value = value;
            }
            return CellUpdate;
        }());
        (function ($) {
            // $.fn.loadTable = function (option: TableCommon.TableOption): any {
            //     option.option = this;
            //     var widget = new TableCommon.Table(option);
            //     return widget;
            // }
            function makeResizableDiv(div) {
                var element = document.querySelector(div);
                var resizers = document.querySelectorAll(div + ' .resizer');
                var _loop_1 = function (i) {
                    var currentResizer = resizers[i];
                    currentResizer.addEventListener('mousedown', function (e) {
                        e.preventDefault();
                        window.addEventListener('mousemove', resize);
                        window.addEventListener('mouseup', stopResize);
                    });
                    function resize(e) {
                        if (currentResizer.classList.contains('bottom-right')) {
                            element.style.width = e.pageX - element.getBoundingClientRect().left + 'px';
                        }
                    }
                    function stopResize() {
                        window.removeEventListener('mousemove', resize);
                    }
                };
                for (var i = 0; i < resizers.length; i++) {
                    _loop_1(i);
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
                _dragging: function (event, ui) {
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
                dataSource: function () {
                    return _lstDataSource;
                }
            });
        }(jQuery));
    })(plugin = demo.plugin || (demo.plugin = {}));
})(demo || (demo = {}));
//# sourceMappingURL=table.js.map