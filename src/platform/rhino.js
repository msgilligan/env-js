/*
*	env.rhino.js
*/
var __env__ = {};
(function($env){
    
    //You can emulate different user agents by overriding these after loading env
    $env.appCodeName  = "EnvJS";//eg "Mozilla"
    $env.appName      = "Resig/20070309 BirdDog/0.0.0.1";//eg "Gecko/20070309 Firefox/2.0.0.3"

    //set this to true and see profile/profile.js to select which methods
    //to profile
    $env.profile = false;
    
    $env.debug = function(){};
    
    $env.log = function(){};
    //uncomment this if you want to get some internal log statementes
    $env.log = print;
    $env.log("Initializing Rhino Platform Env");
    
    $env.error = function(msg, e){
        print("ERROR! : " + msg);
        print(e||"");
    };
    
    $env.lineSource = function(e){
        return e.rhinoException?e.rhinoException.lineSource():"(line ?)";
    };
    
    $env.hashCode = function(obj){
        return obj?obj.hashCode().toString():null;
    };
    
    //For Java the window.location object is a java.net.URL
    $env.location = function(path, base){
      var protocol = new RegExp('(^file\:|^http\:|^https\:)');
        var m = protocol.exec(path);
        if(m&&m.length>1){
            return new java.net.URL(path).toString();
        }else if(base){
          return new java.net.URL(base + '/' + path).toString();
        }else{
            //return an absolute url from a relative to the file system
            return new java.io.File( path).toURL().toString();
        }
    };
    
    //For Java the window.timer is created using the java.lang.Thread in combination
    //with the java.lang.Runnable
    $env.timer = function(fn, time){
        //print("wating for timer "+time);
        return new java.lang.Thread(new java.lang.Runnable({
            run: function(){
                while (true){
                    java.lang.Thread.currentThread().sleep(time);
                    //print("calling in timer "+time);
                    fn();
                }
            }
        }));
    };	
    
    //Since we're running in rhino I guess we can safely assume
    //java is 'enabled'.  I'm sure this requires more thought
    //than I've given it here
    $env.javaEnabled = true;	
    
    
    //Used in the XMLHttpRquest implementation to run a
    // request in a seperate thread
    $env.runAsync = function(fn){
        print("running async");
        (new java.lang.Thread(new java.lang.Runnable({
            run: fn
        }))).start();
    };
    
    //Used to write to a local file
    $env.writeToFile = function(text, url){
        print("writing text to url : " + url);
        var out = new java.io.FileWriter( 
            new java.io.File( 
                new java.net.URI(url.toString())));	
        out.write( text, 0, text.length );
        out.flush();
        out.close();
    };
    
    //Used to write to a local file
    $env.writeToTempFile = function(text, suffix){
        print("writing text to temp url : " + suffix);
        // Create temp file.
        var temp = java.io.File.createTempFile("envjs-tmp", suffix);
    
        // Delete temp file when program exits.
        temp.deleteOnExit();
    
        // Write to temp file
        var out = new java.io.FileWriter(temp);
        out.write(text, 0, text.length);
        out.close();
        return $env.location(temp.getAbsolutePath());
    };
    
    //Used to delete a local file
    $env.deleteFile = function(url){
        var file = new java.io.File( new java.net.URI( url ) );
        file["delete"]();
    };
    
    $env.connection = function(xhr, responseHandler){
        var url = java.net.URL(xhr.url);//, $w.location);
      var connection;
        if ( /^file\:/.test(url) ) {
            if ( xhr.method == "PUT" ) {
                var text =  data || "" ;
                $env.writeToFile(text, url);
            } else if ( xhr.method == "DELETE" ) {
                $env.deleteFile(url);
            } else {
                connection = url.openConnection();
                connection.connect();
            }
        } else { 
            connection = url.openConnection();
            connection.setRequestMethod( xhr.method );
            
            // Add headers to Java connection
            for (var header in xhr.headers){
                connection.addRequestProperty(header, xhr.headers[header]);
          }connection.connect();
            
            // Stick the response headers into responseHeaders
            for (var i = 0; ; i++) { 
                var headerName = connection.getHeaderFieldKey(i); 
                var headerValue = connection.getHeaderField(i); 
                if (!headerName && !headerValue) break; 
                if (headerName)
                    xhr.responseHeaders[headerName] = headerValue;
            }
        }
        if(connection){
                xhr.readyState = 4;
                xhr.status = parseInt(connection.responseCode,10) || undefined;
                xhr.statusText = connection.responseMessage || "";
                
                var contentEncoding = connection.getContentEncoding() || "utf-8",
                    stream = (contentEncoding.equalsIgnoreCase("gzip") || contentEncoding.equalsIgnoreCase("decompress") )?
                            new java.util.zip.GZIPInputStream(connection.getInputStream()) :
                            connection.getInputStream(),
                    baos = new java.io.ByteArrayOutputStream(),
                buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024),
                    length,
                    responseXML = null;

                while ((length = stream.read(buffer)) != -1) {
                    baos.write(buffer, 0, length);
                }

                baos.close();
                stream.close();

                xhr.responseText = java.nio.charset.Charset.forName("UTF-8").
                    decode(java.nio.ByteBuffer.wrap(baos.toByteArray())).toString()+"";
                
        }
        if(responseHandler){
          responseHandler();
        }
    };
    
    var htmlDocBuilder = Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance();
    htmlDocBuilder.setNamespaceAware(false);
    htmlDocBuilder.setValidating(false);
    
    $env.parseHTML = function(htmlstring){
        return htmlDocBuilder.newDocumentBuilder().parse(
                  new java.io.ByteArrayInputStream(
                        (new java.lang.String(htmlstring)).getBytes("UTF8")))+"";
    };
    
    var xmlDocBuilder = Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance();
    xmlDocBuilder.setNamespaceAware(true);
    xmlDocBuilder.setValidating(true);
    
    $env.parseXML = function(xmlstring){
        return xmlDocBuilder.newDocumentBuilder().parse(
                  new java.io.ByteArrayInputStream(
                        (new java.lang.String(xmlstring)).getBytes("UTF8")))+"";
    };
    
    
    $env.xpath = function(expression, doc){
    return Packages.javax.xml.xpath.
      XPathFactory.newInstance().newXPath().
        evaluate(expression, doc, javax.xml.xpath.XPathConstants.NODESET);
    };
    
    $env.tmpdir         = java.lang.System.getProperty("java.io.tmpdir"); 
    $env.os_name        = java.lang.System.getProperty("os.name"); 
    $env.os_arch        = java.lang.System.getProperty("os.arch"); 
    $env.os_version     = java.lang.System.getProperty("os.version"); 
    $env.lang           = java.lang.System.getProperty("user.lang"); 
    $env.platform       = "Rhino ";//how do we get the version
    
    $env.safeScript = function(){
      //do nothing  
    };
    
    $env.scriptTypes = {
        "text/javascript"   :false,
        "text/envjs"        :true
    };
    
    $env.loadLocalScript = function(script){
        print("loading script ");
        var types, type, src, i, base;
        try{
            if(script.type){
                types = script.type?script.type.split(";"):[];
                for(i=0;i<types.length;i++){
                    if($env.scriptTypes[types[i]]){
                        if(script.src){
                            print("loading allowed external script :" + script.src);
                            base = "" + window.location;
                            load($env.location(script.src, base.substring(0, base.lastIndexOf("/"))));
                        }else{
                            $env.loadInlineScript(script);
                        }
                    }else{
                        if(!script.src && script.type == "text/javascript"){
                            $env.loadInlineScript(script);
                        }
                    }
                }
            }else{
                //anonymous type and anonymous src means inline
                if(!script.src){
                    $env.loadInlineScript(script);
                }
            }
        }catch(e){
            print("Error loading script.");
            print(e);
        }
    };
    
    $env.loadInlineScript = function(script){
        print("loading inline script :" + script.text);
        var tmpFile = $env.writeToTempFile(script.text, 'js') ;
        $env.writeToFile(script.text, tmpFile);
        print("loading ",tmpFile);
        load(tmpFile);
    };
    
})(__env__);