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
	console.log(name);
	for(let i in itemList){
		if(itemList[i].name == name){
			if(itemList[i].quantity === undefined){
				ajaxRequestDoc("showService.html");
				document.getElementById("nameService").innerHTML = name;
				
				// COLOCAR IMAGEM document.getElementById("name").innerHTML = name;		

				document.getElementById("lblServicePrice").innerHTML = itemList[i].price.toFixed(2).toString();
				document.getElementById("pDescription").innerHTML = itemList[i].description;
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
	
	/*Falta o bangue da imagem, ver isso quando tiver baum*/
	for(let key in localStorage) {
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
		
	if(isValidUser(user, pass)){
		alert("Bem vindo, " + " " + user + " " + "seu login foi efetuado com sucesso.");
		localStorage.user = user;
	}	
	else{
		alert("Login inválido, tente novamente.");
		localStorage.user = null;
	}
}


/*--------------------------------------------Confirmacao de pagamento--------------------------------------------------------------------------------*/


function paymentScreen(){
	ajaxRequestDoc("showService.html");
	// Inserir uma nova compra. Falta os negócios dos usuários.
}	