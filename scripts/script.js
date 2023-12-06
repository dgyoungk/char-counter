function getHaystack() {
    return document.querySelector('input.haystack');
}

function getNeedle() {
    return document.querySelector('input.needle');
}

function getOutput() {
    return document.querySelector('.output');
}

function getSearchButton() {
    return document.querySelector('.search-btn');
}

function getAllButton() {
    return document.querySelector('.all-btn');
}

function getResetButton() {
    return document.querySelector('.reset-btn');
}

function getResetContainer() {
    return document.querySelector('.reset-area');
}

const haystack = getHaystack();
const needle = getNeedle();
const output = getOutput();
const search = getSearchButton();
const totalCount = getAllButton();
const resetArea = getResetContainer();


(function searchForNeedle() {
    search.addEventListener('click', () => {
        if (!needle.value || !haystack.value) {
            output.textContent = "The search can't be done without a haystack or a needle";
            !needle.value ? haystack.value = '' : needle.value = '';
        } else {
            let result = {};
            for (const char of haystack.value) {
                if (char === needle.value) {
                    result[char] ? result[char]++ : result[char] = 1;
                } else {
                    result[needle.value] = 0;
                }
            }
            output.textContent += `\n${needle.value}: ${result[needle.value]}`;
        }
        promptReset();
    });
    
})();

(function displayAllCounts() {
    totalCount.addEventListener('click', () => {
        // use for in loop to iterate over the object created
        let result = {};
        if (!haystack.value) {
            output.textContent = "The haystack is empty";
        } else {
            for (const char of haystack.value) {
                !result[char] ? result[char] = 1 : result[char]++;
            }
        }
        for (const char in result) {
            output.textContent += `${char}: ${result[char]}, `;   
        }
        if (!output.textContent.includes('empty')) {
            output.textContent = output.textContent.slice(0, output.textContent.length - 2) + '.'
        }
        promptReset();
    })

    
})();

function promptReset() {
    if (output.textContent) {
        const resetBtn = document.createElement('button');
        resetBtn.classList.add('reset-btn');
        resetBtn.innerText = 'Reset';
        resetArea.appendChild(resetBtn);
    }
    attachResetEvent();
}

function attachResetEvent() {
    const reset = getResetButton();
    reset.addEventListener('click', () => {
        haystack.value = '';
        needle.value = '';
        output.textContent = '';
        resetArea.removeChild(reset);
    });
}