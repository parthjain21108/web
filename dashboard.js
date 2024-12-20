// Initialize all tracking variables
let totalCaloriesBurned = 0;
let workoutsCompleted = 0;
let weeklyCalories = [0, 0, 0, 0, 0, 0, 0]; // For the last 7 days
let workoutDistribution = {
    chest: 0,
    back: 0,
    legs: 0,
    arms: 0
};

// Load data from localStorage if available
function loadData() {
    const data = localStorage.getItem('workoutData');
    if (data) {
        const parsedData = JSON.parse(data);
        totalCaloriesBurned = parsedData.totalCaloriesBurned || 0;
        workoutsCompleted = parsedData.workoutsCompleted || 0;
        weeklyCalories = parsedData.weeklyCalories || [0, 0, 0, 0, 0, 0, 0];
        workoutDistribution = parsedData.workoutDistribution || {
            chest: 0,
            back: 0,
            legs: 0,
            arms: 0
        };
    }
}

// Save data to localStorage
function saveData() {
    const data = {
        totalCaloriesBurned,
        workoutsCompleted,
        weeklyCalories,
        workoutDistribution
    };
    localStorage.setItem('workoutData', JSON.stringify(data));
}

// Initialize charts when the DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Check login status
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // Load existing data
    loadData();

    // Initialize Calories Chart
    const caloriesCtx = document.getElementById('caloriesChart').getContext('2d');
    window.caloriesChart = new Chart(caloriesCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Calories Burned',
                data: weeklyCalories,
                borderColor: '#42c8c9',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Initialize Workout Distribution Chart
    const workoutCtx = document.getElementById('workoutChart').getContext('2d');
    window.workoutChart = new Chart(workoutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Chest', 'Back', 'Legs', 'Arms'],
            datasets: [{
                data: [
                    workoutDistribution.chest,
                    workoutDistribution.back,
                    workoutDistribution.legs,
                    workoutDistribution.arms
                ],
                backgroundColor: [
                    '#42c8c9',
                    '#d6abd8',
                    '#eeb5c6',
                    '#b2b4e4'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Add form submission listener
    document.getElementById('workoutForm').addEventListener('submit', handleWorkoutFormSubmit);

    // Update UI with loaded data
    updateMetrics(0);
    updateGoals();
    updateCharts();
});

function handleWorkoutFormSubmit(event) {
    event.preventDefault();

    const muscleGroup = event.target.muscleGroup.value;
    const sets = parseInt(event.target[1].value);
    const reps = parseInt(event.target[2].value);
    const weight = parseInt(event.target[3].value);
    const duration = parseInt(event.target[4].value);

    const caloriesBurned = calculateCalories(sets, reps, weight, duration);
    
    // Update all metrics
    updateMetrics(caloriesBurned, muscleGroup);
    updateGoals();
    updateCharts();

    // Save data to localStorage
    saveData();

    event.target.reset();
}

function calculateCalories(sets, reps, weight, duration) {
    // More accurate calorie calculation
    return Math.floor((sets * reps * weight * 0.1) + (duration * 5));
}

function updateMetrics(caloriesBurned, muscleGroup) {
    // Update total calories
    totalCaloriesBurned += caloriesBurned;
    workoutsCompleted++;

    // Update workout distribution
    workoutDistribution[muscleGroup]++;

    // Calculate average calories per workout
    const avgCaloriesPerWorkout = Math.floor(totalCaloriesBurned / workoutsCompleted);

    // Update DOM elements
    document.querySelectorAll('.metric-value')[0].textContent = totalCaloriesBurned;
    document.querySelectorAll('.metric-value')[1].textContent = workoutsCompleted;
    document.querySelectorAll('.metric-value')[2].textContent = avgCaloriesPerWorkout;
}

function updateGoals() {
    // Update progress bars and text
    const caloriesProgress = document.querySelector('.goal-progress progress');
    const caloriesSpan = document.querySelector('.goal-progress span');
    const workoutsProgress = document.querySelectorAll('.goal-progress progress')[1];
    const workoutsSpan = document.querySelectorAll('.goal-progress span')[1];

    caloriesProgress.value = totalCaloriesBurned;
    caloriesSpan.textContent = `${totalCaloriesBurned}/1000 cal`;

    workoutsProgress.value = workoutsCompleted;
    workoutsSpan.textContent = `${workoutsCompleted}/5 workouts`;
}

function updateCharts() {
    // Update weekly calories chart
    weeklyCalories[weeklyCalories.length - 1] = totalCaloriesBurned;
    window.caloriesChart.data.datasets[0].data = weeklyCalories;
    window.caloriesChart.update();

    // Update workout distribution chart
    window.workoutChart.data.datasets[0].data = [
        workoutDistribution.chest,
        workoutDistribution.back,
        workoutDistribution.legs,
        workoutDistribution.arms
    ];
    window.workoutChart.update();
}