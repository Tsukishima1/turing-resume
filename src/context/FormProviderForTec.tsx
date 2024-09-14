"use client"
import { createContext, useState, useContext } from 'react'

interface FormData {
  name: string;
  direction: string;
  studentId: string;
  phone: string;
  email: string;
  class: string;
  evaluation: string;
  skills: string;
  expectation: string;
  experience: string;
  others: string;
}

interface FormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const defaultFormData: FormData = {
  name: "",
  direction: "",
  studentId: "",
  phone: "",
  email: "",
  class: "",
  evaluation: "",
  skills: "",
  expectation: "",
  experience: "",
  others: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [formData, setFormData] = useState(defaultFormData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext应该在FormProvider中使用");
  }
  return context;
}

