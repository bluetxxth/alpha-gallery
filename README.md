Alpha Gallery, a jQuery / Javascript-plugin 
==================================================

Alpha Gallery is built with Javascript, JQuery and PHP on top of a lightweight framework which allows it to be extended with database functionality.


By Gabriel Nieva, bluetxxth@neoclash.com


Use of external libraries
-----------------------------------

The following external modules are included

### jQuery
* Homepage: http://jquery.com/
* Version: jQuery v1.11.1 minimized
* License: MIT license - jquery.org/license

### stylephp
* Homepage: https://github.com/mosbth/stylephp
* Version: release 1.0.0
* Licence: MIT license - jquery.org/license

### Less - Leaner CSS
* Homepage: http://lesscss.org
* Version: v1.6.2 
* Licence: Licenced under the Apache v2 Licence. 

### Modernizr
*Homepage: https://modernizr.com/
*Version: Modernizr 2.8.3 (Custom Build)
*License:  MIT & BSD

### Cimage
* Homepage: https://github.com/mosbth/cimage
* Version: v0.7.19
* Licence: MIT licence

Considerations
----------------------
The gallery is developed on top of a lightweight framework which can be enhanced with database functionality. This plugin is coded with a mixture of plain JavaScript and JQuery. Since the code is packaged as a JQuery plugin the code can be used as a plugin or as a ready to go gallery. 

It is important to consider  that when this code is used strictly as a plugin without the framework, you will need the following files:

**In the JS folder of the framework (/alpha-gallery/js):**
* alpha-gallery.js
* drag_drop.js

**In the ajax folder of the framework (/alpha-gallery/ajax):**
* file_upload.php

Note: This file is called by ajax. If you skip this file it will no longer have the drag and drop functionality of its admin-panel available and any picture will have to be uploaded manually.

**The style sheet located in (/alpha-gallery/stylephp):**
* the whole of the stylephp folder

**The script located in the index.php file (/alpha-gallery/index.php)**
This file has the dom structure necessary for the plugin to funciton. The PHP facilitates automation of certain tasks such as searching for pictures in the folder and evaluating valid image formats and displaying many pictures.

* You have two alternatives:

1. Copy and paste the code from the index.php file to your project.
2. Use an html structure similar to the following:

````html

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
			<ul class ="gallery-list" id="myList">
				<li class ="gallery-item">
					<imgid="myImage"src1="../alpha-gallery/cimage-master/img.php?src=me/test1.jpg"/>
					<img id="myImage" src1="../alpha-gallery/cimage-master/img.php?src=me/test2.jpg"/>
					<img id="myImage" src1="../alpha-gallery/cimage-master/img.php?src=me/test3.jpg"/>
				</li>						
			</ul>	
		</div>
		<div class ="row">
		<div class="options-nav-container" style =  "margin-top: 20px;">
			<ul class ="options-nav" id="options-nav">
			</ul>
		</div>
		</div>
	</div>
</div>

````

*Note:

In order to use the code as a plugin it is necessary to preserve the dom structure of the index.php page i.e. the HTML tags must be the same. If you do this the plugin will work

If you proceed without the php script you will lose some functionality such as the debuging helper which shows path and picture count at the bottom of the gallery and the text showing the slide count and the picture name.

Main features in this version:
------------------------------------

**The gallery / plugin functionality is as follows:**
* gallery - This is the main feature and it must be always on for the gallery / plugin to work.
* slideshow - Provides for automated slideshow
* lightbox - to visualize the picture ina larger format
* lightbox picture rotation - Automatically rotates the lightbox picture
* keyboard - Allows keyboard control
* hideReel - Conceal reel (thumbnail list).


Additional features in this version:
--------------------------------------
* HTML5 Drag and drop
* cimage: external library
* twitter bootstrap
* stylephp
* less


Install instructions
---------------------------
* Clone or upload
* CHMod 777 the following:

**cimage-master:**
* inside the cimage-master folder CHMOD 777 the cache folder 

* Inside the cimage-master/img, create a folder where you will be placing your images, for example "me" and give it 777 access rights. Cimage will grab images in this folder and place them inside the cache folder.

**less and stylephp**
CHMOD 777 the stylephp folder, it will create style.less.cache file
Visit https://github.com/mosbth/stylephp for more details

Note: If you need to further adjust the path of the gallery you might want to do so at the top of file: index.php.


* The plugin is initialized as follows:

```javascript
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
```


* Refer back to the html structure in the considerations section for the HTML tags which you will need for the plugin to work.

Picture upload
-------------------
* You might need to adjust the path where the gallery pictures are saved. This is done in the target path variable in file_upload.php 
* After you have verified the steps above, navigate to www.yourdomain.com/gallery/admin.php and drag and drop pictures in the square.


Functionality
------------------

* **Slideshow**
In order for the plugin to work the main feature gallery must be turned on. If the slideshow is turned on then a panel with two buttons, play and pause,  will appear on the header. These buttons allow to pause and resume playing a slideshow when activated. Essentially the slideshow automatically passes the pictures showed in the reel below. If the slideshow is not activated then the  slideshow buttons on the header will disappear and passing the pictures automatically will not be possible. The same true for the lightbox. Once slideshow is set to false then the lightbox will work but not the auto rotating feature, even if the lightboxRotate feature is set to true.

* **Lightbox**
If the lightbox feature is set to true and then the main picture will be enlarged and displayed on a lightbox upon clicking it. Clicking again will set the picture to normal size and remove the lightbox mode.

* **Lightbox rotation**
If the lightboxRotate function is set to true, it allows for the lightbox to rotate when the slideshow is activated. For this to work the slideshow mode must be set to true.

* **Keyboard option**
If the keyboard option is set to true then the keyboard can be used to pass the pictures both in slide mode and in lightbox 
mode back and forwards.

* **Picture Reel**
thumbnails of the pictures in the gallery are shown in a scrollable reel at the bottom of the main picture. This reel scrolls automatically and marks the picture which is being visualized with a fluorescent green border frame.

When the slide option is set to true and activated by clicking the play button then the Picture reel scrolls automatically to point to which picture is being visualized.The reel works in such a way that the closer to the end of the series the closer to 
the right and when closer to the beginning of the series the more to the left. The algorithm employed in for automatically scrolling the reel in the selectedThumb function works well for sequential pictures. A different approach, however has been taken to select the pictures arbitrarily i.e. by mouse click.

When the slideshow is deactivated or set to paused then the reel scrolls as we click on each picture left and right. If we click closer to the right then the reel will scroll right if the image clicked is on the left then it will scroll left. The reel also scrolls when passing the pictures with the keyboard arrow buttons.

For the reel to function the hide reel option must be set to false I the plugin. If the hide reel option is set to false the reel will be disabled.

**hideSlideInfo**
Hides the slider information text i.e. current image data and image name

**hideGalleryInfo**
Hides gallery information text at the bottom of the reel


**Test on a working example**
http://www.student.bth.se/~gani13/phpjavascript/alpha-gallery/index.php 


Versioning History
-----------------------------------

v0.01(2017-09-2)

* First release on Github.


Authors
---------------------------
Gabriel Nieva


Licence
------------------

This project is licenced under the MIT Licence:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Copyright
-----------------------
(c) 2016 Gabriel Nieva, bluetxxth@neoclash.com

