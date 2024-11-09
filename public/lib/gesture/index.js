document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing hand gesture factory...');
    await handGestureFactory.initialize();
    console.log('Hand gesture factory initialized.');
});
