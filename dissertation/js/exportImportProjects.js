/** 
 * Class for saving and loading manoeuvre strings. Can use local storage as well as allowing inputs from JSON,
 * and exports to JSON/ Local storage.
 * @name exportImportProjects
 * @class exportImportProjects
 * @constructor
 */
define(['htmlHandler', 'utilities'], function(HtmlHandler, Utilites) {
	var movesString = "";
    /**
     * Checks whether local storage is possible in the user's browser, else 
     * storing locally will not work.
     * @name exportImportProjects#checkLocalStoragePermitted
     * @function
     *
     * @returns {Boolean} localStorage  Whether local storage is possible.
     */
    function checkLocalStoragePermitted() {
        if (typeof(Storage) != "undefined")
            return true;
        else
            return false;
    }

    return {
        /**
         * Creates JSON data from the OLAN entry, and then calls to start the JSON file download 
         * in the user's browser.
         * @name exportImportProjects#exportToJSON
         * @function
         *
         * @param {String} manoeuvres  Input from the OLAN box representing the flight
         * @param {this} element  The button which was pressed to initiate the export
         */
        exportToJSON: function(manoeuvres, element) {
            var json = Utilites.convertManoeuvresToJSON(manoeuvres); 
            Utilites.startDownload(json, element);
        },

        /**
         * Uses the provided manoeuvres string to set it to the browser's local storage
         * under the name 'manoeuvres'.
         * @name exportImportProjects#exportToLocalStorage
         * @function
         *
         * @param {String} manoeuvres  Input from the OLAN box representing the flight
         */
        exportToLocalStorage: function(manoeuvres) {
            if (checkLocalStoragePermitted()) {
                localStorage.setItem("manoeuvres", manoeuvres);
            }
        },

        /**
         * Sets the value from the checkbox for auto back-up of input of OLAN from the user, 
         * storing the value in local storage under 'autoload'.
         * @name exportImportProjects#setAutoLoadLocal
         * @function
         *
         * @param {Boolean} autoload  True or false if the browser should auto-remember user input
         */
        setAutoLoadLocal: function(autoLoad) {
            if (checkLocalStoragePermitted()) {
                // Store
                localStorage.setItem("autoLoad", autoLoad);
            }
        },

        /**
         * Takes the file given from the user and gets the JSON data out of it for recieving the saved
         * OLAN input.
         * @name exportImportProjects#importFromJSON
         * @function
         *
         * @param {File} file  The file uploaded from the user
         */
        importFromJSON: function(file) {
            if (file == null)
                return "";
            if (file) {
                var r = new FileReader();
                r.onloadend = function(e) {
                    var contents = e.target.result;
                    obj = JSON.parse(contents);
                    movesString = Utilites.convertJSONToManoeuvres(obj);
                };
                r.readAsText(file);
            }
        },

        /**
         * Getter for returning the imported JSON file's OLAN input.
         * @name exportImportProjects#getJSONImport
         * @function
         *
         * @returns {String} movesString  OLAN Input that was saved.
         */
        getJSONImport: function() {
        	return movesString;
        },

        /**
         * 
         * @name exportImportProjects#importFromLocalStorage
         * @function
         *
         * @returns {String} manoeuvres  OLAN Input string that was saved.
         */
        importFromLocalStorage: function() {
            if (checkLocalStoragePermitted()) {
                // Retrieve
                var manoeuvres = localStorage.getItem("manoeuvres");
                return manoeuvres;
            }
            return "";
        },

        /**
         * 
         * @name exportImportProjects#getAutoLoadLocal
         * @function
         *
         * @returns {Boolean} autoLoad  Gets from the local storage whether auto-load is enabled.
         */
        getAutoLoadLocal: function() {
            if (checkLocalStoragePermitted()) {
                var autoLoad = (localStorage.getItem("autoLoad") === 'true');
                return autoLoad;
            }
            return false;
        }
    }
});
