<?php
/*
 * Bootstrapping functions, essential and needed for Alpha to work together with some common helpers. 
 *
 */
 

/**
 * Enable auto-load of class declarations.
 */
function autoloader($aClassName) {

  $classFile = "/src/{$aClassName}/{$aClassName}.php";
  
	$file1 = ALPHA_CLASS_PATH . $classFile;
// 	echo "file 1" . $file1 . "</br>";
	
	$file2 = ALPHA_INSTALL_PATH . $classFile;
// 	echo "file 2" . $file2 . "</br>";
	
	if(is_file($file1)) {
		require_once($file1);
	} elseif(is_file($file2)) {
		require_once($file2);
	}else{
		throw new Exception("Classfile '{$aClassName}' does not exists.");
	}
}

//auto load function above
spl_autoload_register('autoloader');


/**
 * Set a default exception handler and enable logging in it.
 */
function exceptionHandler($e) {
  echo "Alpha: Uncaught exception: <p>" . $e->getMessage() . "</p><pre>" . $e->getTraceAsString(), "</pre>";
}
set_exception_handler('exceptionHandler');

