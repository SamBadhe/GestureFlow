export default class HandGestureService {
  #gestureEstimator
  #handPoseDetection
  #handsVersion
  #detector = null
  #gestureStrings
  #gestureCounts = {}; // To track counts for each gesture
  #detectionThreshold = 10; // Number of detections required before triggering action
  #cooldown = {}; // To track cooldowns for gestures
  #cooldownDuration = 2000; // Cooldown duration in milliseconds

  constructor({ fingerpose, handPoseDetection, handsVersion, gestureStrings, knownGestures }) {
    this.#gestureEstimator = new fingerpose.GestureEstimator(knownGestures);
    this.#handPoseDetection = handPoseDetection;
    this.#handsVersion = handsVersion;
    this.#gestureStrings = gestureStrings;
  }

  async estimate(keypoints3D) {
    const predictions = await this.#gestureEstimator.estimate(
      this.#getLandMarksFromKeypoints(keypoints3D),
      9
    );

    return predictions.gestures;
  }

  async * detectGestures(predictions) {
    for (const hand of predictions) {
      if (!hand.keypoints3D) {
        continue;
      }

      const gestures = await this.estimate(hand.keypoints3D);

      if (!gestures.length) {
        continue;
      }

      const result = gestures.reduce(
        (previous, current) => (previous.score > current.score) ? previous : current
      );

      const { x, y } = hand.keypoints.find(keypoint => keypoint.name === 'index_finger_tip');

      // Increment the count for the detected gesture
      this.incrementGestureCount(result.name);

      // Check if the gesture has met the detection threshold
      if (this.#gestureCounts[result.name] >= this.#detectionThreshold) {
        // Implement cooldown logic for 🤏 gesture
        if (result.name === "pinch" && this.isCooldownActive(result.name)) {
          return; // Skip yielding if on cooldown
        }

        yield { event: result.name, x, y };
        console.log('detected', this.#gestureStrings[result.name]);

        // Reset the count after triggering the action
        this.resetGestureCount(result.name);

        // Set cooldown for the gesture
        this.setCooldown(result.name);
      }
    }
  }

  incrementGestureCount(gesture) {
    // Initialize count for the gesture if it doesn't exist
    if (!this.#gestureCounts[gesture]) {
      this.#gestureCounts[gesture] = 0;
    }

    // Increment the gesture count
    this.#gestureCounts[gesture]++;
  }

  resetGestureCount(gesture) {
    // Reset the count for this gesture
    this.#gestureCounts[gesture] = 0;
  }

  setCooldown(gesture) {
    this.#cooldown[gesture] = Date.now(); // Set the current timestamp as the cooldown start
  }

  isCooldownActive(gesture) {
    return this.#cooldown[gesture] && (Date.now() - this.#cooldown[gesture] < this.#cooldownDuration);
  }

  #getLandMarksFromKeypoints(keypoints3D) {
    return keypoints3D.map(keypoint => [keypoint.x, keypoint.y, keypoint.z]);
  }

  async estimateHands(video) {
    return this.#detector.estimateHands(video, {
      flipHorizontal: true,
    });
  }

  async initializeDetector() {
    if (this.#detector) {
      return this.#detector;
    }

    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handsVersion}`,
      modelType: 'lite',
      maxHands: 2,
    };

    this.#detector = await this.#handPoseDetection.createDetector(
      this.#handPoseDetection.SupportedModels.MediaPipeHands,
      detectorConfig
    );

    return this.#detector;
  }
}
