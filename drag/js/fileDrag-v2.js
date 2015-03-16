$(function() {
    $("#dragtarget")
        .addClass("validtarget")
        .on("dragenter", function(evt) {
            console.debug("handleDragEnter()");
            evt.preventDefault();
            evt.stopPropagation();

            evt = evt.originalEvent;
            var files = evt.dataTransfer.files;

            if (files) {
                setStatus("There are " + files.length + " files in this drag.");
            } else {
                setStatus("There are unknown items in this drag.");
            }

            $(this).removeClass("validtarget").addClass("highlighted")

            return false;
        })
        .on("dragover", function(evt) {
            console.debug("handleDragOver()");
            evt.preventDefault();
            evt.stopPropagation();
            return false;
        })
        .on("dragleave", function(evt) {
            console.debug("handleDragLeave()");
            dragtarget.className = "validtarget";
            setStatus("Drag files into this area.");
            return false;
        })
        .on("drop", function(evt) {
            console.debug("handleDrop()");
            // 取消默认事件，避免直接打开文件
            evt.preventDefault();
            evt.stopPropagation();

            evt = evt.originalEvent;
            var fileList = evt.dataTransfer.files;
            var reader = new FileReader();

            var message = "There were " + fileList.length + " files dropped.";
            message += "<ol>";
            [].forEach.call(fileList, function(file) {
                message += "<li>";
                message += "<strong>" + file.name + "</strong>";
                message += "(<em>" + file.type + "</em>) : ";
                message += "size: " + file.size + " bytes - ";
                message += "modified: " + file.lastModifiedDate;
                if (file.type.match(/text.*/)) {
                    reader.addEventListener("load", function(evt) {
                        setStatus(evt.target.result);
                    }, false);
                    reader.readAsText(file);
                }
                message += "</li>";
            });
            message += "</ol>";

            setStatus(message);
            $(this).removeClass("highlighted").addClass("validtarget");

            return false;
        });

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

    setStatus("Drag files into this area.");
});

function setStatus(text) {
    $("#status").html(text);
}