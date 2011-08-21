(function(a){a.widget("blueimp.fileupload",{options:{namespace:undefined,dropZone:a(document),fileInput:undefined,replaceFileInput:true,paramName:undefined,singleFileUploads:true,sequentialUploads:false,limitConcurrentUploads:undefined,forceIframeTransport:false,multipart:true,maxChunkSize:undefined,uploadedBytes:undefined,recalculateProgress:true,formData:function(b){return b.serializeArray()},add:function(c,b){b.submit()},processData:false,contentType:false,cache:false},_refreshOptionsList:["namespace","dropZone","fileInput"],_isXHRUpload:function(b){var c="undefined";return !b.forceIframeTransport&&typeof XMLHttpRequestUpload!==c&&typeof File!==c&&(!b.multipart||typeof FormData!==c)},_getFormData:function(b){var c;if(typeof b.formData==="function"){return b.formData(b.form)}else{if(a.isArray(b.formData)){return b.formData}else{if(b.formData){c=[];a.each(b.formData,function(d,e){c.push({name:d,value:e})});return c}}}return[]},_getTotal:function(c){var b=0;a.each(c,function(d,e){b+=e.size||1});return b},_onProgress:function(f,d){if(f.lengthComputable){var c=d.total||this._getTotal(d.files),b=parseInt(f.loaded/f.total*(d.chunkSize||c),10)+(d.uploadedBytes||0);this._loaded+=b-(d.loaded||d.uploadedBytes||0);d.lengthComputable=true;d.loaded=b;d.total=c;this._trigger("progress",f,d);this._trigger("progressall",f,{lengthComputable:true,loaded:this._loaded,total:this._total})}},_initProgressListener:function(b){var c=this,d=b.xhr?b.xhr():a.ajaxSettings.xhr();if(d.upload&&d.upload.addEventListener){d.upload.addEventListener("progress",function(f){c._onProgress(f,b)},false);b.xhr=function(){return d}}},_initXHRData:function(b){var d,c=b.files[0];if(!b.multipart||b.blob){b.headers=a.extend(b.headers,{"X-File-Name":c.name,"X-File-Type":c.type,"X-File-Size":c.size});if(!b.blob){b.contentType=c.type;b.data=c}else{if(!b.multipart){b.contentType="application/octet-stream";b.data=b.blob}}}if(b.multipart&&typeof FormData!=="undefined"){if(b.formData instanceof FormData){d=b.formData}else{d=new FormData();a.each(this._getFormData(b),function(e,f){d.append(f.name,f.value)})}if(b.blob){d.append(b.paramName,b.blob)}else{a.each(b.files,function(e,f){if(f instanceof Blob){d.append(b.paramName,f)}})}b.data=d}b.blob=null},_initIframeSettings:function(b){b.dataType="iframe "+(b.dataType||"");b.formData=this._getFormData(b)},_initDataSettings:function(b){if(this._isXHRUpload(b)){if(!this._chunkedUpload(b,true)){if(!b.data){this._initXHRData(b)}this._initProgressListener(b)}}else{this._initIframeSettings(b)}},_initFormSettings:function(b){if(!b.form||!b.form.length){b.form=a(b.fileInput.prop("form"))}if(!b.paramName){b.paramName=b.fileInput.prop("name")||"files[]"}if(!b.url){b.url=b.form.prop("action")||location.href}b.type=(b.type||b.form.prop("method")||"").toUpperCase();if(b.type!=="POST"&&b.type!=="PUT"){b.type="POST"}},_getAJAXSettings:function(c){var b=a.extend({},this.options,c);this._initFormSettings(b);this._initDataSettings(b);return b},_enhancePromise:function(b){b.success=b.done;b.error=b.fail;b.complete=b.always;return b},_getXHRPromise:function(e,d,c){var b=a.Deferred(),f=b.promise();d=d||this.options.context||f;if(e===true){b.resolveWith(d,c)}else{if(e===false){b.rejectWith(d,c)}}f.abort=b.promise;return this._enhancePromise(f)},_chunkedUpload:function(m,i){var h=this,f=m.files[0],g=f.size,b=m.uploadedBytes=m.uploadedBytes||0,e=m.maxChunkSize||g,k=f.webkitSlice||f.mozSlice||f.slice,l,c,j,d;if(!(this._isXHRUpload(m)&&k&&(b||e<g))||m.data){return false}if(i){return true}if(b>=g){f.error="uploadedBytes";return this._getXHRPromise(false)}c=Math.ceil((g-b)/e);l=function(n){if(!n){return h._getXHRPromise(true)}return l(n-=1).pipe(function(){var p=a.extend({},m);p.blob=k.call(f,b+n*e,b+(n+1)*e);p.chunkSize=p.blob.size;h._initXHRData(p);h._initProgressListener(p);j=(a.ajax(p)||h._getXHRPromise(false,p.context)).done(function(){if(!p.loaded){h._onProgress(a.Event("progress",{lengthComputable:true,loaded:p.chunkSize,total:p.chunkSize}),p)}m.uploadedBytes=p.uploadedBytes+=p.chunkSize});return j})};d=l(c);d.abort=function(){return j.abort()};return this._enhancePromise(d)},_beforeSend:function(c,b){if(this._active===0){this._trigger("start")}this._active+=1;this._loaded+=b.uploadedBytes||0;this._total+=this._getTotal(b.files)},_onDone:function(b,e,d,c){if(!this._isXHRUpload(c)){this._onProgress(a.Event("progress",{lengthComputable:true,loaded:1,total:1}),c)}c.result=b;c.textStatus=e;c.jqXHR=d;this._trigger("done",null,c)},_onFail:function(c,e,d,b){b.jqXHR=c;b.textStatus=e;b.errorThrown=d;this._trigger("fail",null,b);if(b.recalculateProgress){this._loaded-=b.loaded||b.uploadedBytes||0;this._total-=b.total||this._getTotal(b.files)}},_onAlways:function(b,f,d,e,c){this._active-=1;c.result=b;c.textStatus=f;c.jqXHR=d;c.errorThrown=e;this._trigger("always",null,c);if(this._active===0){this._trigger("stop");this._loaded=this._total=0}},_onSend:function(i,g){var f=this,d,j,c,b=f._getAJAXSettings(g),h=function(k,e){f._sending+=1;d=d||((k!==false&&f._trigger("send",i,b)!==false&&(f._chunkedUpload(b)||a.ajax(b)))||f._getXHRPromise(false,b.context,e)).done(function(l,n,m){f._onDone(l,n,m,b)}).fail(function(l,n,m){f._onFail(l,n,m,b)}).always(function(m,l,o){f._sending-=1;if(o&&o.done){f._onAlways(m,l,o,undefined,b)}else{f._onAlways(undefined,l,m,o,b)}if(b.limitConcurrentUploads&&b.limitConcurrentUploads>f._sending){var n=f._slots.shift();while(n){if(!n.isRejected()){n.resolve();break}n=f._slots.shift()}}});return d};this._beforeSend(i,b);if(this.options.sequentialUploads||(this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending)){if(this.options.limitConcurrentUploads>1){j=a.Deferred();this._slots.push(j);c=j.pipe(h)}else{c=(this._sequence=this._sequence.pipe(h,h))}c.abort=function(){var e=[undefined,"abort","abort"];if(!d){if(j){j.rejectWith(e)}return h(false,e)}return d.abort()};return this._enhancePromise(c)}return h()},_onAdd:function(g,f){var d=this,b=true,c=a.extend({},this.options,f);if(c.singleFileUploads&&this._isXHRUpload(c)){a.each(f.files,function(e,h){var i=a.extend({},f,{files:[h]});i.submit=function(){return d._onSend(g,i)};return(b=d._trigger("add",g,i))});return b}else{if(f.files.length){f=a.extend({},f);f.submit=function(){return d._onSend(g,f)};return this._trigger("add",g,f)}}},_normalizeFile:function(b,c){if(c.name===undefined&&c.size===undefined){c.name=c.fileName;c.size=c.fileSize}},_replaceFileInput:function(b){var c=b.clone(true);a("<form></form>").append(c)[0].reset();b.after(c).detach();this.options.fileInput=this.options.fileInput.map(function(d,e){if(e===b[0]){return c[0]}return e})},_onChange:function(d){var b=d.data.fileupload,c={files:a.each(a.makeArray(d.target.files),b._normalizeFile),fileInput:a(d.target),form:a(d.target.form)};if(!c.files.length){c.files=[{name:d.target.value.replace(/^.*\\/,"")}]}if(c.form.length){c.fileInput.data("blueimp.fileupload.form",c.form)}else{c.form=c.fileInput.data("blueimp.fileupload.form")}if(b.options.replaceFileInput){b._replaceFileInput(c.fileInput)}if(b._trigger("change",d,c)===false||b._onAdd(d,c)===false){return false}},_onDrop:function(f){var b=f.data.fileupload,d=f.dataTransfer=f.originalEvent.dataTransfer,c={files:a.each(a.makeArray(d&&d.files),b._normalizeFile)};if(b._trigger("drop",f,c)===false||b._onAdd(f,c)===false){return false}f.preventDefault()},_onDragOver:function(d){var b=d.data.fileupload,c=d.dataTransfer=d.originalEvent.dataTransfer;if(b._trigger("dragover",d)===false){return false}if(c){c.dropEffect=c.effectAllowed="copy"}d.preventDefault()},_initEventHandlers:function(){var b=this.options.namespace||this.name;this.options.dropZone.bind("dragover."+b,{fileupload:this},this._onDragOver).bind("drop."+b,{fileupload:this},this._onDrop);this.options.fileInput.bind("change."+b,{fileupload:this},this._onChange)},_destroyEventHandlers:function(){var b=this.options.namespace||this.name;this.options.dropZone.unbind("dragover."+b,this._onDragOver).unbind("drop."+b,this._onDrop);this.options.fileInput.unbind("change."+b,this._onChange)},_beforeSetOption:function(b,c){this._destroyEventHandlers()},_afterSetOption:function(c,d){var b=this.options;if(!b.fileInput){b.fileInput=a()}if(!b.dropZone){b.dropZone=a()}this._initEventHandlers()},_setOption:function(b,d){var c=a.inArray(b,this._refreshOptionsList)!==-1;if(c){this._beforeSetOption(b,d)}a.Widget.prototype._setOption.call(this,b,d);if(c){this._afterSetOption(b,d)}},_create:function(){var b=this.options;if(b.fileInput===undefined){b.fileInput=this.element.is("input:file")?this.element:this.element.find("input:file")}else{if(!b.fileInput){b.fileInput=a()}}if(!b.dropZone){b.dropZone=a()}this._slots=[];this._sequence=this._getXHRPromise(true);this._sending=this._active=this._loaded=this._total=0;this._initEventHandlers()},destroy:function(){this._destroyEventHandlers();a.Widget.prototype.destroy.call(this)},enable:function(){a.Widget.prototype.enable.call(this);this._initEventHandlers()},disable:function(){this._destroyEventHandlers();a.Widget.prototype.disable.call(this)},add:function(b){if(!b||this.options.disabled){return}b.files=a.each(a.makeArray(b.files),this._normalizeFile);this._onAdd(null,b)},send:function(b){if(b&&!this.options.disabled){b.files=a.each(a.makeArray(b.files),this._normalizeFile);if(b.files.length){return this._onSend(null,b)}}return this._getXHRPromise(false,b&&b.context)}})}(jQuery));