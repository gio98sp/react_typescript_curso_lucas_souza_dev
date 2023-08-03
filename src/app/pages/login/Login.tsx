import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";
import { useUsuarioLogado } from "../../shared/hooks";

export const Login = () => {
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailLength = useMemo(() => {
    console.log("Executou");
    return email.length * 1000;
  }, [email.length]);

  const handleLogin = useCallback(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  const { userName } = useUsuarioLogado()

  return (
    <div>
      <Link to={"/Dashboard"}>Dashboard</Link>
      <form>
        <p>Quantidade de caracteres no email: {emailLength}</p>

        <p>{ userName }</p>

        <InputLogin
          htmlFor="email"
          label="Email:"
          name="email"
          type="email"
          value={email}
          onChange={newValue => setEmail(newValue)}
          onPressEnter={() => inputPasswordRef.current?.focus()}
        />
        <InputLogin
          htmlFor="password"
          label="Senha:"
          name="password"
          type="password"
          value={password}
          onChange={newValue => setPassword(newValue)}
          ref={inputPasswordRef}
        />

        <ButtonLogin type="button" onClick={handleLogin}>
          Entrar
        </ButtonLogin>
        <ButtonLogin type="button" onClick={handleLogin}>
          Cadastrar
        </ButtonLogin>
      </form>
    </div>
  );
};
