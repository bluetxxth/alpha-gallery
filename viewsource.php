<?php
/**
 * An page to display the sourcecode.
 */
	// Include the essential config-file which also creates the $alpha variable with its defaults.
include(__DIR__ . '/config.php');

// User src/source.php to display the source of the files
$sourceBasedir=__DIR__;
$sourceNoEcho=true;
include(__DIR__."/src/source.php");
$data['style'] = $sourceStyle;

// Create the data array which is to be used in the template file.
$data['title'] = "Show source code";
$data['meta_description'] = "Show source code for all files in the catalogs";
$data['main'] = <<<EOD
  
   <div class ="result">
     {$sourceBody} 
   </div>

EOD;

$data ['javascript'] = <<<EOD

EOD;




// Hand over to the template engine.
include(__DIR__."/theme/template.php"); 