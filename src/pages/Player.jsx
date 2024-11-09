import React, { useRef, useState } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(true); // Track video playback state
  const videoRef = useRef(null); // Reference to the video element
  const navigate = useNavigate();

  // Function to toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause(); // Pause the video
    } else {
      videoRef.current.play(); // Resume the video
    }
    setIsPlaying(!isPlaying); // Toggle the play state
  };

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video
          ref={videoRef}
          src="/assets/video.mp4"
          autoPlay
          loop
          controls
          muted
        />
        {/* Invisible play/pause button in the center */}
        <button className="play-pause-btn" onClick={togglePlay}></button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    position: relative;
    width: 100vw;
    height: 100vh;

    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }

    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .play-pause-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: transparent;
      border: none;
      cursor: pointer;
      width: 200px;
      height: 200px;
      z-index: 2; /* Ensure it's above the video */
    }
  }
`;
