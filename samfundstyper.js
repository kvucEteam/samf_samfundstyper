// OPGAVER TIL HJEMMEARBEJDE;
// ==========================
// - MEGET VIGTIGT: BUGFIX I MOBILE ift fontsize: Fix skriftstørrelser i mobilvisning + card-placering (Android: one-plus-two)
// - Fix kemi-objektet.

// OPGAVER DER ER FIXED I BASECAMP:
// ================================

function draggableCardTypes(cObj) {
	console.log('\ndraggableCardTypes - CALLED');

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
            console.log('draggableCardTypes - A3 - cObj.type: ' + JSON.stringify(cObj.type) + ', cObj: ' + JSON.stringify(cObj));
            // alert('ERROR');
    }

    return HTML;
}


function makeTextCard(TcObj) {
    console.log('\nmakeTextCard - CALLED');

    var cObj = TcObj.card;

    var HTML = '';
    HTML += '<div ' + ((cObj.hasOwnProperty('attr')) ? generateAttrStr(cObj.attr) : '')+' data-column="'+TcObj.correctColumn+'" data-cardId="'+TcObj.cardId+'">';
    HTML += 	(cObj.hasOwnProperty('text'))? cObj.text : '';
    HTML += '</div>';

    return HTML;
}


function makeImgCard(TcObj) {
    console.log('\nmakeImgCard - CALLED');

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
    console.log('\nmakeCard - CALLED');

    var cObj = TcObj.card;

    var HTML = '';
    HTML += '<div ' + ((cObj.hasOwnProperty('attr')) ? generateAttrStr(cObj.attr) : '')+' data-column="'+TcObj.correctColumn+'" data-cardId="'+TcObj.cardId+'">';
    HTML += 	'<div class="imgContainer">';
    HTML += 		(cObj.hasOwnProperty('imgSrc') ? '<img class="img-responsive" src="' + cObj.imgSrc + '">' : '');
    HTML += 	'</div>';
    HTML += 	'<div class="objText">';
    HTML += 		((cObj.hasOwnProperty('heading')) ? '<h4>' + cObj.heading + '</h4>' : '');
    // HTML += 		((cObj.hasOwnProperty('text')) ? '<p>' + cObj.text + '</p>' : '');
    HTML += 		((cObj.hasOwnProperty('text')) ?  cObj.text : '');
    HTML += 		((cObj.hasOwnProperty('btnText')) ? '<span class="btn_ghost btn_ghost_noStyle btn btn-primary">' + cObj.btnText + '</span>' : '');
    HTML += 		'<div class="Clear"></div>';
    HTML += 	'</div>';
    HTML += '</div>';

    return HTML;
}


function generateAttrStr(attrObj) {
    console.log('\ngenerateAttrStr - CALLED');

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
	console.log('\nsetSortableRow - CALLED');
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
			$('.microhint').fadeOut(400, function() {
				$(this).remove();
			});
		},
		change: function (e,ui){
			// $(ui.placeholder).hide().show(300);
		}
	});
	$( "#"+activeRowId ).disableSelection();
}


function categoryMenu() {
	console.log('\ncategoryMenu - CALLED');
	var HTML = '';
	for (var n in jsonData.category) {
		HTML += '<div class="menuItem '+((n==0)? 'activeCategory' : 'inactiveCategory')+'"><span class="categoryColor">'+jsonData.category[n].heading+'</span></div>';
	}

	return HTML;
}


function main() {
	console.log('\nmain - CALLED');
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
	console.log('\nmake_scoreCounter - CALLED');
	var numOfQuestions = jsonData.category.length;
	// return '<div class="score_container_wrap"><div class="score_container"><span class="scoreText">Korrekte svar: </span><span class="QuestionCounter QuestionTask"><span class="success">0</span> ud af '+numOfQuestions+'</span> <span class="scoreText"> Forsøg: </span><span class="ErrorCount QuestionTask attempt">0</span></div><div class="Clear"></div></div>';
	return '<div class="score_container_wrap"><div class="score_container"><span class="scoreText">Opgave </span><span class="QuestionCounter QuestionTask"><span class="success">1</span> / '+numOfQuestions+'</span> <span class="scoreText"> Forsøg: </span><span class="ErrorCount QuestionTask attempt">0</span></div><div class="Clear"></div></div>';
}



function update_scoreCounter(selector) {
	console.log('\nupdate_scoreCounter - CALLED');
	var val = parseInt($(selector).text())+1;
	console.log('update_scoreCounter - val: ' + val);

	// BUGFIX: Dette forhindre at hurtige tryk på "Tjek svar" får counteren (i un-randomized tilstand) til at springe en kategpri over:
	$(selector).addClass(selector.replace('.','')+'_inactive').removeClass(selector.replace('.',''));

	return val;
}


function template1() {
	console.log('\ntemplate1 - CALLED');
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
	console.log('\ntemplate2 - CALLED');
	window.template2_called = true;

	console.log('template2 - jsonData: ' + JSON.stringify(jsonData, null, 4));

	// var headerArr = ['a', 'b', 'c'];
	// var contentArr = [['(0,0)','(0,1)','(0,2)'], ['(1,0)','(1,1)','(1,2)'],['(2,0)','(2,1)','(2,2)'],['(3,0)','(3,1)','(3,2)']];
	var headerArr = [''];
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
	console.log('\nmakeTable - CALLED');
	var HTML = '';
	HTML += '<table '+generateAttrStr(attrObj)+'>';
	HTML += 	'<thead>';
	HTML += 		'<tr>';
					for (var n in headerArr) {
	HTML += 			'<th><h4>'+headerArr[n]+'</h4></th>';
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
    console.log('\nmakeMiniCard - CALLED');

    var cObj = TcObj.card;


    // cObj.attr.class += ((!elementInArray(cObj.attr.class.split(' '), 'miniCard'))?' miniCard' : '');
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
    HTML += 		((cObj.hasOwnProperty('text')) ? '<div class="miniCardText">' + cObj.text + '<div>' : '');
    // HTML += 		((cObj.hasOwnProperty('btnText')) ? '<span class="btn_ghost btn_ghost_noStyle btn btn-primary">' + cObj.btnText + '</span>' : '');
    HTML += 		'<div class="Clear"></div>';
    HTML += 	'</div>';
    HTML += '</div>';

    return HTML;
}


function setHeight(selectorArr, ratio) {
	console.log('\nsetHeight - CALLED');
	var width;
	for (var n in selectorArr) {
		width = $(selectorArr[n]).width();
		$(selectorArr[n]).height(width*ratio);
	}
}


// setHeight2(['.samfundstypeZone', '.catRow .cardContent']);
function setHeight2(selectorArr) {
	console.log('\nsetHeight2 - CALLED');

	// if ($(selectorArr[0]).length > 0) { // Only if the first element is present, then setHeight2...
	if ((typeof(template2_called)==='undefined')) {

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

			    // $(".active .cardContent" ).css({'min-height': maxHeight + w*ratio});   // BUGFIX: En mere flexibel løsning end den foroven.
			    // $(".samfundstypeZone" ).css({'min-height': maxHeight + w*ratio + 50}); // BUGFIX: En mere flexibel løsning end den foroven.

			    // for (var n in selectorArr) {
			    //     width = $(selectorArr[n]).width();
			    //     $(selectorArr[n]).height(maxHeight + width*(576/1024));
			    // }

			// });   // LOAD

				$('#btnWrap').fadeIn(200);
				$('.footerCopywrite').fadeIn(200);

				// if ($('#microhint_target').length) {
				// 	microhint($('#microhint_target'), '<img class="img-responsive" src="img/sorterhint_animatedGIF_done.gif">', false, '#000');   // sorterhint_animatedGIF_done.gif
				// }

			}
		}, 100);
	}
}


function checkAnswer() {
	console.log('\ncheckAnswer - CALLED');

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
	console.log('\nsetCardPosition - CALLED');

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
	console.log('\nShuffelArray - CALLED');

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
	console.log('\nelementInArray - CALLED');
    for (x in tArray){
        if (tArray[x] == element) {return true};
    }
    return false;
}

// This function first randomize the cards of a paticular category, then it picks the first card and checks if it placed at its correct position. If it is at its
// correct position, then it 
function randomizeCards() {
	console.log('\nrandomizeCards - CALLED');

	// SIMPLE RANDOMIZE: 
	// Just randomized cards... The right permutation of cards is possible...
	// =======================================
	// for (var n in jsonData.category) {  
	// 	var randArr = ShuffelArray(jsonData.category[n].samfundstype);
	// 	jsonData.category[n].samfundstype = randArr;
	// }

	// ADVANCED RANDOMIZE: 
	// The teachers (FR) does not want the right permutation of cards to be possible. Therefor this algorithm randomizes all cards, and 
	// checks to see if the first card is supposed to go in the first position - if it is, then the algorithm iterate through all cards to find 
	// a cards that does NOT go in the first position: it then place this card in the first position.  
	// =======================================
	for (var n in jsonData.category) {  
		var randArr = ShuffelArray(jsonData.category[n].samfundstype);
		console.log('randomizeCards - n: ' + n);
		if (elementInArray(randArr[0].correctColumn, 0)) {
			console.log('randomizeCards - n: ' + n + ' randArr 1: ' + JSON.stringify(randArr));
			var len = randArr.length;
			for (var i = 0; i < len; i++) {
				if (!elementInArray(randArr[i].correctColumn, 0)) {
					console.log('randomizeCards - i: ' + i + ', ' + JSON.stringify(randArr[i].correctColumn));
					var elem = randArr.splice(i, 1)[0];
					randArr.unshift(elem);
					break;
				} 
			}
			console.log('randomizeCards - n: ' + n + ' - randArr 2: ' + JSON.stringify(randArr));
		}
		jsonData.category[n].samfundstype = randArr;						
	}

	console.log('randomizeCards - jsonData 2: ' + JSON.stringify(jsonData));
}


function addCardId() {
	console.log('\naddCardId - CALLED');
	for (var n in jsonData.category) {
		for (var k in jsonData.category[n].samfundstype) {
			jsonData.category[n].samfundstype[k].cardId = k;
		}
	}

	console.log('addCardId - jsonData' + JSON.stringify(jsonData, null, 4));
}


$(document).on('click touchend', "#checkAnswer", function(event) {
	console.log('\ncheckAnswer - CLICKED');
	var ans = checkAnswer();
	if (ans) {
		console.log('checkAnswer - A0');

		var numOfQuestions = jsonData.category.length;
		var currentQuestion = $('.active').index();
		console.log('checkAnswer - currentQuestion: ' + currentQuestion + ', numOfQuestions: ' + numOfQuestions);
		if (currentQuestion < numOfQuestions) {
			var userMsgBox_msg = '<div class="microhint_label_success">Korrekt</div> '+jsonData.category[currentQuestion].feedback.posetive+'';
			$('#checkAnswer').html('Gå videre').attr('id', 'changeQuestion');
		} else {
			var userMsgBox_msg = '<div class="microhint_label_success">FLOT</div> Du har besvaret alle spørgsmål. Du kan nu gå til oversigten over samfundstyper.';
			$('#checkAnswer').html('Gå til oversigten').attr('id', 'changeQuestion');
		}

		// checkAnswer_callBack();

		// $('.success_inactive').addClass('success').removeClass('success_inactive');
		$('.attempt_inactive').addClass('attempt').removeClass('attempt_inactive');
		// $('.success').html(update_scoreCounter('.success'));
		$('.attempt').html(update_scoreCounter('.attempt'));

		microhint($('#changeQuestion'), userMsgBox_msg, false, '#000');

		$( ".active" ).sortable( "disable" );

		
	} else {
		console.log('checkAnswer - A3');

		microhint($('#checkAnswer'), '<div class="microhint_label_danger">Forkert</div> Prøv igen.', false, '#000');
		$('.success_inactive').addClass('success').removeClass('success_inactive');
		$('.attempt_inactive').addClass('attempt').removeClass('attempt_inactive');

		$('.attempt').html(update_scoreCounter('.attempt'));
	}
	
});


$(document).on('click touchend', "#changeQuestion", function(event) {
	console.log('\nchangeQuestion - CLICKED');

	// $( ".active" ).sortable( "enable" );  // Denne er ikke nødvendig pga reinitialisering.

	checkAnswer_callBack();
	$('.success_inactive').addClass('success').removeClass('success_inactive');
	// $('.attempt_inactive').addClass('attempt').removeClass('attempt_inactive');
	$('.success').html(update_scoreCounter('.success'));
	// $('.attempt').html(update_scoreCounter('.attempt'));

	$('#changeQuestion').html('Tjek rækkefølgen').attr('id', 'checkAnswer');

	$('.microhint').trigger('click');

});


function checkAnswer_callBack() {
	console.log('\ncheckAnswer_callBack - CLICKED');

	var numOfQuestions = jsonData.category.length;
	var currentQuestion = $('.active').index();
	console.log('checkAnswer - currentQuestion: ' + currentQuestion + ', numOfQuestions: ' + numOfQuestions);
	if (currentQuestion < numOfQuestions) {
		console.log('checkAnswer - A1');

		$('.active').fadeOut(200, function() {

			$('#btnWrap').hide();
			$('.footerCopywrite').hide();

			$(this).removeClass('active');

			// Show/fadein the next .catRow:
			// =============================   
			$('.catRow').eq(currentQuestion).addClass('active').hide().fadeIn(400, function() {  // BUGFIX: Dette forhindre at hurtige tryk på "Tjek svar" får counteren (i un-randomized tilstand) til at springe en kategpri over.
				// $('.success_inactive').addClass('success').removeClass('success_inactive');
				// $('.attempt_inactive').addClass('attempt').removeClass('attempt_inactive');
				// $('.success').html(update_scoreCounter('.success'));
				// $('.attempt').html(update_scoreCounter('.attempt'));
			});

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
		console.log('checkAnswer - A2');

		// alert('checkAnswer - TEMPLATE 2');
		// $('#interface').append(template2());
		$('#innerWrap').html(template2());

		microhint($('.miniCard:eq(0)'), 'Klik på kortene for at læse mere.', false, '#000'); 	
	}
}



function UserMsgBox_card(TargetSelector, UserMsg) {
    console.log('\nUserMsgBox_card - CALLED');
    var HTML = "<div class='MsgBox_bgr_card'><div id='UserMsgBox_card'>";
    HTML += '<span class="CloseClass_card right glyphicon glyphicon-remove"></span><span class="clear"></span>';
    HTML += UserMsg;
    HTML += "</div> </div>";
    
    $(TargetSelector).prepend(HTML);

    $(".MsgBox_bgr_card").fadeIn("slow");
}

// $(".MsgBox_bgr_card").click(function() {
// $(document).on('click touchend', '.MsgBox_bgr_card', function(event) {
$(document).on('click', '.MsgBox_bgr_card', function(event) {
	console.log('UserMsgBox_card - .MsgBox_bgr_card - CLICKED');
    $(".MsgBox_bgr_card").fadeOut(200, function() {
        $(this).remove();
    });
});
// $("#UserMsgBox_card").click(function() {
// $(document).on('click touchend', '#UserMsgBox_card', function(event) {
$(document).on('click', '#UserMsgBox_card', function(event) {
	console.log('UserMsgBox_card - #UserMsgBox_card - CLICKED');
    $(".MsgBox_bgr_card").fadeOut(200, function() {
        $(this).remove();
    });
   //  $('.CloseClass_card').trigger('click');
});
$(document).keyup(function(e) {
	console.log('UserMsgBox_card - ESC - CLICKED');
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        $(".MsgBox_bgr_card").fadeOut(200, function() {
            $(this).remove();
        });
    }
});



// $(document).on('click touchend', '.miniCard', function(event) {  //  <--- BUG!!!
$(document).on('click', '.miniCard', function(event) {				//  <--- BUGFIX: "touchend" must not be on '.miniCard' to open the large "miniCard_large"!
	console.log('\nminiCard > UserMsgBox_card - CALLED');
	
	//##############################################################################
	//		UserMsgBox løsning, som virker uanset card-tekst-størrelse...
	//##############################################################################
	
	// UserMsgBox_xclick("body", '<div id="cloneTarget"></div>');


	// UserMsgBox("body", '<div id="cloneTarget"></div>');
	// $('#cloneTarget').hide().fadeIn(400);
	// $('#cloneTarget').html($(this).clone());
	// $('#cloneTarget .miniCardText').css({display: 'inline-block'});


	UserMsgBox_card("body", '<div id="dummyContainer"></div>');
	// $('#UserMsgBox_card').hide().fadeIn(400);
	$('#dummyContainer').html($(this).clone().addClass('miniCard_large').removeClass('miniCard'));
	$('#UserMsgBox_card .miniCardText').css({display: 'inline-block'});
	$('.microhint').trigger('click');

});


// function linearScaling(scaleObj) {
//     var w = $('.container-fluid').width();
//     scaleObj = {
//         'scalables': [{
//             '700px': {
//                 '.samfundstypeHeading': { 'font-size': '3em', 'xxx': '12px' }
//             }
//         }, {
//             '900px': {
//                 '.samfundstypeHeading': { 'font-size': '4em', 'xxx': '14px' }
//             }
//         }, {
//             '1100px': {
//                 '.samfundstypeHeading': { 'font-size': '5em', 'xxx': '16px' }
//             }
//         }],
//         'setables': [{
//             '700px': {
//                 '.weekNameAndNumber': { 'color': '#F00' }
//             }
//         }, {
//             '900px': {
//                 '.weekNameAndNumber': { 'color': '#0F0' }
//             }
//         }, {
//             '1100px': {
//                 '.weekNameAndNumber': { 'color': '#00F' }
//             }
//         }]
//     };

//     window.lowerWitdth = findWidths(scaleObj.scalables);
//     console.log('linearScaling - lowerWitdth: ' + lowerWitdth);

//     linearScaleIterate();

//     //###############  INTERNAL FUNCTIONS  ##############

//     function linearScaleIterate() {
//         console.log('\nlinearScaling - CALLED');
//         var sObj = scaleObj.scalables;
//         var wn;
//         var wMax = String(Object.keys(sObj[sObj.length - 1])).replace('px', '');
//         var nMax = sObj.length - 1;
//         console.log('linearScaling - linearScaleIterate - wMax: ' + wMax);
//         for (var n in sObj) {
//             wn = String(Object.keys(sObj[n])).replace('px', '');
//             console.log('linearScaling - linearScaleIterate - wn: ' + wn + ', lowerWitdth: ' + lowerWitdth);
//             if (wn == lowerWitdth) {
//                 console.log('linearScaling - linearScaleIterate - A0');
//                 for (var k in sObj[n][wn + 'px']) { // k = selector name
//                     var cssObj = {};
//                     console.log('linearScaling - linearScaleIterate - k: ' + k + ', sObj[' + n + '][' + wn + 'px' + ']: ' + JSON.stringify(sObj[n][wn + 'px']));
//                     for (var p in sObj[n][wn + 'px'][k]) { // p = property
//                         var vStr1 = sObj[n][wn + 'px'][k][p]; // vStr1 = value string
//                         var unit1 = vStr1.replace(/\d+/g, '');
//                         var v1 = parseInt(vStr1.replace(unit1, '')); // v = value
//                         console.log('linearScaling - linearScaleIterate - p: ' + p + ', vStr1: ' + vStr1 + ', unit1: ' + unit1 + ', v1: ' + v1);

//                         console.log('linearScaling - linearScaleIterate - n: ' + n + ', nMax: ' + nMax);
//                         // if (parseInt(wn) < parseInt(wMax)) {
//                         if (parseInt(n) < parseInt(nMax)) {
//                             console.log('linearScaling - linearScaleIterate - A1');

//                             var wn2 = String(Object.keys(sObj[parseInt(n) + 1])).replace('px', '');

//                             console.log('linearScaling - linearScaleIterate - n+1: ' + String(parseInt(n) + 1) + ', wn2+px: ' + wn2 + 'px' + ', k: ' + k + ', p: ' + p + ', sObj[' + String(parseInt(n) + 1) + '][' + wn2 + 'px' + ']: ' + JSON.stringify(sObj[parseInt(n) + 1][wn2 + 'px']));
//                             if (sObj[parseInt(n) + 1][wn2 + 'px'][k].hasOwnProperty(p)) { // If sObj[n+1] also has property "p", then...
//                                 console.log('linearScaling - linearScaleIterate - A2');
//                                 var vStr2 = sObj[parseInt(n) + 1][wn2 + 'px'][k][p]; // vStr = value string
//                                 var unit2 = vStr2.replace(/\d+/g, '');
//                                 var v2 = parseInt(vStr2.replace(unit2, '')); // v = value
//                                 console.log('linearScaling - linearScaleIterate - p: ' + p + ', vStr2: ' + vStr2 + ', unit2: ' + unit2 + ', v2: ' + v2);

//                                 if (unit1 == unit2) {
//                                     console.log('linearScaling - linearScaleIterate - A3');
//                                     var w1 = parseInt(lowerWitdth); // lowerWitdth always has the lowest width
//                                     var w2 = parseInt(wn2); // w is the present width 
//                                     var s1 = v1; // v1 is the value of p associated with w1 (or lowerWitdth)
//                                     var s2 = v2; // v2 is the value of p associated with n+1
//                                     var s = linearScale(w1, w2, s1, s2);
//                                     console.log('linearScaling - linearScaleIterate - XX1 - w1: ' + w1 + ', w2: ' + w2 + ', w: ' + w + ', s1: ' + s1 + ', s2: ' + s2 + ', s: ' + JSON.stringify(s) + ', unit1: ' + unit1);

//                                     cssObj[p] = String(s.s) + unit1;
//                                 }
//                             }
//                         } else {
//                             console.log('linearScaling - linearScaleIterate - A4');

//                             var wn2 = String(Object.keys(sObj[parseInt(n) - 1])).replace('px', '');

//                             if (sObj[parseInt(n) - 1][wn2 + 'px'][k].hasOwnProperty(p)) { // If sObj[n+1] also has property "p", then...
//                                 console.log('linearScaling - linearScaleIterate - A5');
//                                 var vStr2 = sObj[parseInt(n) - 1][wn2 + 'px'][k][p]; // vStr = value string
//                                 var unit2 = vStr2.replace(/\d+/g, '');
//                                 var v2 = parseInt(vStr2.replace(unit2, '')); // v = value
//                                 console.log('linearScaling - linearScaleIterate - p: ' + p + ', vStr2: ' + vStr2 + ', unit2: ' + unit2 + ', v2: ' + v2);

//                                 if (unit1 == unit2) {
//                                     console.log('linearScaling - linearScaleIterate - A6');
//                                     var w1 = parseInt(lowerWitdth); // lowerWitdth always has the lowest width
//                                     var w2 = parseInt(wn2); // w is the present width 
//                                     var s1 = v1; // v1 is the value of p associated with w1 (or lowerWitdth)
//                                     var s2 = v2; // v2 is the value of p associated with n+1
//                                     var s = linearScale(w2, w1, s2, s1);
//                                     console.log('linearScaling - linearScaleIterate - XX2 - w1: ' + w1 + ', w2: ' + w2 + ', w: ' + w + ', s1: ' + s1 + ', s2: ' + s2 + ', s: ' + JSON.stringify(s) + ', unit1: ' + unit1);

//                                     cssObj[p] = String(s.s) + unit1;
//                                 }
//                             }
//                         }

//                         // linearScale(w1, w2, s1, s2);
//                     }
//                     console.log('linearScaling - linearScaleIterate - k: ' + k + ', cssObj: ' + JSON.stringify(cssObj));
//                     // $(k).css(cssObj);
//                 }
//                 break;
//             }
//         }
//     }


//     function linearScale(w1, w2, s1, s2) {

//         var s, a, b;

//         a = (s2 - s1) / (w2 - w1);
//         b = s1 - a * w1;

//         // s = Math.round(a*w + b);  // <------ w is width of ".container-fluid" 
//         s = a * w + b;

//         console.log('linearFontScale - a: ' + a + ', b: ' + b + ', s: ' + s);

//         return { a: a, b: b, s: s };
//     }

//     // var sObj = {'700px': 2, '900px': 3, '1100px': 4};
//     function findNumOfCards(sObj, w) {
//         var nMax;
//         for (var n in sObj) {
//             if (w <= parseInt(n.replace('px', ''))) {
//                 return sObj[n];
//             }
//             nMax = n;
//         }
//         return sObj[nMax];
//     }

//     // Same base functionality as findNumOfCards:
//     function findWidths(sObj) { // <---- scaleObj.scalables OR scaleObj.setables
//         var nMax, wn;
//         for (var n in sObj) {
//             wn = String(Object.keys(sObj[n]));
//             console.log('linearScaling - findWidths - n: ' + n + ', wn: ' + wn);
//             wn = parseInt(wn.replace('px', ''));
//             if (w <= wn) {
//                 return wn;
//             }
//             nMax = wn;
//         }
//         return nMax;
//     }
// }


function fontScale() {
	
	var sObj = [
		{'700px': {
            '.xxx': { 'font-size': '2em', 'padding': '1px'},
            '.yyy': { 'font-size': '2em', 'padding': '1px'}
        }},
        {'900px': {
            '.xxx': { 'font-size': '3em', 'padding': '2px'},
            '.yyy': { 'font-size': '3em', 'padding': '2px'}
        }},
        {'1100px': {
            '.xxx': { 'font-size': '4em', 'padding': '3px'},
            '.yyy': { 'font-size': '4em', 'padding': '3px'}
        }}
	]

	for (var n in sObj) {
		// var s = parseInt(String(Object.keys(sObj[n])).replace('px', ''));
		var s = w_sObj(sObj, n);
		console.log('fontScale 1 - s: ' + s);
	}

	var wMin = parseInt(String(Object.keys(sObj[0])).replace('px', ''));
	var wMax = parseInt(String(Object.keys(sObj[sObj.length - 1])).replace('px', ''));
	var w = $('.container-fluid').width();

	if (w <= wMin) {
		var w1 = parseInt(String(Object.keys(sObj[0])).replace('px', ''));
		var w2 = parseInt(String(Object.keys(sObj[1])).replace('px', ''));
	}

	if ((wMin < w) && (w < wMax)) {
		var w1 = null, w2 = null;
		for (var n in sObj) {
			var wTemp = w_sObj(sObj, n);
			console.log('fontScale 2 - s: ' + s);
			if (wTemp <= w) {
				w1 = wTemp;
			}
			if (w <= wTemp) {
				w2 = wTemp;

				break;
			}
		}
		console.log('fontScale - w1: ' + w1 + ', w2: ' + w2);
	}

	if (wMax <= w) {
		var w1 = parseInt(String(Object.keys(sObj[sObj.length - 2])).replace('px', ''));
		var w2 = parseInt(String(Object.keys(sObj[sObj.length - 1])).replace('px', ''));
	}


	function w_sObj(sObj, index) {
		return parseInt(String(Object.keys(sObj[index])).replace('px', ''));
	}

	function calcLine(w1, w2, s1, s2) {

        var s, a, b;

        a = (s2 - s1) / (w2 - w1);
        b = s1 - a * w1;

        // s = Math.round(a*w + b);  // <------ w is width of ".container-fluid" 
        s = a * w + b;

        console.log('linearFontScale - a: ' + a + ', b: ' + b + ', s: ' + s);

        return { a: a, b: b, s: s };
    }
}


$(window).resize(function() {
	// ajustDropzoneHeight_template2();

	// setHeight(['.samfundstypeZone', '.catRow .cardContent'], 1.5);
	setHeight2(['.samfundstypeZone', '.catRow .cardContent']);
});


$(document).ready(function() {

	rotateCheck();

	addCardId();

	randomizeCards();

	$('#interface').html(main());

	// $('#catRow_0').addClass('microhint_target');  // Insert 
	$('#catRow_0 .cardContent:eq(1) h4').addClass('microhint_target');  // Insert 
	microhint($('.microhint_target'), '<img class="img-responsive" src="img/sorterhint_animatedGIF_done.gif"> <p id="startHint">Sorter de grå kort, så de passer til den rette kategori.</p>', false, '#000'); 

	setSortableRow('catRow_0');

	// setHeight(['.samfundstypeZone', '.catRow .cardContent'], 1.5);
	setHeight2(['.samfundstypeZone', '.catRow .cardContent']);

	
	// $('#interface').append(makeTable(['a', 'b', 'c'], [['(0,0)','(0,1)','(0,2)'], ['(1,0)','(1,1)','(1,2)'],['(2,0)','(2,1)','(2,2)'],['(3,0)','(3,1)','(3,2)']]));
	// $('#interface').append(template2());


	// var points = new Array(4);
	// console.log('points: ' + points);

	// linearScaling({});
	// fontScale();


	// TEST AF template2():
	// ====================
	// $('#innerWrap').html(template2());  // <--------- Husk at aktivere samfundstyper_test3.json ved test!
});