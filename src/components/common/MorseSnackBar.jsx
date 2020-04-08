import React, {useEffect} from "react";
import "./MorseSnackBar.css";
import Button from "./IconButton";
import { FiX as CloseIcon } from "react-icons/fi";

let timeout;

export default function SnackBar({open, onClose, ...props}) {

  useEffect(() => {
    if (open) {
      window.clearTimeout(timeout);
      timeout = setTimeout(() => {
        onClose();
      }, 5500);
    } else {
      window.clearTimeout(timeout);
    }
  }, [open]);

  return (
    <div 
      className={`MorseSnackBar ${open && 'show'}`}
      onMouseEnter={() => {window.clearTimeout(timeout);}}
      onMouseLeave={
        () => {
          if (open) {
            timeout = setTimeout(() => {
              onClose();
              window.clearTimeout(timeout);
            }, 5500);
          }
        }
      }
    >
      {props.children}
      <Button icon={CloseIcon} 
        onClick={() => onClose()}
        tooltip={"Close"}
        {...(!open && {tabindex: "-1"})}
      />
      </div>
  );
}
