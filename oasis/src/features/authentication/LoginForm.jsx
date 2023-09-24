import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini"
import { useLogin } from "./useLogin";




function LoginForm() {
  const [email, setEmail] = useState("");//sonu@gmail.com
  const [password, setPassword] = useState("");//password@123

  const { login, isLoading}  = useLogin();

  function handleSubmit(e) {
     e.preventDefault()
     if(!email || !password) return;
     login({email, password}, 
      {
         onSettled: () => {
          setEmail("");
          setPassword("");
         },
     });
  }

  return (

    <Form onSubmit={handleSubmit} >
      
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for pasdeleteBooking(bookingId);sword managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLoading ? <SpinnerMini/>:"Login"}</Button>
      </FormRowVertical>  
     </Form>

  );
}

export default LoginForm;
