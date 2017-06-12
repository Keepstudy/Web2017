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