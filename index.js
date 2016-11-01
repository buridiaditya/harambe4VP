var b = jsboard.board({ attach: "game", size: "10x10" });
var x = jsboard.piece({ text: "X", fontSize: "40px", textAlign: "center" });
var o = jsboard.piece({ text: "O", fontSize: "40px", textAlign: "center"});
var posiCol = 0;
var posiRow = 9;
var past = 0;
var timer = 30;
var lev = document.getElementById('level').innerHTML;

b.cell([posiRow,posiCol]).place(x.clone());
b.style({ borderSpacing: "8px" });
b.cell("each").style({ 
  width: "50px", 
  height: "50px", 
  background: "lightblue", 
  borderRadius: "15px" 
});
var i;
var last = 0;

///////// ADD PORTALS ////////
for(i = 0; i < 10; i++){
	// window.alert(last);
	// var k = parseInt((Math.random()*100)%(100-last)) + last;
	// last = k+6;
	
	// b.cell([parseInt(k/10),parseInt(k%10)]).style({
	// 	background: "green";
	// });
}

/////// TIMER //////////
var a = setInterval(function(){myfunc()},1000);
	
function myfunc() {
	timer--;
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

		// window.alert(op.localeCompare(plus));
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
			if(timer < 0){
				dis = 1;
			}
			else{
				dis = parseInt(timer/10) + 1;
			}
			if(posiRow%2==0){
				posiCol=posiCol - dis;	
				if(posiCol < 0){
					posiCol = -1*posiCol - 1;
					posiRow = posiRow - 1;
				}
			} else {
				posiCol = posiCol + dis;
				if(posiCol > 9){
					posiCol = 19 - posiCol;
					posiRow = posiRow -1 ;
				}
			}
		}
		timer = 30;
		
		ranIn = (parseInt(Math.random()*10))%3;
		// window.alert(ranIn);
		document.getElementById('l1').innerHTML = parseInt(Math.random()*10+1);
		document.getElementById('l2').innerHTML = parseInt(Math.random()*10+1);
		document.getElementById('op1').innerHTML = ops[ranIn];
		document.getElementById('timer').innerHTML = timer;
		b.cell([posiRow,posiCol]).place(x.clone());
	}
}