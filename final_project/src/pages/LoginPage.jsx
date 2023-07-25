import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import { useEffect } from "react";
import { Button, Container, Image, Title, Divider, Space } from "@mantine/core";
import Error from "../components/Error";

const LoginPage = () => {
  const { loading, userInfo, error = null } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
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
            <Title>Авторизация</Title>
            <Divider />
            <Space h={"md"} />
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
            {error && <Error>{error}</Error>}
            <Button
              className="hover:bg-slate-100 ease-in duration-100 w-full"
              variant="default"
              radius="sm"
              disabled={loading}
              type="submit"
            >
              Войти
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

export default LoginPage;
