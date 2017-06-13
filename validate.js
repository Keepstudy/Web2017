function checkFieldAdmin()
{
	let name     = document.forms[0]["nome"].value;
	let username = document.forms[0]["username"].value;
	let cpf      = document.forms[0]["id"].value;
	let phone    = document.forms[0]["phone_number"].value;
	let email    = document.forms[0]["email"].value;
	let pass     = document.forms[0]["senha"].value;
	let confpass = document.forms[0]["confsenha"].value;
	let error    = false;

	if(name.length == 0){
		Materialize.toast("Insira um nome, campo obrigatório",8000);
		error = true;		
	}
	
	else if(usernameAlreadyExists(username)){
		Materialize.toast("Nome de usuário já existe, tente outro.",8000);
		error = true;	
	}
	
	if(cpfAlreadyExists(cpf)){
		Materialize.toast("CPF já cadastrado, insira outro CPF.",8000);
		error = true;
	}
	
	if(phone.length == 0){
		Materialize.toast("Insira um telefone, campo obrigatório",8000);
		error = true;	
	}
	
	else if(email.length == 0){
		Materialize.toast("Insira um email, campo obrigatório",8000);
		error = true;
	}
	
	if (pass.localeCompare(confpass) != 0){
		Materialize.toast("Senhas diferentes, digite novamente.",8000);
		error = true;	
	}
	
	return ret;
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
		Materialize.toast("Insira um nome, campo obrigatório",8000);
	}
	else if(usernameAlreadyExists(username)){
		ret = false;
		Materialize.toast("Nome de usuário já existe, tente outro.",8000);
	}
	if(cpfAlreadyExists(cpf)){
		ret = false;
		Materialize.toast("CPF já cadastrado, insira outro CPF.",8000);
	}
	if(phone.length == 0){
		ret = false;
		Materialize.toast("Insira um telefone, campo obrigatório",8000);
	}
	if(email.length == 0){
		ret = false;
		Materialize.toast("Insira um email, campo obrigatório",8000);
	}
	if (pass.localeCompare(confpass) != 0){
		ret = false;
		Materialize.toast("Senhas diferentes, digite novamente.",8000);
	}
	return ret;
}

function checkFieldClient()
{
	let name     = document.forms[0]["name"].value;
	let username = document.forms[0]["user"].value;
	let cpf      = document.forms[0]["id"].value;	
	let pass     = document.forms[0]["senha"].value;
	let confpass = document.forms[0]["confsenha"].value;
	let phone    = document.forms[0]["phone_number"].value;
	let email    = document.forms[0]["email"].value;
	let CEP      = document.forms[0]["cep"].value;
	let adress   = document.forms[0]["address"].value;
	let number   = document.forms[0]["number"].value;
	let district = document.forms[0]["district"].value;
	let city     = document.forms[0]["city"].value;
	let state    = document.forms[0]["state"].value;
	let error    = false;
	
	if(name.length == 0){
		Materialize.toast("Insira um nome, campo obrigatório",8000);
		error = true;
	}
	
	else if(usernameAlreadyExists(username)){
		Materialize.toast("Nome de usuário já existe, tente outro.",8000);
		error = true;
	}
	
	if(cpfAlreadyExists(cpf)){
		Materialize.toast("CPF já cadastrado, insira outro CPF.",8000);
		error = true;
	}
	
	if (pass.localeCompare(confpass) != 0){
		Materialize.toast("Senhas diferentes, digite novamente.",8000);
		error = true;
	}
	
	if(email.length == 0){
		Materialize.toast("Insira um email, campo obrigatório",8000);
		error = true;
	}
	
	if(phone.length == 0){
		Materialize.toast("Insira um telefone, campo obrigatório",8000);
		error = true;
	}
	
	if(CEP.length == 0){
		Materialize.toast("Insira um CEP, campo obrigatório.",8000);
		error = true;
	}
	
	if(adress.length == 0){
		Materialize.toast("Insira um endereço, campo obrigatório",8000);
		error = true;
	}
	
	if(number.length == 0){
		Materialize.toast("Insira um número, campo obrigatório.",8000);
		error = true;
	}
	
	if(district.length == 0){
		Materialize.toast("Insira um bairro, campo obrigatório.",8000);
		error = true;
	}
	
	if(city.length == 0){
		Materialize.toast("Insira uma cidade, campo obrigatório.",8000);
		error = true;
	}
	
	if(state.length == 0){
		Materialize.toast("Insira uma cidade, campo obrigatório.",8000);
		error = true;
	}
	
	if(error === false)
	{
		insertUser(0);
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
	let state    = document.forms[1]["state"].value;
	
	if(name.length == 0) {
		ret = false;
		Materialize.toast("Insira um nome, campo obrigatório",8000);
	}
	else if(usernameAlreadyExists(username)) {
		ret = false;
		Materialize.toast("Nome de usuário já existe, tente outro.",8000);
	}
	if(cpfAlreadyExists(cpf)) {
		ret = false;
		Materialize.toast("CPF já cadastrado, insira outro CPF.",8000);
	}
	if (pass.localeCompare(confpass) != 0) {
		ret = false;
		Materialize.toast("Senhas diferentes, digite novamente.",8000);
	}
	if(email.length == 0) {
		ret = false;
		Materialize.toast("Insira um email, campo obrigatório",8000);
	}
	if(phone.length == 0) {
		ret = false;
		Materialize.toast("Insira um telefone, campo obrigatório",8000);
	}
	if(email.length == 0) {
		ret = false;
		Materialize.toast("Insira um email, campo obrigatório",8000); 
	}
	if(CEP.length == 0) {
		ret = false;
		Materialize.toast("Insira um CEP, campo obrigatório.",8000);
	}
	if(adress.length == 0) {
		ret = false;
		Materialize.toast("Insira um endereço, campo obrigatório",8000);
	}
	if(number.length == 0) {
		ret = false;
		Materialize.toast("Insira um número, campo obrigatório.",8000);
	}
	if(district.length == 0) {
		ret = false;
		Materialize.toast("Insira um bairro, campo obrigatório.",8000);
	}
	if(city.length == 0) {
		ret = false;
		Materialize.toast("Insira uma cidade, campo obrigatório.",8000);
	}
	if(state.length == 0) {
		ret = false;
		Materialize.toast("Insira uma cidade, campo obrigatório.",8000);
	}
	return ret;
}

function checkPetField()
{
	let animal   = document.forms[0]["animal"].value;
	let breed    = document.forms[0]["raça"].value;
	let age      = document.forms[0]["idade"].value;
	let error = false;
	
	if(animal.length == 0){
		Materialize.toast("Insira um nome para o animel, campo obrigatório.",8000);
		error = true;
	}
	
	if(breed.length == 0){
		Materialize.toast("Insira uma raça para o animal, campo obrigatório.",8000);
		error = true;
	}
	
	if(age.length == 0){
		Materialize.toast("Insira a idade do animal, campo obrigatório.",8000);
		error = true;
	}
	
	if(error === false)
	{
		insertPet();
	}
}

function checkProductField()
{
	let name        = document.forms[0]["produto"].value;	
	let price       = document.forms[0]["preço"].value;
	let amount      = document.forms[0]["quantidade"].value;
	let description = document.forms[0]["desc"].value;
	let error       = false;
	
	if(name.length == 0){
		Materialize.toast("Insira um nome para o produto, campo obrigatório.",8000);
		error = true;
	}
	
	if(price.length == 0){
		Materialize.toast("Insira um preço para o produto, campo obrigatório.",8000);
		error = true;
	}
	
	if(amount.length == 0){
		Materialize.toast("Insira a quantidade para o produto, campo obrigatório.",8000);
		error = true;
	}
	
	if(description.length == 0){
		Materialize.toast("Insira uma descrição para o produto, campo obrigatório.",8000);
		error = true;
	}
	
	if(error === false)
	{
		insertProduct();
	}
}


function checkServiceField()
{
	let name        = document.forms[0]["pname"].value;
	let price       = document.forms[0]["preço"].value;	
	let description = document.forms[0]["desc"].value;
	let error       = false;
	
	if(name.length == 0){
		Materialize.toast("Insira um nome para o serviço, campo obrigatório.",8000);
		error = true;
	}
	
	if(price.length == 0){
		Materialize.toast("Insira um preço para o serviço, campo obrigatório.",8000);
		error = true;
	}
	
	if(description.length == 0){
		Materialize.toast("Insira uma descrição para o serviço, campo obrigatório.",8000);
		error = true;
	}
	
	if(error === false)
	{
		insertService();
	}
}








