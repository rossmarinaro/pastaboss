//// javascript "Pastaboss"  
// JQuery
 const $toggle = $('#nav-button'),
		  $nav = $('#navigation');
	
	$(document).ready(()=>{
		$toggle.on('click', ()=>{
		$nav.slideToggle(400);
		});
		$('#cycle').cycle({fx:'fade'});
	});



