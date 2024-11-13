// Log error message
export const logError = (message: string) => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
};