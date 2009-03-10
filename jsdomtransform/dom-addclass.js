var svgns = "http://www.w3.org/2000/svg";

function XformMain(xmlDoc)
{
  // Add class="test" to all paths
  paths = xmlDoc.getElementsByTagName("path");
  for (var i = 0; i < paths.length; i++)
  {
     var path = paths[i];
     path.setAttributeNS(svgns, "class", "test");
  }
}
