import React, {useState, useContext, useEffect} from "react";
import "./MorseSnackBar.css";
import Button from "./IconButton";
import { FiPlayCircle  as PlayIcon } from "react-icons/fi";
import { FiStopCircle  as StopIcon } from "react-icons/fi";
import { FiX as CloseIcon } from "react-icons/fi";
import * as morsetrans from "../../services/morse/morse-translation.js";
import AudioContext from "../../context/AudioContext";

let timeout;

export default function SnackBar({char, open, onClose}) {
  const {play, stop, isPlaying} = useContext(AudioContext);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (open) {
      window.clearTimeout(timeout);
      timeout = setTimeout(() => {
        onClose();
      }, 5500);
    } else {
      window.clearTimeout(timeout);
    }
  }, [open, char]);

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
      <div>
        <Button 
          icon={playing ? StopIcon : PlayIcon}
          tooltip={playing ? "Stop" : "Play"}
          size={"large"}
          onClick={() => {
            if (isPlaying() === false) {
              play(morsetrans.translateTextToMorse(char), () => {
                setPlaying(false);
              });
              setPlaying(true);
            } else {
              stop();
            }
          }
        }/>
        <div className="msbTextContainer">
          <span className="msbTitle">Latest Addition:</span>
          <div>
            <span className="msbChar">{char.toUpperCase()}</span>
            <span className="msbMorse">{morsetrans.translateTextToMorse(char).replace(/-/g, "−").replace(/\./g, "·")}</span>
          </div>
        </div>
      </div>
      <Button icon={CloseIcon} 
        onClick={() => onClose()}
        tooltip={"Close"} 
      />
    </div>
  );
}
