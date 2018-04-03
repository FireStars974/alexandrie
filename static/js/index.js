var fs = require('fs');
var os = require('os');
var sql = require('sql.js');
var path = require('path');

var electron = require('electron');
var remote = electron.remote;
var mainProcess = remote.require('./main');
var package = require('./package.json');

const { BrowserWindow } = require('electron').remote;

var os_platform = package.force_os ? package.force_os : os.platform();
var dir_cwd = __dirname;
var database_file = path.join(dir_cwd, 'test.sqlite');

var db;

function windows_event(elem){
	var elem_id = $(elem).attr('id');
	var win = BrowserWindow.getFocusedWindow();

	if(elem_id == 'win_minimize'){
		win.minimize();
	}

	if(elem_id == 'win_maximize'){
		if(win.isMaximized()){
			win.unmaximize();
		} else {
			win.maximize();
		}
	}

	if(elem_id == 'win_close'){
		win.close();
	}
}

$(document).ready(function(){

	$('body').addClass(os_platform);

	setTimeout(function(){

		$('.win_state').on('click', function(e){
			windows_event($(this));
		});

		initialize_database("test");

	}, 100);
});