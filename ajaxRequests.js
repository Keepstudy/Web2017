function setTagProperties(tagName, ans)
{
	let i = ans.search("<" + tagName) + ("<" + tagName).length;
	let tagStyle = "";
	let hasStyle = false;
	let tagClass = "";
	let hasClass = false;
	let str = "";

	for(; i < ans.length; i++)
	{

		if (hasStyle && ans[i] == '\"')
		{
			tagStyle = str;
			hasStyle = false;
			str = "";
		}
		
		else if (hasClass && ans[i] == '\"')
		{
			tagClass = str;
			hasClass = false;
			str = "";
		}
		
		else if (hasStyle || hasClass)
			str += ans[i];
		
		else
		{
			if (ans[i] != ' ')
				str += ans[i];
			
			if (str == "style=") 
			{
				str = "";
				hasStyle = true;
				while(ans[i] != '\"' && i < ans.length) 
					i++;
			}
			else if (str == "class=")
			{
				str = "";
				hasClass = true;
				while(ans[i] != '\"' && i < ans.length) 
					i++;
			}
			else if (str == ">")
			{
				i++;
				break;
			}
		}
	}
	
	document.getElementsByTagName(tagName)[0].style = tagStyle;
	document.getElementsByTagName(tagName)[0].className = tagClass;
	document.getElementsByTagName(tagName)[0].innerHTML = ans.substring(i, ans.search("</" + tagName + ">"));
}

function ajaxRequestDoc(docname)
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			setTagProperties("main", this.responseText);
			setTagProperties("aside", this.responseText);
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

	


