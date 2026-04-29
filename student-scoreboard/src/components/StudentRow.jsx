import { useState, useCallback, useEffect, useRef } from 'react';

function StudentRow({ student, onUpdateScore, onDeleteStudent }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const deleteTimeoutRef = useRef(null);

  const isPassing = student.score >= 40;

  const handleScoreChange = useCallback((e) => {
    const value = e.target.value;
    if (value === '') {
      onUpdateScore(student.id, '');
      return;
    }
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      onUpdateScore(student.id, numericValue);
    }
  }, [student.id, onUpdateScore]);

  const handleDelete = useCallback(() => {
    if (isDeleting) return;
    setIsDeleting(true);
    deleteTimeoutRef.current = setTimeout(() => {
      onDeleteStudent(student.id);
    }, 280);
  }, [isDeleting, student.id, onDeleteStudent]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.select();
    }
  }, [isFocused]);

  return (
    <tr className={`student-row ${isDeleting ? 'deleting' : ''}`}>
      <td className="student-name">{student.name}</td>
      <td>
        <input
          ref={inputRef}
          type="number"
          className="score-input"
          value={student.score}
          onChange={handleScoreChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          min="0"
          max="100"
          aria-label={`Score for ${student.name}`}
        />
      </td>
      <td>
        <span
          className={`status ${isPassing ? 'pass' : 'fail'}`}
          role="status"
          aria-live="polite"
        >
          {isPassing ? 'Pass' : 'Fail'}
        </span>
      </td>
      <td className="actions">
        <button
          className="remove-btn"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label={`Remove ${student.name}`}
        >
          {isDeleting ? 'Removing...' : 'Remove'}
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;