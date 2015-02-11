	/*
	* Function to create the main menu. Tells system game is not in play
	* and clears canvas. Draws the menu image and continues after it
	* has loaded. Uses the controls div in HTML to draw button links to
	* other states in the menu.
	*/
	 function menu() {
	     in_game = false;
	     paused = false;
	     document.getElementById("text").innerHTML = "<br>";
	     document.getElementById("moves").innerHTML = "";
	     canvas = document.getElementById("canvas"); //create canvas
	     ctx = canvas.getContext("2d"); //declare 2d
	     clear(); //refresh canvas
	     Map = new Image();
	     Map.src = "images/menu2.jpg";
	     Map.onload = function () {
	         ctx.drawImage(Map, 0, -2, 300, 200);
	         document.getElementById("pause_area").innerHTML = '';
	         document.getElementById("controls").innerHTML = ['<table>',
	                 '<p>',
	                 '<br>',
	                 '<button type="submit" class="play_button" onclick="level_select()">Play Game</button>',
	                 '<br><br><br>',
	                 '<button type="submit" class="other_button" onclick="achieve()">Achievements</button>',
	                 '<button type="submit" class="other_button" onclick="settings()">Settings</button>',
	                 '<br><br>',
	                 '<button type="submit" class="other_button" onclick="instr()">Instructions</button>',
	                 '</p>'
	         ].join('\n');
	     }
	     a.play();
	     a.loop = true;
	     b.pause();
	 }

	/*
	* Menu function for the level selection. Loads up the array of levels,
	* and sets the image required for each level in another array. Depending
	* on if a level has status of being perfectly completed, unlocked, locked
	* or completed will affect each level_click array value. If not availible,
	* image shows as 'l' and link is an empty string.
	*/
	 function level_select() {
	     in_game = false;
	     paused = false;
	     var level_select = new Array();
	     var level_click = new Array();
	     for (var i = 0; i < 10; i++) {
	         if (perfectLevels[i] == 1) {
	             level_select[i] = "s"; 
	             level_click[i] = "init(" + i + ")";
	         } else if (perfectLevels[i] == 0) {
	             level_select[i] = "";
	             level_click[i] = "init(" + i + ")";
	         } else if (perfectLevels[i] == 2) {
	             level_select[i] = "t";
	             level_click[i] = "init(" + i + ")";
	         } else {
	             level_select[i] = "l";
	             level_click[i] = ""
	         }
	     }

	     canvas = document.getElementById("canvas"); //create canvas
	     ctx = canvas.getContext("2d"); //declare 2d
	     clear(); //refresh canvas
	     ctx.drawImage(Map, 0, -2, 300, 200);
	     ctx.fillStyle = "rgba(100, 100, 100, 0.6)";
	     rect(0, 0, 300, 200); // create block
	     ctx.fillStyle = "white";
	     ctx.font = "bold 14px Arial";
	     ctx.fillText("LEVEL SELECTION: ", 20, 20);
	     ctx.fillText("Starred- ", 190, 30);
	     ctx.font = "italic 14px Arial";
	     ctx.fillText("Perfect Moves", 190, 45);
	     ctx.font = "bold 14px Arial";
	     ctx.fillText("Ticked- ", 190, 65);
	     ctx.font = "italic 14px Arial";
	     ctx.fillText("Completed", 190, 80);
	     ctx.font = "bold 14px Arial";
	     ctx.fillText("Locked- ", 190, 100);
	     ctx.font = "italic 14px Arial";
	     ctx.fillText("Not Availible", 190, 115);
	     ctx.font = "bold 14px Arial";
	     ctx.fillText("Numbered- ", 190, 135);
	     ctx.font = "italic 14px Arial";
	     ctx.fillText("Availible", 190, 150);
	     document.getElementById("controls").innerHTML = [
	             '<button type="submit" class="menu_button" onclick="menu()">Menu</button>',
	             '<table>',
	             '<tr>',
	             '<td><input type="image" id="level" src="images/level0' + level_select[0] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[0] + '"/></td><td><input type="image" id="level" src="images/level1' + level_select[1] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[1] + '"/></td><td><input type="image" id="level" src="images/level2' + level_select[2] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[2] + '"/></td>',
	             '</tr>',
	             '<tr>',
	             '<td><input type="image" id="level" src="images/level3' + level_select[3] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[3] + '"/></td><td><input type="image" id="level" src="images/level4' + level_select[4] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[4] + '"/></td><td><input type="image" id="level" src="images/level5' + level_select[5] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[5] + '"/></td>',
	             '</tr>',
	             '<tr>',
	             '<td><input type="image" id="level" src="images/level6' + level_select[6] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[6] + '"/></td><td><input type="image" id="level" src="images/level7' + level_select[7] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[7] + '"/></td><td><input type="image" id="level" src="images/level8' + level_select[8] + '.png" alt="image 01" height="50"  width="50" onclick="' + level_click[8] + '"/></td>',
	             '</tr>',
	             '</table>'



	     ].join('\n');

	     a.play();
	     a.loop = true;
	     b.pause();
	 }

	/*
	* Function to use HTML container for the achievemnts menu. Works similar
	* to the level select, by seeing if the award is complete, if so, the 
	* letter in the filename for the image is changed to show a trophy.
	* Each trophy has a link to change the text to show users what each
	* award means. This calls the show_achv method.
	*/
	 function achieve() {
	     for (var i = 0; i < 9; i++) {
	         if (achv[i] == 1) {
	             award[i] = "trophy.gif";
	         } else {
	             award[i] = "level0l.png";
	         }
	     }

	     document.getElementById("controls").innerHTML = [
	             '<button type="submit" class="menu_button" onclick="menu()">Menu</button>',
	             '<table>',
	             '<tr>',
	             '<td><input type="image"  src="images/' + award[0] + '" alt="image 01" height="50"  width="50" onclick="show_achv(0)"/></td><td><input type="image"   src="images/' + award[1] + '" alt="image 01" height="50"  width="50" onclick="show_achv(1)"/></td><td><input type="image"   src="images/' + award[2] + '" alt="image 01" height="50"  width="50" onclick="show_achv(2)"/></td>',
	             '</tr>',
	             '<tr>',
	             '<td><input type="image"   src="images/' + award[3] + '" alt="image 01" height="50"  width="50" onclick="show_achv(3)"/></td><td><input type="image"   src="images/' + award[4] + '" alt="image 01" height="50"  width="50" onclick="show_achv(4)"/></td><td><input type="image"   src="images/' + award[5] + '" alt="image 01" height="50"  width="50" onclick="show_achv(5)"/></td>',
	             '</tr>',
	             '<tr>',
	             '<td><input type="image"   src="images/' + award[6] + '" alt="image 01" height="50"  width="50" onclick="show_achv(6)"/></td><td><input type="image"   src="images/' + award[7] + '" alt="image 01" height="50"  width="50" onclick="show_achv(7)"/></td><td><input type="image"   src="images/' + award[8] + '" alt="image 01" height="50"  width="50" onclick="show_achv(8)"/></td>',
	             '</tr>',
	             '</table>'
	     ].join('\n');
	     canvas = document.getElementById("canvas"); //create canvas
	     ctx = canvas.getContext("2d"); //declare 2d
	     clear(); //refresh canvas
	     show_achv(9);

	 }

	/*
	* Shows the achievement text depending on the @param(i) (achievement)
	* number selected from the achieve method. It simply updates the 
	* canvas showing some wrapped text already created in the set up Javascript(index.html)
	*/
	 function show_achv(i) {
	     clear();
	     ctx.drawImage(Map, 0, -2, 300, 200);
	     ctx.fillStyle = "rgba(100, 100, 100, 0.6)";
	     rect(0, 0, 300, 200); // create block
	     ctx.fillStyle = "white";
	     ctx.font = "bold 16px Arial";
	     ctx.fillText("ACHIEVEMENTS: ", 20, 20);
	     canvas = document.getElementById("canvas"); //create canvas
	     ctx = canvas.getContext("2d"); //declare 2d	
	     ctx.fillStyle = "white";
	     ctx.font = "16px Arial";
	     wrapText(ctx, achiev_text[i], 190, 50, 100, 15);

	 }

	/*
	* Function to allow wrapped text on menu screens rather than having 
	* use multiple text lines. Takes in the users desired line width, 
	* text, canvas, and positions of the text and writes as desired. 
	*/
	 function wrapText(context, text, x, y, maxWidth, lineHeight) {
	     var words = text.split(' ');
	     var line = '';

	     for (var n = 0; n < words.length; n++) {
	         var testLine = line + words[n] + ' ';
	         var metrics = context.measureText(testLine);
	         var testWidth = metrics.width;
	         if (testWidth > maxWidth) {
	             context.fillText(line, x, y);
	             line = words[n] + ' ';
	             y += lineHeight;
	         } else {
	             line = testLine;
	         }
	     }
	     context.fillText(line, x, y);
	 }

	/*
	* Produces the instructional menu page, by simply creating some 
	* wrapped text on the canvas. Adds a menu button in the bottom 
	* right for users to get back to the main menu.
	*/
	 function instr() {
	     clear(); //refresh canvas
	     ctx.drawImage(Map, 0, -2, 300, 200);

	     ctx.fillStyle = "rgba(100, 100, 100, 0.6)";
	     rect(0, 0, 300, 200); // create block
	     document.getElementById("controls").innerHTML = ['<button type="submit" class="menu_button" onclick="menu()">Menu</button>'];
	     var text = "Simply use the W,A,S,D buttons on the keyboard to navigate yourself through the dieferent maps in order to escape the cave!, Hint- Try find a route on each level which uses minimum moves";
	     ctx.fillStyle = "white"
	     wrapText(ctx, text, 30, 50, 200, 15);
	     ctx.fillStyle = "white";
	     ctx.font = "bold 16px Arial";
	     ctx.fillText("INSTRUCTIONS: ", 20, 20);


	 }

	/*
	* The pause method here draws a semi transparent box on 
	* top of the current game, and presents a set of buttons 
	* to go to the menu, restart level or go to the level
	* selection menu. It checks whether the game is already 
	* paused, and if the user is not moving before allowing 
	* a pause.
	*/
	 function pause() {
	     if (in_game != false) {
	         if (moving != true) {
	             if (paused == true) {
	                 paused = false;
	                 document.getElementById("controls").innerHTML = [];
	                 draw();
	             } else {
	                 document.getElementById("controls").innerHTML = [];
	                 canvas = document.getElementById("canvas"); //create canvas
	                 ctx = canvas.getContext("2d"); //declare 2d
	                 ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
	                 rect(5, 5, 290, 190); // create block
	                 ctx.fillStyle = "white";
	                 ctx.font = "bold 15px Arial";
	                 ctx.fillText("Game Paused. ", 100, 40);
	                 document.getElementById("controls").innerHTML = [
	                         '<br><br><br>',
	                         '<button type="submit" class="other_button" onclick="init(level)">Restart</button><br><br>',
	                         '<button type="submit" class="other_button" onclick="level_select()">Level Select</button>',
	                         '<button type="submit" class="menu_button" onclick="menu()">Menu</button>'

	                 ].join('\n');
	                 paused = true;
	             }
	         }
	     }
	 }

	/*
	* Creates and displays the settings menu. Creates a set of 
	* buttons that allows the muting of the game, delete user 
	* details, or go back to the menu. 
	*/
	 function settings() {
	     clear(); //refresh canvas
	     ctx.drawImage(Map, 0, -2, 300, 200);

	     ctx.fillStyle = "rgba(100, 100, 100, 0.6)";
	     rect(0, 0, 300, 200); // create block
	     document.getElementById("controls").innerHTML = [
	             '<br><br>',
	             '<button type="submit" class="menu_button" onclick="menu()">Menu</button>',
	             '<button type="submit" class="other_button" onclick="mute(false)">Mute/ Un-Mute Sounds</button><br><br>',
	             '<button type="submit" class="other_button" onclick="delete_user()">Delete User Data</button>'
	     ].join('\n');
	     ctx.fillStyle = "white";
	     ctx.font = "bold 16px Arial";
	     ctx.fillText("SETTINGS: ", 20, 20);
	     canvas = document.getElementById("canvas"); //create canvas
	     ctx = canvas.getContext("2d"); //declare 2d
	 }

	/*
	* Method for clearing the user details in game and local storage. 
	* Creates a confirmational box and when confirmed, clears the arrays 
	* for both what levels are completed, and the achievemnts completed 
	* array. Then removes the local storage items for both.
	*/
	 function delete_user() {
	     var r = window.confirm("Are you sure you want to delete level and achievement data?");
	     if (r == true) {

	         for (var i = 0; i < 9; i++) {
	             achv[i] = 0
	         }
	         perfectLevels[0] = 0;
	         for (var i = 1; i < 9; i++) {
	             perfectLevels[i] = 3
	         }
	         localStorage.removeItem("achv");
	         localStorage.removeItem("levels");
	     }

	 }

	/*
	* Function for muting and unmuting the game. Takes in an 
	* optional variable that tells method the user is on the 
	* sites other pages. It then checks if sound is already 
	* muted and then either mutes or unmutes every sound object.
	*/
	 function mute(site) {

	     if (muted != true) {
	         muted = true;
	         a.muted = muted;
	         b.muted = muted;
	         c.muted = muted;

	     } else {
	         if (site != true) {
	             muted = false;
	             a.muted = muted;
	             b.muted = muted;
	             c.muted = muted;
	         }
	     }
	 }