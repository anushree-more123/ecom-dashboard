import { useEffect } from "react";
import "./snackbar.css";

interface SnackbarProps {
  message: string;
  type?: "success" | "error";
  open: boolean;
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type = "success",
  open,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  return <div className={`snackbar snackbar-${type}`}>{message}</div>;
};

export default Snackbar;
