//// javascript "Pastaboss"  
// JQuery
 const $toggle = $('#nav-button'),
		  $nav = $('#navigation');
	
	$(document).ready(()=>{
		$toggle.on('click', ()=>{
		$nav.slideToggle(400);
		});
		//book
		$('#book-cycle').cycle({fx:'fade'});
		$('#book-cycle').on('click', ()=>{
			window.location.assign('https://www.amazon.com/dp/1691701394');
		});
		//comics
		$('#cycle').cycle({fx:'fade'});
		$('.image1').on('click', ()=>{
			window.location.assign('images/comics/vector1.png');
		});
		$('.image2').on('click', ()=>{
			window.location.assign('images/comics/vector2.png');
		});
		$('.image3').on('click', ()=>{
			window.location.assign('images/comics/vector3.png');
		});
		$('.image4').on('click', ()=>{
			window.location.assign('images/comics/vector4.png');
		});
		$('.image5').on('click', ()=>{
			window.location.assign('images/comics/vector5.png');
		});
		$('.image6').on('click', ()=>{
			window.location.assign('images/comics/vector6.png');
		});
		$('.image7').on('click', ()=>{
			window.location.assign('images/comics/vector7.png');
		});
		$('.image8').on('click', ()=>{
			window.location.assign('images/comics/vector8.png');
		});
		$('.image9').on('click', ()=>{
			window.location.assign('images/comics/vector9.png');
		});
		$('.image10').on('click', ()=>{
			window.location.assign('images/comics/vector10.png');
		});
		$('.image11').on('click', ()=>{
			window.location.assign('images/comics/vector11.png');
		});
		$('.image12').on('click', ()=>{
			window.location.assign('images/comics/vector12.png');
		});
		$('.image13').on('click', ()=>{
			window.location.assign('images/comics/vector13.png');
		});
		$('.image14').on('click', ()=>{
			window.location.assign('images/comics/vector14.png');
		});
		$('.image15').on('click', ()=>{
			window.location.assign('images/comics/vector15.png');
		});
		$('.image16').on('click', ()=>{
			window.location.assign('images/comics/vector16.png');
		});
		$('.image17').on('click', ()=>{
			window.location.assign('images/comics/vector17.png');
		});
		$('.image18').on('click', ()=>{
			window.location.assign('images/comics/vector18.png');
		});
		$('.image19').on('click', ()=>{
			window.location.assign('images/comics/vector19.png');
		});
		$('.image20').on('click', ()=>{
			window.location.assign('images/comics/vector20.png');
		});
		$('.image21').on('click', ()=>{
			window.location.assign('images/comics/vector21.png');
		});
		$('.image22').on('click', ()=>{
			window.location.assign('images/comics/vector22.png');
		});
		$('.image23').on('click', ()=>{
			window.location.assign('images/comics/vector23.png');
		});
		$('.image24').on('click', ()=>{
			window.location.assign('images/comics/vector24.png');
		});
	});



