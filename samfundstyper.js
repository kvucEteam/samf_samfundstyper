// OPGAVER;
// =====================
// - sæt objektet på visningssitet
// - fix bug ift til counteren og "Tjek svar knappen".
// - Lav funktionaliteten: "miniCard" ---> "alm card" ved click.
// - publicer objektet
// - fix kemi-objektet 
// - besvar Steen mht fane 4





function draggableCardTypes(cObj) {
	console.log('\ndraggableCardTypes - CALLED - cObj: ' + JSON.stringify(cObj));

    var HTML = '';
    switch (cObj.type) {
        case 'text':
            console.log('draggableCardTypes - A0');
            HTML += makeTextCard(cObj);
            break;
        case 'img':
            console.log('draggableCardTypes - A1');
            HTML += makeImgCard(cObj);
            break;
        case 'card':
            console.log('draggableCardTypes - A2');
            HTML += makeCard(cObj);
            break;
        default:
            console.log('draggableCardTypes - A3');
            // alert('ERROR');
    }

    return HTML;
}


function makeTextCard(TcObj) {
    console.log('\nmakeTextCard - CALLED - TcObj: ' + JSON.stringify(TcObj));

    var cObj = TcObj.card;

    var HTML = '';
    HTML += '<div ' + ((cObj.hasOwnProperty('attr')) ? generateAttrStr(cObj.attr) : '')+' data-column="'+TcObj.correctColumn+'" data-cardId="'+TcObj.cardId+'">';
    HTML += 	(cObj.hasOwnProperty('text'))? cObj.text : '';
    HTML += '</div>';

    return HTML;
}


function makeImgCard(TcObj) {
    console.log('\nmakeCard - CALLED - TcObj: ' + JSON.stringify(TcObj));

    var cObj = TcObj.card;

    var HTML = '';
    HTML += '<div ' + ((cObj.hasOwnProperty('attr')) ? generateAttrStr(cObj.attr) : '')+' data-column="'+TcObj.correctColumn+'" data-cardId="'+TcObj.cardId+'">';
    HTML += 	'<div class="imgContainer">';
    HTML += 		(cObj.hasOwnProperty('imgSrc') ? '<img class="img-responsive" src="' + cObj.imgSrc + '">' : '');
    HTML += 	'</div>';
    HTML += '</div>';

    return HTML;
}


function makeCard(TcObj) {
    console.log('\nmakeCard - CALLED - cObj: ' + JSON.stringify(TcObj));

    var cObj = TcObj.card;

    var HTML = '';
    HTML += '<div ' + ((cObj.hasOwnProperty('attr')) ? generateAttrStr(cObj.attr) : '')+' data-column="'+TcObj.correctColumn+'" data-cardId="'+TcObj.cardId+'">';
    HTML += 	'<div class="imgContainer">';
    HTML += 		(cObj.hasOwnProperty('imgSrc') ? '<img class="img-responsive" src="' + cObj.imgSrc + '">' : '');
    HTML += 	'</div>';
    HTML += 	'<div class="objText">';
    HTML += 		((cObj.hasOwnProperty('heading')) ? '<h4>' + cObj.heading + '</h4>' : '');
    HTML += 		((cObj.hasOwnProperty('text')) ? '<p>' + cObj.text + '</p>' : '');
    HTML += 		((cObj.hasOwnProperty('btnText')) ? '<span class="btn_ghost btn_ghost_noStyle btn btn-primary">' + cObj.btnText + '</span>' : '');
    HTML += 		'<div class="Clear"></div>';
    HTML += 	'</div>';
    HTML += '</div>';

    return HTML;
}


function generateAttrStr(attrObj) {
    console.log('\ngenerateAttrStr - CALLED - attrObj: ' + JSON.stringify(attrObj));

    var HTML = '';
    var keyArr = Object.keys(attrObj);
    for (var n in keyArr) {
        if (typeof(attrObj[keyArr[n]]) !== 'undefined') {
            HTML += keyArr[n] + '="' + attrObj[keyArr[n]] + '" ';
        }
    }

    HTML = HTML.trim();
    console.log('generateAttrStr - HTML: _' + HTML + '_');

    return HTML;
}


function setSortableRow(activeRowId) {
	$( "#"+activeRowId ).sortable({ 
		axis: "x",
		revert: true,
		tolerance: "pointer",

		// animation: 100,    // <-----  Med brug af ekstern resource - se:  https://github.com/egorshar/jquery-ui-sortable-animation
		containment: "window",  // parent / document / window

		// sortAnimateDuration: 500,  
	 	// sortAnimate: true,
	 	// distance: 25,

		// opacity: 0.5,
		start: function(e, ui){
			// $(ui.placeholder).hide(300);
			// $('.ui-sortable-handle').css({top:'0px'});
		},
		change: function (e,ui){
			// $(ui.placeholder).hide().show(300);
		}
	});
	$( "#"+activeRowId ).disableSelection();
}


function categoryMenu() {
	var HTML = '';
	for (var n in jsonData.category) {
		HTML += '<div class="menuItem '+((n==0)? 'activeCategory' : 'inactiveCategory')+'"><span class="categoryColor">'+jsonData.category[n].heading+'</span></div>';
	}

	return HTML;
}


function main() {
	var HTML = '';
	HTML += '<h1>'+jsonData.heading+'</h1>';
	HTML += ((jsonData.hasOwnProperty('instruction') && (jsonData.instruction!==''))? instruction(jsonData.instruction) : '');
	HTML += ((jsonData.hasOwnProperty('explanation') && (jsonData.explanation!==''))? explanation(jsonData.explanation) : '');
	HTML += '<div class="Clear"></div>';
	HTML += '<div id="innerWrap">';
	HTML += 	'<div id="categoryMenuWrap">'+categoryMenu()+'</div>';
	HTML += 	'<div id="templateWrap">';
	HTML += 		'<div id="samfundstypeBgrWrap">';
						for (var n in jsonData.samfundstype) {
	HTML += 				'<div class="samfundstypeBgr"><h4 class="samfundstypeHeading">'+jsonData.samfundstype[n].heading+'</h4><div class="samfundstypeZone"></div></div>';
						}
	HTML +=			'</div>';
	HTML +=			template1();
	HTML += 		'<div id="btnWrap">';
	HTML += 			'<span id="checkAnswer" class="btn btn-lg btn-primary">Tjek rækkefølgen</span>';
	HTML +=				make_scoreCounter();
	HTML +=			'</div>';
	HTML +=		'</div>';
	HTML += '</div>';

	return HTML;
}


function make_scoreCounter() {
	var numOfQuestions = jsonData.category.length;
	// return '<div class="score_container_wrap"><div class="score_container"><span class="scoreText">Korrekte svar: </span><span class="QuestionCounter QuestionTask"><span class="success">0</span> ud af '+numOfQuestions+'</span> <span class="scoreText"> Forsøg: </span><span class="ErrorCount QuestionTask attempt">0</span></div><div class="Clear"></div></div>';
	return '<div class="score_container_wrap"><div class="score_container"><span class="scoreText">Opgave </span><span class="QuestionCounter QuestionTask"><span class="success">0</span> / '+numOfQuestions+'</span> <span class="scoreText"> Forsøg: </span><span class="ErrorCount QuestionTask attempt">0</span></div><div class="Clear"></div></div>';
}


function update_scoreCounter(selector) {
	
	var val = parseInt($(selector).text())+1;
	console.log('update_scoreCounter - val: ' + val);
	
	// $('.success').html(eObj.success);
	// $('.attempt').html(eObj.attempt);

	return val;
}


function template1() {
	var HTML = '';
	for (var n in jsonData.category) {
		HTML += '<div id="catRow_'+n+'" class="catRow '+((n==0)? 'active' : '')+'">';
		for (var k in jsonData.category[n].samfundstype) {
			var cObj = jsonData.category[n].samfundstype[k];
			HTML += draggableCardTypes(cObj);
		}
		HTML += '</div>';
	}

	return HTML;
}


// $('#interface').append(makeTable(['a', 'b', 'c'], [['(0,0)','(0,1)','(0,2)'], ['(1,0)','(1,1)','(1,2)'],['(2,0)','(2,1)','(2,2)'],['(3,0)','(3,1)','(3,2)']]));
function template2() {
	// var headerArr = ['a', 'b', 'c'];
	// var contentArr = [['(0,0)','(0,1)','(0,2)'], ['(1,0)','(1,1)','(1,2)'],['(2,0)','(2,1)','(2,2)'],['(3,0)','(3,1)','(3,2)']];
	var headerArr = ['Kategorier'];
	for (var n in jsonData.samfundstype) {
		headerArr.push(jsonData.samfundstype[n].heading);
	}
	console.log('template2 - headerArr: ' + JSON.stringify(headerArr));
	var contentArr = [];
	for (var n in jsonData.category) {
		// var subArr = [];
		var subArr = new Array(headerArr.length-1);
		subArr.splice(0, 0, jsonData.category[n].heading);
		console.log('template2 - subArr: ' + JSON.stringify(subArr) + ', heading: ' + jsonData.category[n].heading);
		// for (var k in jsonData.category[n].samfundstype) {
		for (var k = 0; k < jsonData.category[n].samfundstype.length+1; k++) {
			// subArr.push(jsonData.samfundstype[n].samfundstype[k]);

			if (k > 0) {
				var test = jsonData.category[n].samfundstype[k];
				console.log('template2 - test: ' + JSON.stringify(test));

				var cPos = parseInt(jsonData.category[n].samfundstype[k-1].cardPosition);
				subArr.splice(cPos+1, 1, jsonData.category[n].samfundstype[k-1]);
			}
		}
		console.log('template2 - subArr: ' + JSON.stringify(subArr));
		contentArr.push(subArr);
	}

	var HTML = makeTable({id:'template2_tableView'}, headerArr, contentArr);

	return HTML;
}


function makeTable(attrObj, headerArr, contentArr) {
	console.log('makeTable - contentArr: ' + JSON.stringify(contentArr));
	var HTML = '';
	HTML += '<table '+generateAttrStr(attrObj)+'>';
	HTML += 	'<thead>';
	HTML += 		'<tr>';
					for (var n in headerArr) {
	HTML += 			'<th>'+headerArr[n]+'</th>';
					}
	HTML += 		'</tr>';
	HTML += 	'<thead>';
	HTML += 	'<tbody>';
					for (var n in contentArr) {
	HTML += 			'<tr>';
						for (var k in contentArr[n]) {
							if (k == 0) {
								HTML += '<td>'+contentArr[n][k]+'</td>';
							} else {
								HTML += '<td>'+makeMiniCard(contentArr[n][k])+'</td>';
							}
						}
	HTML += 			'</tr>';
					}
	HTML += 	'<tbody>';
	HTML += '</table>';

	return HTML;
}


function makeMiniCard(TcObj) {
    console.log('\nmakeMiniCard - CALLED - cObj: ' + JSON.stringify(TcObj));

    var cObj = TcObj.card;

    cObj.attr.class += ' miniCard';

    var HTML = '';
    HTML += '<div ' + ((cObj.hasOwnProperty('attr')) ? generateAttrStr(cObj.attr) : '')+' data-column="'+TcObj.correctColumn+'" data-cardId="'+TcObj.cardId+'">';
    HTML += 	'<div class="imgContainer">';
    HTML += 		(cObj.hasOwnProperty('imgSrc') ? '<img class="img-responsive" src="' + cObj.imgSrc + '">' : '');
    HTML += 	'</div>';
    HTML += 	'<div class="objText">';
    // HTML += 		((cObj.hasOwnProperty('heading')) ? '<h4>(P: ' + TcObj.cardPosition +'), (A:[' + TcObj.correctColumn + '])' + cObj.heading + '</h4>' : ''); // <----- TEST 
    HTML += 		((cObj.hasOwnProperty('heading')) ? '<h4>' + cObj.heading + '</h4>' : '');  																// <----- LIVE
    // HTML += 		((cObj.hasOwnProperty('text')) ? '<p>' + cObj.text + '</p>' : '');
    // HTML += 		((cObj.hasOwnProperty('btnText')) ? '<span class="btn_ghost btn_ghost_noStyle btn btn-primary">' + cObj.btnText + '</span>' : '');
    HTML += 		'<div class="Clear"></div>';
    HTML += 	'</div>';
    HTML += '</div>';

    return HTML;
}


function setHeight(selectorArr, ratio) {
	var width;
	for (var n in selectorArr) {
		width = $(selectorArr[n]).width();
		$(selectorArr[n]).height(width*ratio);
	}
}


function setHeight2(selectorArr) {
	console.log('setHeight2 - CALLED');

	var timer = setInterval(function(){ 
		console.log('setHeight2 - A0');

		var imgHeight = $(".active img:nth-child(1)").height();
		console.log('setHeight2 - imgHeight: ' + imgHeight);
		if (imgHeight > 50) {
			clearInterval(timer);
	

	// $(".active:nth-child(1) img").load(function() {  // Denne funktionalitet virker ikke konsekvent! - se:  https://api.jquery.com/load-event/

		console.log('setHeight2 - LOADED');

	    var maxHeight = 0;  // '.catRow .cardContent'
	    $(".active .cardContent" ).each(function( index, element ) {
	    // $('.catRow .cardContent' ).each(function( index, element ) {
	        var h = $(element).height();
	        console.log('setHeight - h: ' + h);
	        maxHeight = (h > maxHeight)? h : maxHeight;
	    });
	    console.log('setHeight2 - maxHeight: ' + maxHeight);

	    // var ratio = 576/1024;
	    var ratio = 0;

	    var w = $(".active .cardContent" ).width();
	    $(".active .cardContent" ).height(maxHeight + w*ratio);
	    $(".samfundstypeZone" ).height(maxHeight + w*ratio + 50);

	    // for (var n in selectorArr) {
	    //     width = $(selectorArr[n]).width();
	    //     $(selectorArr[n]).height(maxHeight + width*(576/1024));
	    // }

	// });   // LOAD

		}
	}, 100);
}


function checkAnswer() {
	var id = $('.active').attr('id').replace('catRow_','');
	console.log('checkAnswer - id: ' + id);

	var rightOrder = true;
	$(".active .cardContent" ).each(function( index, element ) {
		var column = $(element).attr('data-column');
		console.log('checkAnswer - index: ' + index + ', column: ' + column + ', correct: ' + ((column.indexOf(index)===-1)? false : true ));

		if (column.indexOf(index)===-1) {
			rightOrder = false;
		}
	});
	console.log('checkAnswer - rightOrder: ' + rightOrder);

	if (rightOrder) {  // Only the right placed cards get the position set in the jsonData. NOTE: If localSorage is to be used, then comment-out the if-clause and just leave the setCardPosition() active!
		setCardPosition();
	}

	return rightOrder;
}


function setCardPosition() {
	var Cindex = $('.active').index()-1;
	console.log('setCardPosition - Cindex: ' + Cindex);
	$(".active .cardContent" ).each(function( index, element ) {
		var cardId = $(element).attr('data-cardId');
		console.log('setCardPosition - cardId: ' + cardId);
		for (var n in jsonData.category[Cindex].samfundstype) {
			if (jsonData.category[Cindex].samfundstype[n].cardId == cardId) {
				console.log('setCardPosition - A0 - index: ' + index);
				jsonData.category[Cindex].samfundstype[n].cardPosition = parseInt(index);
				break;
			}
		}
		// var cardId = jsonData.category[Cindex].samfundstype[index].cardPosition = ;
	});

	console.log('setCardPosition - jsonData: ' + JSON.stringify(jsonData, null, 4));
}


function ShuffelArray(ItemArray){
    var NumOfItems = ItemArray.length;
    var NewArray = ItemArray.slice();  // Copy the array...
    var Item2; var TempItem1; var TempItem2;
    for (var Item1 = 0; Item1 < NumOfItems; Item1++) {
        Item2 = Math.floor( Math.random() * NumOfItems);
        TempItem1 = NewArray[Item1];
        TempItem2 = NewArray[Item2];
        NewArray[Item2] = TempItem1;
        NewArray[Item1] = TempItem2;
    }
    return NewArray;
}


function elementInArray (tArray, element){
	console.log('\nelementInArray - CALLED - tArray: ' + JSON.stringify(tArray) + ', element: _' + element + '_');
    for (x in tArray){
        if (tArray[x] == element) return true;
    }
    return false;
}

// This function first randomize the cards of a paticular category, then it picks the first card and checks if it placed at its correct position. If it is at its
// correct position, then it 
function randomizeCards() {
	console.log('\nrandomizeCards - CALLED');
	// var n = 0;
	for (var n in jsonData.category) {
		console.log('randomizeCards - randArr 1: ' + JSON.stringify(jsonData.category[n].samfundstype, null, 4));
		var randArr = ShuffelArray(jsonData.category[n].samfundstype);
		console.log('randomizeCards - randArr 2: ' + JSON.stringify(randArr, null, 4));
// var randArr = jsonData.category[n].samfundstype;
		if (elementInArray(randArr[0].correctColumn), 0) {
			var len = randArr.length;
			for (var i = 0; i < len; i++) {
				if (!elementInArray(randArr[0].correctColumn), i) {
					var firstElement = randArr.shift();
					randArr.splice(((i==0)?0:i-1), 0, firstElement);
				} 
			}
		}
		console.log('randomizeCards - randArr 3: ' + JSON.stringify(randArr, null, 4));

		jsonData.category[n].samfundstype = randArr;
	}
}


function addCardId() {
	for (var n in jsonData.category) {
		for (var k in jsonData.category[n].samfundstype) {
			jsonData.category[n].samfundstype[k].cardId = k;
		}
	}

	console.log('addCardId - jsonData' + JSON.stringify(jsonData, null, 4));
}


$(document).on('click touchend', "#checkAnswer", function(event) {
	console.log('checkAnswer - CLICKED');
	var ans = checkAnswer();
	if (ans) {
		var numOfQuestions = jsonData.category.length;
		var currentQuestion = $('.active').index();
		console.log('checkAnswer - currentQuestion: ' + currentQuestion + ', numOfQuestions: ' + numOfQuestions);
		if (currentQuestion < numOfQuestions) {
			$('.active').fadeOut(200, function() {
				$(this).removeClass('active');

				// Show/fadein the next .catRow:
				// =============================   
				$('.catRow').eq(currentQuestion).addClass('active').hide().fadeIn(400);

				// Show/fadein the next .menuItem:
				// ===============================
				$('.menuItem').eq(parseInt(currentQuestion-1)).addClass('inactiveCategory').removeClass('activeCategory');
				$('.menuItem').eq(parseInt(currentQuestion)).addClass('activeCategory').removeClass('inactiveCategory').hide().fadeIn(400);
				

				// Deactivate sortablitey for the old .catRow:
				// ===========================================
				$( '#catRow_'+ String(parseInt(currentQuestion-1)) ).sortable({ deactivate: function( event, ui ) {} } ); // <---- This might not be necessary!
				$( '#catRow_'+ String(parseInt(currentQuestion-1)) ).removeClass('ui-sortable');
				$( '#catRow_'+ String(parseInt(currentQuestion-1)) + ' .cardContent' ).removeClass('ui-sortable-handle');

				
				// Activate sortablitey for the old .catRow:
				// =========================================
				setSortableRow('catRow_'+currentQuestion);

				setHeight2(['.samfundstypeZone', '.catRow .cardContent']);
			});
		} else {
			// alert('checkAnswer - TEMPLATE 2');
			// $('#interface').append(template2());
			$('#innerWrap').html(template2());
		}
		$('.success').html(update_scoreCounter('.success'));
	} else {
		microhint($('#checkAnswer'), '<div class="microhint_label_danger">Forkert</div> Prøv igen.', false, '#000');
	}
	$('.attempt').html(update_scoreCounter('.attempt'));
});


$(window).resize(function() {
	// ajustDropzoneHeight_template2();

	// setHeight(['.samfundstypeZone', '.catRow .cardContent'], 1.5);
	setHeight2(['.samfundstypeZone', '.catRow .cardContent']);
});


$(document).ready(function() {

	addCardId();

	// randomizeCards();

	$('#interface').html(main());

	setSortableRow('catRow_0');

	// setHeight(['.samfundstypeZone', '.catRow .cardContent'], 1.5);
	setHeight2(['.samfundstypeZone', '.catRow .cardContent']);

	
	// $('#interface').append(makeTable(['a', 'b', 'c'], [['(0,0)','(0,1)','(0,2)'], ['(1,0)','(1,1)','(1,2)'],['(2,0)','(2,1)','(2,2)'],['(3,0)','(3,1)','(3,2)']]));
	// $('#interface').append(template2());


	// var points = new Array(4);
	// console.log('points: ' + points);
});