const mode = import.meta.env.MODE;

export const apiUrl = mode === 'development' ? '/' : '/comments-replay-template/';
