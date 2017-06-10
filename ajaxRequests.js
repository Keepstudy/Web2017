function ajaxRequestDoc(docname) 
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{

			document.getElementsByTagName("main")[0].innerHTML = 
			this.responseText.substring(this.responseText.search("<main>") + "<main>".length, this.responseText.search("</main>") - 1);

			document.getElementsByTagName("aside")[0].innerHTML = 
			this.responseText.substring(this.responseText.search("<aside>") + "<aside>".length, this.responseText.search("</aside>") - 1);
		}
	};
	xhttp.open("GET", docname, false);
	xhttp.send();
}

$("a[href='about.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("about.html"); 
});

$("a[href='index.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("index.html"); 
});

$('a[href="cartShopping.html"]').click(function(e)
{
	e.preventDefault();
	console.log("né");
	ajaxRequestDoc("cartShopping.html"); 
});


$("a[href='userProfile.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("userProfile.html"); 
});


$("a[href='createClient.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createCliente.html"); 
});


$("a[href='createdClient.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createdClient.html"); 
});

$("a[href='createdPet.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createdPet.html"); 
});

$("a[href='createdProduct.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createdProduct.html"); 
});

$("a[href='createdService.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createdService.html"); 
});


$("a[href='createPet.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createPet.html"); 
});

$("a[href='paymentService.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("paymentService.html"); 
});

$("a[href='createProduct.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createProduct.html"); 
});

$("a[href='createService.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createService.html"); 
});

$("a[href='createAdmin.html']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("createAdmin.html"); 
});
/*
$(".tablinks[onclick='location.href='profit.html'']").click(function(e)
{
	e.preventDefault();
	ajaxRequestDoc("profit.html"); 
});*/

	


