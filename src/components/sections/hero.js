import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
    position: relative;

    .text-animation {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      span {
        position: absolute;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isFullStack, setIsFullStack] = useState(false); // State to toggle between "Software Developer" and "Full-Stack Engineer"

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFullStack(prevState => !prevState);
    }, 3000); // Change the value every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Cornell Bethea Jr.</h2>;
  const three = (
    <h3 className="big-heading">
      I'm a{' '}
      <span className="text">
        <span className="big-heading2" style={{ opacity: isFullStack ? 1 : 0 }}>Software Developer</span>
        <span className="big-heading21" style={{ opacity: isFullStack ? 0 : 1 }}>Full-Stack Engineer</span>
      </span>
    
    </h3>
  );
  const four = (
    <>
      <p>
        My passion lies within of creating things from start to finish in its entirety. 
        I have gained valuable coding experience through the guidance of {' '}
        <a href="https://www.appacademy.io/learn-more/v-software-engineering-immersive-remote?utm_campaign=17614712393&utm_adgroup=136899141823&utm_matchtype=b&utm_device=c&utm_gclid=CjwKCAjw67ajBhAVEiwA2g_jEME0aHf7EswBJQSzFpD8J6ZEj3X01-J6zNSYOCucmK8JDdS7Kk56xxoCWmcQAvD_BwE&utm_creative=654018815472&utm_keyword=app%20development%20courses&utm_source=google&utm_medium=ppc&utm_adposition=&utm_placement=&utm_location=9129397&utm_network=g&gad=1&gclid=CjwKCAjw67ajBhAVEiwA2g_jEME0aHf7EswBJQSzFpD8J6ZEj3X01-J6zNSYOCucmK8JDdS7Kk56xxoCWmcQAvD_BwE" target="_blank" rel="noreferrer">
          App Academy
        </a>
        {' '}and countless amounts of personally pursued projects.
        Im currently focused on expanding my knowledge and exploring opportunities to join a new team
        where I can continue to grow and thrive.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="mailto:bethea.cornell.b@gmail.com"
      target="_blank"
      rel="noreferrer"
    >
      Connect with me!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
