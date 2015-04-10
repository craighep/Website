var menu = [];
var cats = [];
var cost = 0;

$.ajax({
    url: "json/menu.json",
    //force to handle it as text
    dataType: "text",
    success: function(data) {
        var json = $.parseJSON(data);
        menu = json.menu_items;
        cats = json.categories;
    }
});

	var cw;
	if(window.innerWidth < 500)
		cw = Raphael.colorwheel($("#size_example .colorwheel_large")[0],window.innerWidth/2, 300).color("#00F");
	else
		cw = Raphael.colorwheel($("#size_example .colorwheel_large")[0],300, 300).color("#00F");
	
	cw.onchange(function(color)
    {
    	cost = 0;
    	updateTable(parseInt(color.r), parseInt(color.g), parseInt(color.b));
    });

function updateTable(red, green, blue) {
	var count = 0;
	if(red == 0)
		red = 1;
	if(green == 0)
		green = 1;
	if(blue == 0)
		blue = 1;

	var categories = getCategories(red, green, blue);

	for(i in menu) {
		if (count == 3){
			count = 0;
			break;
		}
		var item = menu[i];
		if(item.id == red){
			cost += item.price;
			setHtml(item, "Red", categories[count]);
			count++;
		}
		if(item.id == green){
			cost += item.price;
			setHtml(item, "Green", categories[count]);
			count++;
		}
		if(item.id == blue){
			cost += item.price;
			setHtml(item, "Blue", categories[count]);
			count++;
		}
	}
}

function setHtml(item, colour, category) {
	document.getElementById("rgbID"+colour).innerHTML = item.id;
	document.getElementById("rgbName"+colour).innerHTML = item.name;
	document.getElementById("rgbPrice"+colour).innerHTML = "£" + item.price.toFixed(2);
	document.getElementById("rgbCategory"+colour).innerHTML = category;
	document.getElementById("totalPrice").innerHTML = "£" + cost.toFixed(2);
}

function getRandom() {
	var hex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	cw.color(hex);
	var rgb = hexToRgb(hex);
	cost = 0;
    updateTable(rgb.r, rgb.g, rgb.b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getCategories(red, green, blue) {
	var ret = [];
	for(c in cats){
		if(ret.length > 2)
			return ret;
		var category = cats[c];
		if(category.min <= red && category.max >= red)
			ret[ret.length] = category.name;
		if(category.min <= blue && category.max >= blue)
			ret[ret.length] = category.name;
		if(category.min <= green && category.max >= green)
			ret[ret.length] = category.name;
	}
	return cats;
}