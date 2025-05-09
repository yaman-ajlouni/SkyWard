import React, { useEffect } from 'react'
import Hero from './hero/Hero';
import ExploreSyria from './exploreSyria/ExploreSyria';
import PlanYourJourney from './planYourJourney/PlanYourJourney';
import TopDestinations from './topDestinations/TopDestinations';
import BookAdventure from './bookAdventure/BookAdventure';
import Highlight from './highlight/Highlight';
import Newsletter from './newsletter/Newsletter';

export const LandingPage = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Hero />
            <ExploreSyria />
            <TopDestinations />
            <BookAdventure />
            <PlanYourJourney />
            <Highlight />
            <Newsletter />
        </>
    )
}
