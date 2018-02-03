var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var imgDat; // public container for image data
document.addEventListener("deviceready",onDeviceReady,false); // Wait for PhoneGap to connect and respond

function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;// Retrieve image file location from specified source, sets picture source to either to phototlibrary or photoalbum.
	destinationType=navigator.camera.DestinationType;//Choose the format of the return value. FILE_URI is for file path
}

function capturePhotoWithFile() { // Capture image and get a URI of the file
	navigator.camera.getPicture(onPhotoFileSuccess, fail, {
		quality: 60,
		destinationType: Camera.DestinationType.FILE_URI,
		correctOrientation: true,
		encodingType: Camera.EncodingType.JPEG,
		saveToPhotoAlbum: true,});
}

function onPhotoFileSuccess(imageData) { // Called when an image is successfully retrieved
	var smallImage = document.getElementById('smallImage');
	smallImage.style.display = 'block'; // Unhide image elements
	smallImage.src = imageData;
	imgDat = imageData;
	document.getElementById("photoURIlink").innerHTML= "The URI is: " + imageData; // Show image URI
	notify('Captured Image');
}

function fail(message) {
	notify('Failed: ' + message);
}

function shareOther(msg) { // Share to device options
	if (imgDat != null){
		window.plugins.socialsharing.share(msg, null, imgDat, null);
	} else {
		notify('Error: No image');
	}
};


function shareFacebook(msg) { // Share to facebook
	if (imgDat != null){
		window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('Message via Facebook', imgDat /*img*/, null /*url*/, null, function() {notify('Success')}, function(errormsg){notify('Error: ' + errormsg)});
	} else {
		notify('Error: No image');
	}
};
