//
// JSDomTransform.js
//

if (arguments.length < 3) {
  print("wrong number of arguments, usage: JSDomTransform.js script.js infile outfile [env.js]");
  quit();
}

// Note: scriptFile must contain main function named XformMain(doc) that takes an xml doc

var scriptFile = arguments[0];
var inFile = arguments[1];
var outFile = arguments[2];
var envJSFile = '../dist/env.rhino.js';
var htmlFile = 'empty.html';

if (arguments.length == 4)
{
  envJSFile = arguments[3];
}

load(envJSFile);
load(scriptFile);

print("JSDomTransform: transforming " + inFile + " to " + outFile + " using " + scriptFile);

window.onload = function() {
  // Load the XML document to process with XMLHttpRequest()
  var inReq = new XMLHttpRequest();
  inReq.open("GET", inFile);
	inReq.onreadystatechange = function() {
      var inDoc = inReq.responseXML;
      
      var outString = inDoc.documentElement.xml;
      if(outString === undefined)
      {
         outString = inDoc.documentElement.outerHTML;
      }
//      print("Loaded doc is: " + outString);

      XformMain(inDoc);
      
      // Serialize the DOM using a "PUT" to a file

      outString = inDoc.documentElement.xml;
      if(outString === undefined)
      {
         outString = inDoc.documentElement.outerHTML;
      }
//      print("Output doc is: " + outString);

      var out = new XMLHttpRequest();
      out.open("PUT", outFile, false);
      out.send( outString );

		};
  inReq.send(null);
  
};

window.location = htmlFile;   // Could be any HTML file
