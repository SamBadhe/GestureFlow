// src/index.js
import handGestureFactory from "./gesture/factories/handGestureFactory.js";

(async () => {
  try {
    await handGestureFactory.initialize(); // Make sure the method is spelled correctly
    // Proceed with rendering your app here if needed
  } catch (error) {
    console.error("Error during the initialization of hand gestures:", error);
  }
})();
