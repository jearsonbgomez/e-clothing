import { useState } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { registerUser, upsertUser } from "../../utils/firebase/firebase.utils";
import './sign-up.styles.scss';

const user = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUp = () => {
  const [ fields, setFields ] = useState(user);
  const { displayName, email, password, confirmPassword } = fields;

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFields({ ...fields, [name]: value});
  }

  const resetForm = () => {

    setFields(user);
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    if(password !== confirmPassword){
      return;
    }

    try {
      const { user } = await registerUser(email, password);
      
      await upsertUser(user, {
        displayName
      });

      resetForm();

    } catch (error) {
      console.error(error);
    }

  }
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput 
          label="Display Name"
          options={{  
            type:"text",
            name:"displayName",
            value: displayName,
            required: true,
            onChange:handleOnChange
          }}
        />
        <FormInput 
          label="Email"
          options={{
            type:"text",
            name:"email",
            value: email,
            required: true,
            onChange:handleOnChange
          }}
        />
        <FormInput 
          label="Password"
          options={{
            type:"password",
            name:"password",
            value: password,
            required: true,
            onChange:handleOnChange
          }}
        />
        <FormInput 
          label="Confirm Password"
          options={{
            type:"password",
            name:"confirmPassword",
            value: confirmPassword,
            required: true,
            onChange:handleOnChange
          }}
        />
        <Button buttonType="inverted" type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUp;