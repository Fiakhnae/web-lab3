import Navbar from "./NavBar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import User from "../entity/User";
import axios from "axios";

export interface ProfileProps {
  userId?: number;
}

function Profile({ userId }: ProfileProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (userId !== undefined) {
      axios
        .get("https://localhost:7102/api/users/" + userId)
        .then((response) => {
          const value = response.data;
          setUser({
            email: value.email,
            password: value.password,
            name: value.name,
            birthday: new Date(value.birthday),
            sex: value.sex,
          });
        });
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <main className="container mt-5">
        <h1>Профіль</h1>
        {userId !== undefined ? (
          <div className="row align-items-center">
            <div className="col-md-12 al">
              <p>
                <strong>Ім'я:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Стать:</strong> {user?.sex === 0 ? "Чоловік" : "Жінка"}
              </p>
              <p>
                <strong>Рік народження:</strong>{" "}
                {user?.birthday.toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="row align-items-center">
            <div className="col-md-4">
              <p>Ви не авторизувалися!</p>
              <button id="stopButton" className="btn btn-primary">
                <Link className="nav-link" to="/login">
                  Ввійти
                </Link>
              </button>
              <button id="stopButton" className="btn btn-primary">
                <Link className="nav-link" to="/register">
                  Зареєструватися
                </Link>
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default Profile;
