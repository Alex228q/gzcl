import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const workoutTemplates = {
  day1: {
    title: "День 1",
    exercises: [
      {
        name: "Приседания со штангой",
        sets: 5,
        reps: "3+",
        completed: false,
        weight: "",
      },
      { name: "Жим лёжа", sets: 3, reps: 10, completed: false, weight: "" },
      {
        name: "Отжимания на брусьях",
        sets: 3,
        reps: "15+",
        completed: false,
        weight: "",
      },
    ],
  },
  day2: {
    title: "День 2",
    exercises: [
      {
        name: "Армейский жим",
        sets: 5,
        reps: "3+",
        completed: false,
        weight: "",
      },
      {
        name: "Становая тяга",
        sets: 3,
        reps: 10,
        completed: false,
        weight: "",
      },
      {
        name: "Тяга в наклоне",
        sets: 3,
        reps: "15+",
        completed: false,
        weight: "",
      },
    ],
  },
  day3: {
    title: "День 3",
    exercises: [
      {
        name: "Жим лёжа",
        sets: 5,
        reps: "3+",
        completed: false,
        weight: "",
      },
      {
        name: "Приседания",
        sets: 3,
        reps: 10,
        completed: false,
        weight: "",
      },
      {
        name: "Подтягивания",
        sets: 3,
        reps: "15+",
        completed: false,
        weight: "",
      },
    ],
  },
  day4: {
    title: "День 4",
    exercises: [
      {
        name: "Становая тяга",
        sets: 5,
        reps: "3+",
        completed: false,
        weight: "",
      },
      {
        name: "Армейский жим",
        sets: 3,
        reps: 10,
        completed: false,
        weight: "",
      },
      {
        name: "Австралийские подтягивания",
        sets: 3,
        reps: "15+",
        completed: false,
        weight: "",
      },
    ],
  },
};

const WorkoutPage = () => {
  const [currentDay, setCurrentDay] = useState("day1");
  const [workout, setWorkout] = useState(workoutTemplates.day1);
  const [workoutDate, setWorkoutDate] = useState(new Date());
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [editingExercise, setEditingExercise] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem("gzspWorkoutHistory");
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleDayChange = (day) => {
    setCurrentDay(day);
    setWorkout(workoutTemplates[day]);
    setEditingExercise(null);
  };

  const handleExerciseChange = (exerciseIndex, field, value) => {
    const updatedExercises = [...workout.exercises];
    updatedExercises[exerciseIndex][field] = value;
    setWorkout({ ...workout, exercises: updatedExercises });
  };

  const startEditing = (index) => {
    setEditingExercise(index);
  };

  const saveEditing = (index) => {
    setEditingExercise(null);
  };

  const saveWorkout = () => {
    const newWorkoutEntry = {
      date: workoutDate,
      day: currentDay,
      exercises: workout.exercises,
    };

    const updatedHistory = [...workoutHistory, newWorkoutEntry];
    setWorkoutHistory(updatedHistory);
    localStorage.setItem("gzspWorkoutHistory", JSON.stringify(updatedHistory));
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {Object.keys(workoutTemplates).map((day) => (
            <Button
              key={day}
              variant={currentDay === day ? "contained" : "outlined"}
              onClick={() => handleDayChange(day)}
            >
              {workoutTemplates[day].title}
            </Button>
          ))}
        </Box>

        <TextField
          label="Дата тренировки"
          type="date"
          value={format(workoutDate, "yyyy-MM-dd")}
          onChange={(e) => setWorkoutDate(new Date(e.target.value))}
          sx={{ mb: 3 }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {workout.title}
          </Typography>

          {workout.exercises.map((exercise, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                backgroundColor: exercise.completed ? "inherit" : "inherit",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{exercise.name}</Typography>
                {editingExercise === index ? (
                  <IconButton
                    onClick={() => saveEditing(index)}
                    color="primary"
                  >
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => startEditing(index)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Box>

              {editingExercise === index ? (
                <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                  <TextField
                    label="Подходы"
                    type="number"
                    value={exercise.sets}
                    onChange={(e) =>
                      handleExerciseChange(index, "sets", e.target.value)
                    }
                    size="small"
                    sx={{ width: "100px" }}
                    inputProps={{ min: 1 }}
                  />
                  <TextField
                    label="Повторения"
                    value={exercise.reps}
                    onChange={(e) =>
                      handleExerciseChange(index, "reps", e.target.value)
                    }
                    size="small"
                    sx={{ width: "100px" }}
                  />
                </Box>
              ) : (
                <Typography sx={{ mt: 1 }}>
                  Подходы: {exercise.sets} | Повторения: {exercise.reps}
                </Typography>
              )}

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exercise.completed}
                      onChange={(e) =>
                        handleExerciseChange(
                          index,
                          "completed",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Выполнено"
                />

                <TextField
                  label="Вес (кг)"
                  type="number"
                  value={exercise.weight}
                  onChange={(e) =>
                    handleExerciseChange(index, "weight", e.target.value)
                  }
                  size="small"
                  sx={{ ml: 2, width: "100px" }}
                  inputProps={{ min: 0 }}
                />
              </Box>
            </Box>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={saveWorkout}
            sx={{ mt: 2 }}
            fullWidth
          >
            Сохранить тренировку
          </Button>
        </Paper>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Тренировка успешно сохранена!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default WorkoutPage;
