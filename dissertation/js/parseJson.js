/** 
 * Class responsible for collecting array of manoeuvre obejcts.
 * This class presents means to parse a JSON file containing manoeuvre break downs, and also to perform
 * and interative search through them using the user's inputs.
 * @name ParseJson
 * @class ParseJson
 * @constructor
 */
define(['jquery', 'component', 'exportImportProjects'], function($, Component, ExportImportProjects) {

    var manoeuvreArray = [{}];
    var spacerArray =[[]];

    /**
     * Parses an external JSON file containing all the intstructions for each manoeuvre, and places this into
     * an array of object, with each object containing the OLAN pre and post-fix, the name and a list of
     * manoeuvrable instructions. Sets these objects to a global array.
     * @name ParseJson#parseManoeuvresFromJSON
     * @function
     *
     */
    function parseManoeuvresFromJSON() {
        $.ajax({
            url: 'json/manoeuvres.json',
            dataType: 'json',
            async: false,
            success: function(json) {
                var catalogue = json["catalogue"];
                var manoeuvres = catalogue["manoeuvre"];
                var postfix = "";
                var count = 0;
                for (var a = 0; a < manoeuvres.length; a++) { // loop through manoeuvre array and get name
                    var manoeuvre = manoeuvres[a];
                    postfix = manoeuvre["_olan"];
                    var varients = manoeuvre["variant"];
                    count = parseManoeuvreVarients(varients, postfix, count);
                }
            }
        });
    }

    /**
     * Takes an array of manoeuvre varients, and adds an entire manoeuvre to the application.
     * For each varient, a name, OALn input and list of instructions to draw the maneouvre is added.
     * @name ParseJson#parseManoeuvreVarients
     * @function
     *
     * @param {Array} varients  Varients of each manoeuvre.
     * @param {String} postfix  The letter of the manoeuvre that follows from each varient.
     * @param {Integer} x  The current number of maneouvres parsed from the JSON file.
     * @returns {Integer} x  The new number of manoeuvres in the application.
     */
    function parseManoeuvreVarients(varients, postfix, x) {
        for (var b = 0; b < varients.length; b++) { // for each varient add this before the name
            var variant = varients[b];
            manoeuvreArray[x] = {};
            manoeuvreArray[x]["olan"] = variant["_olanPrefix"] + postfix;
            var components = parseVarientComponents(variant["component"]);
            manoeuvreArray[x]["components"] = components;
            manoeuvreArray[x++]["name"] = variant["_name"];
        }
        return x;
    }

    /**
     * Creates the array of instructions to construct each maneouvre, and returns this to the application manoeuvre array.
     * Gets each of the individual instructions from the JSON, and then creates a new component object for each.
     * @name ParseJson#parseVarientComponents
     * @function
     *
     * @param {JSON} JsonComps  JSON based component instructions.
     * @returns{Array} components  Array of converted JSON instructions.
     */
    function parseVarientComponents(JsonComps) {
        var components = [];

        for (var c = 0; c < JsonComps.length; c++) { // then go through each component of varient
            var comp = JsonComps[c];
            var pitch = comp["_pitch"];
            var yaw = comp["_yaw"];
            var roll = comp["_roll"];
            var length = parseFloat(comp["_length"]);
            var component = new Component(yaw, pitch, roll, length);
            components[c] = component;
        }
        return components;
    }

    /**
     * Performs regex on the input of the user's input and looks for parameters to
     * indicates the starting place of the next manoeuvre in the array.
     * @name ParseJson#parseSpacer
     * @function
     *
     * @param {String} spacerInput  Entry data from the OLAN box.
     */
    function parseSpacer(spacerInput){
            var regExp = /\(([^)]+)\)/;
            var matches = regExp.exec(spacerInput);
            var spaceParams = [];

            if(matches == null || matches.length != 2)
                return;
            //----------------------------------------
            if(matches[1].indexOf(',') === -1){
                spaceParams[0] = matches[1];
            }
            else {
                spaceParams = matches[1].split(",");
            }
            if(spaceParams.length === 0)
                return;
            //----------------------------------------
            for(var p in spaceParams){
                if(isNaN(spaceParams[p]))
                    return;
            }
            //----------------------------------------
            spacerArray[spacerArray.length]= spaceParams;
    }
    return {

        /**
         * Initial function called on startup of page, sets the manoeuvre list into a global variable accessible throughout
         * use of the site. This means instant access at any time, either using the {@link ParseJson#getManoeuvreArray} or 
         * {@link ParseJson#parseManoeuvreInput} methods.
         * @name ParseJson#init
         * @function
         *
         */
        init: function() {
            parseManoeuvresFromJSON();
        },

        /**
         * A getter function for retreiving the entire list of manoeuvres.
         * @name ParseJson#getManoeuvreArray
         * @function
         * 
         * @returns {Array} manoeuvreArray  Array of manoeuvre objects
         */
        getManoeuvreArray: function() {
            return manoeuvreArray;
        },

        /**
         * When called, parses user input from OLAN box, and searches through array of manoeuvres for OLAN-matching
         * move. Repeats this for all the space seperated notations in the input. 
         * @name ParseJson#parseManoeuvreInput
         * @function
         *
         * @returns {Array} manoeuvreArray  Array of manoeuvre objects
         */
        parseManoeuvreInput: function() {
            var input = $('#input').val();
            ExportImportProjects.exportToLocalStorage(input);
            var moves = input.split(" ");
            var returnMoves = [{}];
            var i = 0;

            for (m in moves) {
                var move = moves[m];
                if (move.indexOf("(") > -1) {
                    parseSpacer(move, returnMoves.length);
                }
                for (var a = 0; a < manoeuvreArray.length; a++) {
                    if (manoeuvreArray[a]["olan"] === move) {
                        returnMoves[i] = manoeuvreArray[a];
                        returnMoves[i]["spacer"] = spacerArray.pop();
                        i++;
                        break;
                    }
                }
            }
            if (Object.keys(returnMoves[0]).length === 0) {
                return [];
            }
            return returnMoves;
        }
    }
});
