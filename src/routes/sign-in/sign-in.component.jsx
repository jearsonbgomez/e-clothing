import { signInWithGooglePopup, upsertUser } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

  const openSignInModal = async () => {
    const { user } = await signInWithGooglePopup();

    const createOrUpdateUser = await upsertUser(user);

  } 
  return (

      <div>
        <h1>Sign In Page</h1>
        <button onClick={openSignInModal}>Sign In With Google</button>
      </div>

  )
}

export default SignIn;