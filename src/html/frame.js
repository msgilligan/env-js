$log("Defining HTMLFrameElement");
/* 
* HTMLFrameElement - DOM Level 2
*/
$w.__defineGetter__("HTMLFrameElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLFrameElement = function(ownerDocument) {
    //$log("creating frame element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLFrameElement.prototype = new HTMLElement;
__extend__(HTMLFrameElement.prototype, {
    get frameBorder(){
        return this.getAttribute('border')||"";
    },
    set frameBorder(value){
        this.setAttribute('border', value);
    },
    get longDesc(){
        return this.getAttribute('longdesc')||"";
    },
    set longDesc(value){
        this.setAttribute('longdesc', value);
    },
    get marginHeight(){
        return this.getAttribute('marginheight')||"";
    },
    set marginHeight(value){
        this.setAttribute('marginheight', value);
    },
    get marginWidth(){
        return this.getAttribute('marginwidth')||"";
    },
    set marginWidth(value){
        this.setAttribute('marginwidth', value);
    },
    get name(){
        return this.getAttribute('name')||"";
    },
    set name(value){
        this.setAttribute('name', value);
    },
    get noResize(){
        return this.getAttribute('noresize')||"";
    },
    set noResize(value){
        this.setAttribute('noresize', value);
    },
    get scrolling(){
        return this.getAttribute('scrolling')||"";
    },
    set scrolling(value){
        this.setAttribute('scrolling', value);
    },
    get src(){
        return this.getAttribute('src')||"";
    },
    set src(value){
        this.setAttribute('src', value);
    },
    get contentDocument(){
        $log("getting content document for (i)frame");
        if(!this._content){
            this._content = new HTMLDocument($implementation);
            if(this.src.length > 0){
                $log("Loading frame content from " + this.src);
                try{
                    this._content.load(this.src);
                }catch(e){
                    $error("failed to load " + this.src);
                }
            }
        }
        return true;
    }
});

			