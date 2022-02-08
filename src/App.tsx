import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useForm } from "react-hook-form";
import LogRocket from 'logrocket';
import * as yup from 'yup'
LogRocket.init('fzxpr4/learning-react-hook-form');

interface valuesForm {
  Name: string;
  Email: string;
  Telephone: string;
}

const schema = yup.object().shape({
  Name: yup.string().required("Name is required"),
  Email: yup.string().email("Email invalid").required("Email is required"),
  Telephone: yup.string().required("Telephone is required")
})

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: "",
      Email: "",
      Telephone: "",
    },
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");

  const onFormSubmit = (data: valuesForm) => schema.isValid(data).then(valid => console.log(valid));
  const problemFormSubmit = (error: any) => console.log(error);

  const submitFormControlled = () => {
    console.log(email, telephone, name);
  };

  const registerValidation = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    telephone: { required: "Telephone is required" },
  };

  return (
    <div className="App">
      <div>
        <h2>React-Hook-Form</h2>
        <form onSubmit={handleSubmit(onFormSubmit, problemFormSubmit)}>
          <input
            placeholder="Name"
            {...register("Name", registerValidation.name)}
          />
          {errors?.Name && errors.Name?.message}
          <input
            placeholder="Email"
            {...register("Email")}
          />
          {errors?.Email && errors.Email?.message}
          <input
            placeholder="Telephone"
            {...register("Telephone", registerValidation.telephone)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h2>Components Controllers</h2>
        <form onSubmit={submitFormControlled}>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Telephone"
            onChange={(e) => setTelephone(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
