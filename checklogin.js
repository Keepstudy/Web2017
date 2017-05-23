function checkLogin()
{
	let user, pass;
	
	user = document.getElementById("txtUsername").value;
	pass = document.getElementById("txtPassword").value;
	
	if(isValidUser(user, pass))
	{
		alert("Bem vindo, " + " " + user + " " + "seu login foi efetuado com sucesso.");
		localStorage.user = user;
	}	
	else
	{
		alert("Login inválido, tente novamente.");
		localStorage.user = null;
	}
}