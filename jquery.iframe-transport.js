(function(b){var a=0;b.ajaxTransport("iframe",function(c,g,f){if(c.type==="POST"||c.type==="GET"){var e,d;return{send:function(i,h){e=b('<form style="display:none;"></form>');d=b('<iframe src="javascript:false;" name="iframe-transport-'+(a+=1)+'"></iframe>').bind("load",function(){var j;d.unbind("load").bind("load",function(){var k;try{k=d.contents();if(!k.length||!k[0].firstChild){throw new Error()}}catch(l){k=undefined}h(200,"success",{iframe:k});b('<iframe src="javascript:false;"></iframe>').appendTo(e);e.remove()});e.prop("target",d.prop("name")).prop("action",c.url).prop("method",c.type);if(c.formData){b.each(c.formData,function(k,l){b('<input type="hidden"/>').prop("name",l.name).val(l.value).appendTo(e)})}if(c.fileInput&&c.fileInput.length&&c.type==="POST"){j=c.fileInput.clone();c.fileInput.after(function(k){return j[k]});if(c.paramName){c.fileInput.each(function(){b(this).prop("name",c.paramName)})}e.append(c.fileInput).prop("enctype","multipart/form-data").prop("encoding","multipart/form-data")}e.submit();if(j&&j.length){c.fileInput.each(function(l,k){var m=b(j[l]);b(k).prop("name",m.prop("name"));m.replaceWith(k)})}});e.append(d).appendTo("body")},abort:function(){if(d){d.unbind("load").prop("src","javascript".concat(":false;"))}if(e){e.remove()}}}}});b.ajaxSetup({converters:{"iframe text":function(c){return c.text()},"iframe json":function(c){return b.parseJSON(c.text())},"iframe html":function(c){return c.find("body").html()},"iframe script":function(c){return b.globalEval(c.text())}}})}(jQuery));