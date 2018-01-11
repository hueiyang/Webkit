/* if user select file, it will run the function 'readFile'. */
window.onload = function () {
    document.getElementById('myfile').onchange = readFile;
};

/* Read the data from file. */
function readFile() {
    file = this.files[0];
    console.log(this.value);
    var fReader = new FileReader();           
    fReader.onload = function (event) {
        document.getElementById('fileContent').value = event.target.result;
        reloadData();	
    };
 	fReader.readAsText(file);
    console.log(jsonLM);
}

/* Write the data as file. */
function saveTextAsFile( _fileName) {
    var where = "/hello/hi.txt";
    var textFileAsBlob = new Blob([JSON.stringify(jsonLM)], {type:'text/plain'});
    
    var downloadLink = document.createElement("a");
    downloadLink.download = _fileName+".json";
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        // downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);

    } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}
/* ----------------------------------------------- */

function test(){
    console.log(document.getElementById('date_from').value);

    // console.log(document.getElementById('teacherOrNot').value);

}