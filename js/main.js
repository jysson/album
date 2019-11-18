var isAnd = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
var test = document.getElementById('test');
var upLoad = document.getElementById('upLoad');
var createAlbum = document.getElementById('createAlbum');
var imgArr = [];
var upFiles = [];
var upLists = [];
if(isAnd) {
	upLoad.onchange = function() {
		upFiles.push(upLoad.files[0]);
	}
	createAlbum.style.display = 'inline';
	createAlbum.onclick = upLoadFile;
}else {
	upLoad.onchange = upLoadFile;
}
function upLoadFile() {
	imgArr = [];
	upLists = upFiles.length?upFiles:upLoad.files;
	if(upLoad.files) {
		for(let i=0;i<upLists.length;i++) {
			base64(upLists[i])
		}
	}else {
		alert('请选择图片！')
	}
	
}
function base64(file) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function () {      
		var dataURL = reader.result;
		imgArr.push(dataURL);
		changeImg(imgArr)
	};
}
function changeImg(arr) {
	if(arr.length == upLists.length) {
		var imgs = document.getElementById('react').getElementsByClassName('reactBox');
		var orr = JSON.parse(JSON.stringify(arr));
		if(arr.length < imgs.length) {
			var addOrr = Math.ceil(imgs.length/orr.length);
			for(var i=0;i<addOrr;i++) {
				arr = arr.concat(orr);
			}
			if(arr.length > imgs.length) {
				arr = arr.slice(0,-(arr.length-imgs.length));
			}
		}else if(arr.length > imgs.length) {
			arr = arr.slice(0,-(arr.length-imgs.length));
		}
		arr.forEach((item,index)=> {
			imgs[index].getElementsByTagName('div')[0].style.background = `url(${arr[index]})`;
			imgs[index].getElementsByTagName('div')[0].style.backgroundSize = 'cover';
			imgs[index].getElementsByTagName('div')[0].style.backgroundPosition = 'center';
		})
	}
}