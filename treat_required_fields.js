// está utilizando funções do arquivo petshopIndexedDB.js
function createAdmin() {
	let elemList = document.form[0].elements;
	for(let i in elemList) {
		if (elemList[i].value.trim() == "") {
			window.alert("Todos os campos são obrigatórios, favor preencher todos.");
			return ;
		}
	}
	
	if (usernameAlreadyExists(document.form[0]["username"].value)) {
		window.alert("Já existe um usuário com esse nome de usuário, favor escolher outro.");
		return ;
	}
	
	insertAdmin();
}