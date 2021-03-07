const path = require('path');
const fs   = require('fs');
const youtubedl = require('youtube-dl');


let filename = [];

function start() {
	ask((answer)=>{
		const url = answer;
		playlist(url);
	});
}

function ask(callback) {
	const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	});
	readline.question('Please Enter Playlist URL:\n', (answer) => {
		readline.close();
		callback(answer); 

	});
}
function playlist(url) {
	'use strict';
	const video = youtubedl(url);
	
	video.on('error', (err) =>{
		console.log('error 2:', err);
	});
	
	let size = 0;
	video.on('info', function(info) {
		size = info.size;
		let output = path.join(__dirname + '/mp4/', info._filename);
		video.pipe(fs.createWriteStream(output));
		console.log('\nDownload started');
		console.log('filename: ' + info._filename);
		console.log('size: ' + info.size);
		filename.push('./mp4/'+info._filename);
	});
	
	let pos = 0;
	video.on('data', function data(chunk) {
		pos += chunk.length;
		if (size) {
			let percent = (pos / size * 100).toFixed(2);
			process.stdout.cursorTo(0);
			process.stdout.clearLine(1);
			process.stdout.write(percent + '%');
		}
	});

	video.on('next', playlist);

}


start();
