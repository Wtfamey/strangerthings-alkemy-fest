import { HeroSection } from '../components/HeroSection';
import { EventsSection } from '../components/EventsSection';
import { SignupSection } from '../components/SignupSection';
import { SponsorsSection } from '../components/SponsorsSection';

export function HomePage() {
    return (
        <main>
            <HeroSection />
            <EventsSection />
            <SignupSection />
            <SponsorsSection />
        </main>
    );
}
