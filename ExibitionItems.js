/*Lista com os produtos para serem listados*/
/*variavel que mantêm a ultima linha adicionada*/
var row = 0;
var itemList = [];

/*Funcao que inicia a busca*/
function startProductSearch(){
	row = 0;
	

	document.getElementById("productList").innerHTML = "";
	

	searchProductByName(document.getElementById("txtSearch").value, productList => {
		itemList = productList;
		appendProducts();
		sortItems();
	});
}

/*Funcao que inicia a busca*/
function startServiceSearch(){
	row = 0;
	

	document.getElementById("productList").innerHTML = "";
	

	searchServiceByName(document.getElementById("txtSearch").value, productList => {
		itemList = productList;
		appendProducts();
		sortItems();
	});
}

/*Funcao que inicia a busca*/
function startProductAndServiceSearch(){
	row = 0;	

	document.getElementById("productList").innerHTML = "";

	searchProductAndServiceByName(document.getElementById("txtSearch").value, productAndServiceList => {
		itemList = productAndServiceList;
		appendProducts();
		sortItems();
	});
}

function appendProducts(){
	document.getElementById("productCount").innerHTML = itemList.length;
	let total = Math.ceil(itemList.length/3);
	/*Percorre as linhas*/
	for(let i = Math.ceil(row/3), j = Math.ceil(row/3); i < Math.min(total,j+3); i++){
		/*Adiciona no HTML um novo container*/
		document.getElementById("productList").innerHTML+= `
			<div id="productListRow` + (i.toString()) + `" class='row'>
			</div>`;

		/*Vai colocando de 3 em 3 em cada linha até que acabem os itens*/
		for(let k = 0; k < Math.min(3,itemList.length-(i*3));k++,row++){
			/*Adiciona itens um a um em cada linha*/
			
			document.getElementById("productListRow" + (i.toString())).innerHTML += `
				<div class='col s4'> <!-- Put an element here! -->
				<div style="width:100%;height:120px;overflow:hidden;">
						<img src=`+itemList[i*3+k].photo+` alt="Produto No Carrinho" style="width:100%;height:100%;"></img>
				</div>
				<div style="height:30px; width:auto;">
					<a class="productLink" href="#" onclick='findItemToAdd("`+itemList[i*3+k].name+`");'>`+itemList[i*3+k].name+`</a>
				</div>
				<label class="productPrize"><br>R$ `+itemList[i*3+k].price.toFixed(2).toString()+`</label>
				</div>`;
		}
	}
	
	if(row >= itemList.length){
		document.getElementById("addMoreProducts").disabled = true; 
		document.getElementById("addMoreProducts").style.background="DarkGrey";
	}
}

function sortItems(){
	if(document.getElementById("sortProducts").value == "menorPreco"){
		itemList.sort((a,b)=>{
			return a.price - b.price;
		});
	}
	else if(document.getElementById("sortProducts").value == "maiorPreco"){
		itemList.sort((a,b)=>{
			return - a.price + b.price;
		});
	}
	row = 0;
	document.getElementById("productList").innerHTML = "";
	appendProducts();

}

function findItemToAdd(name){

	for(let i in itemList){
		if(itemList[i].name == name){
			if(itemList[i].quantity === undefined){
				ajaxRequestDoc("showService.html");
				
				document.getElementById("nameService").innerHTML = name;
				document.getElementById("serviceImage").src = itemList[i].photo;	
				document.getElementById("lblServicePrice").innerHTML = itemList[i].price.toFixed(2).toString();
				document.getElementById("pDescription").innerHTML = itemList[i].description;
				$("#dayAppointment").on('load', () => {
					defaultDate : new Date()
				});
				//$(document).on('ready', function() {
				//	document.getElementById("dayAppointment").value = new Date();
				//});
				/*Inicia os pets*/
				slotFreeClick();

				localStorage.setItem("appointment","{}");
				if(localStorage.id !== null && localStorage.id !== undefined){
					searchPetsByUserId(localStorage.id, petsList => {
						appendPets(petsList);
					});
					showSlots();
				}
				else{
					/*Usuario nao logado*/
					document.getElementById("listAnimals").innerHTML = "<h4>Você não tem Pets.</h4>";
				}
			}
			else{
				ajaxRequestDoc("showProduct.html");
				document.getElementById("nameProduct").innerHTML = name;		
				document.getElementById("productImage").src = itemList[i].photo;
				document.getElementById("lblProductPrice").innerHTML = itemList[i].price.toFixed(2).toString();
				document.getElementById("lblInStock").innerHTML = itemList[i].quantity;
				document.getElementById("pDescription").innerHTML = itemList[i].description;
			}
		}
	}
}

function appendPets(petsList){
	document.getElementById("listAnimals").innerHTML = "";
	for(let i in petsList){
		document.getElementById("listAnimals").innerHTML += `
			<input type="radio" name="chooseAnimal" value="`+i+`" onclick="setPetAppointment(`+petsList[i].idPet+`)">
				<div class="divAnimalInfo">
					<div class="divAnimalPhoto">
						<img src="`+petsList[i].photo+`" class="fullImage" alt="Imagem do Animal"/>
					</div>
					<table class="table2Items">
						<tr><td>Nome</td><td><input type="text" id="animalName" value="`+ petsList[i].name +`" readonly></td></tr>
						<tr><td>ID</td><td><input type="text" id="animalID" value="`+petsList[i].idPet+`" readonly></td></tr>
						<tr><td>Idade (em anos)</td><td><input type="text" id="animalAge" value="`+petsList[i].age+`" readonly></td></tr>
						<tr><td>Raça</td><td><input type="text" id="animalBreed" value="`+petsList[i].breed+`" readonly></td></tr>
					</table>
				</div>
			</input>
			<br>`;
	}
}

function setPetAppointment(idPet){
	searchServiceByName(document.getElementById("nameService").innerHTML, list =>{
		localStorage.setItem("appointment",

			JSON.stringify({ idPet: idPet,
			  idUser:-1,
			  idService:list[0].id,
			  total: parseFloat(document.getElementById("lblServicePrice").innerHTML), 
			  totalPortions:-1, 
			  dateApointment:-1
			}));
	});
}

function addItemToCart(){
	let itemKey = document.getElementById("nameProduct").innerHTML;
	let itemImage = document.getElementById("productImage").src;
	let itemName = document.getElementById("nameProduct").innerHTML;
	let itemPrice = document.getElementById("lblProductPrice").innerHTML;

	if(localStorage.getItem(itemKey) === null)
		localStorage.setItem(itemKey,JSON.stringify({photo:itemImage.toString(),name:itemName,price:itemPrice,quantity:"1"}));
	else{ 
		let value = JSON.parse(localStorage.getItem(itemKey));
		localStorage.setItem(itemKey,JSON.stringify({photo:itemImage.toString(),name:itemName,price:itemPrice,quantity:(parseInt(value.quantity)+1).toString()}));
	}
	Materialize.toast("Produto Adicionado ao carrinho.", 4000);
}


/*-------------------------------------- Funcao dos carrinho ----------------------------------- */
var subtotal = 0.0;

/*Exemplos para teste*/
//Padrao de insercao dos elementos (imagem,nome do produto,valor)

function initializeCart(){
	subtotal = 0.0;
	let countProducts = 0;

	for(let key in localStorage) {
		if(key == 'user' || key == 'id' || key == 'appointment' || key == 'img64Base'){
			continue;
		}
		countProducts++;
	}

	if(countProducts == 0){
		document.getElementById("confirmPayment").disabled = true; 
		document.getElementById("confirmPayment").style.background="DarkGrey";
	}
	
	
	for(let key in localStorage) {
		if(key == 'user' || key == 'id' || key == 'appointment' || key == 'img64Base'){
			continue;
		}
		// Pega a tupla e tira as virgulas
		let value = JSON.parse(localStorage.getItem(key));
	  		
	  	//valor subtotal das compras
		subtotal+= parseFloat(value.price)*parseInt(value.quantity);

		//adiciona no html os caras do carrinho
		document.getElementById("cartShopping").innerHTML+= `
		<tr> 
		<td> <!-- Foto do produto -->	
			<img src="`+value.photo+`" alt="Produto No Carrinho" border=1 height=50px width=auto></img>
		</td>
		<td> <!-- Nome do produto -->
			<label>` + value.name + `</label>
		</td>
		<td> <!-- Quantidade do produto -->
			<input id="` + value.name + `amount" type="number"  min="1" max = "99" step="1" value="`+ parseInt(value.quantity).toString()+`" onclick="updateTotalValue(this.id)"/>
		</td>
		<td> <!-- Valor do Produto*Quantidade -->
			<label> R$ ` + parseFloat(value.price).toFixed(2).toString() + `</label>
		</td>
		<td> <!-- Botao Que Remove todas as unidades do Item no carrinho -->
			<a class="btn-floating btn-large waves-effect waves-light red" id="` + value.name + `button" onclick="removeItemCartShopping(this.id)" style="height:36px;width:36px;"><i class="material-icons" style="transform:translate(0px, -8px);"> delete </i></a>			
		</td>
		</tr>`;
	}
	
	document.getElementById("cartShopping").innerHTML+= `<tr style="background-color: #fff;">
		<td></td>
		<td></td>
		<td> 
			<label><b> Subtotal<b></label>
		</td>
		<td> <!-- Soma de todos os valores do carrinho -->
			<label><b>R$ <b></label><label id ="subtotal"><b>`+ (subtotal.toFixed(2)).toString() +`</b></label>
		</td>
	  </tr>`;
}

function removeItemCartShopping(clicked_id){
	localStorage.removeItem(clicked_id.substring(0,clicked_id.length-6));

	document.getElementById("cartShopping").innerHTML = "";
	initializeCart();
}

function updateTotalValue(updated_id){
	let key = (updated_id.substring(0,updated_id.length-6));
	let value = JSON.parse(localStorage.getItem(key));
	subtotal-=parseFloat(value.price)*parseFloat(value.quantity);
	subtotal+=parseFloat(value.price)*parseFloat(document.getElementById(updated_id).value);
	value.quantity = document.getElementById(updated_id).value.toString();
	localStorage.setItem(value.name,JSON.stringify(value));
	document.getElementById("subtotal").innerHTML = subtotal.toFixed(2).toString();
}



/*------------------------------------------------------------------------------------------------------------------------*/


function checkLogin(callback) {
	let user, pass;
	
	user = document.getElementById("txtUsername").value;
	pass = document.getElementById("txtPassword").value;

	isValidUser(user,pass, (validatedUser,idUser) => {
		if(validatedUser){
			Materialize.toast("Bem Vindo " + user + ".",4000);
			localStorage.user = user;
			localStorage.id = idUser;
		}
		else{
			Materialize.toast("Usuário ou senha inválido.",4000);
			localStorage.user = null;
			localStorage.id = null;
		}
		callback();
	});
}


/*--------------------------------------------Confirmacao de pagamento--------------------------------------------------------------------------------*/


function paymentScreen(){

	if (localStorage.id === null || localStorage.id === undefined) {
		Materialize.toast("Você não está logado!\nLogue Primeiro.", 4000);
		return;
	}

	let productsInCart = [];

	for(let key in localStorage) {
		if(key == 'user' || key == 'id' || key == 'appointment' || key == 'img64Base'){
			continue;
		}
		value = JSON.parse(localStorage.getItem(key));
		productsInCart.push(value);
	}

	readAll("tableProduct", list => {
		let error = false;

		for(let i in list) {
			for(let j in productsInCart) {
				if (list[i].name == productsInCart[j].name) {
					let qtty = parseInt(productsInCart[j].quantity);
					if (!(1 <= qtty && qtty <= list[i].quantity)){
						Materialize.toast("Quantidade inválida escolhida para o produto '" + list[i].name + "'!", 4000);
						error = true;
					}
				}
			}
		}

		if (!error)
			ajaxRequestDoc("payment.html");
	});
}

/*--------------------------------------------Finalizar Compra de Produtos ---------------------------------------------------------------------------*/

function finalizeSale(){
	let productsInCart = [];
	let total = 0.0;

	for(let key in localStorage) {
		if(key == 'user' || key == 'id' || key == 'appointment' || key == 'img64Base'){
			continue;
		}
		value = JSON.parse(localStorage.getItem(key));
		productsInCart.push(value);
		localStorage.removeItem(value.name);
		total += (parseFloat(value.price)*parseFloat(value.quantity));
	}

	updateStock(JSON.stringify(productsInCart));
	insertSale(localStorage.id,JSON.stringify(productsInCart),total,document.getElementById("numberOfPortions").value);
	ajaxRequestDoc('index.html');
	initializeIdxLists();
	Materialize.toast("Pagamento realizado com sucesso!",10000);
}

/*-----------------------------------------------------userProfile----------------------------------*/

	
function openTab(evt, tagName) {
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the link that opened the tab
	document.getElementById(tagName).style.display = "block";
	evt.currentTarget.className += " active";
}

function slotFreeClick() {
	var i, tabcontent;
	tabcontent = document.getElementsByClassName("slotFree");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].onclick = function (e) {
			
			if(localStorage.user !== null && localStorage.user !== undefined){
				let value = JSON.parse(localStorage.getItem("appointment"));
				let d = new Date(document.getElementById("dayAppointment").value);
				d.setHours(parseInt(this.id.substring(("divSlot").length)) + 7);
				d.setDate(d.getDate());
				value.idUser = localStorage.id;
				value.dateApointment = d;
				localStorage.setItem(("appointment"),JSON.stringify(value));
				ajaxRequestDoc('paymentService.html');
			}
			else{
				Materialize.toast("Usuário não logado. Logue primeiro.",4000);
			}
		};
	}
}


function finalizeAppointment(){
	let value = JSON.parse(localStorage.getItem("appointment"));
	value.totalPortions = document.getElementById("numberOfPortions").value;
	insertAppointment(value.idUser,value.idPet,value.idService,value.total,value.totalPortions,value.dateApointment);
	ajaxRequestDoc('index.html');
	initializeIdxLists();
	Materialize.toast("Agendamento realizado com sucesso!",10000);
}

function showSlots() {
	let date = document.getElementById("dayAppointment").value;
	for(let i = 1; i <= 10; i++) {

		let elem = document.getElementById("divSlot" + i.toString());
		elem.className = "slotCalendar slotFree";

		elem = document.getElementById("slot" + i.toString() + "Image");
		elem.className = "";
		elem.src = "";
		elem.alt = "";

		elem = document.getElementById("slot" + i.toString() + "Status");
		elem.innerHTML = "";
	}
	searchAppointmentsByDate(date, list => {
		for (let i in list) {
			searchServiceById(list[i].idService, l1 => {
				searchPetsByPetId(list[i].idPet, l2 => {
					let d = new Date(list[i].dateAppointment);
					let idx = d.getHours() - 7;

					let elem = document.getElementById("divSlot" + idx.toString());
					elem.className = "slotCalendar slotOccupied";

					elem = document.getElementById("slot" + idx.toString() + "Image");
					elem.className = "serviceImage";
					elem.src = "images/vacinacao.jpg";
					elem.alt = "Imagem do Serviço";

					elem = document.getElementById("slot" + idx.toString() + "Status");
					elem.innerHTML = "Horário Ocupado - Serviço: "+ l1[0].name +" no animal " + l2[0].name;
				});
			});
		}
	});
}

/* -----------------------------------------  Funcao pra imagem ------------------------------- */

function readImgURL(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();
		reader.onload = function (e) {
			localStorage.setItem("img64Base", e.target.result);
		};
		reader.readAsDataURL(input.files[0]);
	}
}

/* ---------------------------------------- userProfile ---------------------------------------- */

function setInfo() {
	readAll("tableUser", list => {
		let user = {};
		for (let i in list) {
			if (list[i].id == localStorage.getItem("id")) {
				user = list[i];
				break;
			}
		}

		if (user.isAdmin)
			setInfoAdmin(user);
		else
			setInfoClient(user);
	});
}

function setInfoAdmin(user) {
	document.getElementById("btnManageAnimal").style.display = "none";
	document.getElementById("btnHistoric").style.display = "none";

	document.getElementById("btnManageProduct").style.display = "block";
	document.getElementById("btnManageService").style.display = "block";
	document.getElementById("btnManageAdmin").style.display = "block";
	document.getElementById("btnProfit").style.display = "block";

	/* aba MyInfo */

	document.getElementsByClassName("pUserLevel")[0].innerHTML = "Administrador";

	if (user.photo != null && user.photo != "")
		document.getElementById("userImage").src = user.photo;
	else
		document.getElementById("userImage").src = "images/admin.png";

	document.forms[0]["name"].value = user.name;
	document.forms[0]["user"].value = user.username;
	document.forms[0]["id"].value = user.id;

	document.forms[0]["email"].value = user.email;
	document.forms[0]["phone_number"].value = user.phone_number;

	document.getElementsByClassName("fieldsetAddress")[0].style.display = "none";

	/* aba UpdateMyInfo */

	document.getElementsByClassName("pUserLevel")[1].innerHTML = "Administrador";

	if (user.photo != null && user.photo != "")
		document.getElementById("userImage").src = user.photo;
	else
		document.getElementById("userImage").src = "";

	document.forms[1]["name"].value = user.name;
	document.forms[1]["user"].value = user.username;
	document.forms[1]["id"].value = user.id;

	document.forms[1]["password"].value = user.password;
	document.forms[1]["confpassword"].value = user.password;

	document.forms[1]["email"].value = user.email;
	document.forms[1]["phone_number"].value = user.phone_number;

	document.getElementsByClassName("fieldsetAddress")[1].style.display = "none";

	startProductSearchAdmin();

	document.getElementById("nameProduct").value = "";
	document.getElementById("idProduct").value = "";
	document.getElementById("priceProduct").value = "";
	document.getElementById("quantityProduct").value = "";
	document.getElementById("descriptionProduct").value = "";

	document.getElementById("nameService").value = "";
	document.getElementById("idService").value = "";
	document.getElementById("priceService").value = "";
	document.getElementById("descriptionService").value = "";
}

function saleDetails(sale) {
	sale = JSON.parse(sale);
}

function appDetails(sale) {
	sale = JSON.parse(sale);
}

function setInfoClient(user) {

	document.getElementById("btnManageAnimal").style.display = "block";
	document.getElementById("btnHistoric").style.display = "block";

	document.getElementById("btnManageProduct").style.display = "none";
	document.getElementById("btnManageService").style.display = "none";
	document.getElementById("btnManageAdmin").style.display = "none";
	document.getElementById("btnProfit").style.display = "none";

	/* aba MyInfo */
	document.getElementsByClassName("pUserLevel")[0].innerHTML = "Cliente";

	if (user.photo != null && user.photo != "")
		document.getElementById("userImage").src = user.photo;
	else
		document.getElementById("userImage").src = "images/userphoto.png";

	document.forms[0]["name"].value = user.name;
	document.forms[0]["user"].value = user.username;
	document.forms[0]["id"].value = user.id;

	document.forms[0]["email"].value = user.email;
	document.forms[0]["phone_number"].value = user.phone_number;

	document.getElementsByClassName("fieldsetAddress")[0].style.display = "block";

	document.forms[0]["cep"].value = user.cep;
	document.forms[0]["address"].value = user.address;
	document.forms[0]["number"].value = user.number;
	document.forms[0]["district"].value = user.district;
	document.forms[0]["city"].value = user.city;
	document.forms[0]["state"].value = user.state;

	/* aba UpdateMyInfo */

	document.getElementsByClassName("pUserLevel")[1].innerHTML = "Cliente";

	document.forms[1]["name"].value = user.name;
	document.forms[1]["user"].value = user.username;
	document.forms[1]["id"].value = user.id;

	document.forms[1]["password"].value = user.password;
	document.forms[1]["confpassword"].value = user.password;

	document.forms[1]["email"].value = user.email;
	document.forms[1]["phone_number"].value = user.phone_number;

	document.getElementsByClassName("fieldsetAddress")[1].style.display = "block";

	document.forms[1]["cep"].value = user.cep;
	document.forms[1]["address"].value = user.address;
	document.forms[1]["number"].value = user.number;
	document.forms[1]["district"].value = user.district;
	document.forms[1]["city"].value = user.city;
	document.forms[1]["state"].value = user.state;


	/* aba manageAnimal */

	searchPetsByUserId(localStorage.id, petsList => {
		document.getElementById("listAnimals").innerHTML = "";
		if (petsList.length == 0)
			document.getElementById("listAnimals").innerHTML = "<h4>Você não possui animais cadastrados.</h4>";
		else {
			for(let i in petsList){
				document.getElementById("listAnimals").innerHTML += `
						<div>
						<div class="containerPets">
							<div class = "row">
								<div class="col s3" style="transform:translateY(10px);">
									<img src="`+petsList[i].photo+`" class="fullImage" alt="Imagem do Animal"/>
								</div>
								<table class="col s8">
									<tr><td>Nome</td><td><input type="text" id="animalName" value="`+ petsList[i].name +`" readonly></td></tr>
									<tr><td>ID</td><td><input type="text" id="animalID" value="`+petsList[i].idPet+`" readonly></td></tr>
									<tr><td>Idade (em anos)</td><td><input type="text" id="animalAge" value="`+petsList[i].age+`" readonly></td></tr>
									<tr><td>Raça</td><td><input type="text" id="animalBreed" value="`+petsList[i].breed+`" readonly></td></tr>
								</table>
							</div>
							
						</div><hr></div>`;
			}
		}
	});

	/* aba historic */

	let tableSale = document.getElementsByClassName("tableHistoric")[0];
	tableSale.innerHTML = `
		<tr>
			<th>Nº da Compra</th>
			<th>Data da Compra</th>
			<th>Valor Total</th>
			<th>Total de Parcelas</th>
		</tr>`;
	
	readAllWithKey("tableSale", saleList => {
		for (let i in saleList) {
			let sale = saleList[i].value;
			if (sale.idUser == localStorage.id) {
				tableSale.innerHTML += `
				<tr>
					<td>` + saleList[i].key + `</td>
					<td>` + sale.datePaid + `</td>
					<td>` + sale.total + `</td>
					<td>` + sale.totalPortions + `</td>
					<td><a href="#" onclick="saleDetails(` + JSON.stringify(sale) + `);">Detalhes</a></td>
				</tr>`;
			}
		}
	});

	let tableAppointment = document.getElementsByClassName("tableHistoric")[1];
	tableAppointment.innerHTML = `
		<tr>
			<th>Nº do Agendamento</th>
			<th>Data do Pagamento</th>
			<th>Valor Total</th>
			<th>Total de Parcelas</th>
		</tr>`;

	readAllWithKey("tableAppointment", appList => {
		for (let i in appList) {
			let app = appList[i].value;
			if (app.idUser == localStorage.id) {
				tableAppointment.innerHTML += `
				<tr>
					<td>` + appList[i].key + `</td>
					<td>` + app.datePaid + `</td>
					<td>` + app.total + `</td>
					<td>` + app.totalPortions + `</td>
					<td><a href="#" onclick="appDetails(` + JSON.stringify(app) + `);">Detalhes</a></td>
				</tr>`;
			}
		}
	});
}





/*---------------------index html login ------------ */
function setIndexHeader(){
	if(document.getElementById("txtUsername").value == "" || document.getElementById("txtPassword").value == ""){
		Materialize.toast("Login e Usuário inválido.",2000);
	}
	else{
		checkLogin(function(){
			if(localStorage.id !== null && localStorage.id !== undefined){
				// exibitionItems.js linha 435 ver se o login atual eh adm
				let isAdmin = 0;

				readAll("tableUser", list => {
					let user = {};
					for (let i in list) {
						if (list[i].id == localStorage.getItem("id")) {
							user = list[i];
							break;
						}
					}
					isAdmin = user.isAdmin;
					if (isAdmin === true){
						document.getElementById("divCart").style.visibility = "hidden";
					}
				});

				document.getElementById("divLogin").innerHTML = `
					<div id="homeLogin">
						Bem vindo <a href="#" onclick="ajaxRequestDoc('userProfile.html');openTab(event, 'myInfo');setInfo();">`+localStorage.user+`.</a> 
						| <a class="waves-effect waves-light" href="#" onclick="logout();">Logout</a></p> 
						<a href="#" onclick="ajaxRequestDoc('userProfile.html');openTab(event, 'myInfo');setInfo();"><img src="images/admin.png" width="50" height="50"/></a>
		      		</div>
				`;

				ajaxRequestDoc('index.html');
				initializeIdxLists();
			}
		});
	}
}


/* -------------------  profit.html ---------------- */
function showProfit() {
	let tableProduct = document.getElementsByClassName("tableGanhos")[0];
	let mapProduct = new Map();
	readAll("tableSale", saleList => {
		for (let i in saleList) {
			let itemList = JSON.parse(saleList[i].items);
			for(let j in itemList) {
				if (mapProduct.has(itemList[j].name)) {
					let prod = JSON.parse(mapProduct.get(itemList[j].name));
					prod.quantity = (parseInt(prod.quantity) + parseInt(itemList[j].quantity)).toString();
					mapProduct.set(prod.name, JSON.stringify(prod));
				}
				else {
					mapProduct.set(itemList[j].name, JSON.stringify(itemList[j]));
				}
			}
		}
		
		tableProduct.innerHTML = `
			<tr>
				<th>Produto(s)</th>
				<th>Quantidade vendida</th>
				<th>Valor unitário</th>
				<th>Valor total </th>
			</tr>`;
		let totalProduct = 0.0;

		for(let prod of mapProduct.values()) {
			prod = JSON.parse(prod);
			prod.price = parseFloat(prod.price);
			prod.quantity = parseInt(prod.quantity);
			totalProduct += prod.price * prod.quantity;
			tableProduct.innerHTML += `
				<tr>
					<td>
						<div>
							<img src="` + prod.photo + `" alt="Imagem do Produto" height="42" width="42">
						</div>
						<div>
							` + prod.name + `
						<div>
					</td>
					<td> ` + prod.quantity.toString() + ` </td>
					<td> R$ ` + prod.price.toFixed(2).toString() + ` </td>
					<td> R$ ` + (prod.price * prod.quantity).toFixed(2).toString() + ` </td>
				</tr>
			`;
		}

		tableProduct = document.getElementsByClassName("tableGanhos")[1];
		tableProduct.innerHTML = `
			<tr>
				<th align="right"> Total </th>
			</tr>
			<tr>
				<td align="right"> ` + totalProduct.toFixed(2).toString() + ` </td> 	
			</tr>
		`;
	});


	let tableService = document.getElementsByClassName("tableGanhos")[2];
	let mapService = new Map();
	readAll("tableAppointment", appList => {
		for (let i in appList) {
			if (mapService.has(appList[i].idService)) {
				let app = JSON.parse(mapService.get(appList[i].idService));
				app.quantity = (parseInt(app.quantity) + 1).toString();
				mapService.set(app.idService, JSON.stringify(app));
			}
			else {
				mapService.set(appList[i].idService, JSON.stringify({ idService : appList[i].idService, quantity: "1", price : appList[i].total.toString()}));
			}
		}
		
		tableService.innerHTML = `
			<tr>
				<th>Serviço(s)</th>
				<th>Quantidade realizado</th>
				<th>Valor unitário</th>
				<th>Valor total </th>
			</tr>`;
		let totalService = 0.0;

		readAll("tableService", serviceList => {
			for(let app of mapService.values()) {
				app = JSON.parse(app);
				app.price = parseFloat(app.price);
				app.quantity = parseInt(app.quantity);
				totalService += app.price * app.quantity;
				for(let i in serviceList) {
					if (serviceList[i].id == app.idService) {
						tableService.innerHTML += `
							<tr>
								<td>
									<div>
										<img src="` + serviceList[i].photo + `" alt="Imagem do Serviço" height="42" width="42">
									</div>
									<div>
										` + serviceList[i].name + `
									<div>
								</td>
								<td> ` + app.quantity.toString() + ` </td>
								<td> R$ ` + app.price.toFixed(2).toString() + ` </td>
								<td> R$ ` + (app.price * app.quantity).toFixed(2).toString() + ` </td>
							</tr>
						`;
					}
				}
			}

			tableService = document.getElementsByClassName("tableGanhos")[3];
			tableService.innerHTML = `
				<tr>
					<th align="right"> Total </th>
				</tr>
				<tr>
					<td align="right"> ` + totalService.toFixed(2).toString() + ` </td> 	
				</tr>
			`;
		});
		
	});
}





/*----------------------------------- novas funcoes ------------------------------------------ */
var itemListAdmin = [];
var rowAdminProducts = 0;

function appendProductsAdmin(){
	document.getElementById("productCountAdm").innerHTML = itemListAdmin.length;
	let total = Math.ceil(itemListAdmin.length/3);
	/*Percorre as linhas*/
	for(let i = Math.ceil(rowAdminProducts/3), j = Math.ceil(rowAdminProducts/3); i < Math.min(total,j+3); i++){
		/*Adiciona no HTML um novo container*/
		document.getElementById("productListRowAdm").innerHTML+= `
			<div id="productListRowAdm` + (i.toString()) + `" class='row'>
			</div>`;

		/*Vai colocando de 3 em 3 em cada linha até que acabem os itens*/
		for(let k = 0; k < Math.min(3,itemListAdmin.length-(i*3));k++,rowAdminProducts++){
			/*Adiciona itens um a um em cada linha*/
			document.getElementById("productListRowAdm" + (i.toString())).innerHTML += `
				<div class='col s4'> <!-- Put an element here! -->
					<img src="`+itemListAdmin[i*3+k].photo+`" alt="Imagem do Produto" height=100px width=auto style="padding: 10px 1px 1px 50px;"></img>
						<p>
						<input id="`+itemListAdmin[i*3+k].name+`" type="radio" name="product" onclick='changeFormsProductsAdm(`+JSON.stringify(itemListAdmin[i*3+k])+`)'></input>
						<label for="`+itemListAdmin[i*3+k].name+`"> `+ itemListAdmin[i*3+k].name+`</label><br>
						<label class="productPrize">R$ <label id="priceProductAdmin">`+ itemListAdmin[i*3+k].price.toFixed(2).toString() +`</label></label>
						</p>
					
				</div>`;
		}
	}
	
	if(rowAdminProducts >= itemListAdmin.length){
		document.getElementById("addMoreProductsAdm").disabled = true; 
		document.getElementById("addMoreProductsAdm").style.background="DarkGrey";
	}

	startServicesSearchAdmin();
}

/*Funcao que inicia a busca*/
function startProductSearchAdmin(){
	rowAdminProducts = 0;	
	document.getElementById("productListRowAdm").innerHTML = ""; 
	searchProductByName(document.getElementById("txtSearchUpdateProduct").value, productList => {
		itemListAdmin = productList;
		appendProductsAdmin();
	});
}

function changeFormsProductsAdm(product){
	let value = product;
	document.getElementById("nameProduct").value = value.name;
	document.getElementById("idProduct").value = value.id;
	document.getElementById("priceProduct").value = value.price.toString();
	document.getElementById("quantityProduct").value = value.quantity;
	document.getElementById("descriptionProduct").value = value.description;
}

function appendServicesAdmin(){
	document.getElementById("serviceCountAdm").innerHTML = itemListAdmin.length;
	let total = Math.ceil(itemListAdmin.length/3);
	/*Percorre as linhas*/
	for(let i = Math.ceil(rowAdminProducts/3), j = Math.ceil(rowAdminProducts/3); i < Math.min(total,j+3); i++){
		/*Adiciona no HTML um novo container*/
		document.getElementById("serviceListRowAdm").innerHTML+= `
			<div id="serviceListRowAdm` + (i.toString()) + `" class='row'>
			</div>`;

		/*Vai colocando de 3 em 3 em cada linha até que acabem os itens*/
		for(let k = 0; k < Math.min(3,itemListAdmin.length-(i*3));k++,rowAdminProducts++){
			/*Adiciona itens um a um em cada linha*/
			document.getElementById("serviceListRowAdm" + (i.toString())).innerHTML += `
				<div class='col s4'> <!-- Put an element here! -->
					<img src="`+itemListAdmin[i*3+k].photo+`" alt="Imagem do Produto" height=100px width=auto style="padding: 10px 1px 1px 50px;"></img>
					<br>
					<input type="radio" name="product" onclick='changeFormsServicesAdm(`+JSON.stringify(itemListAdmin[i*3+k])+`)'>`+itemListAdmin[i*3+k].name+`</input>
					<br><label class="servicePrize">R$ <label id="serviceProductAdmin">`+ itemListAdmin[i*3+k].price.toFixed(2).toString() +`</label></label>
				</div>`;
		}
	}
	
	if(rowAdminProducts >= itemListAdmin.length){
		document.getElementById("addMoreServicesAdm").disabled = true; 
		document.getElementById("addMoreServicesAdm").style.background="DarkGrey";
	}
}

/*Funcao que inicia a busca*/
function startServicesSearchAdmin(){
	rowAdminProducts = 0;	
	document.getElementById("serviceListRowAdm").innerHTML = ""; 
	searchServiceByName(document.getElementById("txtSearchUpdateService").value, productList => {
		itemListAdmin = productList;
		appendServicesAdmin();
	});
}

function changeFormsServicesAdm(service){
	let value = service;
	document.getElementById("nameService").value = value.name;
	document.getElementById("idService").value = value.id;
	document.getElementById("priceService").value = value.price.toString();
	document.getElementById("descriptionService").value = value.description;
}

function updateMyInfoClick() {
	readAll("tableUser", userList => {
		for(let i in userList) {
			if (userList[i].id == localStorage.getItem("id")) {
				if (userList[i].isAdmin && !checkFieldUpdateAdmin()) return ;
				if (!userList[i].isAdmin && !checkFieldUpdateClient()) return ;
				deleteFromDB("tableUser", parseInt(localStorage.getItem("id")));
				updateUser(userList[i].isAdmin);
				Materialize.toast("Suas informações foram atualizadas com sucesso!",4000);
				readAll("tableUser", uList => {
					for(let j in uList) {
						if (uList[j].id == localStorage.getItem("id")) {
							if (uList[j].isAdmin)
								setInfoAdmin(uList[j]);
							else
								setInfoClient(uList[j]);
							break;
						}
					}
				});
				break;
			}
		}
	});
}

function showItemsByFilter() {
	let ifp = document.getElementById("itemFilterProduct").checked;
	let ifs = document.getElementById("itemFilterService").checked;
	if (ifp && ifs)
		startProductAndServiceSearch();
	else if (ifp)
		startProductSearch();
	else if (ifs)
		startServiceSearch();
}


/* ------------------------     novas func     -------------------------- */

var idxProductList, idxServiceList;

function initializeIdxLists() {
	recentlyAdded((pList, sList) => {
		idxProductList = pList;
		idxServiceList = sList;
		idxAppendProducts();
		idxAppendServices();
	});
}


function idxFindItemToAdd(name){
	let itemList = idxServiceList;
	for(let i in itemList){
		if(itemList[i].name == name){
			
				ajaxRequestDoc("showService.html");
				
				document.getElementById("nameService").innerHTML = name;
				document.getElementById("serviceImage").src = itemList[i].photo;	
				document.getElementById("lblServicePrice").innerHTML = itemList[i].price.toFixed(2).toString();
				document.getElementById("pDescription").innerHTML = itemList[i].description;
				$("#dayAppointment").on('load', () => {
					defaultDate : new Date()
				});
				//$(document).on('ready', function() {
				//	document.getElementById("dayAppointment").value = new Date();
				//});
				/*Inicia os pets*/
				slotFreeClick();

				localStorage.setItem("appointment","{}");
				if(localStorage.id !== null && localStorage.id !== undefined){
					searchPetsByUserId(localStorage.id, petsList => {
						appendPets(petsList);
					});
					showSlots();
				}
				else{
					/*Usuario nao logado*/
					document.getElementById("listAnimals").innerHTML = "<h4>Você não tem Pets.</h4>";
				}
				
				return ;			
		}
	}
	itemList = idxProductList;
	for(let i in itemList){
		if(itemList[i].name == name){
			ajaxRequestDoc("showProduct.html");
			document.getElementById("nameProduct").innerHTML = name;		
			document.getElementById("productImage").src = itemList[i].photo;
			document.getElementById("lblProductPrice").innerHTML = itemList[i].price.toFixed(2).toString();
			document.getElementById("lblInStock").innerHTML = itemList[i].quantity;
			document.getElementById("pDescription").innerHTML = itemList[i].description;

			return ;
		}
	}
}

function idxAppendProducts(){
	let itemList = idxProductList;
	let row = 0;
	let total = Math.ceil(itemList.length/3);
	/*Percorre as linhas*/
	for(let i = Math.ceil(row/3), j = Math.ceil(row/3); i < Math.min(total,j+3); i++){
		/*Adiciona no HTML um novo container*/
		document.getElementById("idxProductList").innerHTML+= `
			<div id="idxProductListRow` + (i.toString()) + `" class='row'>
			</div>`;

		/*Vai colocando de 3 em 3 em cada linha até que acabem os itens*/
		for(let k = 0; k < Math.min(3,itemList.length-(i*3));k++,row++){
			/*Adiciona itens um a um em cada linha*/
			
			document.getElementById("idxProductListRow" + (i.toString())).innerHTML += `
				<div class='col s4'> <!-- Put an element here! -->
				<div style="width:100%;height:120px;overflow:hidden;">
						<img src=`+itemList[i*3+k].photo+` alt="Imagem do Produto" style="width:100%;height:100%;"></img>
				</div>
				<div style="height:30px; width:auto;">
					<a class="productLink" href="#" onclick='idxFindItemToAdd("`+itemList[i*3+k].name+`");'>`+itemList[i*3+k].name+`</a>
				</div>
				<label class="productPrize"><br>R$ `+itemList[i*3+k].price.toFixed(2).toString()+`</label>
				</div>`;
		}
	}
	
	if(row >= itemList.length){
		document.getElementById("idxAddMoreProducts").disabled = true; 
		document.getElementById("idxAddMoreProducts").style.background="DarkGrey";
	}
}


function idxAppendServices(){
	let itemList = idxServiceList;
	let row = 0;
	let total = Math.ceil(itemList.length/3);
	/*Percorre as linhas*/
	for(let i = Math.ceil(row/3), j = Math.ceil(row/3); i < Math.min(total,j+3); i++){
		/*Adiciona no HTML um novo container*/
		document.getElementById("idxServiceList").innerHTML+= `
			<div id="idxServiceListRow` + (i.toString()) + `" class='row'>
			</div>`;

		/*Vai colocando de 3 em 3 em cada linha até que acabem os itens*/
		for(let k = 0; k < Math.min(3,itemList.length-(i*3));k++,row++){
			/*Adiciona itens um a um em cada linha*/
			
			document.getElementById("idxServiceListRow" + (i.toString())).innerHTML += `
				<div class='col s4'> <!-- Put an element here! -->
				<div style="width:100%;height:120px;overflow:hidden;">
						<img src=`+itemList[i*3+k].photo+` alt="Imagem do Serviço" style="width:100%;height:100%;"></img>
				</div>
				<div style="height:30px; width:auto;">
					<a class="productLink" href="#" onclick='idxFindItemToAdd("`+itemList[i*3+k].name+`");'>`+itemList[i*3+k].name+`</a>
				</div>
				<label class="productPrize"><br>R$ `+itemList[i*3+k].price.toFixed(2).toString()+`</label>
				</div>`;
		}
	}
	
	if(row >= itemList.length){
		document.getElementById("idxAddMoreServices").disabled = true; 
		document.getElementById("idxAddMoreServices").style.background="DarkGrey";
	}
}


/*--------------------------------------------- logout(); function -------------------------------------------------- */

function logout(){
	Materialize.toast("Até logo, " + localStorage.user, 4000);
	localStorage.id = localStorage.user = null;
	document.getElementById("divLogin").innerHTML = `
		<div id="homeLogin">
			<input type="text" id="txtUsername" placeholder="Usuário">
			<input type="password" id="txtPassword" placeholder="Senha">
			<button id="loginButton" type="button" onclick="setIndexHeader();">Login</button>
		</div>
		<a class="hyperlink" href="#" onclick='ajaxRequestDoc("createClient.html");'>Cadastro</a>
	`;
	ajaxRequestDoc('index.html');
	initializeIdxLists();
}
