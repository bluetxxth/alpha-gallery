<?php
// get the path to the gallery directory
$path = __DIR__ . "/cimage-master/img/me/";

// echo $dirname;

?>
<!doctype html>
<html lang='en' class='no-js'>
<head>
<meta charset='utf-8' />
<title>Alpha Gallery (jQuery-plugin)</title>
<script src="../alpha-gallery/js/vendor/less.min.js"></script>
<link rel='stylesheet' type='text/css' href='../alpha-gallery/stylephp/style.php' />
<!-- <link rel="stylesheet/less" type="text/css" href="style/base.less"> -->

<div class ="row gallery-container">
	<div class='gallery' id = "gallery">
		<div class="row galleryRow">
			<div class='gallery-current' id= "gallery-current">
				<img class = "currentImage" id= "currentImage"/>
			</div>
		</div>
		
	    <div class ="row">
	    	<!-- Current image text -->
      		<div class="current-item-text">test text</div>
      		<div class="current-picture-text"></div>
	    </div>
	    
		<div class="row galleryRow" id ="gallery-row">
			<?php
			$output = null;
			$filecount = null;
			$output .= '<ul class ="gallery-list" id="myList">';
			// test if valid directory
			if (file_exists ( $path)) {
				
				$valid_ext = array("jpg", "gif", "jpeg", "JPG" ,"svg", "bmp", "png"); // valid extensions
			    
				$iterator = new FilesystemIterator($path);
			    
				//iterator for the directory - returns an array
			    $fs = new FilesystemIterator($path);
			    
			    //traverse the array
			    foreach($fs as $file){
			    	$file->isFile() ?  ++$filecount : $filecount;
			    }
			   
			    foreach ($iterator as $fileInfo) { // interator
					if (in_array($fileInfo->getExtension(), $valid_ext) ) { // in $valid_ext
						$imageNames = $fileInfo->getFilename(); // process image
						
						
						$output .= '<li class ="gallery-item">';
						$output .= '<img id="myImage" src1= "../alpha-gallery/cimage-master/img.php?src=me/' . $imageNames . '"/>';
						$output .= '</li>';
				
					}
					
				}
				
				$output .= '</ul>';
			} else {
				$output =  "<div class ='nodir'>no dir found</div>";
			}
		
			echo $output;
			?>
					
		</div>
		
		<div class ="row">
		<div class="options-nav-container" style =  "margin-top: 20px;">
			<ul class ="options-nav" id="options-nav">
			</ul>
		</div>
		</div>
	
		<div class="galleryInfo">
			<?php
			
			echo "Path: " . $path. "<br/>";;
			echo "Path length is: " . strlen($path) . "</br>";
			echo "Gallery Size: " . $filecount; //size of directory with files
			
			?>
		</div>

	</div>
</div>


<!--  <script src="js/jquery-1.11.1.min.js"></script> -->
<script src="js/vendor/jquery.js"></script>
<!-- <script src="js/main.js"></script> -->
<script src="js/alpha-gallery.js"></script>
   <script src="js/vendor/modernizr.js"></script>
