import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const ProgressPage = () => {
  const [workoutHistory, setWorkoutHistory] = React.useState(
    JSON.parse(localStorage.getItem("gzspWorkoutHistory")) || []
  );
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClearProgress = () => {
    localStorage.removeItem("gzspWorkoutHistory");
    setWorkoutHistory([]);
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Прогресс
          </Typography>
          {workoutHistory.length > 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDialog}
            >
              Очистить историю
            </Button>
          )}
        </Box>

        {workoutHistory.length === 0 ? (
          <Typography variant="body1">Нет данных о тренировках</Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Дата</TableCell>
                    <TableCell>Тренировка</TableCell>
                    <TableCell>Упражнения</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workoutHistory.map((workout, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {format(new Date(workout.date), "dd.MM.yyyy", {
                          locale: ru,
                        })}
                      </TableCell>
                      <TableCell>{workout.day}</TableCell>
                      <TableCell>
                        <ul style={{ margin: 0, paddingLeft: "20px" }}>
                          {workout.exercises.map((exercise, exIndex) => (
                            <li key={exIndex}>
                              {exercise.name} - {exercise.sets}x{exercise.reps}{" "}
                              {exercise.weight && `(${exercise.weight} кг)`}
                              {exercise.completed && " ✓"}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Подтверждение удаления
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Вы уверены, что хотите полностью очистить историю тренировок? Это
              действие нельзя отменить.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Отмена</Button>
            <Button onClick={handleClearProgress} color="error" autoFocus>
              Очистить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ProgressPage;
