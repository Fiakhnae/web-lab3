import Navbar from "./NavBar";
import Footer from "./Footer";
import { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";

export interface LoginProps {
  setUserId: (userId?: number) => void;
}

function Login({ setUserId }: LoginProps) {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      axios
        .post("https://localhost:7102/api/users/login", value)
        .then((response) => {
          setUserId(response.data.id);
          formik.resetForm();
          setError("");
          setSuccess("Ви успішно ввійшли");
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            setSuccess("");
            setError(error.response?.data.message);
          }
        });
    },
  });

  return (
    <>
      <Navbar></Navbar>
      <main className="container mt-5">
        <h1>Вхід до сайту</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              required
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Увійти
          </button>
        </form>
        <p style={{ color: "red" }}>{error}</p>
        <p style={{ color: "green" }}>{success}</p>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Login;
