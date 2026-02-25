const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const resumeAPI = {
  getResume: async () => {
    const response = await fetch(`${API_BASE_URL}/api/resume/`);
    return response.json();
  },
  getSkills: async () => {
    const response = await fetch(`${API_BASE_URL}/api/resume/skills`);
    return response.json();
  },
  getProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/api/resume/projects`);
    return response.json();
  },
};

export const chatAPI = {
  sendMessage: async (message: string) => {
    const response = await fetch(`${API_BASE_URL}/api/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    return response.json();
  },
};