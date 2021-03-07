const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const sleep = require('system-sleep')

function readfiles() {
	let filenames = [];
	const testFolder = './mp4/';

	fs.readdir(testFolder, (err, files) => {
		if(err){
			files.forEach(file => {
				filenames.push('./mp4/'+file);
			});
			console.log(filenames);
			tomp3(filenames);
		}else {
			sleep(5);
			readfiles();
		}
	});
}

function tomp3(filename) {
	filename.forEach((element)=>{
		console.log('\nConverting File to mp3...');
		const songnamenew = element.substring(6, element.length -4);
		ffmpeg({source:element})
			.toFormat('mp3')
			.saveToFile('./mp3/'+songnamenew+ '.mp3', ()=>{
				console.log('done');
				
			} );
	});
}
readfiles();