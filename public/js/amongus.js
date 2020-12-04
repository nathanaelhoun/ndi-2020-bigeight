var nbDechet = 4;

function playCollect(){
	document.getElementById("screenCollect").style.display = 'block';
	document.getElementById("collectBouteille").style.display = 'block';
	document.getElementById("collectPneu").style.display = 'block';
	document.getElementById("collectGobelet").style.display = 'block';
	document.getElementById("collectCanette").style.display = 'block';
	nbDechet = 4;
}

function quitCollect(){
	document.getElementById("screenCollect").style.display = 'none';
}

function collect(numb) {
	switch(numb) {
		case 1 :
			document.getElementById("collectBouteille").style.display = 'none';
			nbDechet--;
		break;
		case 2 :
			document.getElementById("collectPneu").style.display = 'none';
			nbDechet--;
		break;
		case 3 :
			document.getElementById("collectGobelet").style.display = 'none';
			nbDechet--;
		break;
		case 4 : 
			document.getElementById("collectCanette").style.display = 'none';
			nbDechet--;
		break;
	}

	if(nbDechet == 0){
		quitCollect();
		document.getElementById("bouteilleClear").style.display = 'block';
		document.getElementById("bouteilleAlert").style.display = 'none';
		//TODO
	}
}