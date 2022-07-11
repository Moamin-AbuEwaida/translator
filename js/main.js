const selectTag = document.querySelectorAll('select'),
translateBtn = document.querySelector('button'),
fromText= document.querySelector('.from-text'),
toText= document.querySelector('.to-text'),
exchangeIcon= document.querySelector('.exchange'),
icons= document.querySelectorAll('.row i');

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        // console.log(countries[country_code]);
        let selected;
        //by default english language is selected and default translation to arabic 
        if (id ==0 && country_code == 'en-GB'){
            selected = 'selected'
        } else if(id ==1 && country_code == 'ar-SA'){
            selected = 'selected'
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        // adding options to select tag
        tag.insertAdjacentHTML('beforeend', option);
    }
});

exchangeIcon.addEventListener('click',()=>{
    let tempText = fromText.value,
    tempLang = selectTag[0].value;

    fromText.value = toText.value;
    toText.value = tempText;

    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;


});

translateBtn.addEventListener('click',()=>{
    let text= fromText.value,
    translateFrom = selectTag[0].value, //getting fromSelect tag value
    translateTo = selectTag[1].value;   //getting toelect tag value
    // console.log(text, translateFrom, translateTo);
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res=>res.json()).then(data=>{
        // console.log(data);
        toText.value = data.responseData.translatedText;
    });
});

icons.forEach(icon =>{
    icon.addEventListener('click', ({target}) =>{
        // console.log(target)
        if(target.classList.contains('fa-copy')){
            if(target.id == 'from'){
                // console.log('FROM copy icon clicked')
                navigator.clipboard.writeText(fromText.value);
            } else {
                // console.log('TO copy icon clicked')
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            // console.log('speech icon clicked')
            let utterance;
            if (target.id == 'from'){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang=selectTag[0].value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang=selectTag[1].value
            }
            speechSynthesis.speak(utterance);
        }
    });
});