<?php
// echo sys_get_temp_dir (  ); //display the where the phptmp folder is
// echo "file Namexxx: " . $_FILES['userImage']['name'] ; //display user image name
// echo "temp files: " . $_FILES['userImage']['tmp_name']; //display tmp image name
// echo ini_get ("upload_max_filesize");
// echo "max execution time " . ini_get('max_execution_time');
if(is_array($_FILES))
{
	uploadFiles();
}


function uploadFiles(){
	
	if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
		// 		echo "files were uploaded to the tmp folder";
		$sourcePath = $_FILES['userImage']['tmp_name'];
		
		/*
		 * Noted by Gabriel Nieva
		 * For this below:
		 * Don't use relative pathnames
		 * Ensure your post_max_size is greater than your upload_file_size and that
		 * your memory_limit is greater than the post_max_size (the default memory limit is 128MB)
		 * ensure the fcgi.conf is configured with this line FcgidMaxRequestLen 1073741824 if enabled.
		 */
		$targetPath = $_SERVER['DOCUMENT_ROOT'] . "/alpha-gallery/cimage-master/img/me/". $_FILES['userImage']['name'];
		
		if(move_uploaded_file($sourcePath, $targetPath)) {
			?>
   <img src="<?php // echo $targetPath; ?>">
   <?php
   exit();
  }
}
}

// function createTables(){
	
// 	$query = "CREATE TABLE `images` (
//  `id` int(11) NOT NULL AUTO_INCREMENT,
//  `img_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
//  `img_order` int(5) NOT NULL DEFAULT '0',
//  `created` datetime NOT NULL,
//  `modified` datetime NOT NULL,
//  `status` enum('1','0') COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
//  PRIMARY KEY (`id`)
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;";
			
// 	$params = array($id, $image_name, $image_order, $status, $created, $modified );
			
// 	$query = "CREATE TABLE `images` ();";
	
	
// }


// /**
//  * Function uploads files to folder
//  */
// function fileUpload(){
	
// 	$image_path = "";
	
// 	if(is_array($_FILES))
// 	{
// 		if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
// 			$sourcePath = $_FILES['userImage']['tmp_name'];
// 			$targetPath = "images/".$_FILES['userImage']['name'];
// 			if(move_uploaded_file($sourcePath,$targetPath)) {
// 				?>
   <img src="<?php echo $targetPath; ?>">
   <?php
//    exit();
//   }
//  }
// }
// }


// /**
//  * Function get images from the image table
//  * @return boolean
//  */
// function getRows($imageTable){
	
// 	$query = $this->db->query("SELECT * FROM ".$imageTable." ORDER BY img_order ASC");
// 	if($query->num_rows > 0){
// 		while($row = $query->fetch_assoc()){
// 			$result[] = $row;
// 		}
// 	}else{
// 		$result = FALSE;
// 	}
// 	return $result;
// }


// /**
//  * Function update order
//  * @param unknown $id_array
//  * @return boolean
//  */
// function updateOrder($id_array){
// 	$count = 1;
// 	foreach ($id_array as $id){
// 		$update = $this->db->query("UPDATE ".$this->imgTbl." SET img_order = $count WHERE id = $id");
// 		$count ++;
// 	}
// 	return TRUE;
// }


