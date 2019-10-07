'use strict';
// Calculadora de puntos... sumando puntos, tres posibles resultados

// HTML
// checkbox inputs x categorías, organizadas por bloques
// casilla de resultado (puntos)

// Get elements
const formEl = document.getElementById('INSP-form');
const inputsEl = formEl.getElementsByTagName('input');

const resultInsp = document.getElementById('resultInsp');
const resultTitle = document.getElementById('result-title');
const movingEl = document.getElementById('moving-element');

// call onload or in script segment below form
function attachCheckboxHandlers() {
	// assign updateTotal function to onclick property of each checkbox
	for (var i = 0, len = inputsEl.length; i < len; i++) {
		if (inputsEl[i].type === 'checkbox') {
			inputsEl[i].onclick = updateTotal;
		}
	}
}

// called onclick checkboxes
function updateTotal(e) {
	// 'this' is reference to checkbox clicked on
	var form = this.form;

	// get current value in total text box, using parseFloat since it is a string
	var val = parseFloat(form.elements['total'].value);

	// if check box is checked, add its value to val, otherwise subtract it
	if (this.checked) {
		val += parseFloat(this.value);
		this.parentElement.classList.add('active');
	} else {
		val -= parseFloat(this.value);
		this.parentElement.classList.remove('active');
	}

	// format val with correct number of decimal places
	// and use it to update value of total text box
	form.elements['total'].value = val;
	resultTitle.innerHTML = val;
	if (val <= 5) {
		resultInsp.innerHTML = 'menor o igual que 5: FAVORABLE';
		movingEl.classList.add('fav');
		movingEl.classList.remove('fav-cond', 'desfav');
	} else if (val >= 6 && val <= 9) {
		resultInsp.innerHTML = 'valor entre 6 y 9: FAV-CONDICIONADO';
		// movingEl.contains('fav')
		// 	? consolelog('tenía fav')
		// 	: console.log('no tenía fav');
		movingEl.classList.add('fav-cond');
		movingEl.classList.remove('desfav', 'fav');

		// movingEl.classList.add('slide-right');
	} else if (val >= 10) {
		resultInsp.innerHTML = 'valor mayor que 10: DESFAVORABLE';
		movingEl.classList.add('desfav');
		movingEl.classList.remove('fav-cond', 'fav');

		// movingEl.classList.add('slide-right-right');
	} else {
		resultInsp.innerHTML = '...';
	}
}

// in script segment below form
attachCheckboxHandlers();
