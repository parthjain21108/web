const workoutDetails = {
    push: {
        title: "Push Day Workout",
        exercises: [
            {
                name: "Bench Press",
                sets: "4 sets",
                reps: "8-12 reps",
                notes: "Focus on chest contraction"
            },
            {
                name: "Overhead Press",
                sets: "3 sets",
                reps: "8-12 reps",
                notes: "Keep core tight"
            },
            {
                name: "Incline Dumbbell Press",
                sets: "3 sets",
                reps: "10-12 reps",
                notes: "30-45 degree angle"
            },
            {
                name: "Lateral Raises",
                sets: "3 sets",
                reps: "12-15 reps",
                notes: "Control the movement"
            },
            {
                name: "Tricep Pushdowns",
                sets: "3 sets",
                reps: "12-15 reps",
                notes: "Keep elbows tucked"
            }
        ]
    },
    pull: {
        title: "Pull Day Workout",
        exercises: [
            {
                name: "Deadlifts",
                sets: "4 sets",
                reps: "6-8 reps",
                notes: "Maintain proper form"
            },
            {
                name: "Pull-ups/Lat Pulldowns",
                sets: "3 sets",
                reps: "8-12 reps",
                notes: "Full range of motion"
            },
            {
                name: "Barbell Rows",
                sets: "3 sets",
                reps: "8-12 reps",
                notes: "Squeeze shoulder blades"
            },
            {
                name: "Bicep Curls",
                sets: "3 sets",
                reps: "12-15 reps",
                notes: "Control the negative"
            }
        ]
    },
    legs: {
        title: "Legs Day Workout",
        exercises: [
            {
                name: "Squats",
                sets: "4 sets",
                reps: "8-12 reps",
                notes: "Break parallel"
            },
            {
                name: "Romanian Deadlifts",
                sets: "3 sets",
                reps: "10-12 reps",
                notes: "Feel the hamstrings"
            },
            {
                name: "Leg Press",
                sets: "3 sets",
                reps: "10-12 reps",
                notes: "Control the movement"
            },
            {
                name: "Calf Raises",
                sets: "4 sets",
                reps: "15-20 reps",
                notes: "Full extension"
            }
        ]
    }
};

function showWorkoutDetails(type) {
    const modal = document.getElementById('workoutModal');
    const modalTitle = document.getElementById('modalTitle');
    const exerciseList = document.getElementById('exerciseList');
    
    modalTitle.textContent = workoutDetails[type].title;
    exerciseList.innerHTML = '';
    
    workoutDetails[type].exercises.forEach(exercise => {
        exerciseList.innerHTML += `
            <div class="exercise-item">
                <h3>${exercise.name}</h3>
                <p><strong>Sets:</strong> ${exercise.sets}</p>
                <p><strong>Reps:</strong> ${exercise.reps}</p>
                <p><strong>Notes:</strong> ${exercise.notes}</p>
            </div>
        `;
    });
    
    modal.style.display = 'block';
}

// Close modal when clicking the X or outside the modal
document.querySelector('.close-modal').onclick = function() {
    document.getElementById('workoutModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('workoutModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
} 