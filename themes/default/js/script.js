var price = [[]];
var lastids = [];
var turn = 1 ;
bild_chess();
setColor();
add_price();
$(".cell_chess").on('click',function () {
	let this_bgcolor = $(this).css('background-color');
	if (this_bgcolor=='rgb(255, 255, 255)' || this_bgcolor=='rgb(192, 192, 192)') 
	{
		let data_price = [];
		data_price[0]="none";
		for (let i = 1; i <= 64; i++) {
			data_price.push($(`.cell_chess[data-id=${i}] div`).attr('data-price'))
		}
		price = price_move($(this).attr('data-id'),$(this).children().attr('data-move'),$(this).children().attr('data-color'),$(this).children().attr('data-price'),data_price,turn);
	}
	else if(this_bgcolor=='rgb(0, 255, 0)')
	{
		for (var i = price[0].length - 1; i >= 0; i--) {
			if(price[0][i]==$(this).attr('data-id'))
			{
				add_price($(this).attr('data-id'),$(`.cell_chess[data-id=${lastids[lastids.length-1]}] div`).attr('data-price'),$(`.cell_chess[data-id=${lastids[lastids.length-1]}] div`).attr('data-color'),'true')
				change_data(lastids[lastids.length-1],"none","none","none");
				$(`.cell_chess[data-id=${lastids[lastids.length-1]}] div`).css({
					'background-image':'none'
				})
				setColor()
				turn++;
				break;
			}
		}
	}
	else if(this_bgcolor=='rgb(255, 0, 0)')
	{
		for (var i = price[1].length - 1; i >= 0; i--) {
			if(price[1][i]==$(this).attr('data-id'))
			{
				add_price($(this).attr('data-id'),$(`.cell_chess[data-id=${lastids[lastids.length-1]}] div`).attr('data-price'),$(`.cell_chess[data-id=${lastids[lastids.length-1]}] div`).attr('data-color'),'true')
				change_data(lastids[lastids.length-1],"none","none","none");
				$(`.cell_chess[data-id=${lastids[lastids.length-1]}] div`).css({
					'background-image':'none'
				})
				setColor()
				turn++;
				break;
			}
		}
	}
	lastids.push($(this).attr('data-id'));
})
function bild_chess() {
	let Conclusion = '';
	Conclusion = `<div id="page">`;
	for (let i = 1; i <= 64; i++) {
		Conclusion += 
		(`<div class="cell_chess" data-id="${i}">
			<div data-move="none" data-color="none" data-price="none" style="background-image':'none"></div>
		</div>`);
	}
	Conclusion += `</div>`;
	$(`body`).append(Conclusion);
	for (let i = 1; i <= 8; i++) {
		add_price(i,'blackPieces'+i,'black');
		add_price(i+8,'blackPieces10','black');
		add_price(i+48,'whitePieces10','white');
		add_price(i+56,'whitePieces'+i,'white');
	}
}
function add_price(id,price,color,move='false') {
	$(`.cell_chess[data-id=${id}] div`).css({
		'background-image':'url(themes/default/images/'+price+'.png)'
	})
	change_data(id,move,color,price);
}
function change_data(id,move,color,price) {
	$(`.cell_chess[data-id=${id}] div`).attr('data-move' , move)
	$(`.cell_chess[data-id=${id}] div`).attr('data-color', color)
	$(`.cell_chess[data-id=${id}] div`).attr('data-price' , price)
}
function setColor() {
	for (let i = 0; i <= 64; i++) {
		$(`.cell_chess[data-id=${i}]`) .css({
			'background-color': 'white'
		})
	}
	let color_id = [];
	for (let i = 0; i < 8; i++) {
		for (let j = 1; j <= 8; j++) {
			if((i*8+j)%2==0)
			{
				if (i%2==1)
				{
					color_id.push(i*8+j-1)

				}
				else
				{
					color_id.push(i*8+j)

				}
			}
		}
	}
	for (let i = color_id.length - 1; i >= 0; i--) {
		$(`.cell_chess[data-id=${color_id[i]}]`).css({
			'background-color': 'silver'
		})
	}
}
function price_move(id,move,color,price,data_price,turn) {
	// alert(id+":"+move+":"+color+":"+price)
	setColor();
	let prices_go_cell = [];
	let price_attack_cell = [];
	let row = Math.ceil(id/8);
	let colum = ((id-1)%8)+1;
	if (turn%2==1)
	{
		//pawns white;
		if(price==`whitePieces10`)
		{
			if (move=='false' && data_price[parseInt(id)-8]=="none")
			{
				prices_go_cell.push(parseInt(id)-8);
				prices_go_cell.push(parseInt(id)-16);
				test_attack(parseInt(id)-8+1,turn,price_attack_cell);
				test_attack(parseInt(id)-8-1,turn,price_attack_cell);
			}
			else
			{
				prices_go_cell.push(parseInt(id)-8);
				test_attack(parseInt(id)-8+1,turn,price_attack_cell);
				test_attack(parseInt(id)-8-1,turn,price_attack_cell);
			}
		}
		//knights white
		if(price==`whitePieces2`||
			price==`whitePieces7`)
		{
			if (row-2>0 && colum-1>0){
				prices_go_cell.push(parseInt(id)-16-1);
				test_attack(parseInt(id)-16-1,turn,price_attack_cell);
			}
			if (row-2>0 && colum+1<=8){
				prices_go_cell.push(parseInt(id)-16+1);
				test_attack(parseInt(id)-16+1,turn,price_attack_cell);
			}
			if (row-1>0 && colum-2>0){
				prices_go_cell.push(parseInt(id)-2-8);
				test_attack(parseInt(id)-2-8,turn,price_attack_cell);
			}
			if (row+1<=8 && colum-2>0){
				prices_go_cell.push(parseInt(id)-2+8);
				test_attack(parseInt(id)-2+8,turn,price_attack_cell);
			}
			if (row+2<=8 && colum-1>0){
				prices_go_cell.push(parseInt(id)+16-1);
				test_attack(parseInt(id)+16-1,turn,price_attack_cell);
			}
			if (row+2<=8 && colum+1<=8){
				prices_go_cell.push(parseInt(id)+16+1);
				test_attack(parseInt(id)+16+1,turn,price_attack_cell);
			}
			if (row-1>0 && colum+2<=8){
				prices_go_cell.push(parseInt(id)+2-8);
				test_attack(parseInt(id)+2-8,turn,price_attack_cell);
			}
			if (row+1<=8 && colum+2<=8){
				prices_go_cell.push(parseInt(id)+2+8);
				test_attack(parseInt(id)+2+8,turn,price_attack_cell);
			}
		}
		//rooks white
		if(price==`whitePieces1`||
		price==`whitePieces8`)
		{
			for (let i = row-1; i > 0; i--) {
				if (data_price[i*8-(8-colum)]!='none'){
					test_attack(i*8-(8-colum),turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(i*8-(8-colum));
			}
			for (let i = row+1; i <= 8; i++) {
				if (data_price[i*8-(8-colum)]!='none') {
					test_attack(i*8-(8-colum),turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(i*8-(8-colum));
			}
			for (let i = colum+1; i <= 8; i++) {
				if (data_price[(row-1)*8+i]!='none') {
					test_attack((row-1)*8+i,turn,price_attack_cell);
					break;	
				}
				prices_go_cell.push((row-1)*8+i);
			}
			for (let i = colum-1; i > 0; i--) {
				if (data_price[(row-1)*8+i]!='none') {
					test_attack((row-1)*8+i,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push((row-1)*8+i);
			}
		}
		//bishops white
		if(price==`whitePieces3`||
		price==`whitePieces6`)
		{
			let bishopsCulom = colum;
			let bishopsRow = row;
			for (let i = 1; i <= 8 ; i++)
			{
				bishopsRow--;
				bishopsCulom++;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)-i*7]!='none') 
				{
					test_attack(parseInt(id)-i*7,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)-i*7);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (let i = 1; i <= 8 ; i++)
			{
				bishopsRow--;
				bishopsCulom--;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)-i*9]!='none') 
				{
					test_attack(parseInt(id)-i*9,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)-i*9);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (let i = 1; i <= 8 ; i++)
			{
				bishopsRow++;
				bishopsCulom++;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)+i*9]!='none') 
				{
					test_attack(parseInt(id)+i*9,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)+i*9);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (let i = 1; i <= 8 ; i++)
			{
				bishopsRow++;
				bishopsCulom--;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)+i*7]!='none')
				{
					test_attack(parseInt(id)+i*7,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)+i*7);
			}
		}
		//king white
		if(price==`whitePieces5`)
		{
			if (row>1){
				prices_go_cell.push(parseInt(id)-8);
				test_attack(parseInt(id)-8,turn,price_attack_cell);
			}
			if (row<8){
				prices_go_cell.push(parseInt(id)+8);
				test_attack(parseInt(id)+8,turn,price_attack_cell);
			}
			if (colum>1){
				prices_go_cell.push(parseInt(id)-1);
				test_attack(parseInt(id)-1,turn,price_attack_cell);
			}
			if (colum<8){
				prices_go_cell.push(parseInt(id)+1);
				test_attack(parseInt(id)+1,turn,price_attack_cell);
			}
			if (row>1 && colum>1){
				prices_go_cell.push(parseInt(id)-8-1);
				test_attack(parseInt(id)-8-1,turn,price_attack_cell);
			}
			if (row<8 && colum>1){
				prices_go_cell.push(parseInt(id)+8-1);
				test_attack(parseInt(id)+8-1,turn,price_attack_cell);
			}
			if (row>1 && colum<8){
				prices_go_cell.push(parseInt(id)-8+1);
				test_attack(parseInt(id)-8+1,turn,price_attack_cell);
			}
			if (row<8 && colum<8){
				prices_go_cell.push(parseInt(id)+8+1);
				test_attack(parseInt(id)+8+1,turn,price_attack_cell);
			}
		}
		//queen white
		if(price==`whitePieces4`)
		{
			for (let i = row-1; i > 0; i--) {
				if (data_price[i*8-(8-colum)]!='none'){
					test_attack(i*8-(8-colum),turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(i*8-(8-colum));
			}
			for (let i = row+1; i <= 8; i++) {
				if (data_price[i*8-(8-colum)]!='none') {
					test_attack(i*8-(8-colum),turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(i*8-(8-colum));
			}
			for (let i = colum+1; i <= 8; i++) {
				if (data_price[(row-1)*8+i]!='none') {
					test_attack((row-1)*8+i,turn,price_attack_cell);
					break;	
				}
				prices_go_cell.push((row-1)*8+i);
			}
			for (let i = colum-1; i > 0; i--) {
				if (data_price[(row-1)*8+i]!='none') {
					test_attack((row-1)*8+i,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push((row-1)*8+i);
			}
			let bishopsCulom = colum;
			let bishopsRow = row;
			for (let i = 1; i <= 8 ; i++)
			{
				bishopsRow--;
				bishopsCulom++;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)-i*7]!='none') 
				{
					test_attack(parseInt(id)-i*7,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)-i*7);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (let i = 1; i <= 8 ; i++)
			{
				bishopsRow--;
				bishopsCulom--;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)-i*9]!='none') 
				{
					test_attack(parseInt(id)-i*9,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)-i*9);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (let i = 1; i <= 8 ; i++)
			{
				bishopsRow++;
				bishopsCulom++;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)+i*9]!='none') 
				{
					test_attack(parseInt(id)+i*9,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)+i*9);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (let i = 1; i <= 8 ; i++)
			{
				bishopsRow++;
				bishopsCulom--;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)+i*7]!='none')
				{
					test_attack(parseInt(id)+i*7,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)+i*7);
			}
		}
	}
	else
	{
		//pawns black
		if(price==`blackPieces10`)
		{
			if (move=='false'  && data_price[parseInt(id)+8]=="none")
			{
				prices_go_cell.push(parseInt(id)+8);
				prices_go_cell.push(parseInt(id)+16);
				test_attack(parseInt(id)+8+1,turn,price_attack_cell);
				test_attack(parseInt(id)+8-1,turn,price_attack_cell);
			}
			else
			{
				prices_go_cell.push(parseInt(id)+8);
				test_attack(parseInt(id)+8+1,turn,price_attack_cell);
				test_attack(parseInt(id)+8-1,turn,price_attack_cell);
			}
		}
		//knights black
		if(price==`blackPieces2`||
			price==`blackPieces7`)
		{
			if (row-2>0 && colum-1>0){
				prices_go_cell.push(parseInt(id)-16-1);
				test_attack(parseInt(id)-16-1,turn,price_attack_cell);
			}
			if (row-2>0 && colum+1<=8){
				prices_go_cell.push(parseInt(id)-16+1);
				test_attack(parseInt(id)-16+1,turn,price_attack_cell);
			}
			if (row-1>0 && colum-2>0){
				prices_go_cell.push(parseInt(id)-2-8);
				test_attack(parseInt(id)-2-8,turn,price_attack_cell);
			}
			if (row+1<=8 && colum-2>0){
				prices_go_cell.push(parseInt(id)-2+8);
				test_attack(parseInt(id)-2+8,turn,price_attack_cell);
			}
			if (row+2<=8 && colum-1>0){
				prices_go_cell.push(parseInt(id)+16-1);
				test_attack(parseInt(id)+16-1,turn,price_attack_cell);
			}
			if (row+2<=8 && colum+1<=8){
				prices_go_cell.push(parseInt(id)+16+1);
				test_attack(parseInt(id)+16+1,turn,price_attack_cell);
			}
			if (row-1>0 && colum+2<=8){
				prices_go_cell.push(parseInt(id)+2-8);
				test_attack(parseInt(id)+2-8,turn,price_attack_cell);
			}
			if (row+1<=8 && colum+2<=8){
				prices_go_cell.push(parseInt(id)+2+8);
				test_attack(parseInt(id)+2+8,turn,price_attack_cell);
			}
		}
		//rooks black
		if(price==`blackPieces1`||
			price==`blackPieces8`)
		{
			for (var i = row-1; i > 0; i--) {
				if (data_price[i*8-(8-colum)]!='none'){
					test_attack(i*8-(8-colum),turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(i*8-(8-colum));
			}
			for (var i = row+1; i <= 8; i++) {
				if (data_price[i*8-(8-colum)]!='none') {
					test_attack(i*8-(8-colum),turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(i*8-(8-colum));
			}
			for (var i = colum+1; i <= 8; i++) {
				if (data_price[(row-1)*8+i]!='none') {
					test_attack((row-1)*8+i,turn,price_attack_cell);
					break;	
				}
				prices_go_cell.push((row-1)*8+i);
			}
			for (var i = colum-1; i > 0; i--) {
				if (data_price[(row-1)*8+i]!='none') {
					test_attack((row-1)*8+i,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push((row-1)*8+i);
			}
		}
		//bishops black
		if(price==`blackPieces3`||
			price==`blackPieces6`)
		{
			var bishopsCulom = colum;
			var bishopsRow = row;
			for (var i = 1; i <= 8 ; i++)
			{
				bishopsRow--;
				bishopsCulom++;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)-i*7]!='none') 
				{
					test_attack(parseInt(id)-i*7,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)-i*7);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (var i = 1; i <= 8 ; i++)
			{
				bishopsRow--;
				bishopsCulom--;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)-i*9]!='none') 
				{
					test_attack(parseInt(id)-i*9,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)-i*9);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (var i = 1; i <= 8 ; i++)
			{
				bishopsRow++;
				bishopsCulom++;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)+i*9]!='none') 
				{
					test_attack(parseInt(id)+i*9,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)+i*9);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (var i = 1; i <= 8 ; i++)
			{
				bishopsRow++;
				bishopsCulom--;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)+i*7]!='none') 
				{
					test_attack(parseInt(id)+i*7,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)+i*7);
			}
		}
		//king black
		if(price==`blackPieces5`)
		{
			if (row>1){
				prices_go_cell.push(parseInt(id)-8);
				test_attack(parseInt(id)-8,turn,price_attack_cell);
			}
			if (row<8){
				prices_go_cell.push(parseInt(id)+8);
				test_attack(parseInt(id)+8,turn,price_attack_cell);
			}
			if (colum>1){
				prices_go_cell.push(parseInt(id)-1);
				test_attack(parseInt(id)-1,turn,price_attack_cell);
			}
			if (colum<8){
				prices_go_cell.push(parseInt(id)+1);
				test_attack(parseInt(id)+1,turn,price_attack_cell);
			}
			if (row>1 && colum>1){
				prices_go_cell.push(parseInt(id)-8-1);
				test_attack(parseInt(id)-8-1,turn,price_attack_cell);
			}
			if (row<8 && colum>1){
				prices_go_cell.push(parseInt(id)+8-1);
				test_attack(parseInt(id)+8-1,turn,price_attack_cell);
			}
			if (row>1 && colum<8){
				prices_go_cell.push(parseInt(id)-8+1);
				test_attack(parseInt(id)-8+1,turn,price_attack_cell);
			}
			if (row<8 && colum<8){
				prices_go_cell.push(parseInt(id)+8+1);
				test_attack(parseInt(id)+8+1,turn,price_attack_cell);
			}
		}
		//queen black
		if(price==`blackPieces4`)
		{
			for (var i = row-1; i > 0; i--) {
				if (data_price[i*8-(8-colum)]!='none'){
					test_attack(i*8-(8-colum),turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(i*8-(8-colum));
			}
			for (var i = row+1; i <= 8; i++) {
				if (data_price[i*8-(8-colum)]!='none') {
					test_attack(i*8-(8-colum),turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(i*8-(8-colum));
			}
			for (var i = colum+1; i <= 8; i++) {
				if (data_price[(row-1)*8+i]!='none') {
					test_attack((row-1)*8+i,turn,price_attack_cell);
					break;	
				}
				prices_go_cell.push((row-1)*8+i);
			}
			for (var i = colum-1; i > 0; i--) {
				if (data_price[(row-1)*8+i]!='none') {
					test_attack((row-1)*8+i,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push((row-1)*8+i);
			}
			var bishopsCulom = colum;
			var bishopsRow = row;
			for (var i = 1; i <= 8 ; i++)
			{
				bishopsRow--;
				bishopsCulom++;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)-i*7]!='none') 
				{
					test_attack(parseInt(id)-i*7,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)-i*7);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (var i = 1; i <= 8 ; i++)
			{
				bishopsRow--;
				bishopsCulom--;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)-i*9]!='none') 
				{
					test_attack(parseInt(id)-i*9,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)-i*9);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (var i = 1; i <= 8 ; i++)
			{
				bishopsRow++;
				bishopsCulom++;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)+i*9]!='none') 
				{
					test_attack(parseInt(id)+i*9,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)+i*9);
			}
			bishopsCulom = colum;
			bishopsRow = row;
			for (var i = 1; i <= 8 ; i++)
			{
				bishopsRow++;
				bishopsCulom--;
				if (bishopsRow<=0 || bishopsCulom<=0 || bishopsRow>8 || bishopsCulom>8)
					break;
				if (data_price[parseInt(id)+i*7]!='none') 
				{
					test_attack(parseInt(id)+i*7,turn,price_attack_cell);
					break;
				}
				prices_go_cell.push(parseInt(id)+i*7);
			}
		}
	}
	//color
	let price_move = [];
	let price_attack = [];
	for (let i = 0; i < prices_go_cell.length; i++) {
		if($(`.cell_chess[data-id=${prices_go_cell[i]}] div`).attr('data-price')=='none')
		{
			$(`.cell_chess[data-id=${prices_go_cell[i]}]`).css({
				'background-color':'lime'
			})
			price_move.push(prices_go_cell[i]);
		}
	}
	for (var i = 0; i < price_attack_cell.length; i++) {
		$(`.cell_chess[data-id=${price_attack_cell[i]}]`).css({
			'background-color':'red'
		})
		price_attack.push(price_attack_cell[i]);
	}
	let price2 = [[]];
	price2[0] = price_move;
	price2[1] = price_attack;
	return price2;
}
function test_attack(id,turn,price_attack_cell) {
	let color = (turn%2==1?"black":"white")
	if($(`.cell_chess[data-id=${id}] div`).attr('data-color')==color)
		price_attack_cell.push(id);
	return price_attack_cell;
}