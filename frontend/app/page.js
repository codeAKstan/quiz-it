// app/page.js
import OnboardingScreen from './components/OnboardingScreen';
import welcomeImage from '../public/welcome.png';

export default function Home() {
  return (
    <OnboardingScreen
      title="Welcome"
      subtitle="Earn through quiz"
      buttonText="Continue"
      linkText="Already have an account?"
      nextPath="/topic"
      image={welcomeImage}
    />
  );
}