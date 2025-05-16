import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e: any) => {
    setValues((v: any) => ({ ...v, [e.target.name]: e.target.value }));
  };
  return { values, handleChange, setValues };
}
