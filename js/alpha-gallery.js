/**
 * alpha-gallery.js v1.0.0
 * http://www.neoclash.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * @author Gabriel Nieva {@link http://www.neoclash.com}
 * @copyright (c)  Gabriel Nieva  {@link http://www.neoclash.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */


$(document).ready(function(){
	

	
	var myData = [];
	
	
	window.addEventListener('load', function(){	
		 console.log('start serviceEvents');

		}); 

	
	
	var slideshowOn = null;
	var slidePlayOn = null;
	var slideRotate = null;
	var lightboxIntervalOn  = null ;


	(function($){
		
		console.log('alpha-gallery plugin started ');
		
		$.fn.alphaGallery = function(options){
			
			var options;
			
			options = $.extend({}, $.fn.alphaGallery.defaults, options );
			
			//here goes the plugin code - do something with each item
			return this.each(function(){
					
				/*----------------------------------------------------*
				 * 	vars									  *
				 *----------------------------------------------------*/
				/*
				 * gallery
				 */
				var gallery_path = "/cimage-master/img/me/";
				var myGallery = $(this); //the gallery plugin
				var current = myGallery.find('.gallery-current'); //container holing current image
				var current_image =  current.find('img');
				var next = myGallery.find('.gallery-item-text');
				var galleryImages = myGallery.find('img');
				var galleryItemsSelected = myGallery.find('.gallery-item-selected'); 
				var gallery_list = myGallery.find('.gallery-list'); // container holding all images
				var gallery_images = gallery_list.find('img');  // all images in the gallery
				var selected_item = gallery_list.find('.gallery-current selected'); //picture pinned on the gallery
				var gallery_item_text = myGallery.find('.current-item-text');
				var gallery_picture_text = myGallery.find('.current-picture-text');
				var gallery_info_text = myGallery.find('.galleryInfo');
				var myImageArray = getAllImages('myList'); //get all the images
				
				/*
				 * slideshow
				 */
				var zIndex;
				var currentZindex; //the current z-index
				var numberImages =  $('.gallery-list img').length; //get the number of images
				var images = []; //array containing images
				var last_image = numberImages - 1; //current image - last
//				var last_image = (numberImages + last_image - 1) % numberImages;
				var slideInterval = null;//play / pause the slideshow interval
				var lightboxInterval = null;
		    	var myIndex;
		    	var playSlide = document.createElement('li');
		    	var pauseSlide = document.createElement('li');
		    	
		    	
				/*
				 * Lightbox
				 */
				
				var lightbox_width = 658;
				var lightbox_height = 0;
				var lightboxOn = false;
				
				
				/*----------------------------------------------------*
				 * 	Functions										  *
				 *----------------------------------------------------*/
				
				/**
				 * Function set play flags
				 */
				var  setPlayFlags = function(){
					 console.log('setting play flags');
					 slidePlayOn = true;
					 slidePauseOn = false;
					 
					};
				
				/**
				 * Function set pause flags
				 */	
				var setPauseFlags = function (){
				    console.log('setting pause flags');
				    slidePlayOn = false;
			   		slidePauseOn = true;
			   		
			  		}
				
				
				var ev = 0;
				/**
				 * Function rotates lightbox
				 */
				var rotateLightBox = function (){
					
					lightboxIntervalOn = true;
		    
		    		var myCurrentImage = document.getElementById('currentImage');

				    		console.log('rotatingLightbox xxxxx');
				    
				    		ev++;
				  	  
				  	  lightboxInterval = setInterval(function() {
				  		  
				  		  console.log('rotating lightbox');
				    		 
				    		  myIndex = simpleRotate();
				    		  mySrc = myImageArray[myIndex].src
				    		  
  
				    		  var res = []; //holds the path parts
				    		  res = mySrc.split("&"); //tokenize with forward-slash for path & for cimage params			    		 
				    		  
				    		  var newImageString = [];
				    		  for(i = 0; i < res.length; i++){
				    			  
				    			  console.log('res is ' + res[i]);
				    			  
				    			  newImageString[i] = res[i];

				    		  }
				    		  
				    		  $('#lightbox img').attr('src', newImageString[0] + '&width=' + lightbox_width  + '&aspect-ratio=1' + '&heigth=' + 0 );
	    		  
					    		   
				    	 }, 2500); 

				};
				
				var e = 0;
				var rotateSlide = function(){
					
					slideRotate = true;
					
					 e++;//increment event counter
		    		 
		    		 //allow only one instance of the event
		    		 if(e < 2) {
		    			 slideInterval  = setInterval(function() {
				    		 myIndex = simpleRotate();
				    		 $('.gallery-list img')[myIndex].click();
				    		 selectedThumb(myIndex, 'backward');
				    		 
				    		 updateSlideInfo(myIndex);
				    		 
				    	 }, 2000);
		    		 }

				};
				
				
				
				/**
				 * Function gets picture name
				 */
				var getPictureName = function (myIndex){
					
					console.log('my index is ' + myIndex);
					
					mySrc = myImageArray[parseInt(myIndex)].src //get the anchor src url string. 
				    var res = []; //holds the path parts
		    		res = mySrc.split("/"); //tokenize with / to extract part that holds name.
		    		
		    		var myNewString = [];
		    
		    		  for(i = 0; i < res.length; i++){
		    			  
		    			myNewString[i] =  res[i];
		    		  }
		    		 
		    		  lastToken = myNewString.pop();
		    		  
		    		  imageName = lastToken.split('&');
		    		  
//		    		  console.log('last token ' + lastToken);
//		    		  console.log('imageName ' + imageName[0]);
		    		  
		    		  return imageName[0];
				}
			
				

				/**
				 * Function updates slide information text
				 */
				var updateSlideInfo = function (myIndex){
					//update slide info panel
					gallery_picture_text.css({'text-align':'center', 'color':'silver'});
					gallery_picture_text.text('Current Image: ' + '(' + myIndex + '/' + myImageArray.length + ')' + ' ' + getPictureName(myIndex));
					
				}
				
				
				/**
				 * Function removes slide information
				 */
				var removeSlideInfo = function(){
					
					console.log('hiding slide info');
					gallery_picture_text.hide();;

				}
				
				
				/**
				 * Function removes gallery information
				 */
				var removeGalleryInfo = function (){
					console.log('hidding gallery info');
					gallery_info_text.hide();
				}

 
				/**
				 * get highest z-indez of more than one given. 
				 * Usage: getMaxZ($("#layer-1,#layer-2,#layer-3,#layer-4"));
				 */
				 var getMaxZ= function(selector){
				    return Math.max.apply(null, $(selector).map(function(){
				        var z;
				        return isNaN(z = parseInt($(this).css("z-index"), 10)) ? 0 : z;
				    }));
				};
				
				/**
				 * Function to rotate images with z-index
				 */
			    var rotateImagesWithZindex = function(zIndez) {
			    	
//			    	console.log('rotating images');
			    	
			      // Fade out current image and reorder z-index
			      $('#lightbox img')
			        .eq(current_image)
			        .fadeOut('slow', function() {
			        	
			          $(this)
			            .css('z-index', zIndex)
			            .fadeIn(0)
			            .siblings().each(function() {
			              $(this).css('z-index', ((parseInt($(this).css('z-index')) - zIndex + 1) % numberImages + zIndex));
			          });
			        });
			      
			      current_image = (numberImages + current_image - 1) % numberImages;

		
			    };
			
			    
			    /**
			     * Function get all images and returns an array
			     * @return array - array of images
			     */
			    function getAllImages(selector_id){

			    	var mySelector = document.getElementById(selector_id);
			    	var images = mySelector.getElementsByTagName('img'); 
			    	
//			    	console.log('getting all images ');
			    	
			    	return images;
			    }
			      
			    
			    /**
			     * Iterator as an object
			     */
			    function imageIterator (currentImage, last_image, numberImages){
			    	
			    	this.currentImage = currentImage;
			    	this.last_image = last_image;
			    	this.numberImages = numberImages;
			    	
			    }
			
			    imageIterator.prototype = {

			    	previousImage: function( ){
				    	
				    	if(last_image > 0){
				    		
					    	last_image -= 1;
					    	
					    	}else{
					    		last_image = numberImages-1;
					    	}
					    	
					    	console.log('previous current image ' + last_image);
					    	
					    	return last_image;
				    },
			    		
			    	//get next item
			    	nextImage: function (currentImage = null){
				    	
				    	//see if the current image is given
//				    	if(currentImage != null){
//				    		last_image = (numberImages - currentImage) + 1;
//				    	}

				    	if(last_image < numberImages-1 ){

				    		last_image += 1;
				    	}else{
				    	
				    		if(last_image == numberImages-1){
				    			console.log('reached last image');
				    
				    		}
				    		last_image = 0;
				    	}
				    	
				    	console.log('next current image ' + last_image);
				    	return last_image;
				    }
			    	
			    }
			    
			    
			    /**
			     * tokenize image values
			     */
			    var tokenValues=function(direction){
			    	
	                myImageIterator = new imageIterator();
	                
	                if(direction == "forward"){
	                	myIndex =  myImageIterator.nextImage();
	                }else{
	                	myIndex =  myImageIterator.previousImage();
	                }
	                
	                console.log('myIndex ' + myIndex);

				    mySrc = myImageArray[parseInt(myIndex)].src //get the anchor src url string.
				    
				    var res = []; //holds the path parts
		    		  res = mySrc.split("&"); //tokenize with & for cimage params

		    		  var newImageString = [];
		    		  
		    		  for(i = 0; i < res.length; i++){
		    			  
		    			  console.log('res is ' + res[i]);
		    			  
		    			  newImageString[i] = res[i];

		    		  }
				    
		    		  console.log('res ' + newImageString[0]); 
				    var image_params = {
				    		
				    		path: newImageString[0],
				    		index: myIndex
				    }
				    
				    
				    return image_params;
			    }
			    

			    /**
			     * Function simply rotates the index
			     */
			    var simpleRotate = function (){
			    	
//			    	console.log('simple rotate');
				    
				    //get the last image    
				      last_image = (numberImages + last_image - 1) % numberImages;
				      
				      return last_image;
			    };
			    
				var myImageArray = getAllImages('myList'); //get all the images
				
				
				/**
				 * Select thumbnail - When indexes sequential
				 */
				var selectedThumb = function (myIndex, direction){
					
					console.log('width of list ' + $('.gallery-list ').width() / 7);
				
					
					var myLastImage = (numberImages + last_image - 1) % numberImages;
					
					console.log('last image ' + myLastImage);

					if(myIndex > 0 && direction === "forward"){ 

						console.log('scrolling picture list forwards ');
						
						var increment = $('.gallery-list' + myIndex).width() + $('.gallery-list img').width() / 2.5 ; // space between each image
						$('.gallery-list').scrollLeft(myIndex * increment); //works if sequential
						
						//deselect previous
						  $('.gallery-list img')[myIndex-1].style.opacity = "1";
				          $('.gallery-list img')[myIndex-1].style.border = "none";  
					}
					
					if(myIndex > 0 && direction === "backward"){
						
						console.log('scrolling picture list backwards');
						
						var increment = $('.gallery-list' + myIndex).width() + $('.gallery-list img').width() / 2.5 ; //space between each image
						$('.gallery-list').scrollLeft(myIndex * increment); //works if sequential
						
						//deselect previous
						  $('.gallery-list img')[myIndex+1].style.opacity = "1";
				          $('.gallery-list img')[myIndex+1].style.border = "none";
					}
					
					if(myIndex === 0){
						
					}

					
					//Select current
			          $('.gallery-list img')[myIndex].style.backgroundColor  = "rgba(10,10,10,0.5);";
			          $('.gallery-list img')[myIndex].style.border = "1px solid #00ff2a";
					
				};
				
				/*--------------------------------------------------------------
				 * 	Logic
				 -------------------------------------------------------------*/
			    
				if(options.gallery){
					
				   galleryOn = true;
					
//					console.log('gallery enabled');
					
					if(options.hidereel){

						console.log('hiding thumnails');
						
						var thumbnailPics = getAllImages('myList');
						
						//traverse the picture array and hide the list
						for (i = 0; i < thumbnailPics.length; i++){
							thumbnailPics[i].style.display = "none";
						}
						
						$('#gallery-row').hide(); //hide gallery row
					  }
					
					  var galleryInit = function() {
							
						    $('.gallery-list img').each(function() {
						      $(this)
						        .attr('src', $(this).attr('src1') + '&width=9' + $(this).width() + '&heigth=9' + $(this).height() + '&crop-to-fit')
						        .click(function() {
						          if(!current) {
						            current = this;
//						            console.log("Set current.");
						          } else {
						            $(current).toggleClass('selected');
						            current = this;
						          
						          }
						          $(this).toggleClass('selected');
						          
								  //changed so it works with cimage-master		         
						          $('.gallery-current img')
						          		  .attr('src', $(this)
						        		  .attr('src1') + '&width=' + $('.gallery-current')
						        		  .width() + '&aspect-ratio=1' + '&heigth=' + $('.gallery-current')
						        		  .height()
						          		  );
						          		  
//						          console.log("Click on mini image." + current.src);
						          var myIndex;			          
						          //get all images
						          for(i = 0; i < myImageArray.length; i++){
						        	  
						        	  //if one of the images is the current image, select the image
						        	  if(myImageArray[i].src === current.src){
						        		   
						        		  
											var increment = $('.gallery-list' + i).width() + $('.gallery-list img').width() / 2.5 ; //10 would be the space between each image
											$('.gallery-list').scrollLeft(i * increment); //assuming that photoID is always sequential
											
									        //Select current
									         
									          $('.gallery-list img')[i].style.opacity  = "1";
									          $('.gallery-list img')[i].style.backgroundColor = "#000000";
									          $('.gallery-list img')[i].style.border = "1px dashed #00ff2a";
									          
									           myIndex = i;
						        	  }else{
						        		//deselect previous
										  $('.gallery-list img')[i].style.opacity = "0.6";
								          $('.gallery-list img')[i].style.border = "none";  
						        	  } 
						          }
						          
//							        //update slide info panel
									updateSlideInfo(myIndex);

						        });
						      
						    });
						    
//						    $('.gallery-list img').first().trigger('click');
						    $('.gallery-list img')[0].click();
						
						    
						  };
						  galleryInit();    
					
				}//end if
				
		
		    	if(options.slideshow){
		    		
		    		  slideshowOn = true;
		    		  
			    	//create extra optoin nav buttons
			    	var galleryOptions = document.getElementById('options-nav');

			    	playSlide.innerHTML = "Play";
			    	pauseSlide.innerHTML = "Pause";
			    	galleryOptions.appendChild(playSlide);
			    	galleryOptions.appendChild(pauseSlide);		
			    	
			    	 // If gallery is visible use loading msg
			        if(myGallery.is(':visible')){
			        	  gallery_item_text.text('Ready...');
			          }

			    	 playSlide.addEventListener('click', function(event){
			    	
			    		 if(event != null){
			    			slidePlayOn=true;
			    		 }
			    
			    		 console.log('play slide');
			    		 gallery_item_text.text('Playing...'); 
			    		 rotateSlide();
			    		 gallery_picture_text.css({'text-align':'center', 'color':'silver'});
			
			    	  }, false);
			    	 
			    	 
			    	 
			    	 //pause button pauses slideshow
			    	 pauseSlide.addEventListener('click', function(event){
			    		 
			    		 console.log('pause slide');
			    		 
			    		 if(event != null){
			    			slidePlayOn=false;
			    		 }
			    		 
			    		 if(options.lightboxRotate){
			    			 if(slidePlayOn == false){
			    				 clearInterval(lightboxInterval);
			    			 }
			    		 }
			    		
			    		 e=0;//reset eventr counter
			    		 gallery_item_text.text('Paused...');
			    		 clearInterval(slideInterval);
			    	
			    	  }, false);

			    	 
			    	 if(options.lightboxRotate){
							if(slidePlayOn == true ){
								rotateLightBox();
							}
						}
			    	 
				    	//if the autoplay and lightbox options are enabled
				    	if(options.lightboxRotate){	
				    		if(slidePlayOn == false){
//				    			rotateLightBox();
				    		}
				    	}//endif

		    	}//end if
		    	
				//lightbox option
				if(options.lightbox){

					console.log('lightbox option enabled');
					
				
					$('.gallery-current img').click(function(){
			
						var overlay = $("<div id ='overlay'</div> ");
						var lightbox = $("<div id ='lightbox'></div>");

						/**
						 * position the lightbox
						 */
						function positionLightboxImage(){

							if(options.lightboxRotate){
								
								if(slidePlayOn == true){
									pauseSlide.click();
									rotateLightBox();
									slidePlayOn=true;
								}else{
									pauseSlide.click();
									clearInterval(lightboxInterval);
								}
								
							}else{
								pauseSlide.click();
							}
							
							console.log('positioning lightbox image');
							  var top = ($(window).height() - lightbox.height()) / 5;
							  var left = ($(window).width() - lightbox.width()) / 2;
							  lightbox
							    .css({
							      'top': top + $(document).scrollTop(),
							      'left': left
							    })
							    .fadeIn('slow','','');
							  
							  if(options.keyboard){
								// When left arrow key on keyboard is press
						           $(window).keyup(function(event){
						            	
						              if(event.which == 37){
							    		  mySrc = myImageArray[myIndex].src
							    		  var res = []; //holds the path parts
							    		  res = mySrc.split("&"); //tokenize with forward-slash for path & for cimage params			    		 
							    		  
							    		  //make an array for the new string after tokenizing
							    		  var newImageString = [];
							    		  //traverse array
							    		  for(i = 0; i < res.length; i++){
							    			  
							    			  newImageString[i] = res[i];
		
							    		  }
							    		  
							    		  $('#lightbox img').attr('src', newImageString[0] + '&width=' + lightbox_width  + '&aspect-ratio=1' + '&heigth=' + 0 );
				    		  					
						              }//end if event
						           });//end if event
						           
						            // When right arrow key on keyboard is press
						            $(window).keyup(function(event){
						            	
						              if(event.which == 39){
						            	  mySrc = myImageArray[myIndex].src
							    		  var res = []; //holds the path parts
							    		  res = mySrc.split("&"); //tokenize with forward-slash for path & for cimage params			    		 
							    		  
							    		  //make an array for the new string after tokenizing
							    		  var newImageString = [];
							    		  //traverse array
							    		  for(i = 0; i < res.length; i++){
							    			  
							    			  newImageString[i] = res[i];
		
							    		  }
							    		  
							    		  $('#lightbox img').attr('src', newImageString[0] + '&width=' + lightbox_width  + '&aspect-ratio=1' + '&heigth=' + 0 );
				    		  					
										
						              }//end if
						              
						            });

							  	} //endif options
							}//end function
						

						/**
						 * Remove the lightbox
						 */
						function removeLightbox() {
							
							console.log('removing lightbox' + slidePlayOn);

							if(options.lightboxRotate){
								
								if(slidePlayOn == true ){
									clearInterval(lightboxInterval);
									playSlide.click();
								}else{
									pauseSlide.click();
								}
								
							}else{
								playSlide.click();
							}
							
							//remove lightbox
							lightbox.fadeOut('fast' , function(){
								lightbox.remove();
							});
							
							//remove overlay
							overlay.fadeOut('fast', function(){
								overlay.remove();
								
							});
					
							}
						
						var windowHeight = window.innerHeight || $(window).height();
						var windowWidth = window.innerWidth || $(window).width();
						
						
						//display overlay
						 overlay
						.attr('title', 'click to close')
						.animate({'opacity' : '0.85'}, 'slow')
						.appendTo('body');
 
						//create lightbox container
						lightbox
						.hide()
						.appendTo('body');
						
									
						//display the image on load
						$('<img>')
						.attr('src',  $(this).attr('src'))
						//load image
						.load(function(){
//							$('#gallery-current').hide();
//							$('#gallery-row').hide();
							$('.gallery-current').css({'height':'430'});
							positionLightboxImage();
							
						})
						.click( function(){
							 $('.gallery-current').css({'height':'430'});
							removeLightbox();
							
						})
						.appendTo('#lightbox');
					    
						//remove all on click
						overlay.click(function(){
								removeLightbox();
						
						});
										
						console.log('display lighbox');
					});//end if
						

				}//end if
				else{
//					mySrc =  $(this).attr('src');
				}

		        if(options.keyboard){
		        	
		               var myTokens;
		               var path;
		               var myIndex;
 
		            // When left arrow key on keyboard is press
		            $(window).keyup(function(event){
		            	
		              if(event.which == 37){
		                event.preventDefault();
		                console.log("Left Arrow Key - Previous image.");
	
			           myTokens = tokenValues("backward");
			           path = myTokens["path"];  
			           myIndex = myTokens["index"];
			           
				       	$('.currentImage')
					    .prop('src', path + '&width=' + $('.gallery-current').width() + '&aspect-ratio=1' + '&heigth=' + $('.gallery-current').height() );

						selectedThumb(myIndex, 'backward');
						
						//update slide info panel
						updateSlideInfo(myIndex);
			       	
		              }//enf if

		            });
		            
		            // When right arrow key on keyboard is press
		            $(window).keyup(function(event){
		            	
		              if(event.which == 39){
		                event.preventDefault();
		                console.log("Right Arrow Key- Next image.");
		                
		               var myTokens = tokenValues("forward");
		               var path = myTokens["path"];

						$('.currentImage')
						    .prop('src', path + '&width=' + $('.gallery-current').width() + '&aspect-ratio=1' + '&heigth=' + $('.gallery-current').height() );			         

						selectedThumb(myIndex, 'forward');
						
						//update slide info panel
						updateSlideInfo(myIndex);
						
		              }//end if
		              
		            });
		          }
		        
		        //option removes slide information text
		        if (options.hideSlideInfo){
		        	
		        	console.log('hide slider info enabled');
		        	removeSlideInfo();
		        }
		        
		        //option removes gallery information text
		        if(options.hideGalleryInfo){
		        	
		        	console.log('hide gallery info enabled');
		        	removeGalleryInfo();
		        }
		        
			});	
			
		};
		
		//default options
		$.fn.alphaGallery.defaults = {
				gallery: false,
				slideshow: false,
				lightbox: false,
				lightboxRotate:false,
				keyboard:false,
				hidereel:false,
				hideSlideInfo:false,
				hideGalleryInfo:false
		};
		
	})(jQuery);
	

					$('.gallery').alphaGallery({ 
						gallery : true,
						slideshow : true,
						lightbox : true,
						lightboxRotate : true,
						keyboard:true,
						hidereel : false,
						hideSlideInfo:false,
						hideGalleryInfo:false
					});
	
	
	
});