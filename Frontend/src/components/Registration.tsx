import Navbar from "./NavBar";
import Footer from "./Footer";
import User from "../entity/User";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export interface RegistrationProps {
  setUserId: (userId?: number) => void;
}

function Registration({ setUserId }: RegistrationProps) {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      sex: 0,
      birthday: "",
      password: "",
    },
    onSubmit: (value) => {
      const user: User = {
        email: value.email,
        password: value.password,
        name: value.name,
        birthday: new Date(value.birthday),
        sex: value.sex,
      };
      axios
        .post("https://localhost:7102/api/users/register", user)
        .then((response) => {
          setUserId(response.data.id);
          formik.resetForm();
          setSuccess("Ви успішно зареєструвались");
          setError("");
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            setError(error.response?.data.message);
            setSuccess("");
          }
        });
    },
  });

  return (
    <>
      <Navbar></Navbar>
      <main className="container mt-5">
        <h1>Реєстрація користувача</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ім'я:</label>
            <input
              className="form-control"
              required
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Пароль:</label>
            <input
              className="form-control"
              required
              id="password"
              name="password"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email:</label>
            <input
              className="form-control"
              required
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Стать:</label>
            <select
              className="form-control"
              required
              id="sex"
              name="sex"
              onChange={formik.handleChange}
              value={formik.values.sex}
            >
              <option value={0}>Чоловіча</option>
              <option value={1}>Жіноча</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dob">Дата народження:</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              required
              onChange={formik.handleChange}
              value={formik.values.birthday}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Зареєструватися
          </button>
        </form>
        <p style={{ color: "red" }}>{error}</p>
        <p style={{ color: "green" }}>{success}</p>
      </main>
      <Footer></Footer>
    </>
  );
}

export default Registration;
