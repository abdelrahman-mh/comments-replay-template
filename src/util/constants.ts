const mode = process.env.NODE_ENV;

export const apiUrl = mode === 'development' ? '/' : '/comments-replay-template/';
