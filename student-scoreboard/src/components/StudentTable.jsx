import StudentRow from './StudentRow';

function StudentTable({ students, onUpdateScore, onDeleteStudent }) {
  if (students.length === 0) {
    return (
      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody />
        </table>
        <div className="empty-state">
          <p>No students in the scoreboard</p>
          <span>Add a student using the form above to get started</span>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onUpdateScore={onUpdateScore}
              onDeleteStudent={onDeleteStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;