/** 
 * Class that contstructs the tube and tube mesh from the array of manoeuvres parsed from user input.
 * the {@link ManoeuvreController#addTube} method loops through the OLAN moves entererd, and breaks these
 * down to their instructions, and creates an overall tube. This class is a subclass of {@link AnimationController}.
 * @name ManoeuvreController
 * @class ManoeuvreController
 * @constructor
 */
define(['htmlHandler'],function(HtmlHandler) {
    var tube = [];
    var tubeMesh = [];
    /**
     * Creates an object that represents a 3D model of a manoeuvre. Creates a mesh based on colour, and adds
     * this to the scene (parent).
     * @name ManoeuvreController#addGeometry
     * @function
     *
     * @param {TubeGeometry} geometry  Geometry of a move, used to build up the tube
     * @param {Hex} colour  Hexadecimal colour code
     * @param {Parent} parent  The parent object containing all the manoeuvres and cameras
     */
    function addGeometry(geometry, color, parent) {
        var i = tubeMesh.length;
        tubeMesh[i] = new THREE.SceneUtils.createMultiMaterialObject(geometry, [
            new THREE.MeshLambertMaterial({
                color: color
            }),
            new THREE.MeshBasicMaterial({
                color: 0x000000,
                opacity: 0.3,
                wireframe: true,
                transparent: true
            })
        ]);
        parent.add(tubeMesh[i]);
        scale = parseInt($('#scale').val());
        tubeMesh[i].scale.set(scale, scale, scale);
    }

    /**
     * Used when refreshing the scene, is called to clear the arrays of the manoeuvre tubes and also
     * remove them from the parent. This is done to stop repeated moves when adding new ones.
     * @name ManoeuvreController#removeTubes
     * @function
     *
     * @param {Parent} parent  The parent object containing all the manoeuvres and cameras
     */
    function removeTubes(parent) {
        for (var a = 0; a < tubeMesh.length; a++) {
            if (tubeMesh[a] !== undefined)
                parent.remove(tubeMesh[a]);
        }
        tube = [];
        tubeMesh = [];
    }

    /**
     * Adds the tube and tubemesh to the parent based on parameters given. Also checks to see if the tube
     * should be invisible if the user wishes so. Assigns both the tube and tubemesh to their respective
     * arrays.
     * @name ManoeuvreController#createTube
     * @function
     *
     * @param {Parent} extrudePath  The curve created based on the array of manoeuvre vectors
     * @param {Parent} segments  Defines the smoothness of the cuvre when adding the the parent
     * @param {Parent} radiusSegments  How many sides the tube mesh should have, 2 would be a ribbon, 4
     * a cuboid etc.
     * @param {Parent} parent  The parent object containing all the manoeuvres and cameras
     */
    function createTube(extrudePath, segments, radiusSegments, parent) {
        var newTube = new THREE.TubeGeometry(extrudePath, segments, 2, radiusSegments, false);
        if(radiusSegments > 0)
            addGeometry(newTube, 0xff00ff, parent);
        tube[tube.length] = newTube;
    }

    /**
     * The method for recalcuating the vector based on the next set of
     * instructions from the JSON file. Does this by creating an euler,
     * which means pitch, roll and yaw can all be done in one.
     * @name ManoeuvreController#calculateVector
     * @function
     *
     * @param {Vector} vector  The current vector to be changed
     * @param {Integer} pitch  Negative or positive pitch to be added
     * @param {Integer} roll  Negative or positive roll to be added
     * @param {Integer} yaw  Negative or positive yaw to be added
     * @param {Integer} length  Length of the manoeuvre after translation
     */
    function calculateVector(vector, pitch, roll, yaw, length) {
        var pitchAngle = Math.PI / 180 * 15 * pitch;
        var yawAngle = Math.PI / 180 * 15 * yaw;
        var rollAngle = Math.PI / 180 * 15 * roll;
        var a = new THREE.Euler( pitchAngle, rollAngle, yawAngle, 'XYZ' );
        vector.applyEuler(a);
        vector.setZ(vector.z + length);
    }

    /**
     * Function for creating the vectors for spacers entered by the user. Gets the 
     * amount of X and Y to move the next vector by, in order to create a virtual 'spacer'.
     * @name ManoeuvreController#calculateSpacer
     * @function
     *
     * @param {Array} spacer  An array containing the amount to move the proceeding vector by in X and Y.
     * @param {Array} linePoints  Array of current vectors for the manoeuvre.
     */
    function calculateSpacer(spacer, linePoints) {
        if (spacer != null){    
            var spacerVector = new THREE.Vector3(0, 0, 0);

            if (linePoints.length > 0)
                spacerVector = linePoints[linePoints.length - 1].clone();                
            spacerVector.add(new THREE.Vector3(0, parseInt(spacer[1]), parseInt(spacer[0])));
            linePoints.push(spacerVector);
        }
    }

    /**
     * Method for checking if any points along the manoeuvre are negative, or below the ground level.
     * If so, true is returned, and then used to show the GUI warning pop up to the user.
     * @name ManoeuvreController#checkWarning
     * @function
     *
     * @param {SplineCurve3} extrudePath  The current spline cuvre representing the manoeuvre.
     * @return {Boolean} bool  Whether the manoeuvre triggers the warning of negative values.
     */
    function checkWarning(extrudePath) {
        for(var p in extrudePath.points){
            var point = extrudePath.points[p];
            if(point.x < 0 || point.y < 0 ){
                return true
            }
        }
        return false;
    }

    return {
        /**
         * The getter for the array of tubes created based on the manoeuvres.
         * @name ManoeuvreController#getTube
         * @function
         *
         * @returns {Array} tube  Array of tubes to move the aeroplace along
         */
        getTube: function() {
            return tube;
        },
        /**
         * The getter for the array of tube meshes created based on the manoeuvres.
         * @name ManoeuvreController#getTubeMesh
         * @function
         *
         * @returns {Array} tubeMesh  An array of meshes to be drawn on the canvas representing
         * manoeuvres
         */
        getTubeMesh: function() {
            return tubeMesh;
        },

        /**
         * Function responsible for creating geometry lines based on an array of instructions. Combines this with
         * interopobility to smooth out edges. Gets parameters from GUI options to set segment/ radius sengment amounts.
         * Creates geometry and then passes to tube constructor.
         * @name ManoeuvreController#addTube
         * @function
         *
         * @param {Array} values  Array of objects represting a move, containing name, description and instructions
         * @param {Parent} parent  The parent object containing all the manoeuvres and cameras
         */
        addTube: function(values, parent) {
            var warn = false;
            var segments = parseInt($('#segments').val());
            var closed2 = $('#closed').is(':checked');
            var radiusSegments = parseInt($('#radiusSegments').val());
            var linePoints = [new THREE.Vector3(0,0,0)];
            removeTubes(parent);

            for (m in values) {
                    var components = values[m]["components"];
                    var prevVector = calculateSpacer(values[m]["spacer"], linePoints)
                
                for (var i = 0; i < components.length; i++) {
                    var component = components[i];
                    var yaw = -component.YAW;
                    var pitch = -component.PITCH;
                    var roll = -component.ROLL;
                    var length = component.LENGTH * 10;
                    var prevVector = new THREE.Vector3(0, 0, 0);

                    if (linePoints.length > 0){
                        prevVector = linePoints[linePoints.length - 1].clone();
                    }
                        var before = prevVector.clone();
                        calculateVector(prevVector, pitch, roll, yaw, length)
                        linePoints.push(prevVector);   
                }
                var extrudePath = new THREE.SplineCurve3(linePoints);
                warn = checkWarning(extrudePath);
                createTube(extrudePath, segments, radiusSegments, parent);
                linePoints = [];
                linePoints.push(prevVector);
            }
            HtmlHandler.warnManoeuvres(warn);
        },

        /**
         * Public method for emptying the tubes object, for refreshing the scene.
         * @name ManoeuvreController#removeTube
         * @function
         *
         * @param {Parent} Parent  Holds all the objects on the scene.
         */
        removeTube: function(parent) {
            removeTubes(parent);
        }
    }
});
