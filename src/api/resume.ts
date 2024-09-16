import axios from 'axios';

interface ResumeDataForTec {
    name: string;
    direction: string;
    student_id: string;
    phone_number: string;
    email: string;
    major: string;
    evaluation: string;
    skills: string;
    expectation: string;
    experience: string;
    others: string;
}

export const apiCreateResumeForTec = async (resumeData: ResumeDataForTec) => {
    try {
        const response = await axios.post('/api/resume/fortec', resumeData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: unknown) {
        throw error;  // 抛出错误以便上层捕获
    }
}

interface ResumeDataForPla {
    name: string;
    student_id: string;
    phone_number: string;
    major: string;
    evaluation: string;
    expertise: string;
    expectation: string;
    experience: string;
    others: string;
}

export const apiCreateResumeForPla = async (resumeData:ResumeDataForPla) => {
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