function initialize_database(mode){

	init_database_file().done(function(){

		var filebuffer = fs.readFileSync(database_file);
		var db = new SQL.Database(filebuffer);

		if(mode == "test"){

			var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
		    stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

		    stmt.bind({$start:1, $end:2});
		    while(stmt.step()) { //
		        var row = stmt.getAsObject();
		        console.log(row);
		    }

		} else if (mode == 'start'){

			db.run("CREATE TABLE test (col1, col2);");
			db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,111,2,222]);

			var data = db.export();
			var buffer = new Buffer(data);
			fs.writeFileSync(database_file, buffer);

		}

	}).fail(function(){
        console.log("Error when init_database_file()");
    });

}

function init_database_file(){
	var deferrer = new $.Deferred();

	fs.exists(database_file, function(exists){
		if(!exists){
			try {
		    	fs.writeFileSync(database_file, '');
				deferrer.resolve();
			} catch (e) {
			    deferrer.reject();
			}
		} else {
			deferrer.resolve();
		}
	});

	return deferrer.promise();
}