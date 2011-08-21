/*
 * jQuery File Upload Plugin JS Example 5.0.2 - https://github.com/blueimp/jQuery-File-Upload - Copyright 2010, Sebastian Tschan - https://blueimp.net
 * Licensed under the MIT license: - http://creativecommons.org/licenses/MIT/
 */
$(function(){$("#fileupload").fileupload();$.getJSON($("#fileupload form").prop("action"),function(a){var b=$("#fileupload").data("fileupload");b._adjustMaxNumberOfFiles(-a.length);b._renderDownload(a).appendTo($("#fileupload .files")).fadeIn(function(){$(this).show()})});$("#fileupload .files a:not([target^=_blank])").live("click",function(a){a.preventDefault();$('<iframe style="display:none;"></iframe>').prop("src",this.href).appendTo("body")})});