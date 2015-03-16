<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>File Upload</title>

    <link href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/fileupload.css" rel="stylesheet">
</head>

<body>
<header>
    <h2 class="text-center">Drag file here to upload to server</h2>
</header>
<section>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div id="target"></div>
            </div>
            <div class="col-xs-12">
                <form class="form-inline">
                    <div class="form-group">
                        <label for="file">File</label>
                        <input type="file" name="file" id="file" class="form-control" multiple>
                    </div>
                    <button type="button" id="uploadButton" class="btn btn-default">Upload</button>
                </form>
            </div>
            <div class="col-xs-12">
                <progress id="progress" class="form-control" value="0" max="100"></progress>
            </div>
        </div>
    </div>
</section>

<script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<script src="js/jquery.upload.js"></script>
<script src="js/fileupload-xhr.js"></script>
<script type="text/javascript">
    $(function() {
        // 防止在body上drop时页面发生跳转
        $("body")
                .on("dragover", function(evt) {
                    console.debug("handleBodyDragOver()");
                    evt.stopPropagation();
                    evt.preventDefault();
                    return false;
                })
                .on("drop", function(evt) {
                    console.debug("handleBodyDrop()");
                    evt.stopPropagation();
                    evt.preventDefault();
                    return false;
                });

        $("#target")
                .on("dragover", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                })
                .on("drop", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    e = e.originalEvent;
                    var files = e.dataTransfer.files;
                    [].forEach.call(files, function(file) {
                        uploadFile("<%=request.getContextPath() %>/fileupload", file);
                    })
                });

        $("#uploadButton").click(function() {
            var $file = $("#file");
            var files = $file[0].files;
            [].forEach.call(files, function(file) {
                uploadFile("<%=request.getContextPath() %>/fileupload", file);
            })
        });
    });
</script>
</body>
</html>