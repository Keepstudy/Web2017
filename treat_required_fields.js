// est� utilizando fun��es do arquivo petshopIndexedDB.js
function createAdmin() {
	let elemList = document.form[0].elements;
	for(let i in elemList) {
		if (elemList[i].value.trim() == "") {
			window.alert("Todos os campos s�o obrigat�rios, favor preencher todos.");
			return ;
		}
	}
	
	if (usernameAlreadyExists(document.form[0]["username"].value)) {
		window.alert("J� existe um usu�rio com esse nome de usu�rio, favor escolher outro.");
		return ;
	}
	
	insertAdmin();
}