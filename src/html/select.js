$log("Defining HTMLSelectElement");
/* 
* HTMLSelectElement - DOM Level 2
*/
$w.__defineGetter__("HTMLSelectElement", function(){
    return function(){
        throw new Error("Object cannot be created in this context");
    };
});

var HTMLSelectElement = function(ownerDocument) {
    //$log("creating anchor element");
    this.HTMLElement = HTMLElement;
    this.HTMLElement(ownerDocument);
};
HTMLSelectElement.prototype = new HTMLElement;
__extend__(HTMLSelectElement.prototype, {
    get type(){
        return this.getAttribute('type');
    },
    get selectedIndex(){
        var options = this.options;
        for(var i=0;i<options.length;i++){
            if(options[i].selected){
                return i;
            }
        };
        return -1;
    },
    set selectedIndex(value){
        this.options[Number(value)].selected = 'selected';
    },
    get value(){
        return this.getAttribute('value')||'';
    },
    set value(value){
        this.setAttribute('value',value);
    },
    get length(){
        return this.options.length;
    },
    get form(){
        var parent = this.parent;
        while(parent.nodeName.toLowerCase() != 'form'){
            parent = parent.parent;
        }
        return parent;
    },
    get options(){
        return this.getElementsByTagName('option');
    },
    get disabled(){
        return (this.getAttribute('disabled')==='disabled');
    },
    set disabled(){
        this.setAttribute('disabled','disabled');
    },
    get multiple(){
        return this.getAttribute('multiple');
    },
    set multiple(value){
        this.setAttribute('multiple',value);
    },
    get name(){
        return this.getAttribute('name')||'';
    },
    set name(value){
        this.setAttribute('name',value);
    },
    get size(){
        return Number(this.getAttribute('size'));
    },
    set size(value){
        this.setAttribute('size',value);
    },
    get tabIndex(){
        return Number(this.getAttribute('tabindex'));
    },
    set tabIndex(value){
        this.setAttribute('tabindex',value);
    },
    add : function(){
        __add__(this);
    },
    remove : function(){
        __remove__(this);
    },
    blur: function(){
        __blur__(this);
    },
    focus: function(){
        __focus__(this);
    }
});

			