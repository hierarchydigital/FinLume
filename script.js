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

function togglePopup() {
    const popupContainer = document.getElementById("popupContainer");
    const popupOverlay = document.getElementById("popupOverlay");
    const isVisible = popupContainer.style.display === "block";

    popupContainer.style.display = isVisible ? "none" : "block";
    popupOverlay.style.display = isVisible ? "none" : "block";
  }
  
  function calculateTax() {
    const incomeToggle = document.getElementById("incomeToggle").value;
    const incomeInput = parseFloat(document.getElementById("incomeInput").value) || 0;
    const medicalAidInput = parseFloat(document.getElementById("medicalAidInput").value) || 0;
    const medicalAidToggle = document.getElementById("medicalAidToggle").value;
  
    let yearlyIncome, yearlyMedicalAid;
  
    if (medicalAidToggle === "monthly") {
      yearlyMedicalAid = medicalAidInput * 12;
    } else {
      yearlyMedicalAid = medicalAidInput;
    }
  
    if (incomeToggle === "monthly") {
      yearlyIncome = incomeInput * 12;
    } else {
      yearlyIncome = incomeInput;
    }
  
    const taxableIncome = yearlyIncome;
    const taxRate = (taxableIncome > 237100) ? 0.26 : 0.18;
    let taxAmount = taxableIncome * taxRate;
  
    const donationsCheckbox = document.getElementById("donations");
    let donationAmount = 0;
  
    if (donationsCheckbox.checked) {
      donationAmount = parseFloat(prompt("Enter donation amount:")) || 0;
    }
  
    const pensionCheckbox = document.getElementById("pension");
    let pensionAmount = 0;
  
    if (pensionCheckbox.checked) {
      pensionAmount = yearlyIncome * (parseFloat(prompt("Enter pension fund percentage (e.g., '10' for 10%):")) || 0) / 100;
    }
  
    const uifCheckbox = document.getElementById("uif");
    let uifAmount = 0;
  
    if (uifCheckbox.checked) {
      uifAmount = yearlyIncome * 0.01;
    }
  
    const carRepayments = (parseFloat(document.getElementById("carRepayments").value) || 0) * 12;
    const houseRepayments = (parseFloat(document.getElementById("houseRepayments").value) || 0) * 12;
    const cellphoneRepayments = (parseFloat(document.getElementById("cellphoneRepayments").value) || 0) * 12;
  
    const deductions = pensionAmount + donationAmount + yearlyMedicalAid + uifAmount + carRepayments + houseRepayments + cellphoneRepayments;
  
    const netIncome = taxableIncome - taxAmount - deductions;
    const monthlyNetIncome = netIncome / 12;
    const monthlyDeductions = deductions / 12;
    const grossIncome = taxableIncome - taxAmount;
    const monthlyGross = grossIncome / 12;
  
    const taxResult = document.getElementById("taxResult");
    const progressBar = document.getElementById("progressBar");
  
    taxResult.innerHTML = `
      <strong>Taxable income (yearly):</strong> R${taxableIncome.toFixed(2)}<br>
      <strong>Total tax (yearly):</strong> R${taxAmount.toFixed(2)}<br>
      <strong>Gross Income (yearly):</strong> R${grossIncome.toFixed(2)}<br>
      <strong>Gross Income (monthly):</strong> R${monthlyGross.toFixed(2)}<br>
      <strong>Total deductions (yearly):</strong> R${deductions.toFixed(2)}<br>
      <strong>Total deductions (monthly):</strong> R${monthlyDeductions.toFixed(2)}<br>
      <strong>Take Home (yearly):</strong> R${netIncome.toFixed(2)}<br>
      <strong>Take Home (monthly):</strong> R${monthlyNetIncome.toFixed(2)}
    `;
  
    progressBar.style.width = "100%";
    setTimeout(() => { progressBar.style.width = "0"; }, 2000);
  }
 