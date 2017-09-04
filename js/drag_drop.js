$(document).ready(function()
{
	
   console.log('gallery admin started');

 
 
 $("#drop-area").on('dragenter', function (e){
  e.preventDefault();
  $(this).css('background', '#BBD5B8');
 });

 
 $("#drop-area").on('dragover', function (e){
  e.preventDefault();
 });

 
 $("#drop-area").on('drop', function (e){
	 $(this).css('background', '#FFFFFF');
  e.preventDefault();
  var image = e.originalEvent.dataTransfer.files;
  createFormData(image);
 });
});


/**
 * Create data
 * @param image
 * @returns
 */
function createFormData(image)
{
 var formImage = new FormData();
 formImage.append('userImage', image[0]);
 uploadFormData(formImage);
}



/**
 * Upload files
 * @param formData
 * @returns
 */
function uploadFormData(formData) {
	
	console.log('drag and drop started ');
	
	$.ajax({
    url: "../alpha-gallery/ajax/file_upload.php",
	type: "POST",
	data: formData,
	contentType:false,
	cache: false,
	processData: false,
	success: function(data){
		$('#drop-area').append(data);
		
		console.log('upload success' + data);
	},
	//check status && error
	 error: function(xhr, status, error) {
		    	  
		        // check status && error
		     	  console.log(xhr);
		    	  console.log(status);
		    	  console.log( error);
		     }
});
}


/**
 * Function to reorder images on the fly. @TODO functionality to be completed
 */
function reorderFiles(){
	
    $('.reorder_link').on('click',function(){
        $("ul.reorder-photos-list").sortable({ tolerance: 'pointer' });
        $('.reorder_link').html('save reordering');
        $('.reorder_link').attr("id","save_reorder");
        $('#reorder-helper').slideDown('slow');
        $('.image_link').attr("href","javascript:void(0);");
        $('.image_link').css("cursor","move");
        $("#save_reorder").click(function( e ){
            if( !$("#save_reorder i").length ){
                $(this).html('').prepend('<img src="images/refresh-animated.gif"/>');
                $("ul.reorder-photos-list").sortable('destroy');
                $("#reorder-helper").html( "Reordering Photos - This could take a moment. Please don't navigate away from this page." ).removeClass('light_box').addClass('notice notice_error');
    
                var h = [];
                $("ul.reorder-photos-list li").each(function() {  h.push($(this).attr('id').substr(9));  });
                
                $.ajax({
                    type: "POST",
                    url: "orderUpdate.php",
                    data: {ids: " " + h + ""},
                    success: function(){
                        window.location.reload();
                    }
                }); 
                return false;
            }   
            e.preventDefault();     
        });
    });
}
