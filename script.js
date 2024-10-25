const themeToggle = document.getElementById("theme-toggle");
const logo = document.getElementById("logo");

themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");

    // Change logo based on the current theme
    if (document.body.classList.contains("dark-mode")) {
        logo.src = "https://img.icons8.com/material/100/google-wallet.png"; // Dark mode logo
    } else {
        logo.src = "https://img.icons8.com/ios/100/google-wallet.png"; // Light mode logo (same for now)
    }
});



// Budget Calculation
document.getElementById('budget-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    const savings = income - expenses;
    const result = document.getElementById('result');

    result.innerHTML = savings >= 0
        ? `You will save R${savings} this month!`
        : `You are overspending by R${Math.abs(savings)}.`;
});


// Mortgage Calculator Modal
const mortgageBtn = document.getElementById('mortgage-calc-btn');
const mortgageModal = document.getElementById('mortgage-modal');
const closeModal = document.getElementById('close-modal');
const calculateBtn = document.getElementById('calculate-btn');
const monthlyPaymentDisplay = document.getElementById('monthly-payment');

mortgageBtn.onclick = function() {
    mortgageModal.style.display = "block";
}

closeModal.onclick = function() {
    mortgageModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == mortgageModal) {
        mortgageModal.style.display = "none";
    }
}

// Mortgage Calculation
calculateBtn.onclick = function() {
    const homePrice = parseFloat(document.getElementById('home-price').value);
    const downPayment = parseFloat(document.getElementById('down-payment').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const loanTerm = parseFloat(document.getElementById('loan-term').value) * 12;

    const loanAmount = homePrice - downPayment;
    const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));

    monthlyPaymentDisplay.innerText = `Estimated Monthly Payment: R ${monthlyPayment.toFixed(2)}`;
}
