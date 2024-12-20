let bmiChart;

function initializeChart() {
    const ctx = document.getElementById('bmiChart').getContext('2d');
    bmiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'BMI History',
                data: [],
                borderColor: '#4CAF50',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 15,
                    suggestedMax: 35
                }
            }
        }
    });
}

function saveBMIToHistory(bmi) {
    const history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
    history.push({
        date: new Date().toLocaleDateString(),
        bmi: bmi
    });
    localStorage.setItem('bmiHistory', JSON.stringify(history));
    updateChart();
}

function updateChart() {
    const history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
    bmiChart.data.labels = history.map(item => item.date);
    bmiChart.data.datasets[0].data = history.map(item => item.bmi);
    bmiChart.update();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    updateChart();
    
    document.getElementById('addCurrentBMI').addEventListener('click', () => {
        const currentBMI = parseFloat(document.getElementById('bmiValue').textContent);
        if (!isNaN(currentBMI)) {
            saveBMIToHistory(currentBMI);
        }
    });

    document.getElementById('clearHistory').addEventListener('click', () => {
        localStorage.removeItem('bmiHistory');
        updateChart();
    });
});

document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to m
    const weight = parseFloat(document.getElementById('weight').value);
    
    const bmi = calculateBMI(weight, height);
    updateBMIDisplay(bmi);
});

function calculateBMI(weight, height) {
    return (weight / (height * height)).toFixed(1);
}

function updateBMIDisplay(bmi) {
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiPointer = document.getElementById('bmiPointer');
    
    bmiValue.textContent = bmi;
    
    // Calculate pointer position (0 to 100%)
    let pointerPosition;
    if (bmi < 15) pointerPosition = 0;
    else if (bmi > 35) pointerPosition = 100;
    else pointerPosition = ((bmi - 15) / 20) * 100;
    
    bmiPointer.style.left = `${pointerPosition}%`;
    
    // Set category and color
    let category, color;
    if (bmi < 18.5) {
        category = "Underweight";
        color = "#3498db";
    } else if (bmi < 25) {
        category = "Normal";
        color = "#2ecc71";
    } else if (bmi < 30) {
        category = "Overweight";
        color = "#f1c40f";
    } else {
        category = "Obese";
        color = "#e74c3c";
    }
    
    bmiCategory.textContent = category;
    bmiCategory.style.color = color;
    bmiPointer.style.backgroundColor = color;
} 