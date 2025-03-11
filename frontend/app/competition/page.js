// app/competition/page.js
import OnboardingScreen from '../components/OnboardingScreen';
import competitionImage from '../../public/competition.svg';

export default function Competition() {
  return (
    <OnboardingScreen
      title="Engage in friendly competition"
      subtitle="with friends or the broader community"
      buttonText="Continue"
      linkText="Already have an account?"
      nextPath="/topics" // Replace with the next screen path
      image={competitionImage}
    />
  );
}