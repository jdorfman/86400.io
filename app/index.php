<?php include 'inc/config.php'; ?>

<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<title><?php echo "$title"; ?></title>
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/base/jquery-ui.css" id="theme">
<link rel="stylesheet" href="<?php echo "$cdn_url"; ?>/beta02/jquery.fileupload-ui.css">
<link rel="stylesheet" href="<?php echo "$cdn_url"; ?>/beta02/app/style.css">
<?php include 'inc/google_analytics.php'; ?>
</head>
<body>
<?php include 'inc/share.php'; ?>
<?php include 'inc/logo-tagline.php'; ?>
<div id="fileupload">
    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <div class="fileupload-buttonbar">
            <label class="fileinput-button">
                <span>Add files...</span>
                <input type="file" name="files[]" multiple>
            </label>
            <button type="submit" class="start">Start upload</button>
            <button type="reset" class="cancel">Cancel upload</button>
        </div>
    </form>
    <div class="fileupload-content">
        <table class="files"></table>
        <div class="fileupload-progressbar"></div>
    </div>
</div>
<script id="template-upload" type="text/x-jquery-tmpl">
    <tr class="template-upload{{if error}} ui-state-error{{/if}}">
        <td class="preview"></td>
        <td class="name">${name}</td>
        <td class="size">${sizef}</td>
        {{if error}}
            <td class="error" colspan="2">Error:
                {{if error === 'maxFileSize'}}File is too big
                {{else error === 'minFileSize'}}File is too small
                {{else error === 'acceptFileTypes'}}Filetype not allowed
                {{else error === 'maxNumberOfFiles'}}Max number of files exceeded
                {{else}}${error}
                {{/if}}
            </td>
        {{else}}
            <td class="progress"><div></div></td>
            <td class="start"><button>Start</button></td>
        {{/if}}
        <td class="cancel"><button>Cancel</button></td>
    </tr>
</script>
<script id="template-download" type="text/x-jquery-tmpl">
    <tr class="template-download{{if error}} ui-state-error{{/if}}">
        {{if error}}
            <td></td>
            <td class="name">${name}</td>
            <td class="size">${sizef}</td>
            <td class="error" colspan="2">Error:
                {{if error === 1}}File exceeds upload_max_filesize (php.ini directive)
                {{else error === 2}}File exceeds MAX_FILE_SIZE (HTML form directive)
                {{else error === 3}}File was only partially uploaded
                {{else error === 4}}No File was uploaded
                {{else error === 5}}Missing a temporary folder
                {{else error === 6}}Failed to write file to disk
                {{else error === 7}}File upload stopped by extension
                {{else error === 'maxFileSize'}}File is too big
                {{else error === 'minFileSize'}}File is too small
                {{else error === 'acceptFileTypes'}}Filetype not allowed
                {{else error === 'maxNumberOfFiles'}}Max number of files exceeded
                {{else error === 'uploadedBytes'}}Uploaded bytes exceed file size
                {{else error === 'emptyResult'}}Empty file upload result
                {{else}}${error}
                {{/if}}
            </td>
        {{else}}
            <td class="preview">
                {{if thumbnail_url}}
                    <a href="<?php echo "$cdn_url"; ?>${url}" target="_blank"><img src="${thumbnail_url}"></a>
                {{/if}}
            </td>
            <td class="name">
                <a href="<?php echo "$cdn_url"; ?>${url}"{{if thumbnail_url}} target="_blank"{{/if}}>${name}</a>
            </td>
            <td class="size">${sizef}</td>
            <td class="size"><a href="http://twitter.com/home?status=Check This: <?php echo "$cdn_url"; ?>${url} via @<?php echo "$twitter_handle"; ?>" target="_blank"><img src="images/twitter_button.png" border="0"></a></td>
		    <td class="name"><form><input type="readonly" size="95" name="url" value="<?php echo "$cdn_url"; ?>${url}"></form></td>
            <td colspan="2"></td>
        {{/if}}
    </tr>
</script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js"></script>
<script src="//ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
<script src="<?php echo "$cdn_url"; ?>/<?php echo "$app_version"; ?>/jquery.iframe-transport.js"></script>
<script src="<?php echo "$cdn_url"; ?>/<?php echo "$app_version"; ?>/jquery.fileupload.js"></script>
<script src="<?php echo "$cdn_url"; ?>/<?php echo "$app_version"; ?>/jquery.fileupload-ui.js"></script>
<script src="<?php echo "$cdn_url"; ?>/<?php echo "$app_version"; ?>/app/application.js"></script>

<?php include('inc/footer.php'); ?>
</body> 
</html>
