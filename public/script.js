document.getElementById('redirect-btn').addEventListener('click', function() {
    const countryCode = document.getElementById('country-code').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const message = document.getElementById('message').value;

    if (!phoneNumber || isNaN(phoneNumber)) {
        alert("Please enter a valid phone number.");
        return;
    }

    const url = `https://wa.me/${encodeURIComponent(countryCode + phoneNumber)}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
});

window.onload = function () {
    // Call the function to set the default country
    setDefaultCountry();
}

function validatePhoneNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

// Fetch the user's country based on their IP
async function setDefaultCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code; // This will give you something like 'US', 'GB', etc.
        const fullCountryCode = data.country_calling_code; // This will give you something like '+1', '+44', etc.

        // Select the corresponding country code in the dropdown
        const countrySelect = document.getElementById('country-code');
        for (let i = 0; i < countrySelect.options.length; i++) {
            if (countrySelect.options[i].value === fullCountryCode) {
                countrySelect.selectedIndex = i;
                break;
            }
        }
    } catch (error) {
        console.error('Error fetching the user location:', error);
    }
}

