import { useState, useCallback } from 'react';

const INITIAL_STATE = { name: '', score: '' };

function AddStudentForm({ onAddStudent }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = useCallback((name, score) => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Student name is required';
    }

    if (score === '') {
      newErrors.score = 'Score is required';
    } else {
      const numericScore = parseFloat(score);
      if (isNaN(numericScore)) {
        newErrors.score = 'Please enter a valid number';
      } else if (numericScore < 0) {
        newErrors.score = 'Score cannot be negative';
      } else if (numericScore > 100) {
        newErrors.score = 'Score cannot exceed 100';
      }
    }

    return newErrors;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const newErrors = validate(
        name === 'name' ? value : form.name,
        name === 'score' ? value : form.score
      );
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  }, [form, touched, validate]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form.name, form.score);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  }, [form, validate]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const newErrors = validate(form.name, form.score);
    setErrors(newErrors);
    setTouched({ name: true, score: true });

    if (Object.keys(newErrors).length > 0) return;

    onAddStudent({
      id: Date.now(),
      name: form.name.trim(),
      score: parseFloat(form.score),
    });

    setForm(INITIAL_STATE);
    setTouched({});
    setErrors({});
  }, [form, validate, onAddStudent]);

  const getInputClass = (field) => {
    return errors[field] && touched[field] ? 'error' : '';
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Student</h2>
      <form className="add-student-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="studentName">Student Name</label>
          <input
            type="text"
            id="studentName"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter student name"
            className={getInputClass('name')}
            autoComplete="off"
          />
          {errors.name && touched.name && (
            <span className="error-message">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="studentScore">Initial Score</label>
          <input
            type="number"
            id="studentScore"
            name="score"
            value={form.score}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="0 - 100"
            min="0"
            max="100"
            className={getInputClass('score')}
          />
          {errors.score && touched.score && (
            <span className="error-message">{errors.score}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudentForm;