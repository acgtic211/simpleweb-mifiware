App.loadBundle("oylzi98r",["exports"],function(t){var e=window.App.h,i=function(){function t(e,i){if(this.lib=!1,t.instance)throw new Error("Error - use SocketIoService.getInstance()");this.path=e,this.attachLibrary(i)}return t.getInstance=function(e,i){return void 0===e&&(e="dist/collection/assets/lib/socket.io.js"),void 0===i&&(i="localhost"),t.instance=t.instance||new t(e,i)},t.prototype.attachLibrary=function(t){if(!this.lib){var e=document.createElement("script");e.src=this.path,document.querySelector("head").appendChild(e),this.ensureIoPresent().then(function(){this._io=window.io,this._socket=this._io("http://"+t+":3000"),this.lib=!0}.bind(this))}},t.prototype.ensureIoPresent=function(){var t=function(e){if(void 0!==window.io)return e();setTimeout(t,30,e)};return new Promise(function(e){t(e)}.bind(this))},t.prototype.ensureSocketPresent=function(){var t=this,e=function(i){if(void 0!==t._socket)return i();setTimeout(e,30,i)};return new Promise(function(t){e(t)}.bind(this))},t.prototype.onSocketReady=function(t){return this.ensureIoPresent().then(function(){t()}.bind(this))},t.prototype.onSocket=function(t,e){this.ensureSocketPresent().then(function(){this._socket.on(t,e)}.bind(this))},t.prototype.emitSocket=function(t,e){console.log(t,e),this.ensureSocketPresent().then(function(){this._socket.emit(t,e)}.bind(this))},t.prototype.socket=function(){return this._socket},t}(),o=function(){function t(){this._socketService=i.getInstance(this.service_url),this.list=[],this.attributeList=[],this.attributeSelected="",this.auxAttributeSelected="",this.filter="",this.roomData=0,this.maxData=0,this.modalButtonClick=this.modalButtonClick.bind(this),this.closeModal=this.closeModal.bind(this),this.submitNewAttribute=this.submitNewAttribute.bind(this)}return t.prototype.componentWillLoad=function(){var t=this;fetch("http://"+this.service_url+":3000/subscription?entity="+this.type+"&id="+this.entityid+"&queryFilter="+this.filter).then(function(t){return t.json()}).then(function(e){t.list=JSON.parse(JSON.stringify(e)).entities,t.updateAttributeList(),t.updateGraphValues()})},t.prototype.componentDidLoad=function(){var t=this;this._socketService.onSocketReady(function(){t._socketService.onSocket(t.type+"-"+t.entityid+"-"+t.filter,function(e){t.list=JSON.parse(JSON.stringify(e)).entities,t.updateGraphValues()})})},t.prototype.updateGraphValues=function(){var t=this;this.maxData=0,this.list.map(function(e){e.values.map(function(i){i.name==t.attributeSelected&&(e.name==t.entity_to_compare&&(t.roomData=i.value),parseFloat(t.maxData)<parseFloat(i.value)&&(console.log("PRev Max: "+t.maxData),console.log("PRev Value: "+i.value),t.maxData=i.value))})})},t.prototype.updateAttributeList=function(){if(this.list.length>0){this.attributeList=[];for(var t=0;t<this.list.length;t++)if(this.list[t].name==this.entity_to_compare){for(var e=0;e<this.list[t].values.length;e++)0==e&&(this.attributeSelected=this.list[t].values[e].name),this.attributeList.push(this.list[t].values[e].name);break}}},t.prototype.valueToPercent=function(t){return console.log("Value: "+t),console.log("Max: "+this.maxData),100*t/this.maxData},t.prototype.modalButtonClick=function(){this.modalDialog.style.display="block"},t.prototype.closeModal=function(){this.modalDialog.style.display="none"},t.prototype.submitNewAttribute=function(){this.attributeSelected=this.auxAttributeSelected,this.closeModal(),this.updateGraphValues()},t.prototype.entitySelected=function(t){switch(t.detail.split(":")[0]){case"attributeCombo":return void(this.auxAttributeSelected=t.detail.split(":")[1])}},t.prototype.render=function(){var t=this;return e("div",{class:"wrapContent"},e("div",{id:"myModal",class:"modal",ref:function(e){return t.modalDialog=e}},e("div",{class:"modal-content"},e("div",{class:"modal-header"},e("span",{class:"close",onClick:this.closeModal},"×"),e("h2",null,"Radial Chart Attribute Selection")),e("div",{class:"modal-body"},e("app-comboBox",{combodata:this.attributeList,comboid:"attributeCombo"}),e("input",{class:"button -blue center",type:"submit",value:"Submit",onClick:this.submitNewAttribute})))),e("button",{class:"button -blue center editBtn",onClick:this.modalButtonClick},"Edit"),e("apex-chart",{type:"radialBar",width:"600px",options:{plotOptions:{radialBar:{startAngle:-135,endAngle:225,hollow:{margin:0,size:"70%",background:"#fff",image:void 0,imageOffsetX:0,imageOffsetY:0,position:"front",dropShadow:{enabled:!0,top:3,left:0,blur:4,opacity:.24}},track:{background:"#fff",strokeWidth:"67%",margin:0,dropShadow:{enabled:!0,top:-3,left:0,blur:4,opacity:.35}},dataLabels:{showOn:"always",name:{offsetY:-10,show:!0,color:"#888",fontSize:"17px"},value:{formatter:function(t){return parseInt(t)},color:"#111",fontSize:"36px",show:!0}}}},series:[this.valueToPercent(this.roomData)],labels:["Percent of "+this.attributeSelected],stroke:{lineCap:"round"},fill:{type:"gradient",gradient:{shade:"dark",type:"horizontal",shadeIntensity:.5,gradientToColors:["#ABE5A1"],inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[0,100]}}}}))},Object.defineProperty(t,"is",{get:function(){return"app-compareChart"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{attributeList:{state:!0},attributeSelected:{state:!0},auxAttributeSelected:{state:!0},entity_to_compare:{type:String,attr:"entity_to_compare"},entityid:{type:String,attr:"entityid"},filter:{type:String,attr:"filter"},list:{state:!0},maxData:{state:!0},roomData:{state:!0},service_url:{type:String,attr:"service_url"},type:{type:String,attr:"type"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"entitySelected",method:"entitySelected"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".wrapContent{position:relative;width:600px}.editBtn{position:absolute;top:0;right:0;z-index:1;width:auto!important}.button{margin-top:20px;width:100px;overflow:hidden;padding:12px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:center;white-space:nowrap;text-decoration:none!important;text-transform:none;text-transform:capitalize;color:#fff;border:0;border-radius:4px;font-size:13px;font-weight:500;line-height:1.3;-webkit-appearance:none;-moz-appearance:none;appearance:none;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex:0 0 160px;flex:0 0 160px;-webkit-box-shadow:2px 5px 10px var(--color-smoke);box-shadow:2px 5px 10px var(--color-smoke)}.button,.button:hover{-webkit-transition:all .15s linear;transition:all .15s linear}.button:hover{opacity:.85}.button:active{-webkit-transition:all .15s linear;transition:all .15s linear;opacity:.75}.button:focus{outline:1px dotted #959595;outline-offset:-4px}.button.-blue{color:#fff;background:#416dea}.modal{display:none;position:fixed;z-index:6;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content{position:relative;background-color:#fefefe;margin:auto;padding:0;border:1px solid #888;width:20%;-webkit-box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);-webkit-animation-name:animatetop;-webkit-animation-duration:.4s;animation-name:animatetop;animation-duration:.4s}\@-webkit-keyframes animatetop{0%{top:-300px;opacity:0}to{top:0;opacity:1}}\@keyframes animatetop{0%{top:-300px;opacity:0}to{top:0;opacity:1}}.close{color:#fff;float:right;font-size:28px;font-weight:700}.close:focus,.close:hover{color:#8e8e8e;text-decoration:none;cursor:pointer}.modal-header{padding:2px 16px;background-color:#000;color:#fff}.modal-body{padding:15px;text-align:center}"},enumerable:!0,configurable:!0}),t}();t.AppComparechart=o,Object.defineProperty(t,"__esModule",{value:!0})});