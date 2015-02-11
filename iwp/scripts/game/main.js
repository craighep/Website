	/*
	* Method to start the game from the level selection menu, moving up
	* a level or when restarting a level. Takes in @param(level) and 
	* calls the map after setting the level to the desired number. 
	* Resets the users location and moves when starting.
	*/
	function init(current_level) {
	    x = 148; //starting point for object
	    y = 130;
	    moves = 0;
	    in_game = true;
	    paused = false;
	    level = current_level;
	    document.getElementById("controls").innerHTML = "";
	    document.getElementById("pause_area").innerHTML = '<button type="submit" class="other_button" onclick="pause()">Pause</button>-"P" to pause';
	    canvas = document.getElementById("canvas"); //create canvas
	    ctx = canvas.getContext("2d"); //declare 2d
	    setSpeech();
	    setMap();
	    a.pause();
	    b.play(); 
	    b.loop = true;
	}

	/*
	* Method used to re-draw the users location, and map whilst the 
	* player is moving. This method is called many times a second to
	* ensure smoother looking effects. It also updates the level and 
	* moves HTML elements to tell the user these bits of information.
	*/
	function draw() {
	    clear(); //refresh canvas
	    document.getElementById("moves").innerHTML = "&emsp;&emsp;&emsp;Moves: " + moves + "&emsp;&emsp;&emsp;&emsp;&emsp;" + " Level: " + level;
	    ctx.fillStyle = "white";
	    ctx.strokeStyle = "black";
	    rect(0, 0, WIDTH, HEIGHT); // create canvas
	    map = canvas.getContext("2d"); //declare 2d
	    map.drawImage(Map, 0, 0, 300, 200);
	    ctx.fillStyle = "purple";
	    rect(x, y, 5, 5); // create block
	    ctx.strokeStyle = "green";
	    ctx.fillStyle = "green";
	    checkAchv();
	    if (level === 9) {
	        completed();
	    }
	}
	
	/*
	* Clears the canvas by clearing a box the size of the canvas. Turns
	* into a white canvas ready to be added to.
	*/
	function clear() {
	    ctx.clearRect(0, 0, WIDTH, HEIGHT); // empty screen
	}

	/*
	* Draws rectangle shapes using the specified parameters(x-position-
	* start, y-position-start, width and height). Uses stroke and fill
	* set from most recent occurance.
	*/
	function rect(x, y, w, h) { // rectangle factory
	    ctx.beginPath();
	    ctx.rect(x, y, w, h);
	    ctx.closePath();
	    ctx.fill();
	    ctx.stroke();
	}

	/*
	* Effectively the action listener for the keyboard and for the button
	* movements. Gets the event from the browser, and then finds out the
	* corresponding keyCode. SWitch statement applies this to see what
	* move to make.
	*/
	function doKeyDown(evt) {
	    var e = e || window.event;
	    if (in_game == true) {
	        switch (evt.keyCode) {
	            case 87:
	                /* w was pressed */
	                if (paused != true) {
	                    if (y - dy > 0) {
	                        if (check == 0) {
	                            check = 1;

	                            up();
	                            moves++;
	                            moving = true;

	                        }
	                    }
	                }
	                break;
	            case 83:
	                /* a was pressed */
	                if (paused != true) {
	                    if (y + dy < HEIGHT) {
	                        if (check == 0) {
	                            check = 1;
	                            down();
	                            moves++;
	                            moving = true;
	                        }
	                    }
	                }
	                break;
	            case 65:
	                /* s was pressed */
	                if (paused != true) {
	                    if (x - dx > 0) {
	                        if (check == 0) {
	                            check = 1;
	                            left();
	                            moves++;
	                            moving = true;
	                        }
	                    }
	                }
	                break;
	            case 68:
	                /* d was pressed */
	                if (paused != true) {
	                    if (x + dx < WIDTH) {
	                        if (check == 0) {
	                            check = 1;
	                            right();
	                            moves++;
	                            moving = true;
	                        }
	                    }
	                }
	                break;
	            case 80:
	                /* P was pressed */
	                pause();
	                break;
	        }
	        switch (evt) { // switch statements for the arrow buttons below canvas
	            case 38:
	                /* Up arrow was pressed */
	                if (paused != true) {
	                    if (y - dy > 0) {
	                        if (check == 0) {
	                            check = 1;
	                            up();
	                            moves++;
	                            moving = true;
	                        }
	                    }
	                }
	                break;
	            case 40:
	                /* Down arrow was pressed */
	                if (paused != true) {
	                    if (y + dy < HEIGHT) {
	                        if (check == 0) {
	                            check = 1;
	                            down();
	                            moves++;
	                            moving = true;
	                        }
	                    }
	                }
	                break;
	            case 37:
	                /* Left arrow was pressed */
	                if (paused != true) {
	                    if (x - dx > 0) {
	                        if (check == 0) {
	                            check = 1;
	                            left();
	                            moves++;
	                            moving = true;
	                        }
	                    }
	                }
	                break;
	            case 39:
	                /* Right arrow was pressed */
	                if (paused != true) {
	                    if (x + dx < WIDTH) {
	                        if (check == 0) {
	                            check = 1;
	                            right();
	                            moves++;
	                            moving = true;
	                        }
	                    }
	                }
	        }
	    }
	}

	/*
	* Performs the up movement of the user. Does a range of checks to see
	* if touching a wall, touching water, a key or the exit. Also looks 
	* to see if any achievemtns have been completed. This method is repeated
	* several times a second while user can still move. It calls the draw 
	* method to update this visually.
	*/
	function up() {
	    if (check == 1) {
	        var imgData = map.getImageData(x + 1, y - 2, 1, 1); //get colour above it
	        if (imgData.data[1] == 255) { // if white, continue
	            y -= dy;
	            draw();
	            setTimeout(arguments.callee, speed);
	        } else if (imgData.data[1] == 162) { //if blue (water), die
	            death();
	        } else if (imgData.data[0] == 136) { //if brown, key, open.
	            level++;
	            setMap();
	            draw();
	            check = 0;
	            setSpeech();

	        } else { // else you have hit a wall and stop
	            moving = false;
	            check = 0;
	        }
	    }
	    if (y < 4) { // if so high, must have exited through gap
	        y = 130;
	        x = 148;
	        if (perfectLevels[level] != 1) { // check status of current level
	            perfectLevels[level] = 2;
	            if (moves <= perfectMoves[level]) {
	                perfectLevels[level] = 1;
	                localStorage["levels_s"] = JSON.stringify(perfectLevels);
	            }
	        }
	        moving = false;
	        level++;

	        if (perfectLevels[level] == 3) {
	            perfectLevels[level] = 0;
	            localStorage["levels_s"] = JSON.stringify(perfectLevels);
	        }
	        if (achv[3] != 1) {
	            if (moves > 20) {
	                achv[3] = 1;
	                alert_achv("Achievement Unlocked!- Longggg- Complete A Level In Over 20 Moves");
	            } else {
	                moves = 0;
	                water_count = 0;
	                setMap();
	                setSpeech();
	                check = 0;
	            }
	        } else {
	            moves = 0;
	            water_count = 0;
	            setMap();
	            setSpeech();
	            check = 0;
	        }
	    }

	}

	/*
	* Similar to the up method, except does not need to check if at an 
	* exit becuase exits are always at the top of the map.
	*/
	function down() {
	    if (check == 1) {
	        var imgData3 = map.getImageData(x + 1, y + 6.5, 1, 1);
	        if (imgData3.data[1] == 255) {
	            y += dy;
	            draw();
	            setTimeout(arguments.callee, speed);
	        } else if (imgData3.data[1] == 162) {
	            death();
	        } else if (imgData3.data[0] == 136) {
	            level++;
	            water_count = 0;
	            setMap();
	            check = 0;
	            setSpeech();
	        } else {
	            moving = false;
	            check = 0;
	        }
	    }

	}

	/*
	* Similar to the up method, except does not need to check if at an 
	* exit becuase exits are always at the top of the map.
	*/
	function left() {
	    if (check == 1) {
	        var imgData2 = map.getImageData(x - 2, y, 1, 1);
	        if (imgData2.data[1] == 255) {
	            x -= dx;
	            draw();
	            setTimeout(arguments.callee, speed);
	        } else if (imgData2.data[1] == 162) {
	            death();
	        } else if (imgData2.data[0] == 195 || imgData2.data[0] == 194) {

	            if (perfectLevels[level] != 1) {
	                perfectLevels[level] = 2;
	                localStorage["levels_s"] = JSON.stringify(perfectLevels);
	                if (moves == perfectMoves[level]) {
	                    perfectLevels[level] = 1;
	                    localStorage["levels_s"] = JSON.stringify(perfectLevels);
	                }
	            }
	            moves = 0;
	            level++;
	            setMap();
	            check = 0;
	            setSpeech();
	        } else {
	            moving = false;
	            check = 0;
	        }
	    }
	}

	/*
	* Similar to the up method, except does not need to check if at an 
	* exit becuase exits are always at the top of the map.
	*/
	function right() {
	    if (check == 1) {
	        var imgData2 = map.getImageData(x + 6, y, 1, 1);
	        if (imgData2.data[1] == 255) {
	            x += dx;
	            draw();
	            setTimeout(arguments.callee, speed);
	        } else if (imgData2.data[1] == 162) {
	            death();
	        } else if (imgData2.data[0] == 136) {
	            level++;
	            water_count = 0;
	            draw();
	            check = 0;
	            setSpeech();
	        } else {
	            moving = false;
	            check = 0;
	        }
	    }
	}

	/*
	* Sets the map when called, by getting the level number and then
	* adding this to the end of a string which is used as the file name
	* required. Then waits for the map to load before drawing the new 
	* image.
	*/
	function setMap() {
	    Map.src = "maps/" + level + ".png"
	    Map.onload = function () {
	        draw();
	    }
	}

	/*
	* Checks through the achievements possible in the game to see if any
	* are complete. Checks if they are already complete, if so moves to
	* the next. Calls the alert function if an achievement is found and
	* then updates the achievement-holding array.
	*/
	function checkAchv() {

	    if (achv[0] != 1) { // check for completing a level
	        var i = 0;
	        while (i < 9) {
	            if (2 == perfectLevels[i] || 1 == perfectLevels[i]) {
	                achv[0] = 1;
	                alert_achv("Completing A Level");
	            }
	            i++;
	        }
	    }
	    if (achv[1] != 1) { // check for completing a level in minimum moves
	        var i = 0;
	        while (i < 9) {
	            if (1 == perfectLevels[i]) {
	                achv[1] = 1;
	                alert_achv("Achievement Unlocked!-Completing A Level In Minimum Moves");
	            }
	            i++;
	        }
	    }
	    if (achv[2] != 1) { // check for completing 3 levels in perfect moves
	        var i = 0;
	        var count = 0;
	        while (i < 9) {
	            if (1 == perfectLevels[i]) {
	                count++;
	            }
	            i++;
	        }
	        if (count > 2) {
	            achv[2] = 1;
	            alert_achv("Achievement Unlocked!-Completing 3 Levels In Minimum Moves!");
	            localStorage["achv"] = JSON.stringify(achv);
	        }
	    }
	    if (achv[6] != 1) { // check for completing 5 levels in perfect moves
	        var i = 0;
	        var count = 0;
	        while (i < 9) {
	            if (1 == perfectLevels[i]) {
	                count++;
	            }
	            i++;
	        }
	        if (count > 4) {
	            achv[6] = 1;
	            alert_achv("Achievement Unlocked!-Completing 5 Levels In Minimum Moves!");
	        }
	    }
	    if (achv[7] != 1) { // check for completing all levels
	        if (level == 9) {
	            achv[7] = 1;
	            alert_achv("Achievement Unlocked!-Completing All Levels!");
	        }
	    }
	    if (achv[8] != 1) { // check for completing all levels in perfect moves
	        var i = 0;
	        var count = 0;
	        while (i < 9) {
	            if (1 == perfectLevels[i]) {
	                count++;
	            }
	            i++;
	        }
	        if (count > 8) {
	            achv[8] = 1;
	            alert_achv("Achievement Unlocked!-Completing All Levels In Minimum Moves!");
	        }
	    }
	}

	/*
	* Like the set map function, but sets the game text in the text
	* HTML element in each level. Also uses this method to check if the
	* game is completed then redirects to the completed function.
	*/
	function setSpeech() {
	    document.getElementById("text").innerHTML = speech[level];
	    if (level === 9) {
	        completed();
	    }
	}

	/*
	* This is run when death is detected for instance if a user touches 
	* water. Increments the water count variable which contributes to the 
	* checking of a user dying twice in a level. Sets the users
	* location back to the starting position.
	*/
	function death() {
	    moves = 0;
	    y = 130;
	    x = 148;
	    check = 0;
	    document.getElementById("text").innerHTML = '"Ouch!"';
	    water_count++;
	    if (achv[5] != 1) {
	        if (water_count >= 2) {
	            achv[5] = 1;
	            alert_achv("Achievement Unlocked!- Touch Water Twice In A Level");
	        }
	    }
	    if (achv[4] != 1) {
	        achv[4] = 1;
	        alert_achv("Achievement Unlocked!- Fail A Level By Touching Water");
	    }

	}

	/*
	* Runs when the user finishes the last level. Cleears the canvas 
	* then shows congratulations text and adds a button to the container
	* on top of the canvas.
	*/
	function completed() {
	    checkAchv();
	    clear(); //refresh canvas
	    ctx.drawImage(Map, 0, -2, 300, 200);
	    ctx.fillStyle = "rgba(100, 100, 100, 0.6)";
	    rect(0, 0, 300, 200); // create block
	    document.getElementById("controls").innerHTML = ['<button type="submit" class="menu_button" onclick="menu()">Menu</button>'];
	    var text = "You have escaped the cave! For now.... Click to go back to the menu.";
	    ctx.fillStyle = "white"
	    wrapText(ctx, text, 30, 50, 200, 15);
	    ctx.fillStyle = "white";
	    ctx.font = "bold 16px Arial";
	    ctx.fillText("CONGRATULATIONS! ", 50, 20);
	    document.getElementById("pause_area").innerHTML = "";
	    document.getElementById("moves").innerHTML = "";
	}

	/*
	* Clears the canvas and adds tha achievemnt text to the canvas 
	* Using the wrap method to wrap the text. A button to continue is
	* created on the page.		
	*/
	function alert_achv(text) {
	    localStorage["achv"] = JSON.stringify(achv);
	    ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
	    rect(5, 5, 290, 190); // create block
	    ctx.fillStyle = "white";
	    ctx.font = "bold 15px Arial";
	    ctx.fillText("Achievement Unlocked!", 80, 40);
	    ctx.font = "15px Arial";
	    wrapText(ctx, text, 110, 90, 100, 15);
	    document.getElementById("pause_area").innerHTML = '';
	    document.getElementById("controls").innerHTML = [
	            '<br><br><br><br><br><br><br><br><br><button type="submit" class="other_button" onclick="continue_game()">Continue</button>'
	    ]
	    b.pause();
	    c.currentTime = 0;
	    c.play();
	}

	/*
	* Continue method to be run when user presses continue on previous 
	* method. Sets the game to its normal state and re-draws the canvas
	* and player etc.
	*/
	function continue_game() {
	    if (achv[3] == 1) {
	        moves = 0;
	        water_count = 0;
	        setMap();
	        setSpeech();
	        check = 0;
	    }
	    document.getElementById("pause_area").innerHTML = '<button type="submit" class="other_button" onclick="pause()">Pause</button>-"P" to pause';
	    document.getElementById("controls").innerHTML = [];
	    b.play();
	    c.pause();
	    draw();
	}
