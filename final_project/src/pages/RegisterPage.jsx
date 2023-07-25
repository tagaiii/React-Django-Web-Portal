import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../features/auth/authActions";
import { Button, Container, Image, Title, Divider, Space } from "@mantine/core";

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/profile");
    if (success) navigate("/login");
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();

    dispatch(userRegister(data));
  };

  return (
    <Container size={"md"} py="xl">
      <div className="form-wrapper">
        <div
          style={{
            padding: "24px",
            width: "55%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <Title>Регистрация</Title>
            <Divider/>
            <Space h={'md'} />
            <div className="form-group">
              <label htmlFor="first_name">Ваше имя</label>
              <input
                type="text"
                className="form-input bg-slate-100"
                {...register("first_name")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Ваша фамилия</label>
              <input
                type="text"
                className="form-input bg-slate-100"
                {...register("last_name")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Электронная почта</label>
              <input
                type="email"
                className="form-input bg-slate-100"
                {...register("email")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                className="form-input bg-slate-100"
                {...register("password")}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Подтвердите пароль</label>
              <input
                type="password"
                className="form-input bg-slate-100"
                {...register("confirmPassword")}
                required
              />
            </div>
            <Button
              className="hover:bg-slate-100 ease-in duration-100 w-full"
              variant="default"
              radius="sm"
              disabled={loading}
              type="submit"
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
        <div style={{ width: "45%" }}>
          <Image
            src="https://media.istockphoto.com/id/1000860514/photo/above-view-of-happy-college-students-studying-on-the-floor-at-campus.jpg?s=612x612&w=0&k=20&c=74mJMY0AWFmaQ2VBOMxAaCID7gjzOj0rpfjdpIRu92o="
            alt=""
          />
        </div>
      </div>
    </Container>
  );
};

export default RegisterScreen;
