var nbDechet = 4;
var animauxToSave = 3;
var choiceImposteur = false;
var clicPlanche = 5;

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
		document.getElementById("ventImp").style.display = 'block';
		document.getElementById("ventOpen").style.display = 'none';
		let soundVent = new Sound("../musiques/ventSound.mp3");
    	soundVent.play();

		document.getElementById("persoNoir").style.display = 'none';
		document.getElementById("persoNoirDead").style.display = 'block';
		setTimeout(function(){ let soundDead = new Sound("../musiques/killSound.mp3");
    	soundDead.play(); },2000);
		

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
		document.getElementById("persoBleu").style.display = 'none';
       	document.getElementById("persoBleuDead").style.display = 'block';
       	let soundDead = new Sound("../musiques/killSound.mp3");
    	soundDead.play();
	}
}


function playPlanche(){
	document.getElementById("screenPlanche").style.display = 'block';
	clicPlanche = 5;
}

function quitPlanche(){
	document.getElementById("screenPlanche").style.display = 'none';
}

function clearPlanche(){
	clicPlanche--;
	if(clicPlanche==0){
		document.getElementById("plancheSale").style.display = 'none';
		document.getElementById("planchePropre").style.display = 'block';
		setTimeout(function(){ quitPlanche(); }, 500);
		document.getElementById("persoRouge").style.display = 'none';
       	document.getElementById("persoRougeDead").style.display = 'block';
       	let soundDead = new Sound("../musiques/killSound.mp3");
    	soundDead.play();
	}
}





function selectImporteur(nb){
	let musique=new Sound("../musiques/mainMusic.mp3");
	musique.play();
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


function emergencyLaunch(){
    let sound=new Sound("../musiques/emergency.mp3");
    sound.play();
    document.getElementById("emergencyDiv").style.display="block";
    setTimeout(function(){ document.getElementById("emergencyDiv").style.display="none";
    						document.location.replace("./amongus"); },2000);
}

function alarmScreen() {
    //document.getElementById("messageAmongUs").style.visibility="visible"
    //document.getElementById("launchAmongUs").style.visibility="visible"
    document.cookie = 'bleu=true; path=/'
    light()
    playAlarm()
}

var flash = 0
var loopFlash = 14
var loopSound = 2

function light() {
    if (loopFlash > 0) {
        loopFlash--;
        if (flash === 0) {
            flash = 1;
            //document.body.style.backgroundColor = "#CF1201";
            //document.getElementById("messageAmongUs").style.color="white"
            document.getElementById("flashAmong").style.display="none"
            setTimeout("light()", 1000);
        } else {
            flash = 0;
            document.getElementById("flashAmong").style.display="block"
            //document.body.style.backgroundColor = "white";
            //document.getElementById("messageAmongUs").style.color="black"
            setTimeout("light()", 1000);

        }
    }else{
    	document.getElementById("flashAmong").style.display="none"
    }
}

function playAlarm() {
    if (loopSound > 0) {
        --loopSound;
        let sound = new Sound("../musiques/among-us-alarm.mp3");
        sound.play();
        setTimeout("playAlarm()", 6000);
    }
}
function hideEmergency(){
    document.getElementById("emergencyPic").style.visibility="hidden";
}

