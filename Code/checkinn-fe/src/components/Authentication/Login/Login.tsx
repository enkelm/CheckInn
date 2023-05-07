import React, { FC, FormEventHandler } from "react";
import { useDispatch } from "react-redux";
import Card from "../../UI/Card/Card";
import { uiActions } from "../../../store/ui-slice";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {};

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(uiActions.toggleModal());
  };

  return (
    <Card style={{ width: "30vw" }}>
      <form onSubmit={onSubmitHandler}>
        <button onClick={clickHandler}>Click Me</button>
      </form>
    </Card>
  );
};

export default Login;
