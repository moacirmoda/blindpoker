second_size = 1000;

var buyin =  $("#buyin").val();
var jogadores =  $("#jogadores").val();
var stack =  $("#stack").val();
var blind = $("#blind").val().split(",");

$(function(){
	$("#board").hide();
	$("form").submit(function(e){
		e.preventDefault();

		// jogadores
		$("#jogadores_restantes").html(jogadores);
		add_jogador(jogadores);
		
		// time e blinds
		start_time();
		change_blind();

		// start countdown
		countdown(blind[0], blind[1]);
		
		$("#board").show();
		$("#form").hide();
	});
});

function alarm() {
	var clickSound = new Audio('alarm.mp3');
	clickSound.play();
}

function n(n){
    return n > 9 ? "" + n: "0" + n;
}
function countdown(start_minute, start_second) {

	if(start_minute == 0 && start_second <= 31) {
		if(start_second % 2 === 0) {
			$('body').css("background-color", '#000');
		} else {
			$('body').css("background-color", '#FF0000');
		}
	}
	
	if(start_second == 0 && start_minute != 0) {
		start_minute--;
		start_second = 59;
	} else if(start_second == 0 && start_minute == 0) {
		var blind = $("#blind").val().split(",");
		start_minute = blind[0];
		start_second = blind[1];
		change_blind();
		alarm();
		$('body').css("background-color", '#FFF');
	} else {
		start_second--;
	}

	
	$("#divminute").html(n(start_minute));
	$("#divsecond").html(n(start_second));
	
	setTimeout('countdown('+start_minute+','+start_second+')',second_size);
}

// font: http://www.pokersite.org/poker-strategy/sit-and-go/site-structures/
function change_blind() {
	var blind = $("#blind_value").html();
	blind = blind.split('/')[1];

	blind = parseInt(blind);
	if (blind < 200) {
		blind = blind + 50;
	} else if (blind >= 200 && blind < 800) {
		blind = blind + 200;
	} else if (blind >= 800 && blind < 2000) {
		blind = blind + 400;
	} else if (blind >= 2000) {
		blind = blind + 1000;
	}
	
	new_blind = blind/2 + "/" + blind;
	$("#blind_value").html(new_blind);
}

function eliminacao() {
	var jogadores_restantes =  parseInt($("#jogadores_restantes").html());
	$("#jogadores_restantes").html(jogadores_restantes - 1);
	media_de_fichas();
}

function media_de_fichas() {
	var jogadores_restantes =  $("#jogadores_restantes").html();
	var total_fichas = $("#total_fichas").html();

	var media = parseInt(total_fichas) / parseInt(jogadores_restantes);
	media = parseInt(media);
	$("#media_fichas").html(media);
}

function add_jogador(jogadores) {
	var buyin =  $("#buyin").val();
	var stack =  $("#stack").val();
	var total_jogadores =  $("#total_jogadores").html();

	// infos
	add_premiacao(buyin * jogadores);
	add_stack(stack * jogadores);

	$("#total_jogadores").html(parseInt(total_jogadores) + parseInt(jogadores));
	
	media_de_fichas();
}

function add_premiacao(value) {
	var premiacao_atual =  $("#premiacao").html();
	$("#premiacao").html(parseInt(premiacao_atual) + parseInt(value));	
}

function add_stack(value) {
	var item =  $("#total_fichas").html();
	$("#total_fichas").html(parseInt(item) + parseInt(value));
}

function add_rebuy() {
	var item =  $("#total_rebuy").html();
	$("#total_rebuy").html(parseInt(item) + 1);

	add_stack(stack);
	add_premiacao(buyin);
	media_de_fichas();
}

function start_time() {
	var hora = parseInt($("#tj_hora").html());
	var minuto = parseInt($("#tj_minuto").html());
	var segundo = parseInt($("#tj_segundo").html());

	segundo++;
	if(segundo == 60) {
		segundo = 0;
		minuto++;
	}
	if(minuto == 60) {
		minuto = 0;
		hora++;
	}

	$("#tj_hora").html(n(hora));
	$("#tj_minuto").html(n(minuto));
	$("#tj_segundo").html(n(segundo));
	setTimeout('start_time()',second_size);
}