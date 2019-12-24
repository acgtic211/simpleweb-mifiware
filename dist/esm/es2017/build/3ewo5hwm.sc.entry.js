import { h } from '../app.core.js';

class SocketIoService {
    constructor(path) {
        this.lib = false;
        if (SocketIoService.instance) {
            throw new Error("Error - use SocketIoService.getInstance()");
        }
        this.path = path;
        this.attachLibrary();
    }
    static getInstance(path = "/assets/lib/socket.io.js") {
        SocketIoService.instance = SocketIoService.instance || new SocketIoService(path);
        return SocketIoService.instance;
    }
    attachLibrary() {
        if (!this.lib) {
            const scriptTag = document.createElement('script');
            scriptTag.src = this.path;
            document.querySelector('head').appendChild(scriptTag);
            this.ensureIoPresent().then(function () {
                this._io = window['io'];
                this._socket = this._io('http://localhost:3000');
                this.lib = true;
            }.bind(this));
        }
    }
    ensureIoPresent() {
        const waitForIo = (resolve) => {
            if (window['io'] !== undefined) {
                return resolve();
            }
            setTimeout(waitForIo, 30, resolve);
        };
        return new Promise(function (resolve) {
            waitForIo(resolve);
        }.bind(this));
    }
    ensureSocketPresent() {
        const waitForSocket = (resolve) => {
            if (this._socket !== undefined) {
                return resolve();
            }
            setTimeout(waitForSocket, 30, resolve);
        };
        return new Promise(function (resolve) {
            waitForSocket(resolve);
        }.bind(this));
    }
    onSocketReady(callback) {
        return this.ensureIoPresent().then(function () {
            callback();
        }.bind(this));
    }
    onSocket(identifier, callback) {
        this.ensureSocketPresent().then(function () {
            this._socket.on(identifier, callback);
        }.bind(this));
    }
    emitSocket(identifier, payload) {
        console.log(identifier, payload);
        this.ensureSocketPresent().then(function () {
            this._socket.emit(identifier, payload);
        }.bind(this));
    }
    socket() {
        return this._socket;
    }
}

class AppTable {
    constructor() {
        this._socketService = SocketIoService.getInstance();
        this._socketService;
        this.list = [];
    }
    componentWillLoad() {
        fetch('http://' + this.service_url + ':3000/subscription?entity=' + this.type + '&id=' + this.id)
            .then((response) => response.json())
            .then(response => {
            this.list = JSON.parse(JSON.stringify(response)).entities;
        });
    }
    componentDidLoad() {
        this._socketService.onSocketReady(() => {
            this._socketService.onSocket(this.type + "-" + this.id, (msg) => {
                this.list = JSON.parse(JSON.stringify(msg)).entities;
            });
        });
    }
    render() {
        return (h("div", { class: "container body" },
            h("div", { class: "table-wrapper" },
                h("div", { class: "table-title" },
                    h("div", { class: "row" },
                        h("div", { class: "col-sm-6" },
                            h("h2", null,
                                h("b", null, this.type),
                                " Devices")))),
                h("table", { class: "table table-striped table-hover" },
                    h("thead", null,
                        h("tr", null,
                            h("th", null,
                                h("span", { class: "custom-checkbox" },
                                    h("input", { type: "checkbox", id: "selectAll" }),
                                    h("label", { htmlFor: "selectAll" }))),
                            h("th", null, "Name"),
                            this.list.length > 0 ? this.list[0].values.map((entityValue) => h("th", null, entityValue.name)) : h("th", null, "No items found"))),
                    h("tbody", null, this.list.map((entity) => h("tr", null,
                        h("td", null,
                            h("span", { class: "custom-checkbox" },
                                h("input", { type: "checkbox", id: "checkbox2", name: "options[]", value: "1" }),
                                h("label", { htmlFor: "checkbox2" }))),
                        h("td", null, entity.name),
                        entity.values.map((entityValue) => h("td", null, entityValue.value)))))),
                h("div", { class: "clearfix" },
                    h("div", { class: "hint-text" },
                        "Showing ",
                        h("b", null, this.list.length),
                        " out of ",
                        h("b", null, this.list.length),
                        " entries"),
                    h("ul", { class: "pagination" },
                        h("li", { class: "page-item disabled" },
                            h("a", { href: "#" }, "Previous")),
                        h("li", { class: "page-item active" },
                            h("a", { href: "#", class: "page-link" }, "1")),
                        h("li", { class: "page-item" },
                            h("a", { href: "#", class: "page-link" }, "Next")))))));
    }
    static get is() { return "app-table"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "id": {
            "type": String,
            "attr": "id"
        },
        "list": {
            "state": true
        },
        "service_url": {
            "type": String,
            "attr": "service_url"
        },
        "type": {
            "type": String,
            "attr": "type"
        }
    }; }
    static get style() { return ".body.sc-app-table{color:#566787;background:#f5f5f5;font-family:Varela Round,sans-serif;font-size:13px}table.sc-app-table{width:100%;max-width:100%;margin-bottom:20px;border-spacing:0;border-collapse:collapse}.table-wrapper.sc-app-table{background:#fff;padding:20px 25px;margin:30px 0;border-radius:3px}.table-title.sc-app-table{background:#435d7d;color:#fff;padding:16px 30px;border-radius:6px}.table-title.sc-app-table   h2.sc-app-table{margin:5px 0 0;font-size:24px}.table-title.sc-app-table   .btn-group.sc-app-table{float:right}.table-title.sc-app-table   .btn.sc-app-table{color:#fff;float:right;font-size:13px;min-width:50px;border-radius:2px;border:none;outline:none!important;margin-left:10px}.table-title.sc-app-table   .btn.sc-app-table   i.sc-app-table{float:left;font-size:21px;margin-right:5px}.table-title.sc-app-table   .btn.sc-app-table   span.sc-app-table{float:left;margin-top:2px}.table.sc-app-table   tr.sc-app-table   td.sc-app-table, .table.sc-app-table   tr.sc-app-table   th.sc-app-table{border-color:#e9e9e9!important;padding:12px 15px!important;vertical-align:middle!important}.table.sc-app-table   tr.sc-app-table   th.sc-app-table:first-child{width:3%}.table.sc-app-table   tr.sc-app-table   th.sc-app-table:last-child{width:100px}.table-striped.sc-app-table   tbody.sc-app-table   tr.sc-app-table:nth-of-type(odd){background-color:#fcfcfc}.table-striped.table-hover.sc-app-table   tbody.sc-app-table   tr.sc-app-table:hover{background:#f5f5f5}.table.sc-app-table   thead.sc-app-table   tr.sc-app-table   th.sc-app-table{vertical-align:bottom;border-bottom:2px solid #ddd}.table.sc-app-table   tr.sc-app-table   th.sc-app-table{border-color:#e9e9e9;padding:12px 15px;vertical-align:middle}.table.sc-app-table   th.sc-app-table   i.sc-app-table{font-size:13px;margin:0 5px;cursor:pointer}th.sc-app-table{text-align:left}.table.sc-app-table   tbody.sc-app-table   tr.sc-app-table   td.sc-app-table{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}.table.sc-app-table   td.sc-app-table:last-child   i.sc-app-table{opacity:.9;font-size:22px;margin:0 5px}.table.sc-app-table   td.sc-app-table   a.sc-app-table{font-weight:700;color:#566787;display:inline-block;text-decoration:none;outline:none!important}.table.sc-app-table   td.sc-app-table   a.sc-app-table:hover{color:#2196f3}.table.sc-app-table   td.sc-app-table   a.edit.sc-app-table{color:#ffc107}.table.sc-app-table   td.sc-app-table   a.delete.sc-app-table{color:#f44336}.table.sc-app-table   td.sc-app-table   i.sc-app-table{font-size:19px}.table.sc-app-table   .avatar.sc-app-table{border-radius:50%;vertical-align:middle;margin-right:10px}.pagination.sc-app-table{float:right;margin:0 0 5px}.pagination.sc-app-table   .active.sc-app-table   a.sc-app-table{z-index:3;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7}.pagination.sc-app-table   li.sc-app-table{display:inline}.pagination.sc-app-table   li.sc-app-table   a.sc-app-table{border:none;font-size:13px;min-width:30px;min-height:30px;color:#999;margin:0 2px;line-height:30px;border-radius:2px!important;text-align:center;padding:0 6px;position:relative;float:left;text-decoration:none;background-color:#fff}.pagination.sc-app-table   li.sc-app-table   a.sc-app-table:hover{color:#666}.pagination.sc-app-table   li.active.sc-app-table   a.sc-app-table, .pagination.sc-app-table   li.active.sc-app-table   a.page-link.sc-app-table{background:#03a9f4}.pagination.sc-app-table   li.active.sc-app-table   a.sc-app-table:hover{background:#0397d6}.pagination.sc-app-table   li.disabled.sc-app-table   i.sc-app-table{color:#ccc}.pagination.sc-app-table   li.sc-app-table   i.sc-app-table{font-size:16px;padding-top:6px}.hint-text.sc-app-table{float:left;margin-top:10px;font-size:13px}.custom-checkbox.sc-app-table{position:relative}.custom-checkbox.sc-app-table   input[type=checkbox].sc-app-table{opacity:0;position:absolute;margin:5px 0 0 3px;z-index:9}.custom-checkbox.sc-app-table   label.sc-app-table:before{width:18px;height:18px;content:\"\";margin-right:10px;display:inline-block;vertical-align:text-top;background:#fff;border:1px solid #bbb;border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:2}.custom-checkbox.sc-app-table   input[type=checkbox].sc-app-table:checked + label.sc-app-table:after{content:\"\";position:absolute;left:6px;top:3px;width:6px;height:11px;border:solid #000;border-width:0 3px 3px 0;-webkit-transform:inherit;transform:inherit;z-index:3;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.custom-checkbox.sc-app-table   input[type=checkbox].sc-app-table:checked + label.sc-app-table:before{border-color:#03a9f4;background:#03a9f4}.custom-checkbox.sc-app-table   input[type=checkbox].sc-app-table:checked + label.sc-app-table:after{border-color:#fff}.custom-checkbox.sc-app-table   input[type=checkbox].sc-app-table:disabled + label.sc-app-table:before{color:#b8b8b8;cursor:auto;-webkit-box-shadow:none;box-shadow:none;background:#ddd}.modal.sc-app-table   .modal-dialog.sc-app-table{max-width:400px}.modal.sc-app-table   .modal-body.sc-app-table, .modal.sc-app-table   .modal-footer.sc-app-table, .modal.sc-app-table   .modal-header.sc-app-table{padding:20px 30px}.modal.sc-app-table   .modal-content.sc-app-table{border-radius:3px}.modal.sc-app-table   .modal-footer.sc-app-table{background:#ecf0f1;border-radius:0 0 3px 3px}.modal.sc-app-table   .modal-title.sc-app-table{display:inline-block}.modal.sc-app-table   .form-control.sc-app-table{border-radius:2px;-webkit-box-shadow:none;box-shadow:none;border-color:#ddd}.modal.sc-app-table   textarea.form-control.sc-app-table{resize:vertical}.modal.sc-app-table   .btn.sc-app-table{border-radius:2px;min-width:100px}.modal.sc-app-table   form.sc-app-table   label.sc-app-table{font-weight:400}"; }
}

export { AppTable };
