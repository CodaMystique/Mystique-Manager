import { toast } from "react-hot-toast";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import isValidEmail from "./isValidEmail.js";
import isValidDueDate from "./isValidDueDate.js";

const errorToastConfig = {
  icon: FaExclamationCircle(),
  style: {
    borderRadius: "8px",
    background: "#f44336",
    color: "#fff",
    fontSize: "16px",
  },
};

export function validateForLogin({ email, password }) {
  if (!email.trim() || !password.trim()) {
    toast.error("Fill all fields", errorToastConfig);
    return false;
  }

  if (!isValidEmail(email)) {
    toast.error("Enter valid email", errorToastConfig);
    return false;
  }

  return true;
}

export function validateForSignup({
  fullName,
  email,
  password,
  confirmPassword,
}) {
  if (
    !fullName.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim()
  ) {
    toast.error("Fill all fields", errorToastConfig);
    return false;
  }

  if (!isValidEmail(email)) {
    toast.error("Please enter a valid email", errorToastConfig);
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match", errorToastConfig);
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters", errorToastConfig);
    return false;
  }

  return true;
}

export function validateProjectData({ title, description, dueDate }) {
  if (!title.trim() || !description.trim() || !dueDate.trim()) {
    toast.error("Fill all fields", errorToastConfig);
    return false;
  }

  if (!isValidDueDate(dueDate)) {
    toast.error("Due date must be today or future date", errorToastConfig);
    return false;
  }

  return true;
}

export function validateTaskData(task) {
  if (task.trim() === "") {
    toast.error("Task cannot be empty", errorToastConfig);
    return false;
  }
  return true;
}
