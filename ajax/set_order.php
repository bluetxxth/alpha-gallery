<?php

// get the list of items id separated by coma (,)
$list_order = $_POST['list_order'];

 //--------------------------------------------------------------------------
  // 1) DB info
  //--------------------------------------------------------------------------
  
	// Database credentials
	if (file_exists ( __DIR__ . '/conf/site/data/dbconfig.php' )) {
				
			// echo "file exists ";
		include (__DIR__ . '/conf/site/data/dbconfig.php');
	
	} else {
		echo "file not found";
	}		
	 
		
	//--------------------------------------------------------------------------
	// 2) Connection
	//--------------------------------------------------------------------------
	//   $mysqli = new mysqli($host,$user,$pass,$dbname);
	
	$dsn = 'mysql:host=' . $host . ';dbname=' . $dbname;
	$options = array(
			PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
	);
	$db = new PDO($dsn, $user, $pass, $options);
	
	//--------------------------------------------------------------------------
	// 3) Query database for data
	//--------------------------------------------------------------------------
	
	//MSQLi
	//   $query = "SELECT * FROM ppty WHERE property_id =".$id.";"
	//   		$result = $mysqli->query($query, MYSQLI_STORE_RESULT);          //query
	//   $array = mysqli_fetch_row($result);                          //fetch result
	
	$list = explode(',' , $list_order);
	
	foreach ($list as $key => $id){
		
		//PDO root / rexi3079
		try {
			//prepare query
			$sql = "UPDATE items SET item_order = :item_order WHERE id = :id" ;
			// because you are passed untrusted data, use prepared statement
			$stmt = $db->prepare($sql);
			//pass parameters
// 			$params = array($myId);
			
			//bind parameters to variable
			$query->bindParam(':item_order', $key, PDO::PARAM_INT);
			$query->bindParam(':id', $id, PDO::PARAM_INT);

			//execute
			$stmt->execute($params);
			// set the results (array of objects) as your JSON response
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
	
		} catch(PDOException $e){
			echo $e->getMessage();
		}
	}
	
	
	

//   echo  print_r($data);
  header('Content-Type: application/json');
  echo json_encode($data);
