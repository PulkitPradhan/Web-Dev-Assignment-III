import { useState, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import AddStudentForm from './components/AddStudentForm';
import StudentTable from './components/StudentTable';

function App() {
  const [students, setStudents] = useState([]);

  const addStudent = useCallback((newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  }, []);

  const updateStudentScore = useCallback((id, score) => {
    if (score === '' || score === null) return;
    const numericScore = parseFloat(score);
    if (isNaN(numericScore)) return;
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, score: numericScore } : student
      )
    );
  }, []);

  const deleteStudent = useCallback((id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }, []);

  const totalStudents = students.length;
  const passCount = students.filter((s) => s.score >= 40).length;
  const failCount = totalStudents - passCount;

  return (
    <div className="app-container">
      <Header />
      <AddStudentForm onAddStudent={addStudent} />
      <StudentTable
        students={students}
        onUpdateScore={updateStudentScore}
        onDeleteStudent={deleteStudent}
      />
      {totalStudents > 0 && (
        <div className="stats-summary">
          <div className="stat-item">
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-item pass-stat">
            <div className="stat-value">{passCount}</div>
            <div className="stat-label">Passing</div>
          </div>
          <div className="stat-item fail-stat">
            <div className="stat-value">{failCount}</div>
            <div className="stat-label">Failing</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;