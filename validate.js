function checkFieldAdmin()
{
	let name     = document.forms[1]["nome"].value;
	let username = document.forms[1]["username"].value;
	let cpf      = document.forms[1]["id"].value;
	let phone    = document.forms[1]["phone number"].value;
	let email    = document.forms[1]["email"].value;
	let pass     = document.forms[1]["senha"].value;
	let confpass = document.forms[1]["confsenha"].value;
	
	if(name.length == 0)
		window.alert("Insira um nome, campo obrigatório");
	
	else if(usernameAlreadyExists(username))
		window.alert("Nome de usuário já existe, tente outro.");
	
	else if(cpfAlreadyExists(cpf))
		window.alert("CPF já cadastrado, insira outro CPF.");
	
	else if(phone.length == 0)
		window.alert("Insira um telefone, campo obrigatório");
	
	else if(email.length == 0)
		window.alert("Insira um email, campo obrigatório");
	
	else if (pass.localeCompare(confpass) != 0)
		window.alert("Senhas diferentes, digite novamente.");
	
	else
	{
		insertUser(1);
		ajaxRequestDoc('createdAdmin.html');
	}
}

function checkFieldUpdateAdmin()
{
	let ret = true;
	
	let name     = document.forms[1]["name"].value;
	let username = document.forms[1]["user"].value;
	let cpf      = document.forms[1]["id"].value;
	let phone    = document.forms[1]["phone_number"].value;
	let email    = document.forms[1]["email"].value;
	let pass     = document.forms[1]["password"].value;
	let confpass = document.forms[1]["confpassword"].value;
	
	if(name.length == 0) {
		ret = false;
		window.alert("Insira um nome, campo obrigatório");
	}
	else if(usernameAlreadyExists(username)){
		ret = false;
		window.alert("Nome de usuário já existe, tente outro.");
	}
	else if(cpfAlreadyExists(cpf)){
		ret = false;
		window.alert("CPF já cadastrado, insira outro CPF.");
	}
	else if(phone.length == 0){
		ret = false;
		window.alert("Insira um telefone, campo obrigatório");
	}
	else if(email.length == 0){
		ret = false;
		window.alert("Insira um email, campo obrigatório");
	}
	else if (pass.localeCompare(confpass) != 0){
		ret = false;
		window.alert("Senhas diferentes, digite novamente.");
	}
	return ret;
}

function checkFieldClient()
{
	let name     = document.forms[1]["name"].value;
	let username = document.forms[1]["user"].value;
	let cpf      = document.forms[1]["id"].value;	
	let pass     = document.forms[1]["senha"].value;
	let confpass = document.forms[1]["confsenha"].value;
	let phone    = document.forms[2]["phone_number"].value;
	let email    = document.forms[2]["email"].value;
	let CEP      = document.forms[3]["cep"].value;
	let adress   = document.forms[3]["address"].value;
	let number   = document.forms[3]["number"].value;
	let district = document.forms[3]["district"].value;
	let city     = document.forms[3]["city"].value;
	let State    = document.forms[3]["state"].value;
	
	if(name.length == 0)
		window.alert("Insira um nome, campo obrigatório");
	
	else if(usernameAlreadyExists(username))
		window.alert("Nome de usuário já existe, tente outro.");
	
	else if(cpfAlreadyExists(cpf))
		window.alert("CPF já cadastrado, insira outro CPF.");
	
	else if (pass.localeCompare(confpass) != 0)
		window.alert("Senhas diferentes, digite novamente.");
	
	else if(email.length == 0)
		window.alert("Insira um email, campo obrigatório");
	
	else if(phone.length == 0)
		window.alert("Insira um telefone, campo obrigatório");
	
	else if(email.length == 0)
		window.alert("Insira um email, campo obrigatório"); 
	
	else if(CEP.length == 0)
		window.alert("Insira um CEP, campo obrigatório.");
	
	else if(adress.length == 0)
		window.alert("Insira um endereço, campo obrigatório");
	
	else if(number.length == 0)
		window.alert("Insira um número, campo obrigatório.");
	
	else if(district.length == 0)
		window.alert("Insira um bairro, campo obrigatório.");
	
	else if(city.length == 0)
		window.alert("Insira uma cidade, campo obrigatório.");
	
	else if(state.length == 0)
		window.alert("Insira uma cidade, campo obrigatório.");
	
	else
	{
		insertUser(0);
		ajaxRequestDoc("createdClient.html");
	}
}

function checkFieldUpdateClient()
{
	let ret = true;
	
	let name     = document.forms[1]["name"].value;
	let username = document.forms[1]["user"].value;
	let cpf      = document.forms[1]["id"].value;	
	let pass     = document.forms[1]["password"].value;
	let confpass = document.forms[1]["confpassword"].value;
	let phone    = document.forms[1]["phone_number"].value;
	let email    = document.forms[1]["email"].value;
	let CEP      = document.forms[1]["cep"].value;
	let adress   = document.forms[1]["address"].value;
	let number   = document.forms[1]["number"].value;
	let district = document.forms[1]["district"].value;
	let city     = document.forms[1]["city"].value;
	let State    = document.forms[1]["state"].value;
	
	if(name.length == 0) {
		ret = false;
		window.alert("Insira um nome, campo obrigatório");
	}
	else if(usernameAlreadyExists(username)) {
		ret = false;
		window.alert("Nome de usuário já existe, tente outro.");
	}
	else if(cpfAlreadyExists(cpf)) {
		ret = false;
		window.alert("CPF já cadastrado, insira outro CPF.");
	}
	else if (pass.localeCompare(confpass) != 0) {
		ret = false;
		window.alert("Senhas diferentes, digite novamente.");
	}
	else if(email.length == 0) {
		ret = false;
		window.alert("Insira um email, campo obrigatório");
	}
	else if(phone.length == 0) {
		ret = false;
		window.alert("Insira um telefone, campo obrigatório");
	}
	else if(email.length == 0) {
		ret = false;
		window.alert("Insira um email, campo obrigatório"); 
	}
	else if(CEP.length == 0) {
		ret = false;
		window.alert("Insira um CEP, campo obrigatório.");
	}
	else if(adress.length == 0) {
		ret = false;
		window.alert("Insira um endereço, campo obrigatório");
	}
	else if(number.length == 0) {
		ret = false;
		window.alert("Insira um número, campo obrigatório.");
	}
	else if(district.length == 0) {
		ret = false;
		window.alert("Insira um bairro, campo obrigatório.");
	}
	else if(city.length == 0) {
		ret = false;
		window.alert("Insira uma cidade, campo obrigatório.");
	}
	else if(state.length == 0) {
		ret = false;
		window.alert("Insira uma cidade, campo obrigatório.");
	}
	return ret;
}

function checkPetField()
{
	let username = document.forms[0]["User"].value;
	let animal   = document.forms[0]["animal"].value;
	let breed    = document.forms[0]["raça"].value;
	let age      = document.forms[0]["idade"].value;
	
	if(username.length == 0)
		window.alert("Insira um usuário, campo obrigatório.");
	
	else if(animal.length == 0)
		window.alert("Insira um nome para o animel, campo obrigatório.");
	
	else if(breed.length == 0)
		window.alert("Insira uma raça para o animal, campo obrigatório.");
	
	else if(age.length == 0)
		window.alert("Insira a idade do animal, campo obrigatório.");
	
	else
	{
		insertPet();
		ajaxRequestDoc('createdPet.html');
	}
}

function checkProductField()
{
	let name        = document.forms[1]["produto"].value;
	let id          = document.forms[1]["idproduct"].value;	
	let price       = document.forms[1]["preço"].value;
	let amount      = document.forms[1]["quantidade"].value;
	let description = document.forms[1]["desc"].value;
	
	if(name.length == 0)
		window.alert("Insira um nome para o produto, campo obrigatório.");
	
	else if(productAlreadyExists(id))
		window.alert("Insira outro id para o produto, ja existe um produto cadastrado com esse id.");
	
	else if(price.length == 0)
		window.alert("Insira um preço para o produto, campo obrigatório.");
	
	else if(amount.length == 0)
		window.alert("Insira a quantidade para o produto, campo obrigatório.");
	
	else if(description.length == 0)
		window.alert("Insira uma descrição para o produto, campo obrigatório.");
	
	else
	{
		insertProduct();
		ajaxRequestDoc('createdProduct.html');
	}
}


function checkServiceField()
{
	let name        = document.forms[1]["pname"].value;
	let id          = document.forms[1]["idservice"].value;	
	let price       = document.forms[1]["preço"].value;	
	let description = document.forms[1]["desc"].value;
	
	
	if(name.length == 0)
		window.alert("Insira um nome para o serviço, campo obrigatório.");
	
	else if(serviceAlreadyExists(id))
		window.alert("Insira outro id para o serviço, ja existe um serviço cadastrado com esse id.");
	
	else if(price.length == 0)
		window.alert("Insira um preço para o serviço, campo obrigatório.");
	
	else if(description.length == 0)
		window.alert("Insira uma descrição para o serviço, campo obrigatório.");
	
	
	else
	{
		insertService();
		ajaxRequestDoc('createdService.html');
	}
}








