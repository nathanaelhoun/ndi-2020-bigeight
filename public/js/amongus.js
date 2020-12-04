var nbDechet = 4;
var animauxToSave = 3;
var choiceImposteur = false;

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
		document.getElementById("bouteilleClear").style.display = 'block';
		document.getElementById("bouteilleAlert").style.display = 'none';
		setTimeout(function(){ quitCollect(); }, 500);
	}
}


function playPoulpe(){
	document.getElementById("screenOcean").style.display = 'block';
	document.getElementById("collectBouteille").style.display = 'block';
	document.getElementById("collectPneu").style.display = 'block';
	document.getElementById("collectGobelet").style.display = 'block';
	document.getElementById("collectCanette").style.display = 'block';
	animauxToSave = 3;
}

function quitPoulpe(){
	document.getElementById("screenOcean").style.display = 'none';
}

function saveAnimaux(numb){
	switch(numb) {
		case 1 :
			document.getElementById("poisson").style.display = 'block';
			document.getElementById("poissonHelp").style.display = 'none';
			animauxToSave--;
		break;
		case 2 :
			document.getElementById("poulpeJeu").style.display = 'block';
			document.getElementById("poulpeHelp").style.display = 'none';
			animauxToSave--;
		break;
		case 3 :
			document.getElementById("tortue").style.display = 'block';
			document.getElementById("tortueHelp").style.display = 'none';
			animauxToSave--;
		break;
	}
	if(animauxToSave==0){
		document.getElementById("poulpe").style.display = 'block';
		document.getElementById("poulpeAlert").style.display = 'none';
		setTimeout(function(){ quitPoulpe(); }, 500);
	}
}

function selectImporteur(nb){
	document.getElementById("finDeJeu").style.display = 'block';
	if(nb == 2){
		//win
		document.getElementById("pannelVictory").style.display = 'block';
		document.getElementById("pannelDefeat").style.display = 'none';
	}else{
		document.getElementById("pannelDefeat").style.display = 'block';
		document.getElementById("pannelVictory").style.display = 'none';
	}
}

