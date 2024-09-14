"use client"
import { createContext, useState, useContext } from 'react'

interface FormData {
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

interface FormContextType {
  formDataForPla: FormData;
  setFormDataForPla: React.Dispatch<React.SetStateAction<FormData>>;
}

const defaultFormData: FormData = {
  name: "",
  student_id: "",
  phone_number: "",
  major: "",
  evaluation: "",
  expertise: "",
  expectation: "",
  experience: "",
  others: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProviderForPla = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [formDataForPla, setFormDataForPla] = useState(defaultFormData);

  return (
    <FormContext.Provider value={{ formDataForPla, setFormDataForPla }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContextForPla = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContextForPla应该在FormProviderForPla中使用");
  }
  return context;
}