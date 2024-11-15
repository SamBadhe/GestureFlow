// src/gesture/factories/handGestureFactory.js

// External Libraries
import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js";
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js";
import "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js";
import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js";
import "https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js";

// Local Modules
import HandGestureController from "../controllers/handGestureController.js";
import HandGestureService from "../services/handGestureService.js";
import HandGestureView from "../views/handGestureView.js";
import Camera from '../../shared/camera.js';
import { fingerLookupIndexes, gestureStrings, knownGestures } from "../utils/util.js";

// Initialize styler
const styler = new PseudoStyler();

const factory = {
  async initialize() {
    try {
      const camera = await Camera.init();
      await HandGestureController.initialize({
        camera,
        view: new HandGestureView({
          fingerLookupIndexes,
          styler
        }),
        service: new HandGestureService({
          gestureStrings,
          knownGestures,
          fingerpose: window.fp,
          handPoseDetection: window.handPoseDetection,
          handsVersion: window.VERSION
        })
      });
    } catch (error) {
      console.error("Error during hand gesture initialization:", error);
    }
  }
};

export default factory;
