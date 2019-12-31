const t=window.App.h;class e{constructor(t){if(this.lib=!1,e.instance)throw new Error("Error - use SocketIoService.getInstance()");this.path=t,this.attachLibrary()}static getInstance(t="dist/collection/assets/lib/socket.io.js"){return e.instance=e.instance||new e(t),e.instance}attachLibrary(){if(!this.lib){const t=document.createElement("script");t.src=this.path,document.querySelector("head").appendChild(t),this.ensureIoPresent().then(function(){this._io=window.io,this._socket=this._io("http://localhost:3000"),this.lib=!0}.bind(this))}}ensureIoPresent(){const t=e=>{if(void 0!==window.io)return e();setTimeout(t,30,e)};return new Promise(function(e){t(e)}.bind(this))}ensureSocketPresent(){const t=e=>{if(void 0!==this._socket)return e();setTimeout(t,30,e)};return new Promise(function(e){t(e)}.bind(this))}onSocketReady(t){return this.ensureIoPresent().then(function(){t()}.bind(this))}onSocket(t,e){this.ensureSocketPresent().then(function(){this._socket.on(t,e)}.bind(this))}emitSocket(t,e){console.log(t,e),this.ensureSocketPresent().then(function(){this._socket.emit(t,e)}.bind(this))}socket(){return this._socket}}class s{constructor(){this._socketService=e.getInstance(),this.list=[]}componentWillLoad(){fetch("http://"+this.service_url+":3000/subscription?entity="+this.type+"&id="+this.entityid).then(t=>t.json()).then(t=>{this.list=JSON.parse(JSON.stringify(t)).entities})}componentDidLoad(){this._socketService.onSocketReady(()=>{this._socketService.onSocket(this.type+"-"+this.entityid,t=>{this.list=JSON.parse(JSON.stringify(t)).entities})})}render(){return t("div",{class:"container body"},t("div",{class:"table-wrapper"},t("div",{class:"table-title"},t("div",{class:"row"},t("div",{class:"col-sm-6"},t("h2",null,t("b",null,this.type)," Devices")))),t("table",{class:"table table-striped table-hover"},t("thead",null,t("tr",null,t("th",null,t("span",{class:"custom-checkbox"},t("input",{type:"checkbox",id:"selectAll"}),t("label",{htmlFor:"selectAll"}))),t("th",null,"Name"),this.list.length>0?this.list[0].values.map(e=>t("th",null,e.name)):t("th",null,"No items found"))),t("tbody",null,this.list.map(e=>t("tr",null,t("td",null,t("span",{class:"custom-checkbox"},t("input",{type:"checkbox",id:"checkbox2",name:"options[]",value:"1"}),t("label",{htmlFor:"checkbox2"}))),t("td",null,e.name),e.values.map(e=>t("td",null,e.value)),""==this.entityid?t("td",{class:"button-td"},t("a",{href:this.page_url+"?id="+e.name,class:" next round"},"›")):t("td",{class:"no-display"}))))),t("div",{class:"clearfix"},t("div",{class:"hint-text"},"Showing ",t("b",null,this.list.length)," out of ",t("b",null,this.list.length)," entries"),t("ul",{class:"pagination"},t("li",{class:"page-item disabled"},t("a",{href:"#"},"Previous")),t("li",{class:"page-item active"},t("a",{href:"#",class:"page-link"},"1")),t("li",{class:"page-item"},t("a",{href:"#",class:"page-link"},"Next"))))))}static get is(){return"app-table"}static get encapsulation(){return"shadow"}static get properties(){return{entityid:{type:String,attr:"entityid"},list:{state:!0},page_url:{type:String,attr:"page_url"},service_url:{type:String,attr:"service_url"},type:{type:String,attr:"type"}}}static get style(){return".body{color:#566787;background:#f5f5f5;font-family:Varela Round,sans-serif;font-size:13px}table{width:100%;max-width:100%;margin-bottom:20px;border-spacing:0;border-collapse:collapse}.table-wrapper{background:#fff;padding:20px 25px;margin:30px 0;border-radius:3px}.table-title{background:#435d7d;color:#fff;padding:16px 30px;border-radius:6px}.table-title h2{margin:5px 0 0;font-size:24px}.table-title .btn-group{float:right}.table-title .btn{color:#fff;float:right;font-size:13px;min-width:50px;border-radius:2px;border:none;outline:none!important;margin-left:10px}.table-title .btn i{float:left;font-size:21px;margin-right:5px}.table-title .btn span{float:left;margin-top:2px}.table tr td,.table tr th{border-color:#e9e9e9!important;padding:12px 15px!important;vertical-align:middle!important}.table tr th:first-child,.table tr th:last-child{width:3%}.table-striped tbody tr:nth-of-type(odd){background-color:#fcfcfc}.table-striped.table-hover tbody tr:hover{background:#f5f5f5}.table thead tr th{vertical-align:bottom;border-bottom:2px solid #ddd}.table tr th{border-color:#e9e9e9;padding:12px 15px;vertical-align:middle}.table th i{font-size:13px;margin:0 5px;cursor:pointer}th{text-align:left}.table tbody tr td{padding:8px;line-height:1.42857143;vertical-align:top;border-top:1px solid #ddd}.table td:last-child i{opacity:.9;font-size:22px;margin:0 5px}.table td a{font-weight:700;color:#566787;display:inline-block;text-decoration:none;outline:none!important}.table td a:hover{color:#2196f3}.table td a.edit{color:#ffc107}.table td a.delete{color:#f44336}.table td i{font-size:19px}.table .avatar{border-radius:50%;vertical-align:middle;margin-right:10px}.pagination{float:right;margin:0 0 5px}.pagination .active a{z-index:3;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7}.pagination li{display:inline}.pagination li a{border:none;font-size:13px;min-width:30px;min-height:30px;color:#999;margin:0 2px;line-height:30px;border-radius:2px!important;text-align:center;padding:0 6px;position:relative;float:left;text-decoration:none;background-color:#fff}.pagination li a:hover{color:#666}.pagination li.active a,.pagination li.active a.page-link{background:#03a9f4}.pagination li.active a:hover{background:#0397d6}.pagination li.disabled i{color:#ccc}.pagination li i{font-size:16px;padding-top:6px}.hint-text{float:left;margin-top:10px;font-size:13px}.custom-checkbox{position:relative}.custom-checkbox input[type=checkbox]{opacity:0;position:absolute;margin:5px 0 0 3px;z-index:9}.custom-checkbox label:before{width:18px;height:18px;content:\"\";margin-right:10px;display:inline-block;vertical-align:text-top;background:#fff;border:1px solid #bbb;border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:2}.custom-checkbox input[type=checkbox]:checked+label:after{content:\"\";position:absolute;left:6px;top:3px;width:6px;height:11px;border:solid #000;border-width:0 3px 3px 0;-webkit-transform:inherit;transform:inherit;z-index:3;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.custom-checkbox input[type=checkbox]:checked+label:before{border-color:#03a9f4;background:#03a9f4}.custom-checkbox input[type=checkbox]:checked+label:after{border-color:#fff}.custom-checkbox input[type=checkbox]:disabled+label:before{color:#b8b8b8;cursor:auto;-webkit-box-shadow:none;box-shadow:none;background:#ddd}.modal .modal-dialog{max-width:400px}.modal .modal-body,.modal .modal-footer,.modal .modal-header{padding:20px 30px}.modal .modal-content{border-radius:3px}.modal .modal-footer{background:#ecf0f1;border-radius:0 0 3px 3px}.modal .modal-title{display:inline-block}.modal .form-control{border-radius:2px;-webkit-box-shadow:none;box-shadow:none;border-color:#ddd}.modal textarea.form-control{resize:vertical}.modal .btn{border-radius:2px;min-width:100px}.modal form label{font-weight:400}:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.next{background-color:#03a9f4;color:#fff!important}.round{border-radius:50%}a{text-decoration:none;display:inline-block;padding:8px 16px}a:hover{background-color:#337ab7;color:#000}.button-td{width:10px}.no-display{display:none}"}}export{s as AppTable};