const t=window.App.h;class e{constructor(t){if(this.lib=!1,e.instance)throw new Error("Error - use SocketIoService.getInstance()");this.path=t,this.attachLibrary()}static getInstance(t="/assets/lib/socket.io.js"){return e.instance=e.instance||new e(t),e.instance}attachLibrary(){if(!this.lib){const t=document.createElement("script");t.src=this.path,document.querySelector("head").appendChild(t),this.ensureIoPresent().then(function(){this._io=window.io,this._socket=this._io("http://localhost:3000"),this.lib=!0}.bind(this))}}ensureIoPresent(){const t=e=>{if(void 0!==window.io)return e();setTimeout(t,30,e)};return new Promise(function(e){t(e)}.bind(this))}ensureSocketPresent(){const t=e=>{if(void 0!==this._socket)return e();setTimeout(t,30,e)};return new Promise(function(e){t(e)}.bind(this))}onSocketReady(t){return this.ensureIoPresent().then(function(){t()}.bind(this))}onSocket(t,e){this.ensureSocketPresent().then(function(){this._socket.on(t,e)}.bind(this))}emitSocket(t,e){console.log(t,e),this.ensureSocketPresent().then(function(){this._socket.emit(t,e)}.bind(this))}socket(){return this._socket}}class i{constructor(){this._socketService=e.getInstance(this.service_url),this.list=[]}componentWillLoad(){fetch("http://"+this.service_url+":3000/subscription?entity="+this.type+"&id="+this.id).then(t=>t.json()).then(t=>{this.list=JSON.parse(JSON.stringify(t)).entities})}componentDidLoad(){this._socketService.onSocketReady(()=>{this._socketService.onSocket(this.type+"-"+this.id,t=>{this.list=JSON.parse(JSON.stringify(t)).entities})})}render(){return t("div",null,t("header",null,t("h1",null,"Stencil App Starter")),t("main",null,t("ul",{class:"list-group"},this.list.map(e=>t("li",{class:"list-group-item active"},t("div",{class:"md-v-line"}),t("i",{class:"fas fa-laptop mr-4 pr-3"}),e.name," - (",e.values.map(e=>t("span",null,e.name,": ",e.value,", ")),")")))))}static get is(){return"app-root"}static get encapsulation(){return"shadow"}static get properties(){return{id:{type:String,attr:"id"},list:{state:!0},service_url:{type:String,attr:"service_url"},type:{type:String,attr:"type"}}}static get style(){return"header.sc-app-root{background:#5851ff;height:56px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26)}h1.sc-app-root, header.sc-app-root{color:#fff}h1.sc-app-root{font-size:1.4rem;font-weight:500;padding:0 12px}.md-v-line.sc-app-root{position:absolute;border-left:1px solid rgba(0,0,0,.125);height:50px;top:0;left:54px}"}}export{i as AppRoot};