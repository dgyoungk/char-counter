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
        resetOutput(output);
        let result = {};
        if (!needle.value || !haystack.value) {
            output.textContent = "The search cannot be done without a haystack or a needle";
            // !needle.value ? haystack.value = '' : needle.value = '';
            clearInputs();
        } else {
            for (const char of haystack.value) {
                if (char === needle.value) {
                    !result[char] ? result[char] = 1 : result[char]++;
                }
            }
            createOutput(output, needle.value, result);
        }
        promptReset();
    });
})();

(function displayAllCounts() {
    totalCount.addEventListener('click', () => {
        // use for in loop to iterate over the object created
        let result = {};
        resetOutput(output);
        if (!haystack.value) {
            output.textContent = "The haystack is empty";
        } else if (needle.value) {
            needle.value = '';
        }
        for (const char of haystack.value) {
            if (char.match(/^[A-Za-z]+$/)) {
                !result[char] ? result[char] = 1 : result[char]++;
            }
        }
        createOutput(output, '', result);
        promptReset();
    })
})();

function resetOutput(output) {
    if (output.textContent) {
        output.textContent = '';
    }
}

function clearInputs() {
    haystack.value = '';
    needle.value = '';
}

function createOutput(output, key = '', hash) {
    if (Object.keys(hash).length > 1) {
        for (const char in hash) {
            output.textContent += `${char}: ${hash[char]}, `;
        }
        output.textContent = output.textContent.slice(0, output.textContent.length - 2) + '.'
    } else {
        output.textContent += `${key}: ${hash[key]}`;
    }

}

function promptReset() {
    if (output.textContent && !document.body.contains(getResetButton())) {
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
        output.textContent = '';
        haystack.value = '';
        needle.value = '';
        if (document.body.contains(reset)) {
            resetArea.removeChild(reset);
        }
    });
}