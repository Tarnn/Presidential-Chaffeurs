import React, { useState, useEffect, useRef } from "react";
import { IconButton, Box } from "@mui/material";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import mediaConfig from "../../config/media.json";

const AudioControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true); // Start muted to avoid auto-play
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(mediaConfig.audio.backgroundMusic);
    audio.loop = true;
    audio.volume = 0.3; // Set volume to 30%
    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted && hasInteracted) {
        // Play audio only if unmuted and user has interacted
        const playAudio = async () => {
          try {
            await audioRef.current?.play();
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        };
        playAudio();
      }
    }
  }, [isMuted, hasInteracted]);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (!hasInteracted) {
      setHasInteracted(true); // Mark interaction
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: { xs: 80, md: 88 },
        right: { xs: 16, md: 24 },
        zIndex: 1000,
        backgroundColor: "rgba(42, 42, 42, 0.8)",
        borderRadius: "50%",
        border: "1px solid #D0A42B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0.5,
        backdropFilter: "blur(4px)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(42, 42, 42, 0.9)",
          transform: "scale(1.05)",
        },
      }}
    >
      <IconButton
        onClick={handleToggleMute}
        sx={{
          color: "#D0A42B",
          "&:hover": {
            color: "#FFFFFF",
          },
        }}
        aria-label={
          isMuted ? "Unmute background music" : "Mute background music"
        }
      >
        {isMuted ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
    </Box>
  );
};

export default AudioControls;
