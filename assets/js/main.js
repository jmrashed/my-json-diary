document.addEventListener('DOMContentLoaded', function() {
    let diaryEntries = [];
    const entriesPerPage = 10;
    let currentPage = 1;
    let currentPin = null;
    let sessionTimeout = null;

    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    document.getElementById('currentDate').textContent = today;

    // Show PIN modal on start
    showPinModal();

    function showPinModal() {
        document.getElementById('pinModal').style.display = 'flex';
        document.getElementById('diaryApp').style.display = 'none';
        document.getElementById('pinInput').value = '';
        document.getElementById('pinInput').focus();
    }

    function hidePinModal() {
        document.getElementById('pinModal').style.display = 'none';
        document.getElementById('diaryApp').style.display = 'block';
        startSessionTimer();
    }

    function startSessionTimer() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(() => {
            showPinModal();
        }, 120000); // 2 minutes
    }

    function loadDiaryData(pin) {
        const savedEntries = localStorage.getItem('diary_' + pin);
        if (savedEntries) {
            diaryEntries = JSON.parse(savedEntries);
        } else {
            diaryEntries = [];
        }
        displayEntries();
    }

    // PIN submission
    document.getElementById('pinSubmit').addEventListener('click', function() {
        const pin = document.getElementById('pinInput').value;
        if (pin.length === 4) {
            currentPin = pin;
            loadDiaryData(pin);
            hidePinModal();
        }
    });

    document.getElementById('pinInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('pinSubmit').click();
        }
    });



    // Display entries for current page
    function displayEntries() {
        const diaryContent = document.getElementById('diaryContent');
        diaryContent.innerHTML = '';
        const totalPages = Math.ceil(diaryEntries.length / entriesPerPage);
        const startIndex = (currentPage - 1) * entriesPerPage;
        const endIndex = Math.min(startIndex + entriesPerPage, diaryEntries.length);

        for (let i = startIndex; i < endIndex; i++) {
            const entry = diaryEntries[i];
            const entryElement = document.createElement('div');
            entryElement.className = 'diary-entry';
            
            const serialNumber = document.createElement('span');
            serialNumber.className = 'entry-serial';
            serialNumber.textContent = (i + 1) + '. ';
            
            const entryText = document.createElement('span');
            entryText.className = 'entry-text';
            entryText.textContent = entry.text;
            
            const entryTimestamp = document.createElement('span');
            entryTimestamp.className = 'entry-timestamp';
            entryTimestamp.textContent = new Date(entry.timestamp).toLocaleString();
            
            entryElement.appendChild(serialNumber);
            entryElement.appendChild(entryText);
            entryElement.appendChild(entryTimestamp);
            diaryContent.appendChild(entryElement);
        }

        updatePagination(totalPages);
    }

    // Update pagination controls
    function updatePagination(totalPages) {
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages;
    }

    // Add new entry
    function addNewEntry() {
        const entryInput = document.getElementById('newEntry');
        const entryText = entryInput.value.trim();
        if (entryText) {
            const newEntry = {
                text: entryText,
                timestamp: new Date().toISOString()
            };
            diaryEntries.push(newEntry);
            entryInput.value = '';
            currentPage = Math.ceil(diaryEntries.length / entriesPerPage);
            displayEntries();
            saveEntries();
            const diaryContent = document.getElementById('diaryContent');
            diaryContent.scrollTop = diaryContent.scrollHeight;
        }
    }

    // Save to localStorage with PIN
    function saveEntries() {
        if (currentPin) {
            localStorage.setItem('diary_' + currentPin, JSON.stringify(diaryEntries));
        }
    }

    // Event handlers
    document.getElementById('addEntry').addEventListener('click', addNewEntry);
    document.getElementById('newEntry').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewEntry();
        }
    });

    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayEntries();
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(diaryEntries.length / entriesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayEntries();
        }
    });

    document.getElementById('downloadJson').addEventListener('click', function() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(diaryEntries, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "diary_entries.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    // Clear all entries
    document.getElementById('clearEntries').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all entries?')) {
            diaryEntries = [];
            currentPage = 1;
            saveEntries();
            displayEntries();
        }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        clearTimeout(sessionTimeout);
        showPinModal();
    });

    // Initialize with empty state
    displayEntries();
});