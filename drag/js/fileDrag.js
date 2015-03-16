var dragtarget;

$(function() {
    dragtarget = document.getElementById("dragtarget");
    dragtarget.className = "validtarget";

    dragtarget.addEventListener("dragenter", handleDragEnter, false);
    dragtarget.addEventListener("dragover", handleDragOver, false);
    dragtarget.addEventListener("dragleave", handleDragLeave, false);
    dragtarget.addEventListener("drop", handleDrop, false);

    setStatus("Drag files into this area.");
});

function setStatus(text) {
    document.getElementById("status").innerHTML = text;
}

function handleDragEnter(evt) {
    console.debug("handleDragEnter()");
    var files = evt.dataTransfer.files;

    if (files) {
        setStatus("There are " + files.length + " files in this drag.");
    } else {
        setStatus("There are unknown items in this drag.");
    }

    dragtarget.className = "highlighted";

    evt.preventDefault();
    evt.stopPropagation();
    return false;
}

function handleDragOver(evt) {
    console.debug("handleDragOver()");
    evt.preventDefault();
    evt.stopPropagation();
    return false;
}

function handleDragLeave(evt) {
    console.debug("handleDragLeave()");
    dragtarget.className = "validtarget";
    setStatus("Drag files into this area.");
    return false;
}

function handleDrop(evt) {
    console.debug("handleDrop()");
    // 取消默认事件，避免直接打开文件
    evt.preventDefault();
    evt.stopPropagation();

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
        if (file.type.indexOf("text") > -1) {
            reader.addEventListener("load", function(evt) {
                setStatus(this.result);
            }, false);
            reader.readAsText(file);
        }
        message += "</li>";
    });
    message += "</ol>";

    setStatus(message);
    dragtarget.className = "highlighted";

    return false;
}