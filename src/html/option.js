$log("Defining HTMLOptionElement");
/* 
* HTMLOptionElement - DOM Level 2
*/
$w.__defineGetter__("HTMLOptionElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLOptionElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLOptionElement.prototype = new HTMLElement;
__extend__(HTMLOptionElement.prototype, {
    get form(){
        var parent = this.parent;
        while(parent.nodeName.toLowerCase() != 'form'){
            parent = parent.parent;
        }
        return parent;
    },
    get defaultSelected(){
        return this.getAttribute('defaultSelected');
    },
    set defaultSelected(value){
        this.setAttribute('defaultSelected',value);
    },
    get text(){
        return this.nodeValue;
    },
    get index(){
        var options = this.parent.childNodes;
        for(var i; i<options.length;i++){
            if(this == options[i])
                return i;
        }
        return -1;
    },
    get disabled(){
        return this.getAttribute('disabled');
    },
    set disabled(value){
        this.setAttribute('disabled',value);
    },
    get label(){
        return this.getAttribute('label');
    },
    set label(value){
        this.setAttribute('label',value);
    },
    get selected(){
        return (this.getAttribute('selected')==='selected');
    },
    set selected(){
        this.setAttribute('selected','selected');
    },
    get value(){
        return this.getAttribute('value');
    },
    set value(value){
        this.setAttribute('value',value);
    }
});

			