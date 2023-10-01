function setElement(cntParent, strElement, strID, strType, strValue, strClass, blnCreateText, blnIsPicture) {
	// Create a templated element with an ID
	let tmpElement = document.createElement(strElement);

	// If the element needs a text
	if (blnCreateText) {
		// Create a text node and add to the element
		let tmpText = document.createTextNode(strValue);
		tmpElement.append(tmpText);
	} // End if

	// If the element needs a picture
	if (blnIsPicture) {
		// Set its source based on the given value
		tmpElement.src = strValue;
	}
	else {
		if (strValue != '' && blnCreateText == false) {
			// Set an attribute to place the strValue
			tmpElement.setAttribute('value', strValue);
		}
	} // End if

	// Give the tempalted element to the parent
	cntParent.append(tmpElement);

	// Finish with additional specifiec attributes
	tmpElement.setAttribute('id', strID);

	if (strType != '') {
		tmpElement.setAttribute('type', strType);
	}
	if (strClass != '') {
		tmpElement.setAttribute('class', strClass);
	}

	return tmpElement;
} // End of setElement function

function removeContent(cntParent) {
	while (cntParent.firstChild) {
		cntParent.removeChild(cntParent.firstChild);
	} // End while
}

function setFade(blnFadeIn) {

	if (blnFadeIn) {
		setElement(document.body, 'div', 'cntFadeIn', '', '', '', false, false);

		setTimeout(function () { cntFadeIn.remove(); }, 500);
	} else {
		setElement(document.body, 'div', 'cntFadeOut', '', '', '', false, false);

		setTimeout(function () { removeContent(document.body); }, 500);
	}
}

function parseCookies() {
	// Get cookies
	objCookies = Cookies.get();

	// For each key in objCookies
	for (let objKey in objCookies) {

		// If the value in key consists of only digits
		if (!isNaN(objCookies[objKey])) {

			// Convert the string value to integer
			objCookies[objKey] = parseInt(objCookies[objKey]);
		}
	}
}

function setCookies() {

	// Populate the cookies
	Cookies.set('energy', 100, {sameSite: 'strict', expires: 7 });
	Cookies.set('hunger', 100, {sameSite: 'strict', expires: 7 });
	Cookies.set('social', 100, {sameSite: 'strict', expires: 7 });

	// Retract the populated cookies
	parseCookies();
}

function getTime() {
	let dteClock = new Date();
	let arrTimes = [dteClock.getHours(), dteClock.getMinutes().toString(), dteClock.getSeconds().toString()];

	arrTimes.forEach(function (item, index) {
		if (item < 10) {
			arrTimes[index] = "0" + item;
		}
	});

	return arrTimes[0] + ":" + arrTimes[1] + ":" + arrTimes[2];
}

function addCookies(strName, strValue) {
	// Populate the cookie
	Cookies.set(strName, strValue, {sameSite: 'strict', expires: 7});

	// Set the key and value to objCookies
	objCookies[strName] = strValue;


	// Do a loop hole to check if the cookie is a number
	for (let objKey in objCookies) {

		// If the value in key consists of only digits
		if (!isNaN(objCookies[objKey])) {

			// Convert the string value to integer
			objCookies[objKey] = parseInt(objCookies[objKey]);
		}
	}
}

function getPremadeContainer(intSelection, cntParent, intIncrement, arrTexts, imgReplacement) {
	switch (intSelection) {
		case 0: // Main Menu
			document.body.style.backgroundImage = 'url("images/menu.gif")';
			setElement(document.body, 'audio', 'audMenu', 'audio/ogg', 'audio/menu.ogg', '', false, true, true);
			setElement(document.body, 'audio', 'audStart', 'audio/ogg', 'audio/titleSelect.ogg', '', false, true, true);

			setElement(document.body, 'div', 'cntNavigation', '', '', 'fade-out', false, false);
			setElement(document.body, 'div', 'cntContentInformation', '', '', 'fade-out', false, false);
			setElement(document.body, 'div', 'cntFooter', '', '', 'fade-out', false, false);

			setElement(cntNavigation, 'lbl', 'lblNavTitle', '', 'Banoy.NET', 'fade-out', true, false);
			setElement(cntNavigation, 'lbl', 'lblNavClock', '', getTime(), 'fade-out', true, false);

			// Population for cntContentInformation
			setElement(cntContentInformation, 'img', 'imgPreview', 'image/png', 'images/menuPreviewBlank.png', '', false, true);
			setElement(cntContentInformation, 'div', 'cntSelection', '', '', '', false, false);

			let arrInformation = ["About me", "Portfolio", "Gallery", "Exit"];

			for (let i = 0; i < 4; i++) {
				let tmpElement = setElement(cntSelection, 'div', 'cntMenuItem'+i, '', '', 'fade-out', false, false);
				setElement(tmpElement, 'img', 'imgMenuItem'+i, 'image/png', 'images/menuItem'+i+'.png', 'fade-out', false, true);
				setElement(tmpElement, 'lbl', 'lblMenuItem'+i, '', arrInformation[i], 'fade-out', true, false);

				tmpElement.addEventListener('mouseover', function handleMouseOver() {
					imgPreview.src = 'images/menuPreview' + i +'.png';
				});

				tmpElement.addEventListener('mouseout', function handleMouseOut() {
					imgPreview.src = 'images/menuPreviewBlank.png';
				});
			}

			setElement(cntFooter, 'lbl', 'lblFooterInformation', '', 'Sample Text', '', true, false);

			audMenu.loop = true;
			//audMenu.play();

			setInterval(function() {lblNavClock.innerHTML = getTime();}, 100);

			imgMenuItem0.onclick = function () {
				setFade(false);
				setTimeout(function () {setFade(true); getPremadeContainer(1); }, 500);
				audStart.play();
			};

			imgMenuItem1.onclick = function () {
				setFade(false);
				setTimeout(function () {setFade(true); getPremadeContainer(2); }, 500);
				audStart.play();
			}

			imgMenuItem2.onclick = function () {
				setFade(false);
				setTimeout(function () {setFade(true); getPremadeContainer(7)}, 500);
				audStart.play();
			}

			imgMenuItem3.onclick = function () {
				setFade(false);
				setTimeout(function () { location.href = 'https://www.google.com/'; }, 100);
				audStart.play();
			}
			break;
		default: // Title screen

			setElement(document.body, 'div', 'cntCharacters', '', '', '', false, false);
			setElement(document.body, 'div', 'cntTextbox', '', '', '', false, false);
			setElement(cntTextbox, 'img', 'imgTextbox', 'image/png', 'images/textbox.png', '', false, true);
			setElement(cntCharacters, 'img', 'imgCharacter', 'image/png', 'images/characters/yukari/Yukari8.png', '', false, true);
			setElement(cntCharacters, 'img', 'imgCharacter', 'image/png', 'images/characters/yukari/Yukari9.png', '', false, true);
			setElement(cntCharacters, 'img', 'imgCharacter', 'image/png', 'images/characters/yukari/Yukari10.png', '', false, true);
			setElement(cntCharacters, 'img', 'imgCharacter', 'image/png', 'images/characters/yukari/Yukari11.png', '', false, true);
			setElement(cntTextbox, 'lbl', 'lblNamespace', '', 'Makoto', '', true, false);
			setElement(cntTextbox, 'lbl', 'lblTextboxText', '', 'Hmm, you\'re right, Junpei. We need to find a way to stop her, but how are we even going to do this?!', '', true, false);

			break;
	}
}
