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
		Materialize.toast("Insira um nome, campo obrigatório", 4000);
	
	else if(usernameAlreadyExists(username))
		Materialize.toast("Nome de usuário já existe, tente outro.", 8000);
	
	else if(cpfAlreadyExists(cpf))
		Materialize.toast("CPF já cadastrado, insira outro CPF.", 8000);
	
	else if(phone.length == 0)
		Materialize.toast("Insira um telefone, campo obrigatório", 8000);
	
	else if(email.length == 0)
		Materialize.toast("Insira um email, campo obrigatório", 8000);
	
	else if (pass.length == 0)
		Materialize.toast("Insira uma senha, campo obrigatório", 8000);
	
	else if (confpass.length == 0)
		Materialize.toast("Insira a confirmação de senha, campo obrigatório", 8000);
		
	else if (pass.localeCompare(confpass) != 0)
		Materialize.toast("Senhas diferentes, digite novamente.", 8000);
	
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
		Materialize.toast("Insira um nome, campo obrigatório", 8000);
	}
	else if(usernameAlreadyExists(username)){
		ret = false;
		Materialize.toast("Nome de usuário já existe, tente outro.", 8000);
	}
	else if(cpfAlreadyExists(cpf)){
		ret = false;
		Materialize.toast("CPF já cadastrado, insira outro CPF.", 8000);
	}
	else if(phone.length == 0){
		ret = false;
		Materialize.toast("Insira um telefone, campo obrigatório", 8000);
	}
	else if(email.length == 0){
		ret = false;
		Materialize.toast("Insira um email, campo obrigatório", 8000);
	}
	else if (pass.length == 0){
		ret = false;
		Materialize.toast("Insira uma senha, campo obrigatório", 8000);
	}
	else if (confpass.length == 0){
		ret = false;
		Materialize.toast("Insira a confirmação de senha, campo obrigatório", 8000);
	}
	else if (pass.localeCompare(confpass) != 0){
		ret = false;
		Materialize.toast("Senhas diferentes, digite novamente.", 8000);
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
		Materialize.toast("Insira um nome, campo obrigatório", 8000);
	
	else if(usernameAlreadyExists(username))
		Materialize.toast("Nome de usuário já existe, tente outro.", 8000);
	
	else if(cpfAlreadyExists(cpf))
		Materialize.toast("CPF já cadastrado, insira outro CPF.", 8000);
	
	else if (pass.length == 0)
		Materialize.toast("Insira uma senha, campo obrigatório", 8000);
	
	else if (confpass.length == 0)
		Materialize.toast("Insira a confirmação de senha, campo obrigatório", 8000);
	
	else if (pass.localeCompare(confpass) != 0)
		Materialize.toast("Senhas diferentes, digite novamente.", 8000);
	
	else if(email.length == 0)
		Materialize.toast("Insira um email, campo obrigatório", 8000);
	
	else if(phone.length == 0)
		Materialize.toast("Insira um telefone, campo obrigatório", 8000);

	else if(CEP.length == 0)
		Materialize.toast("Insira um CEP, campo obrigatório.", 8000);
	
	else if(adress.length == 0)
		Materialize.toast("Insira um endereço, campo obrigatório", 8000);
	
	else if(number.length == 0)
		Materialize.toast("Insira um número, campo obrigatório.", 8000);
	
	else if(district.length == 0)
		Materialize.toast("Insira um bairro, campo obrigatório.", 8000);
	
	else if(city.length == 0)
		Materialize.toast("Insira uma cidade, campo obrigatório.", 8000);
	
	else if(state.length == 0)
		Materialize.toast("Insira uma cidade, campo obrigatório.", 8000);
	
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
		Materialize.toast("Insira um nome, campo obrigatório", 8000);
	}
	else if(usernameAlreadyExists(username)) {
		ret = false;
		Materialize.toast("Nome de usuário já existe, tente outro.", 8000);
	}
	else if(cpfAlreadyExists(cpf)) {
		ret = false;
		Materialize.toast("CPF já cadastrado, insira outro CPF.", 8000);
	}
	else if (pass.length == 0){
		ret = false;
		Materialize.toast("Insira uma senha, campo obrigatório", 8000);
	}
	else if (confpass.length == 0){
		ret = false;
		Materialize.toast("Insira a confirmação de senha, campo obrigatório", 8000);
	}
	else if (pass.localeCompare(confpass) != 0) {
		ret = false;
		Materialize.toast("Senhas diferentes, digite novamente.", 8000);
	}
	else if(email.length == 0) {
		ret = false;
		Materialize.toast("Insira um email, campo obrigatório", 8000);
	}
	else if(phone.length == 0) {
		ret = false;
		Materialize.toast("Insira um telefone, campo obrigatório", 8000);
	}
	else if(CEP.length == 0) {
		ret = false;
		Materialize.toast("Insira um CEP, campo obrigatório.", 8000);
	}
	else if(adress.length == 0) {
		ret = false;
		Materialize.toast("Insira um endereço, campo obrigatório", 8000);
	}
	else if(number.length == 0) {
		ret = false;
		Materialize.toast("Insira um número, campo obrigatório.", 8000);
	}
	else if(district.length == 0) {
		ret = false;
		Materialize.toast("Insira um bairro, campo obrigatório.", 8000);
	}
	else if(city.length == 0) {
		ret = false;
		Materialize.toast("Insira uma cidade, campo obrigatório.", 8000);
	}
	else if(state.length == 0) {
		ret = false;
		Materialize.toast("Insira uma cidade, campo obrigatório.", 8000);
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
		Materialize.toast("Insira um usuário, campo obrigatório.", 8000);
	
	else if(animal.length == 0)
		Materialize.toast("Insira um nome para o animel, campo obrigatório.", 8000);
	
	else if(breed.length == 0)
		Materialize.toast("Insira uma raça para o animal, campo obrigatório.", 8000);
	
	else if(age.length == 0)
		Materialize.toast("Insira a idade do animal, campo obrigatório.", 8000);
	
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
		Materialize.toast("Insira um nome para o produto, campo obrigatório.", 8000);
	
	else if(productAlreadyExists(id))
		Materialize.toast("Insira outro id para o produto, ja existe um produto cadastrado com esse id.", 8000);
	
	else if(price.length == 0)
		Materialize.toast("Insira um preço para o produto, campo obrigatório.", 8000);
	
	else if(amount.length == 0)
		Materialize.toast("Insira a quantidade para o produto, campo obrigatório.", 8000);
	
	else if(description.length == 0)
		Materialize.toast("Insira uma descrição para o produto, campo obrigatório.", 8000);
	
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
		Materialize.toast("Insira um nome para o serviço, campo obrigatório.", 8000);
	
	else if(serviceAlreadyExists(id))
		Materialize.toast("Insira outro id para o serviço, ja existe um serviço cadastrado com esse id.", 8000);
	
	else if(price.length == 0)
		Materialize.toast("Insira um preço para o serviço, campo obrigatório.", 8000);
	
	else if(description.length == 0)
		Materialize.toast("Insira uma descrição para o serviço, campo obrigatório.", 8000);
	
	
	else
	{
		insertService();
		ajaxRequestDoc('createdService.html');
	}
}








