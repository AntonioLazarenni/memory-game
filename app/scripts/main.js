
const url = '//services.sapo.pt/Codebits/listbadges?callback=JsonP',
		beginBtn = document.getElementById('begin');
		beginBtn.addEventListener('click', begin, false);

var selectedBadgets = [];
// Fisher-Yates Algorithm :: http://bost.ocks.org/mike/shuffle/
Array.prototype.randomize = function() {
    'use strict';
    var i = this.length,
        j, temp;
    while (--i) {
        j = Math.floor(Math.random() * (i - 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
};
Array.prototype.duplicate = function() {
    'use strict';
    var array = this,
        temp;
    temp = array.concat(array);
    var i = temp.length;
    while (--i) {
        this[i] = temp[i];
    }
};

function triggerClass(el, className) {
    'use strict';
    el.classList.toggle(className);
}

function requestJSONP() {
    'use strict';
    const script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.src = url;
    script.onload = function() {
        this.remove();
    };
    head.insertBefore(script, null);
}

function imgCreate(imgObj) {
    'use strict';
    const imgEl = document.createElement('img');
    imgEl.src = imgObj.img;
    imgEl.alt = imgObj.title;
    imgEl.id = imgObj.id;
    imgEl.height = 128;
    imgEl.width = 128;
    return imgEl;
}
var play = function() {
    'use strict';
    const insideEl = this;
    if (document.App.maybe1 === this) {
        // Same elemet was clicked. Do nothing
        triggerClass(insideEl, 'picked');
        document.App.maybe1 = '';
        return;
    }
    if (document.App.maybe1 !== '' && document.App.maybe2 !== '') {
        // Both elements is already selected. Do nothing 
        return;
    } else {
        triggerClass(insideEl, 'picked');
        switch (document.App.maybe1) {
            case '':
                {
                    document.App.maybe1 = this;
                    break;
                }
            default:
                {
                    document.App.maybe2 = this;
                    break;
                }
        }
    }
    if (document.App.maybe1 === '' || document.App.maybe2 === '') {
        // Second element not selected yet. Wait for it
        return;
    } else {
        if (document.App.maybe1.parentElement.dataset.id === document.App.maybe2.parentElement.dataset.id) {
            document.App.maybe1.classList.add('mached');
            document.App.maybe2.classList.add('mached');
            document.App.maybe1.removeEventListener('click', play, false);
            document.App.maybe2.removeEventListener('click', play, false);
            document.App.maybe1 = '';
            document.App.maybe2 = '';
            document.App.level -= 1;
            if(document.App.level === 0){
            	win(document.App.time);
            }
        } else {
            var timeout2 = setTimeout(function() {
                triggerClass(document.App.maybe1, 'picked');
                triggerClass(document.App.maybe2, 'picked');
                document.App.maybe1 = '';
                document.App.maybe2 = '';
            }, 1000);
        }
    }
};

function win(time){
	clearTimeout(document.timeout);
	let tweet = `https://twitter.com/intent/tweet/?text="Memory JavaScript FTW em: ${time}"`;
 	win = window.open(tweet, '_blank');
  	win.focus();
}

function makeBoardGame() {
    'use strict';
    var boadrEl = document.getElementById('boardgame'),
        i = 0;
    for (i; i < selectedBadgets.length; i += 1) {
        var cardEl = document.createElement('div'),
            insideEl = document.createElement('div'),
            frontImgEl = imgCreate(selectedBadgets[i]),
            backImgEl = document.createElement('img');
        backImgEl.src = 'https://i2.wp.com/codebits.eu/logos/defaultavatar.jpg';
        cardEl.className = 'card';
        cardEl.dataset.id = frontImgEl.id;
        insideEl.className = 'inside';
        frontImgEl.className = 'front';
        backImgEl.className = 'back';
        insideEl.appendChild(frontImgEl);
        insideEl.appendChild(backImgEl);
        cardEl.appendChild(insideEl);
        boadrEl.appendChild(cardEl);
        //Add Event Listener
        insideEl.addEventListener('click', play, false);
    }
}
document.App = {};
document.App.maybe1 = '';
document.App.maybe2 = '';
document.App.time = 0;
document.App.level = 9;
function begin() {
    'use strict';
    this.style.display = 'none';
    selectedBadgets.duplicate();
    selectedBadgets.randomize();
    makeBoardGame();
    document.timeout = setInterval(function() {
        increaseTime();
    }, 1000);
}

function increaseTime(){
	const timerEl = document.getElementById('timer');
	timerEl.innerHTML = (document.App.time += 1);
}

requestJSONP(); // Preload JSON and Create Images (selectedBadgets)
var JsonP = function(badgets) {
    'use strict';
    let i = 0;
    var index = 0;
    for (i; i < document.App.level; i += 1) {
        index = Math.floor((Math.random() * badgets.length) - 1);
        selectedBadgets.push(badgets[index]);
        badgets.splice(index, 1);
    }
    document.selectedBadgets = selectedBadgets;
};