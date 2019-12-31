import{h}from"../app.core.js";var SocketIoService=function(){function t(e){if(this.lib=!1,t.instance)throw new Error("Error - use SocketIoService.getInstance()");this.path=e,this.attachLibrary()}return t.getInstance=function(e){return void 0===e&&(e="dist/collection/assets/lib/socket.io.js"),t.instance=t.instance||new t(e)},t.prototype.attachLibrary=function(){if(!this.lib){var t=document.createElement("script");t.src=this.path,document.querySelector("head").appendChild(t),this.ensureIoPresent().then(function(){this._io=window.io,this._socket=this._io("http://localhost:3000"),this.lib=!0}.bind(this))}},t.prototype.ensureIoPresent=function(){var t=function(e){if(void 0!==window.io)return e();setTimeout(t,30,e)};return new Promise(function(e){t(e)}.bind(this))},t.prototype.ensureSocketPresent=function(){var t=this,e=function(n){if(void 0!==t._socket)return n();setTimeout(e,30,n)};return new Promise(function(t){e(t)}.bind(this))},t.prototype.onSocketReady=function(t){return this.ensureIoPresent().then(function(){t()}.bind(this))},t.prototype.onSocket=function(t,e){this.ensureSocketPresent().then(function(){this._socket.on(t,e)}.bind(this))},t.prototype.emitSocket=function(t,e){console.log(t,e),this.ensureSocketPresent().then(function(){this._socket.emit(t,e)}.bind(this))},t.prototype.socket=function(){return this._socket},t}(),AppTable=function(){function t(){this._socketService=SocketIoService.getInstance(),this.list=[]}return t.prototype.componentWillLoad=function(){var t=this;fetch("http://"+this.service_url+":3000/subscription?entity="+this.type+"&id="+this.entityid).then(function(t){return t.json()}).then(function(e){t.list=JSON.parse(JSON.stringify(e)).entities})},t.prototype.componentDidLoad=function(){var t=this;this._socketService.onSocketReady(function(){t._socketService.onSocket(t.type+"-"+t.entityid,function(e){t.list=JSON.parse(JSON.stringify(e)).entities})})},t.prototype.render=function(){var t=this;return h("div",{class:"container body"},h("div",{class:"table-wrapper"},h("div",{class:"table-title"},h("div",{class:"row"},h("div",{class:"col-sm-6"},h("h2",null,h("b",null,this.type)," Devices")))),h("table",{class:"table table-striped table-hover"},h("thead",null,h("tr",null,h("th",null,h("span",{class:"custom-checkbox"},h("input",{type:"checkbox",id:"selectAll"}),h("label",{htmlFor:"selectAll"}))),h("th",null,"Name"),this.list.length>0?this.list[0].values.map(function(t){return h("th",null,t.name)}):h("th",null,"No items found"))),h("tbody",null,this.list.map(function(e){return h("tr",null,h("td",null,h("span",{class:"custom-checkbox"},h("input",{type:"checkbox",id:"checkbox2",name:"options[]",value:"1"}),h("label",{htmlFor:"checkbox2"}))),h("td",null,e.name),e.values.map(function(t){return h("td",null,t.value)}),""==t.entityid?h("td",{class:"button-td"},h("a",{href:t.page_url+"?id="+e.name,class:" next round"},"›")):h("td",{class:"no-display"}))}))),h("div",{class:"clearfix"},h("div",{class:"hint-text"},"Showing ",h("b",null,this.list.length)," out of ",h("b",null,this.list.length)," entries"),h("ul",{class:"pagination"},h("li",{class:"page-item disabled"},h("a",{href:"#"},"Previous")),h("li",{class:"page-item active"},h("a",{href:"#",class:"page-link"},"1")),h("li",{class:"page-item"},h("a",{href:"#",class:"page-link"},"Next"))))))},Object.defineProperty(t,"is",{get:function(){return"app-table"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{entityid:{type:String,attr:"entityid"},list:{state:!0},page_url:{type:String,attr:"page_url"},service_url:{type:String,attr:"service_url"},type:{type:String,attr:"type"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".body{color:#566787;background:#f5f5f5;font-family:Varela Round,sans-serif;font-size:13px}table{width:100%;max-width:100%;margin-bottom:20px;border-spacing:0;border-collapse:collapse}.table-wrapper{background:#fff;padding:20px 25px;margin:30px 0;border-radius:3px}.table-title{background:#435d7d;color:#fff;padding:16px 30px;border-radius:6px}.table-title h2{margin:5px 0 0;font-size:24px}.table-title .btn-group{float:right}.table-title .btn{color:#fff;float:right;font-size:13px;min-width:50px;border-radius:2px;border:none;outline:none!important;margin-left:10px}.table-title .btn i{float:left;font-size:21px;margin-right:5px}.table-title .btn span{float:left;margin-top:2px}.table tr td,.table tr th{border-color:#e9e9e9!important;padding:12px 15px!important;vertical-align:middle!important}.table tr th:first-child,.table tr th:last-child{width:3%}.table-striped tbody tr:nth-of-type(odd){background-color:#fcfcfc}.table-striped.table-hover tbody tr:hover{background:#f5f5f5}.table thead tr th{vertical-align:bottom;border-bottom:2px solid #ddd}.table tr th{border-color:#e9e9e9;padding:12px 15px;vertical-align:middle}.table th i{font-size:13px;margin:0 5px;cursor:pointer}th{text-align:left}.table tbody tr td{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}.table td:last-child i{opacity:.9;font-size:22px;margin:0 5px}.table td a{font-weight:700;color:#566787;display:inline-block;text-decoration:none;outline:none!important}.table td a:hover{color:#2196f3}.table td a.edit{color:#ffc107}.table td a.delete{color:#f44336}.table td i{font-size:19px}.table .avatar{border-radius:50%;vertical-align:middle;margin-right:10px}.pagination{float:right;margin:0 0 5px}.pagination .active a{z-index:3;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7}.pagination li{display:inline}.pagination li a{border:none;font-size:13px;min-width:30px;min-height:30px;color:#999;margin:0 2px;line-height:30px;border-radius:2px!important;text-align:center;padding:0 6px;position:relative;float:left;text-decoration:none;background-color:#fff}.pagination li a:hover{color:#666}.pagination li.active a,.pagination li.active a.page-link{background:#03a9f4}.pagination li.active a:hover{background:#0397d6}.pagination li.disabled i{color:#ccc}.pagination li i{font-size:16px;padding-top:6px}.hint-text{float:left;margin-top:10px;font-size:13px}.custom-checkbox{position:relative}.custom-checkbox input[type=checkbox]{opacity:0;position:absolute;margin:5px 0 0 3px;z-index:9}.custom-checkbox label:before{width:18px;height:18px;content:\"\";margin-right:10px;display:inline-block;vertical-align:text-top;background:#fff;border:1px solid #bbb;border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:2}.custom-checkbox input[type=checkbox]:checked+label:after{content:\"\";position:absolute;left:6px;top:3px;width:6px;height:11px;border:solid #000;border-width:0 3px 3px 0;-webkit-transform:inherit;transform:inherit;z-index:3;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.custom-checkbox input[type=checkbox]:checked+label:before{border-color:#03a9f4;background:#03a9f4}.custom-checkbox input[type=checkbox]:checked+label:after{border-color:#fff}.custom-checkbox input[type=checkbox]:disabled+label:before{color:#b8b8b8;cursor:auto;-webkit-box-shadow:none;box-shadow:none;background:#ddd}.modal .modal-dialog{max-width:400px}.modal .modal-body,.modal .modal-footer,.modal .modal-header{padding:20px 30px}.modal .modal-content{border-radius:3px}.modal .modal-footer{background:#ecf0f1;border-radius:0 0 3px 3px}.modal .modal-title{display:inline-block}.modal .form-control{border-radius:2px;-webkit-box-shadow:none;box-shadow:none;border-color:#ddd}.modal textarea.form-control{resize:vertical}.modal .btn{border-radius:2px;min-width:100px}.modal form label{font-weight:400}:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.next{background-color:#03a9f4;color:#fff!important}.round{border-radius:50%}a{text-decoration:none;display:inline-block;padding:8px 16px}a:hover{background-color:#337ab7;color:#000}.button-td{width:10px}.no-display{display:none}"},enumerable:!0,configurable:!0}),t}();export{AppTable};