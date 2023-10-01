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
		case 1: // Me
			document.body.style.backgroundImage = 'url("images/code.png")';

			setElement(document.body, 'div', 'cntBusinessCard', '', '', 'slide-in-top', false, false);
			setElement(cntBusinessCard, 'img', 'imgMyself', 'image/png', 'images/myself.png', '', false, true);
			setElement(document.body, 'div', 'cntBusinessCardText', '', '', 'slide-in-top', false, false);
			setElement(cntBusinessCardText, 'label', 'lblTitle', '', 'Summary', '', true, false);
			setElement(cntBusinessCardText, 'label', 'lblBulletPoint00', '', 'Proficient student of I.T. Programming with strong mathematical, graphic design, and computer skills.', '', true, false);
			setElement(cntBusinessCardText, 'label', 'lblBulletPoint01', '', 'Project-oriented programmer with good work ethics and excellent communication skills.', '', true, false);
			setElement(cntBusinessCardText, 'label', 'lblBulletPoint01', '', 'Work effectively with diverse groups of people, both independently and as a team member.', '', true, false);

			setTimeout(function () {
				cntBusinessCard.classList= ""; }, 500);


			break;
		case 2: // Portfolio

			document.body.style.backgroundImage = 'url("images/halftone.png")';

			setElement(document.body, 'audio', 'audMusic', 'audio/ogg', 'audio/portfolio.ogg', '', false, true, true);
			setElement(document.body, 'audio', 'audRotate', 'audio/ogg', 'audio/itemRotate.ogg', '', false, true, true);
			setElement(document.body, 'audio', 'audSelect', 'audio/ogg', 'audio/itemSelect.ogg', '', false, true, true);
			setElement(document.body, 'audio', 'audDeselect', 'audio/ogg', 'audio/itemDeselect.ogg', '', false, true, true);
			setElement(document.body, 'audio', 'audDecide', 'audio/ogg', 'audio/itemDecide.ogg', '', false, true, true);
			setElement(document.body, 'audio', 'audFail', 'audio/ogg', 'audio/itemFail.ogg', '', false, true, true);
			setElement(document.body, 'div', 'cntRotor', '', '', 'InnerRotor', false, false);
			setElement(cntRotor, 'div', 'cntCircleTop', '', '', 'InnerRotorTop', false, false);
			setElement(cntRotor, 'div', 'cntCircleTopRight', '', '', 'InnerRotorTopDiagonal', false, false);
			setElement(cntRotor, 'div', 'cntCircleMiddleRight', '', '', 'InnerRotorMiddle', false, false);
			setElement(cntRotor, 'div', 'cntCircleBottomRight', '', '', 'InnerRotorBottomDiagonal', false, false);
			setElement(cntRotor, 'div', 'cntCircleBottom', '', '', 'InnerRotorTop', false, false);
			setElement(cntRotor, 'div', 'cntCircleBottomLeft', '', '', 'InnerRotorBottomDiagonal', false, false);
			setElement(cntRotor, 'div', 'cntCircleMiddleLeft', '', '', 'InnerRotorMiddle', false, false);
			setElement(cntRotor, 'div', 'cntCircleTopLeft', '', '', 'InnerRotorTopDiagonal', false, false);
			setElement(cntRotor, 'div', 'cntCircleMiddleCenter', '', '', 'InnerRotorMiddle', false, false);
			audMusic.play();

			cntRotor.style.transform = "rotate(0deg)";

			cntCircleTop.style.transform = "rotate(0deg)";
			cntCircleTopRight.style.transform = "rotate(0deg)";
			cntCircleMiddleRight.style.transform = "rotate(0deg)";
			cntCircleBottomRight.style.transform = "rotate(0deg)";
			cntCircleBottom.style.transform = "rotate(0deg)";
			cntCircleBottomLeft.style.transform = "rotate(0deg)";
			cntCircleMiddleLeft.style.transform = "rotate(0deg)";
			cntCircleTopLeft.style.transform = "rotate(0deg)";

			cntCircleTop.onclick = function () {
				audFail.play() }

			cntCircleTopRight.onclick = function () {
				audFail.play() }

			cntCircleBottomRight.onclick = function () {
					// Go back to the main menu
					setFade(false);
					audDecide.play();
					setTimeout(function () {setFade(true); getPremadeContainer(0); }, 500);
			}

			cntCircleBottom.onclick = function () {
				audFail.play() }

			cntCircleBottomLeft.onclick = function () {
				audFail.play() }

			cntCircleMiddleLeft.onclick = function () {
				audFail.play() }

			cntCircleTopLeft.onclick = function () {
				audFail.play() }

			cntCircleMiddleCenter.onclick = function () {
				audRotate.play();
				intDegrees = parseInt(cntRotor.style.transform.match(/\d+/));
				intDegrees += 45;
				cntRotor.style.transform = 'rotate(' + intDegrees + 'deg)';

				cntCircleTop.style.transform = 'rotate(' + (intDegrees - (intDegrees * 2)) + 'deg)';
				cntCircleTopRight.style.transform = 'rotate(' + (intDegrees - (intDegrees * 2)) + 'deg)';
				cntCircleMiddleRight.style.transform = 'rotate(' + (intDegrees - (intDegrees * 2)) + 'deg)';
				cntCircleBottomRight.style.transform = 'rotate(' + (intDegrees - (intDegrees * 2)) + 'deg)';
				cntCircleBottom.style.transform = 'rotate(' + (intDegrees - (intDegrees * 2)) + 'deg)';
				cntCircleBottomLeft.style.transform = 'rotate(' + (intDegrees - (intDegrees * 2)) + 'deg)';
				cntCircleMiddleLeft.style.transform = 'rotate(' + (intDegrees - (intDegrees * 2)) + 'deg)';
				cntCircleTopLeft.style.transform = 'rotate(' + (intDegrees - (intDegrees * 2)) + 'deg)';
			}

			cntCircleMiddleRight.onclick = function () {
				audMusic.src = "audio/intragarden.ogg";
				audMusic.play();
				audSelect.play();
				getPremadeContainer(4);
				lblProjectTitle.innerHTML = "IntraGarden";
				lblProjectDescription.innerHTML = "This project will be a website available online through GitHub Pages. \
				The project will be a visual technical demonstration that uses practical programming, codebase, and browser-specific usages, \
				specifically a one-dimensional array, velocity jumping, and browser cookies. The presentation of the project will be in the form \
				of a simulation for users to interact. It will minimally have three modes to try: Caring, wandering, and battle. The project will \
				officially end its development on the 18th of March 2022.";
				imgProjectCover.src = "images/intragardenBoxCover.png";

				lblProjectStart.onclick = function () {
					audDecide.play();
					setFade(false);
					setTimeout(function () { location.href = 'https://abanoy.github.io/intragarden-dev'; }, 100);
				}

				lblProjectBack.onclick = function () {
					audMusic.src = "audio/portfolio.ogg";
					audMusic.play();
					audDeselect.play();
					cntProject.classList.add('fade-in');
					setTimeout(function () { cntProject.remove();}, 900);
				}
			}

			break;
		case 3: // Generic Gallery Item
			let imgTemp = setElement(cntParent, 'img', 'imgGalleryImage' + intIncrement, 'image/png', 'images/galleryImage.png', '', false, true);

			imgTemp.onclick = function() {

				if (imgTemp.src.includes("images/galleryImage.png")) {
					audFail.play();
				} else {
					getPremadeContainer(6);
				}

			};

			break;
		case 4: // Generic Description Page (under Portfolio section)
			// Create a new container that presents brief information about the project
			setElement(document.body, 'div', 'cntProject', '', '', 'fade-out', false, false);
			setElement(cntProject, 'div', 'cntProjectText', '', '', '', false, false);
			setElement(cntProject, 'label', 'lblProjectTitle', '', 'Project Title', '', true, false);
			setElement(cntProjectText, 'label', 'lblProjectDescription', '', 'Project Description', '', true, false);
			setElement(cntProject, 'img', 'imgProjectCover', 'image/png', "images/projectBoxCover.jpg", '', false, true);
			setElement(cntProject, 'label', 'lblProjectStart', '', 'Start', '', true, false);
			setElement(cntProject, 'label', 'lblProjectBack', '', 'Go Back', '', true, false);

			setTimeout(function () {cntProject.classList = ""}, 500);

			break;
		case 5: // Populating page 1 of the gallery
			const intTotalImages = 4;
			let intImagesToDisplay = intTotalImages;

			if (intImagesToDisplay > 20) {
				intImagesToDisplay = 20;
			}

			for (let i = intIncrement; i < intImagesToDisplay; i++) {
				cntGalleryItems.children[i].src = "images/galleryItems/" + i + "tmb.png";
				cntGalleryItems.children[i].onclick = function() {
					getPremadeContainer(6, null, null, null, "images/galleryItems/" + i + "exp.png");
				};
			}

		 	break;
		case 6: // Generic expanded view of an image
			audSelect.play();
			setElement(document.body, 'div', 'cntExpandedViewBackground', '', '', 'fade-out', false, false);
			setElement(cntExpandedViewBackground, 'img', 'imgExpandedImage', 'image/png', imgReplacement, 'fade-out', false, true);
			setElement(cntExpandedViewBackground, 'img', 'imgDetails', 'image/png', 'images/info.png', 'fade-out', false, true);

			imgExpandedImage.onclick = function () {
				audDeselect.play();
				cntExpandedViewBackground.classList = "fade-in";
				setTimeout(function () {
					cntExpandedViewBackground.remove();
				}, 1000);
			}

			break;
		case 7: // Gallery Screen
			document.body.style.backgroundImage = 'url("images/marble.png")';
			setElement(document.body, 'audio', 'audFail', 'audio/ogg', 'audio/itemFail.ogg', '', false, true, true);
			setElement(document.body, 'audio', 'audSelect', 'audio/ogg', 'audio/gallerySelect.ogg', '', false, true, true);
			setElement(document.body, 'audio', 'audDeselect', 'audio/ogg', 'audio/galleryDeselect.ogg', '', false, true, true);
			setElement(document.body, 'div', 'cntGalleryItems', '', '', '', false, false);
			setElement(document.body, 'img', 'imgExitGallery', 'images/png', 'images/goBack.png', '', false, true);

			imgExitGallery.onclick = function() {
				audDeselect.play();
				setFade(false);

				setTimeout(function() {
					setFade(true);
					getPremadeContainer(0);
				}, 500)
			};

			for (let i = 0; i < 20; i++) {
				getPremadeContainer(3, cntGalleryItems, i);
			}
			getPremadeContainer(5, null, 0);

			break;
		default: // Title screen
			setFade(true);
			setElement(document.body, 'div', 'cntTitle', '', '', '', false, false);
			setElement(cntTitle, 'label', 'lblTitle', '', 'Banoy.NET', 'label', true, false);
			setElement(cntTitle, 'label', 'lblStart', '', 'Click here to continue', 'label', true, false);

			lblStart.onclick = function() {
				setElement(cntTitle, 'audio', 'audtitleSelect', 'audio/ogg', 'audio/titleSelect.ogg', '', false, true);
				audtitleSelect.play();
				lblTitle.classList.add('title-fade');
				lblStart.classList.add('title-fade');

				setTimeout(function() {
					cntTitle.remove();
				}, 1900);

				setTimeout(function() {
					getPremadeContainer(0);
				}, 2100);
			}
			break;
	}
}
