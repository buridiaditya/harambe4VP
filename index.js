var b = jsboard.board({ attach: "game", size: "10x10" });
var x = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });
var o = jsboard.piece({ text: "O", fontSize: "40px", textAlign: "center"});
var posiCol = 0;
var posiRow = 9;
var past = 0;
var timer = 30;
var CLR1 = "#99ff66";
var CLR2 = "#ff4d4d"

var lev = document.getElementById('level').innerHTML;

b.cell([posiRow,posiCol]).place(x.clone());
b.style({ borderSpacing: "8px" });
b.cell("each").style({ 
  width: "50px", 
  height: "50px", 
  background: "lightblue", 
  borderRadius: "15px" 
});

///////// ADD PORTALS ////////

var nextG= {},nextR = {};
var G = {},R = {};

var kk = 0;

function addPortal(clr) {
	var i;
	var last = 0,lastk = 0;
	for(i = 9; i >= 0; i--){
		var k = -1;	
		if (i%2==0) {
			do {
				k = parseInt((Math.random()*100)%(10-last)) + last;

				//////////  Site Loading time increasing bcos of this ///////
				
				if (clr==CLR2) {
					while (G[i] == k) {
						k = parseInt((Math.random()*100)%(10-last)) + last;		
					}
				}

				if (k!=0) break;
			} while(i==0);
		} else {
			do {
				k = parseInt((Math.random()*100)%(10-last));

				if (clr==CLR2) {
					while (G[i]==k) {
						k = parseInt((Math.random()*100)%(10-last));		
					}
				}

				if (k!=0) break;
			} while(i==9);
		}
		if (clr == CLR1)
			nextG[lastk] = k;
		else 
			nextR[k] = lastk;
		last = (k+6)%10;
		lastk = k;

		if (clr==CLR1) 
			G[i] = k;
		else 
			R[i] = k;

		b.cell([i,parseInt(k%10)]).style({
			background: clr
		});
	}
}



addPortal(CLR1);
addPortal(CLR2);

/////// TIMER //////////
var a = setInterval(function(){myfunc()},1000);
	
function myfunc() {
	timer--;
	if (timer<0) timer = 0;
	document.getElementById('timer').innerHTML = timer;
}


function move(){
	b.cell([posiRow,posiCol]).rid();
	var isAnswerCorrect = 0;
	
	if (lev == 1) {
		var dis = parseInt(document.getElementById('target').value);
		var val1 = parseInt(document.getElementById('l1').innerHTML);
		var val2 = parseInt(document.getElementById('l2').innerHTML);
		var op = document.getElementById('op1').innerHTML;
		var ranIn = 0;
		var ops = ["+","-","*"];
		var greenCol;
		var redCol;
		var portalJump = false;
		
		if((op.localeCompare("+") == 0 ) && (dis == val1 + val2)){
			isAnswerCorrect = 1;
		}
		else if((op.localeCompare("*") == 0 ) && dis == val1 * val2){
			isAnswerCorrect = 1;
		}
		else if((op.localeCompare("-") == 0 ) && dis == val1 - val2){
			isAnswerCorrect = 1;
		}

		if(isAnswerCorrect){
			window.alert("Correct...\\/");
			b.cell([posiRow,posiCol]).rid();
			dis = parseInt(timer/5) + 1;
			if(posiRow%2==0){
				greenCol = G[posiRow];
				if(posiCol - dis <= greenCol && posiCol>greenCol){
					posiCol = greenCol;
					portalJump = true;
				}
				else {
					posiCol=posiCol - dis;	
					if(posiCol < 0){
						posiCol = -1*posiCol - 1;
						posiRow = posiRow - 1;	
						if(posiCol >= G[posiRow]){
							portalJump = true;
							posiCol = G[posiRow];
						}
					}
				}
			} else {
				greenCol = G[posiRow];
				if(posiCol + dis >= greenCol && posiCol<greenCol){
					posiCol = greenCol;
					portalJump = true;
				} else {
					posiCol = posiCol + dis;
					if(posiCol > 9){
						posiCol = 19 - posiCol;
						posiRow = posiRow -1 ;
						if(posiCol <= G[posiRow]){
							portalJump = true;
							posiCol = G[posiRow];
						}
					}
				}
			}
			
			if(posiCol == R[posiRow] && !portalJump){
				posiCol = posiCol + ((posiRow%2==0)?(1):(-1));
			}
		} else {
			window.alert("Nope...Try Again Dude");
			dis = 6;
			var tempposiCol,tempposiRow;
			if(posiRow%2==0){
				redCol = R[posiRow];
				if(posiCol - dis <= redCol && posiCol>redCol){
					posiCol = redCol;
					portalJump = true;
				}
				else {
					tempposiCol = posiCol - dis;	
					if(tempposiCol < 0){
						tempposiCol = -1*tempposiCol - 1;
						tempposiRow = tempposiRow - 1;	
						if(tempposiCol >= R[tempposiRow]){
							portalJump = true;
							posiCol = R[tempposiRow];
							posiRow--;
						}
					}
				}
			} else {
				redCol = R[posiRow];
				if(posiCol + dis >= redCol && posiCol<redCol){
					posiCol = redCol;
					portalJump = true;
				} else {
					tempposiCol = posiCol + dis;
					if(tempposiCol > 9){
						tempposiCol = 19 - tempposiCol;
						tempposiRow = posiRow - 1 ;
						if(posiCol <= R[tempposiRow]){
							portalJump = true;
							posiCol = R[tempposiRow];
							posiRow--;
						}
					}
				}
			}
		}

		///// generation of random expression/////////
		b.cell([posiRow,posiCol]).place(x.clone());
		// transports from one Green Portal to next one
		if (portalJump) {
			b.cell([posiRow,posiCol]).rid();
			if(isAnswerCorrect && posiRow!=0){
				posiRow = posiRow-1;
				posiCol = G[posiRow];
			}
			else if (!isAnswerCorrect && posiRow!=9){
				posiRow = posiRow+1;
				posiCol = R[posiRow];
			}
			b.cell([posiRow,posiCol]).place(x.clone());
		}

		timer = 30;
		ranIn = (parseInt(Math.random()*10))%3;
		document.getElementById('l1').innerHTML = parseInt(Math.random()*10+1);
		document.getElementById('l2').innerHTML = parseInt(Math.random()*10+1);
		document.getElementById('op1').innerHTML = ops[ranIn];
		document.getElementById('timer').innerHTML = timer;
	}
}