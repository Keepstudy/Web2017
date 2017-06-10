/*Lista com os produtos para serem listados*/
/*variavel que mantêm a ultima linha adicionada*/
var row = 0;
var itemList = [];

/*Funcao que inicia a busca*/
function startProductSearch(){
	row = 0;
	

	document.getElementById("productList").innerHTML = "";
	document.getElementById("sortProducts").value = "relevancia";

	searchProductByName(document.getElementById("txtSearch").value, productList => {
		itemList = productList;
		appendProducts();
	});
}

/*Funcao que inicia a busca*/
function startProductAndServiceSearch(){
	row = 0;	

	document.getElementById("productList").innerHTML = "";
	document.getElementById("sortProducts").value = "relevancia";

	searchProductAndServiceByName(document.getElementById("txtSearch").value, productAndServiceList => {
		itemList = productAndServiceList;
		console.log(itemList);
		appendProducts();
	});
}

function appendProducts(){
	document.getElementById("productCount").innerHTML = itemList.length;
	let total = Math.ceil(itemList.length/3);
	/*Percorre as linhas*/
	for(let i = Math.ceil(row/3), j = Math.ceil(row/3); i < Math.min(total,j+3); i++){
		/*Adiciona no HTML um novo container*/
		document.getElementById("productList").innerHTML+= `
			<div id="productListRow` + (i.toString()) + `" class='container'>
			</div>`;

		/*Vai colocando de 3 em 3 em cada linha até que acabem os itens*/
		for(let k = 0; k < Math.min(3,itemList.length-(i*3));k++,row++){
			/*Adiciona itens um a um em cada linha*/
			console.log(i*3+k);
			
			document.getElementById("productListRow" + (i.toString())).innerHTML += `
				<div class='item'> <!-- Put an element here! -->
				<div style="width:100%;height:120px;overflow:hidden;">
						<img src='images/racao.jpg' alt="Produto No Carrinho" style="width:100%;height:100%;"></img>
				</div>
				<a class="productLink" href="#" onclick='findItemToAdd("`+itemList[i*3+k].name+`");'>`+itemList[i*3+k].name+`</a>
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
				// COLOCAR IMAGEM document.getElementById("name").innerHTML = name;		
				document.getElementById("lblServicePrice").innerHTML = itemList[i].price.toFixed(2).toString();
				document.getElementById("pDescription").innerHTML = itemList[i].description;
				
				/*Inicia os pets*/
				slotFreeClick();
				localStorage.setItem("appointment","{}");
				if(localStorage.id !== null && localStorage.id !== undefined){
					searchPetsByUserId(localStorage.id, petsList => {
						appendPets(petsList);
					});
				}
				else{
					/*Usuario nao logado*/
					document.getElementById("listAnimals").innerHTML = "<h4>Você não tem Pets.</h4>";
				}
			}
			else{
				ajaxRequestDoc("showProduct.html");
				document.getElementById("nameProduct").innerHTML = name;
				
				// COLOCAR IMAGEM document.getElementById("name").innerHTML = name;		

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
						<img src="images/jackphoto.jpg" class="fullImage" alt="Imagem do Animal"/>
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
	let itemImage = "";
	let itemName = document.getElementById("nameProduct").innerHTML;
	let itemPrice = document.getElementById("lblProductPrice").innerHTML;
	console.log(localStorage.getItem(itemKey));
	if(localStorage.getItem(itemKey) === null)
		localStorage.setItem(itemKey,["1",itemName,itemPrice,"1"]);
	else{ 
		let value = localStorage.getItem(itemKey).split(',');
		localStorage.setItem(itemKey,["1",itemName,itemPrice,(parseInt(value[3])+1).toString()]);
	}
	alert("Add esta porquera" + itemKey);
}


/*-------------------------------------- Funcao dos carrinho ----------------------------------- */
var subtotal = 0.0;

/*Exemplos para teste*/
//Padrao de insercao dos elementos (imagem,nome do produto,valor)

function initializeCart(){
	subtotal = 0.0;
	
	if(localStorage.length == 0){
		document.getElementById("confirmPayment").disabled = true; 
		document.getElementById("confirmPayment").style.background="DarkGrey";
	}
	
	
	for(let key in localStorage) {
		if(key == 'user' || key == 'id' || key == 'appointment'){
			continue;
		}
		// Pega a tupla e tira as virgulas
		let value = localStorage.getItem(key).split(',');
	  		
	  	//valor subtotal das compras
		subtotal+= parseFloat(value[2])*parseInt(value[3]);

		//adiciona no html os caras do carrinho
		document.getElementById("cartShopping").innerHTML+= `
		<tr> 
		<td> <!-- Foto do produto -->						
			<img src="images/racao.jpg" alt="Produto No Carrinho" border=1 height=50px width=auto></img>
		</td>
		<td> <!-- Nome do produto -->
			<label>` + value[1] + `</label>
		</td>
		<td> <!-- Quantidade do produto -->
			<input id="` + value[1] + `amount" type="number"  min="1" max = "99" step="1" value="`+ parseInt(value[3]).toString()+`" onclick="updateTotalValue(this.id)"/>
		</td>
		<td> <!-- Valor do Produto*Quantidade -->
			<label> R$ ` + parseFloat(value[2]).toFixed(2).toString() + `</label>
		</td>
		<td> <!-- Botao Que Remove todas as unidades do Item no carrinho -->
			<button id="`+ value[1] +`button" class="shoppingCartButtonRemove" type="button" onclick="removeItemCartShopping(this.id)">x</button>
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
	console.log(clicked_id.substring(0,clicked_id.length-6));
	console.log(localStorage.length);
	document.getElementById("cartShopping").innerHTML = "";
	initializeCart();
}

function updateTotalValue(updated_id){
	let key = (updated_id.substring(0,updated_id.length-6));
	let value = localStorage.getItem(key).split(',');
	subtotal-=parseFloat(value[2])*parseFloat(value[3]);
	subtotal+=parseFloat(value[2])*parseFloat(document.getElementById(updated_id).value);
	localStorage.setItem(value[1],[value[0],value[1],value[2],document.getElementById(updated_id).value.toString()]);
	document.getElementById("subtotal").innerHTML = subtotal.toFixed(2).toString();
}



/*------------------------------------------------------------------------------------------------------------------------*/


function checkLogin() {
	let user, pass;
	
	user = document.getElementById("txtUsername").value;
	pass = document.getElementById("txtPassword").value;
	
	console.log(user);
	console.log(pass);

	isValidUser(user,pass, (validatedUser,idUser) => {
		if(validatedUser){
			alert("Bem vindo, " + " " + user + " " + "seu login foi efetuado com sucesso.");
			localStorage.user = user;
			localStorage.id = idUser;
			console.log(localStorage.id);
		}
		else{
			alert("Login inválido, tente novamente.");
			localStorage.user = null;
			localStorage.id = null;
		}
	});
}


/*--------------------------------------------Confirmacao de pagamento--------------------------------------------------------------------------------*/


function paymentScreen(){
	ajaxRequestDoc("payment.html");
	// Inserir uma nova compra. Falta os negócios dos usuários.
}	

/*--------------------------------------------Finalizar Compra de Produtos ---------------------------------------------------------------------------*/

function finalizeSale(){
	let productsInCart = [];
	let total = 0.0;

	for(let key in localStorage) {
		if(key == 'user' || key == 'id' || key == 'appointment'){
			continue;
		}
		value = localStorage.getItem(key).split(',');
		productsInCart.push([localStorage.getItem(key)]);
		total += (parseFloat(value[2])*parseFloat(value[3]));
	}

	console.log(JSON.stringify(productsInCart));
	console.log(total);
	console.log(document.getElementById("numberOfPortions").value);
	insertSale(localStorage.id,JSON.stringify(productsInCart),total,document.getElementById("numberOfPortions").value);

	console.log(document.getElementById("dayBirthPayment").value);
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
				value.idUser = localStorage.id;
				value.dateApointment = new Date(d.getFullYear() + "-" +d.getMonth()+ "-" +d.getDate()+ "T" +(parseInt(this.id.substring(("divSlot").length)) + 7).toString() + ":00:00Z");
				localStorage.setItem(("appointment"),JSON.stringify(value));
				ajaxRequestDoc('paymentService.html');
			}
			else{
				alert("Logue-se!");
			}
		};
	}
}


function finalizeAppointment(){
	let value = JSON.parse(localStorage.getItem("appointment"));
	value.totalPortions = document.getElementById("numberOfPortions").value;
	console.log("obj: " + value);
	insertAppointment(value.idUser,value.idPet,value.idService,value.total,value.totalPortions,value.dateApointment);
	//console.log(document.getElementById("dayBirthPayment").value);
}