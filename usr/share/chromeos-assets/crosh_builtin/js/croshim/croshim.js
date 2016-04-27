var croshim = (function(split){

    function Croshim(){
        var _this = this;

        (function(_this){
            var $this = _this;                
            $this.init(function(croshim){
                $this = croshim.extend($this, croshim.__constructor());
                return $this;
            });
        })(_this);
    }

    Croshim.prototype = {
        init: function(callback){
            var $this = {
                __constructor: function(){
                    var pane = $this.newpane();
                    var iframe = pane.getElementsByTagName('iframe')[0];

                    document.body.appendChild(pane);
                    split(["#"+pane.id], {
                        direction: 'horizontal'
                    });

                    var checkExist = setInterval(function(){
                        var terminal = iframe.contentWindow.document.getElementsByTagName('iframe');

                        if(terminal.length){
                            setTimeout(function(){
                                var _terminal = terminal[0].contentWindow.document.getElementsByTagName('x-screen')[0];
                                _terminal.style.overflowY = "hidden";

                                $this.keycommands(pane);
                            }, 100);
                            clearInterval(checkExist);
                        }
                    }, 10);
                },

                appendPane: function(parent){
                    var content = parent.childNodes;
                        //content = content[0].cloneNode(true);

                    //parent.removeChild(parent.firstChild);
    
                    var pane = document.createElement("div");
                        pane.id = $this.uuid();
                        pane.className = "split";

                    pane.appendChild(content[0]);
                    parent.appendChild(pane);

                    return pane;
                },

                extend: function(defaults, options){
                    var extended = {};
                    var prop;
                    for (prop in defaults) {
                        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                            extended[prop] = defaults[prop];
                        }
                    }

                    for (prop in options) {
                        if (Object.prototype.hasOwnProperty.call(options, prop)) {
                            extended[prop] = options[prop];
                        }
                    }

                    return extended;
                },

                newpane: function(){
                    var pane = document.createElement("div");
                        pane.id = $this.uuid();
                        pane.className = "split";

                    var iframe = document.createElement("iframe");
                        iframe.src = "../html/crosh.html";
                
                    pane.appendChild(iframe); 
                    return pane;    
                },

                uuid: function(){
                    var _id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });

                    return "croshim-"+_id;
                },

                keycommands: function(pane){
                    var _pane = pane;
                    var _iframe = pane.getElementsByTagName('iframe')[0];
                    var _terminal = _iframe.contentWindow.document.getElementsByTagName('iframe');
                    var _xscreen = _terminal[0].contentWindow.document.getElementsByTagName('x-screen')[0];

                    _xscreen.addEventListener('keyup', function(event){
                        var key = event.which;
                        var shift = event.shiftKey;
                        var ctrl = event.ctrlKey;
                        var alt = event.altKey;
                        var O = 79;

                        if(shift && ctrl && O == key){
                            $this.appendPane(_pane);
                        }
                    });
                }
            }

            return callback && typeof(callback) === 'function' ? callback($this) : $this;
        }
    }

    window.onload = function(){ return new Croshim(); };
})(Split);
