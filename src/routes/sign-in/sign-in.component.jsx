import { useContext, useState } from "react";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { authenticateUser, upsertUser, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import './sign-in.styles.scss';

const user = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [ fields, setFields ] = useState(user);
  const { email, password } = fields;

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFields({ ...fields, [name]: value});
  }

  const resetForm = () => {

    setFields(user);
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      await authenticateUser(email, password);
      resetForm();

    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password whit this email.')
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email.')
          break;
        default:
          console.error(error);
      }
    }
  }

  const openSignInModal = async () => {
    await signInWithGooglePopup();
  } 

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button buttonType="inverted" type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={openSignInModal}>Google Sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignIn;