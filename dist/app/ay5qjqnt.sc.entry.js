const t=window.App.h;class e{constructor(t){if(this.lib=!1,e.instance)throw new Error("Error - use SocketIoService.getInstance()");this.path=t,this.attachLibrary()}static getInstance(t="dist/collection/assets/lib/socket.io.js"){return e.instance=e.instance||new e(t),e.instance}attachLibrary(){if(!this.lib){const t=document.createElement("script");t.src=this.path,document.querySelector("head").appendChild(t),this.ensureIoPresent().then(function(){this._io=window.io,this._socket=this._io("http://localhost:3000"),this.lib=!0}.bind(this))}}ensureIoPresent(){const t=e=>{if(void 0!==window.io)return e();setTimeout(t,30,e)};return new Promise(function(e){t(e)}.bind(this))}ensureSocketPresent(){const t=e=>{if(void 0!==this._socket)return e();setTimeout(t,30,e)};return new Promise(function(e){t(e)}.bind(this))}onSocketReady(t){return this.ensureIoPresent().then(function(){t()}.bind(this))}onSocket(t,e){this.ensureSocketPresent().then(function(){this._socket.on(t,e)}.bind(this))}emitSocket(t,e){console.log(t,e),this.ensureSocketPresent().then(function(){this._socket.emit(t,e)}.bind(this))}socket(){return this._socket}}class i{constructor(){this._socketService=e.getInstance(),this.list=[],this.attributeList=[],this.attributeSelected="",this.auxAttributeSelected="",this.filter="",this.roomData=0,this.maxData=0,this.modalButtonClick=this.modalButtonClick.bind(this),this.closeModal=this.closeModal.bind(this),this.submitNewAttribute=this.submitNewAttribute.bind(this)}componentWillLoad(){fetch("http://"+this.service_url+":3000/subscription?entity="+this.type+"&id="+this.entityid+"&queryFilter="+this.filter).then(t=>t.json()).then(t=>{this.list=JSON.parse(JSON.stringify(t)).entities,this.updateAttributeList(),this.updateGraphValues()})}componentDidLoad(){this._socketService.onSocketReady(()=>{this._socketService.onSocket(this.type+"-"+this.entityid+"-"+this.filter,t=>{this.list=JSON.parse(JSON.stringify(t)).entities,this.updateGraphValues()})})}updateGraphValues(){this.maxData=0,this.list.map(t=>{t.values.map(e=>{e.name==this.attributeSelected&&(t.name==this.entity_to_compare&&(this.roomData=e.value),parseFloat(this.maxData)<parseFloat(e.value)&&(console.log("PRev Max: "+this.maxData),console.log("PRev Value: "+e.value),this.maxData=e.value))})})}updateAttributeList(){if(this.list.length>0){this.attributeList=[];for(var t=0;t<this.list.length;t++)if(this.list[t].name==this.entity_to_compare){for(var e=0;e<this.list[t].values.length;e++)0==e&&(this.attributeSelected=this.list[t].values[e].name),this.attributeList.push(this.list[t].values[e].name);break}}}valueToPercent(t){return console.log("Value: "+t),console.log("Max: "+this.maxData),100*t/this.maxData}modalButtonClick(){this.modalDialog.style.display="block"}closeModal(){this.modalDialog.style.display="none"}submitNewAttribute(){this.attributeSelected=this.auxAttributeSelected,this.closeModal(),this.updateGraphValues()}entitySelected(t){switch(t.detail.split(":")[0]){case"attributeCombo":return void(this.auxAttributeSelected=t.detail.split(":")[1])}}render(){return t("div",{class:"wrapContent"},t("div",{id:"myModal",class:"modal",ref:t=>this.modalDialog=t},t("div",{class:"modal-content"},t("div",{class:"modal-header"},t("span",{class:"close",onClick:this.closeModal},"×"),t("h2",null,"Radial Chart Attribute Selection")),t("div",{class:"modal-body"},t("app-comboBox",{combodata:this.attributeList,comboid:"attributeCombo"}),t("input",{class:"button -blue center",type:"submit",value:"Submit",onClick:this.submitNewAttribute})))),t("button",{class:"button -blue center editBtn",onClick:this.modalButtonClick},"Edit"),t("apex-chart",{type:"radialBar",width:"600px",options:{plotOptions:{radialBar:{startAngle:-135,endAngle:225,hollow:{margin:0,size:"70%",background:"#fff",image:void 0,imageOffsetX:0,imageOffsetY:0,position:"front",dropShadow:{enabled:!0,top:3,left:0,blur:4,opacity:.24}},track:{background:"#fff",strokeWidth:"67%",margin:0,dropShadow:{enabled:!0,top:-3,left:0,blur:4,opacity:.35}},dataLabels:{showOn:"always",name:{offsetY:-10,show:!0,color:"#888",fontSize:"17px"},value:{formatter:function(t){return parseInt(t)},color:"#111",fontSize:"36px",show:!0}}}},series:[this.valueToPercent(this.roomData)],labels:["Percent of "+this.attributeSelected],stroke:{lineCap:"round"},fill:{type:"gradient",gradient:{shade:"dark",type:"horizontal",shadeIntensity:.5,gradientToColors:["#ABE5A1"],inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[0,100]}}}}))}static get is(){return"app-compareChart"}static get encapsulation(){return"shadow"}static get properties(){return{attributeList:{state:!0},attributeSelected:{state:!0},auxAttributeSelected:{state:!0},entity_to_compare:{type:String,attr:"entity_to_compare"},entityid:{type:String,attr:"entityid"},filter:{type:String,attr:"filter"},list:{state:!0},maxData:{state:!0},roomData:{state:!0},service_url:{type:String,attr:"service_url"},type:{type:String,attr:"type"}}}static get listeners(){return[{name:"entitySelected",method:"entitySelected"}]}static get style(){return".wrapContent.sc-app-compareChart{position:relative;width:600px}.editBtn.sc-app-compareChart{position:absolute;top:0;right:0;z-index:1;width:auto!important}.button.sc-app-compareChart{margin-top:20px;width:100px;overflow:hidden;padding:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:center;white-space:nowrap;text-decoration:none!important;text-transform:none;text-transform:capitalize;color:#fff;border:0;border-radius:4px;font-size:13px;font-weight:500;line-height:1.3;-webkit-appearance:none;-moz-appearance:none;appearance:none;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex:0 0 160px;flex:0 0 160px;-webkit-box-shadow:2px 5px 10px var(--color-smoke);box-shadow:2px 5px 10px var(--color-smoke)}.button.sc-app-compareChart, .button.sc-app-compareChart:hover{-webkit-transition:all .15s linear;transition:all .15s linear}.button.sc-app-compareChart:hover{opacity:.85}.button.sc-app-compareChart:active{-webkit-transition:all .15s linear;transition:all .15s linear;opacity:.75}.button.sc-app-compareChart:focus{outline:1px dotted #959595;outline-offset:-4px}.button.-blue.sc-app-compareChart{color:#fff;background:#416dea}.modal.sc-app-compareChart{display:none;position:fixed;z-index:6;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content.sc-app-compareChart{position:relative;background-color:#fefefe;margin:auto;padding:0;border:1px solid #888;width:20%;-webkit-box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);-webkit-animation-name:animatetop;-webkit-animation-duration:.4s;animation-name:animatetop;animation-duration:.4s}\@-webkit-keyframes animatetop{0%{top:-300px;opacity:0}to{top:0;opacity:1}}\@keyframes animatetop{0%{top:-300px;opacity:0}to{top:0;opacity:1}}.close.sc-app-compareChart{color:#fff;float:right;font-size:28px;font-weight:700}.close.sc-app-compareChart:focus, .close.sc-app-compareChart:hover{color:#8e8e8e;text-decoration:none;cursor:pointer}.modal-header.sc-app-compareChart{padding:2px 16px;background-color:#000;color:#fff}.modal-body.sc-app-compareChart{padding:15px;text-align:center}"}}export{i as AppComparechart};