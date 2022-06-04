import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>

      <SignUpForm />
    </div>
  );
};

export default SignIn;
