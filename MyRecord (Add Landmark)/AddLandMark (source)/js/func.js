/*console.log(document.getElementById('LM_Name').value);
	console.log(document.getElementById('LM_GPS_Longitude').value);
	console.log(document.getElementById('LM_GPS_Latitude').value);
	console.log(document.getElementById('first').value);
	console.log(document.getElementById('second').value);*/
function loadData(){
	var newLM = {
		No: count,
		LM_Name: document.getElementById('LM_Name').value,
		LM_GPS_Longitude: document.getElementById('LM_GPS_Longitude').value,
		LM_GPS_Latitude: document.getElementById('LM_GPS_Latitude').value,
		LM_City: document.getElementById('first').value,
		LM_Area: document.getElementById('second').value
	};

	var OK = confirm("確定要新增以下資料嗎 ?"
		+ "\n地標名稱: \t"+ newLM.LM_Name
		+ "\n經度: \t"+ newLM.LM_GPS_Longitude
		+ "\n緯度: \t"+ newLM.LM_GPS_Latitude
		+ "\n城市: \t"+ newLM.LM_City
		+ "\n地區: \t"+ newLM.LM_Area);
	
	if(OK)
		addData(newLM);
}

/* 確定要新增資料的話，再將新地標加入*/
function addData(_newLM){
	jsonLM.push(_newLM);	// add to list
	//console.log(jsonLM);
	count++;
	showData();
}

/* reset the form data. */
function clearData(){
	document.getElementById('LM_Name').value = "";
	document.getElementById('LM_GPS_Longitude').value = "";
	document.getElementById('LM_GPS_Latitude').value = "";
	document.getElementById('first').value = "--";
	document.getElementById('second').value = "--";
}

/* show the input data in the view. */
function showData(){
	document.getElementById('view').innerHTML = JSON.stringify(jsonLM);
}

/* When load file as input, it must update data to show. */
function reloadData(){
	// it take the json variable from file, and translate to array type to be .push()
   	jsonLM = JSON.parse(document.getElementById('fileContent').value);	
   	count = jsonLM.length + 1;	// continue to count total.
   	showData();
}