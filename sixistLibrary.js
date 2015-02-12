// sixistLibrary.js

var sixistLibrary = {};

/*
    @function GetXMLHTTPRequest: Get XMLHTTPRequest object
*/
sixistLibrary.GetXMLHTTPRequest = function () {
    try {
        var is_chrome = window.chrome;
		
		if (!window.chrome && 
		    location.protocol == "file:") {
            throw (e);
        }
        return new XMLHttpRequest();
    }
    catch (e) {
        try {
            return new ActiveXObject("MSXML2.XMLHTTP");
        }
        catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                return "Your browser is too ancient.";
            }
        }        
    }
};


/*
    @function replaceAll: replace all instances of find with replace in str
    @param find
    @param replace
    @param str
*/
sixistLibrary.replaceAll = function (find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
};

