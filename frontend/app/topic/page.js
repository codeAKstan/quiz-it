// app/topics/page.js
import OnboardingScreen from '../components/OnboardingScreen';
import topicsImage from '../../public/topics.png';

export default function Topics() {
  return (
    <OnboardingScreen
      title="Effective quiz experience"
      subtitle="across a range of topics, from tech, science, arts to finance"
      buttonText="Continue"
      linkText="Already have an account?"
      nextPath="/competition"
      image={topicsImage}
    />
  );
}