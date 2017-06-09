const dbname = "petshopDB";

// produtos para serem inseridos ao iniciar
const productList = [
	{id: 1, name: "Ração para cães 11kg", price: 11.00, quantity: 111, description: "ração fera", photo: ""},
	{id: 2, name: "Ração para cães 12kg", price: 12.00, quantity: 222, description: "ração fera", photo: ""},
	{id: 3, name: "Ração para cães 13kg", price: 13.00, quantity: 333, description: "ração fera", photo: ""}
];

// serviços para serem inseridos ao iniciar
const serviceList = [
	{id: 1, name: "Vacinação", price: 11.00, description: "vacinação fera", photo: ""},
	{id: 2, name: "Banho e Tosa", price: 12.00, description: "banho e tosa fera", photo: ""}
];

// animais para serem inseridos ao iniciar
const petList = [
	{idPet: 8931, idUser: 7, name: "Jack", age: 3, breed: "Jack russell terrier", photo: ""},
	{idPet: 8932, idUser: 7, name: "Lessie", age: 2, breed: "Rough collie", photo: ""}
];

// usuários para serem inseridos ao iniciar
const userList = [
	{id: 7, name: "PetShop ooooo client", username: "client", password: "client", photo: "", email: "client@petshop.com", phone_number: "(11)91313-1313", cep: "13566-590", address: "Av. Trab. São-Carlense", number: "400", district: "Parque Arnold Schimidt", city: "São Carlos", state: "SP", isAdmin: false},
	{id: 13, name: "PetShop ooooo admin", username: "admin", password: "admin", photo: "", email: "admin@petshop.com", phone_number: "(11)91313-1313", isAdmin: true}
];

// vendas para serem inseridos ao iniciar
const saleList = [
	{ idUser: 7, items: "[['1', 'racao pra periquito 10kg', '100.00', '1'], ['1', 'racao pra periquito 20kg', '200.00', '1']]", total: 600.00, totalPortions: 6, datePaid: new Date(2014, 9, 13, 11, 13) }
];

// agendamentos para serem inseridos ao iniciar
const appointmentList = [
	{ idUser: 7, idPet: 8931, idService: 1, total: 11.00, totalPortions: 1, dateAppointment: new Date(2017, 6, 3, 8), datePaid: new Date(2017, 6, 1, 8, 15) }
];

let db;

function initializeDB() {

	// checando se o browser suporta IndexedDB
	if("indexedDB" in window) {
		console.log("IndexedDB is supported.");
		
		// iniciando a conexão com o DB
		let openRequest = indexedDB.open(dbname);
		
		openRequest.onupgradeneeded = e => {
			db = e.target.result;
			if (db.objectStoreNames.length == 0) {
				console.log("Upgrading database...");
				
				/* ----------------------------- tableProduct -------------------------------- */
				
				// criando a tabela e setando a chave primaria
				let tableProduct = db.createObjectStore("tableProduct", { keyPath: "id" } );
				
				// Cria um índice para buscas. Supondo que o campo também será chave.
				tableProduct.createIndex("name", "name", { unique: true });
				
				/* ----------------------------- tableService -------------------------------- */
				
				// criando a tabela e setando a chave primaria
				let tableService = db.createObjectStore("tableService", { keyPath: "id" } );
				
				// Cria um índice para buscas. Supondo que o campo também será chave.
				tableService.createIndex("name", "name", { unique: true });
				
				/* ------------------------------- tablePet ---------------------------------- */
				
				// criando a tabela e setando a chave primaria
				let tablePet = db.createObjectStore("tablePet", { keyPath: "idPet" } );
				
				/* ------------------------------- tableUser ---------------------------------- */
				
				// criando a tabela e setando a chave primaria
				let tableUser = db.createObjectStore("tableUser", { keyPath: "id" } );
				
				// Cria um índice para buscas. Supondo que o campo também será chave.
				tableUser.createIndex("username", "username", { unique: true });
				
				/* ------------------------------- tableSale ---------------------------------- */
				
				// criando a tabela e setando a chave primaria
				let tableSale = db.createObjectStore("tableSale", { autoIncrement: true } );
				
				// Cria um índice para buscas.
				tableSale.createIndex("idUser", "idUser", { unique: false });
				
				/* ---------------------------- tableAppointment ------------------------------ */
				
				// criando a tabela e setando a chave primaria
				let tableAppointment = db.createObjectStore("tableAppointment", { autoIncrement: true } );
				
				// Cria um índice para buscas.
				tableAppointment.createIndex("idUser", "idUser", { unique: false });
				
				// Cria um índice para buscas.
				tableAppointment.createIndex("dateAppointment", "dateAppointment", { unique: false });
				
				/* --------------------------------------------------------------------------- */
				
				console.log("Database upgraded.");
			}
		}

		openRequest.onsuccess = e => {
			console.log("Database opened successfully.");
			db = e.target.result;
			
			/* ----------------------------- tableProduct -------------------------------- */
			
			// inicializando a tabela
			let tableProduct = db.transaction("tableProduct", "readwrite").objectStore("tableProduct");	
			// inserindo os registros pré-definidos
			for(let i in productList) {
				tableProduct.add(productList[i]);
			}
			
			/* ----------------------------- tableService -------------------------------- */
			
			// inicializando a tabela
			let tableService = db.transaction("tableService", "readwrite").objectStore("tableService");			
			// inserindo os registros pré-definidos
			for(let i in serviceList) {
				tableService.add(serviceList[i]);
			}
			
			/* ------------------------------- tablePet ---------------------------------- */
			
			// inicializando a tabela
			let tablePet = db.transaction("tablePet", "readwrite").objectStore("tablePet");			
			// inserindo os registros pré-definidos
			for(let i in petList) {
				tablePet.add(petList[i]);
			}
			
			/* ------------------------------- tableUser ---------------------------------- */
			
			// inicializando a tabela
			let tableUser = db.transaction("tableUser", "readwrite").objectStore("tableUser");			
			// inserindo os registros pré-definidos
			for(let i in userList) {
				tableUser.add(userList[i]);
			}
			
			/* ------------------------------- tableSale ---------------------------------- */
			
			// inicializando a tabela
			let tableSale = db.transaction("tableSale", "readwrite").objectStore("tableSale");			
			// inserindo os registros pré-definidos
			for(let i in saleList) {
				tableSale.add(saleList[i]);
			}
			
			/* ---------------------------- tableAppointment ------------------------------ */
			
			// inicializando a tabela
			let tableAppointment = db.transaction("tableAppointment", "readwrite").objectStore("tableAppointment");			
			// inserindo os registros pré-definidos
			for(let i in appointmentList) {
				tableAppointment.add(appointmentList[i]);
			}
		}

		openRequest.onerror = e => {
			console.log("An error occurred while trying to initialize the database.");
		}
		
	} else {
		window.alert("This application requires IndexedDB but it isn't supported by your browser. It won't work correctly.");
	}
}

// ================================================================================================================== //
// ================================= Implementação genérica - manipular DATABASE ==================================== //
// ================================================================================================================== //
function insertIntoDB(tableName, obj) {

	let req = db.transaction(tableName, "readwrite")
	.objectStore(tableName).add(obj);

	req.onsuccess = e => { console.log("A new entry has been added to your database successfully."); };
	req.onerror = e =>   { console.log("An error occurred while trying to add a new entry to the database."); };
}
function deleteFromDB(tableName, id) {
	let req = db.transaction(tableName, "readwrite")
	.objectStore(tableName).delete(id);

	req.onsuccess = e => { console.log("An entry has been deleted from your database."); };
	req.onerror = e => { console.log("An error occurred while trying to delete an entry from the database."); }
}
function readAll(tableName, callback) {
	let list = [];
	let req = db.transaction(tableName).objectStore(tableName).openCursor();

	req.onsuccess = e => {
		let cursor = e.target.result;

		if (cursor) {
			list.push(cursor.value);
			cursor.continue();
		}
	};
	
	req.transaction.oncomplete = e => callback(list);
}
// ================================================================================================================== //
// ============================================= Implementação PRODUTO ============================================== //
// ================================================================================================================== //
function insertProduct() {
	insertIntoDB("tableProduct", {
		id: Number(document.forms[0]["idproduct"].value),
		name: document.forms[0]["produto"].value,
		price: parseFloat(document.forms[0]["preço"].value),
		quantity: Number(document.forms[0]["quantidade"].value),
		description: document.forms[0]["desc"].value,
		photo: document.forms[0][""].value
	});
}
function deleteProduct() {
	deleteFromDB("tableProduct", Number(document.forms[0]["idproduct"].value));
}
function updateProduct() {
	deleteFromDB("tableProduct", Number(document.getElementById("idProduct").value));
	insertIntoDB("tableProduct", {
		id: Number(document.getElementById("idProduct").value),
		name: document.getElementById("nameProduct").value,
		price: parseFloat(document.getElementById("priceProduct").value),
		quantity: Number(document.getElementById("quantityProduct").value),
		description: document.getElementById("descriptionProduct").value,
		photo: document.getElementById("").value
	});
}
/*
function listProduct() {

	readAll("tableProduct", list => {
		let text = "";	
		
		for(let i in list)
			text += "ID: " + list[i].id + "<br>" + "Name: " + list[i].name + "<br>" + "Price: " + list[i].price + "<br><br>";
	
		document.getElementById("productList").innerHTML = text;
	});
}*/
function searchProductByName(pattern, callback) {

	readAll("tableProduct", list => {
		let productList = [];
			
		for(let i in list) {
			if (list[i].name.search(pattern) >= 0) {
				productList.push(list[i]);
			}
		};
		callback(productList);
	});

}

// ================================================================================================================== //
// ============================================= Implementação SERVIÇO ============================================== //
// ================================================================================================================== //
function insertService() {
	insertIntoDB("tableService", {
		id: Number(document.forms[0]["idservice"].value),
		name: document.forms[0]["pname"].value,
		price: parseFloat(document.forms[0]["preço"].value),
		description: document.forms[0]["desc"].value,
		photo: document.forms[0][""].value
	});
}
function deleteService() {
	deleteFromDB("tableService", Number(document.forms[0]["idservice"].value));
}
function updateService() {
	deleteFromDB("tableService", Number(document.getElementById("idService").value));
	insertIntoDB("tableService", {
		id: Number(document.getElementById("idService").value),
		name: document.getElementById("nameService").value,
		price: parseFloat(document.getElementById("priceService").value),
		description: document.getElementById("descriptionService").value,
		photo: document.getElementById("").value
	});
}
// ================================================================================================================== //
// =============================================  Implementação ANIMAL  ============================================= //
// ================================================================================================================== //
function insertPet() {
	insertIntoDB("tablePet", {
		idPet: Number(document.forms[0]["id"].value),
		idUser: document.forms[0]["User"].value,
		name: parseFloat(document.forms[0]["animal"].value),
		age: document.forms[0]["idade"].value,
		breed: document.forms[0]["raça"].value,
		photo: document.forms[0][""].value
	});
}
function deletePet() {
	deleteFromDB("tablePet", Number(document.forms[0]["id"].value));
}
function updatePet() {
}
// ================================================================================================================== //
// ============================================= Implementação USUÁRIO  ============================================= //
// ================================================================================================================== //
function insertUser(isAdmin) {
	if (!isAdmin) {
		insertIntoDB("tableUser", {
			id: Number(document.forms[0]["id"].value),
			name: document.forms[0]["name"].value,
			username: document.forms[0]["user"].value,
			password: document.forms[0]["password"].value,
			photo: "",
			email: document.forms[0]["email"].value,
			phone_number: document.forms[0]["phone_number"].value, 
			cep: document.forms[0]["cep"].value, 
			address: document.forms[0]["address"].value, 
			number: document.forms[0]["number"].value,
			district: document.forms[0]["district"].value, 
			city: document.forms[0]["city"].value,
			state: document.forms[0]["state"].value,
			isAdmin: isAdmin
		});
	}
	else {
		insertIntoDB("tableUser", {
			id: Number(document.forms[0]["id"].value),
			name: document.forms[0]["nome"].value,
			username: document.forms[0]["username"].value,
			password: document.forms[0]["senha"].value,
			photo: "",
			email: document.forms[0]["email"].value,
			phone_number: document.forms[0]["phone number"].value, 
			isAdmin: isAdmin
		});
	}
}
function deleteUser() {
	deleteFromDB("tableUser", Number(document.forms[0]["id"].value));
}
function updateUser(isAdmin) {
	if (!isAdmin) {
		insertIntoDB("tableUser", {
			id: Number(document.forms[0]["id"].value),
			name: document.forms[0]["name"].value,
			username: document.forms[0]["user"].value,
			password: document.forms[0]["password"].value,
			photo: "",
			email: document.forms[0]["email"].value,
			phone_number: document.forms[0]["phone_number"].value, 
			cep: document.forms[0]["cep"].value, 
			address: document.forms[0]["address"].value, 
			number: document.forms[0]["number"].value,
			district: document.forms[0]["district"].value, 
			city: document.forms[0]["city"].value,
			state: document.forms[0]["state"].value,
			isAdmin: isAdmin
		});
	}
	else {
		insertIntoDB("tableUser", {
			id: Number(document.forms[0]["id"].value),
			name: document.forms[0]["name"].value,
			username: document.forms[0]["user"].value,
			password: document.forms[0]["password"].value,
			photo: "",
			email: document.forms[0]["email"].value,
			phone_number: document.forms[0]["phone number"].value, 
			isAdmin: isAdmin
		});
	}
}
function isValidUser(usr, pw) {
	let req = db.transaction("tableUser", "readonly")
	.objectStore("tableUser").index("username").get(usr);
	
	req.onsuccess = e => { return (req.result.password == pw); }
	req.onerror = e => { return false; }
}
function usernameAlreadyExists(usr) {
	let req = db.transaction("tableUser", "readonly")
	.objectStore("tableUser").index("username").get(usr);
	
	req.onsuccess = e => {return true;}
	req.onerror = e => {return false;}
}
// ================================================================================================================== //
// ============================================== Implementação VENDA  ============================================== //
// ================================================================================================================== //
function insertSale(saleIdUser, saleItems, saleTotal, saleTotalPortions) {
	insertIntoDB("tableSale", {
		idUser: saleIdUser,
		items: saleItems, 
		total: saleTotal, 
		totalPortions: saleTotalPortions, 
		datePaid: new Date()
	});
}
function deleteSale() {
}
function updateSale() {
}
// ================================================================================================================== //
// =========================================== Implementação AGENDAMENTO  =========================================== //
// ================================================================================================================== //
function insertAppointment(appointmentIdUser, appointmentIdPet, appointmentIdService, appointmentTotal, appointmentTotalPortions, appointmentDateAppointment) {
	insertIntoDB("tableAppointment", {
		idUser: appointmentIdUser, 
		idPet: appointmentIdPet, 
		idService: appointmentIdService, 
		total: appointmentTotal, 
		totalPortions: appointmentTotalPortions, 
		dateAppointment: appointmentDateAppointment, 
		datePaid: new Date()
	});
}
function deleteAppointment() {
}
function updateAppointment() {
}

initializeDB();
