//requiring path and fs modules
module.exports.run = ()=>{
	const path = require('path');
	const fs = require('fs');
	//joining path of directory 
	const directoryPath = path.join(__dirname, 'tmp');
	//passsing directoryPath and callback function
	fs.readdir(directoryPath, function (err, files) {
	//handling error
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		} 
		//listing all files using forEach
		files.forEach( (file) =>{
		// Do whatever you want to do with the file
			var converter = require('video-converter');
			var pathToFfmpeg = require('ffmpeg-static'); 
			converter.setFfmpegPath(pathToFfmpeg, function(err) {
				if (err) throw err;
			});
			// convert mp4 to mp3
			converter.convert('./tmp/'+ file, './mp3/' + file.split('.mp4')[0] + '.mp3', function(err) {
				if (err) throw err;
				console.log('done');
			});
		}
		);
	
	});
};