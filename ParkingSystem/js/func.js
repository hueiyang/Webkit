/*console.log(document.getElementById('LM_Name').value);
	console.log(document.getElementById('LM_GPS_Longitude').value);
	console.log(document.getElementById('LM_GPS_Latitude').value);
	console.log(document.getElementById('first').value);
	console.log(document.getElementById('second').value);*/
function loadData(){
	var newData = {
		No: count,
		userName: document.getElementById('userName').value, 
		jobTitle: document.getElementById('jobTitle').value,
		license: document.getElementById('license').value,
		cellPhone: document.getElementById('cellPhone').value,
		phone: document.getElementById('phone').value,
		date_from: document.getElementById('date_from').value,
		date_end: document.getElementById('date_end').value
	};
	
	var OK = confirm("確定要新增以下資料嗎 ?"
		+ "\n車主: \t"+ newData.userName
		+ "\n職稱: \t"+ newData.jobTitle
		+ "\n車牌: \t"+ newData.license
		+ "\n期間從: \t"+ newData.date_from
		+ "\n至: \t"+ newData.date_end);
	
	if(OK)
		addData(newData);
}

/* 確定要新增資料的話，再將新地標加入*/
function addData(_newData){
	jsonLM.push(_newData);	// add to list
	//console.log(jsonLM);
	count++;
	showData();
}

/* reset the form data. */
function clearData(){
	document.getElementById('userName').value = "";
	document.getElementById('jobTitle').value = "";
	document.getElementById('license').value = "";
	document.getElementById('cellPhone').value = "";
	document.getElementById('phone').value = "";
	document.getElementById('date_from').value = "";
	document.getElementById('date_end').value = "";
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