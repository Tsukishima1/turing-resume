import axios from 'axios';

export const apiCreateResumeForTec = async (resumeData) => {
    try {
        const response = await axios.post('/api/resume/fortec', resumeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating resume:', error);
        throw error;
    }
}

export const apiCreateResumeForPla = async (resumeData) => {
    try {
        const response = await axios.post('/api/resume/forpla', resumeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating resume:', error);
        throw error;
    }
}