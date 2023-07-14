import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['App Academy Full Stack Web Development (2023)', 'Winston Salem State University BS Business Management (2019)'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! I'm Cornell and Welcome to my personal portfolio site, where technology meets limitless imagination! 
              I am a full-stack software engineer based in New York City, and my journey into software development 
              began through my love for videography and cinematography. After nearly two years of self-directed learning,
              I made a dedicated transition into this field.
            </p>

            <p>
            Skip ahead to now,  I’ve had the privilege of attending{' '}
              <a href="https://www.appacademy.io/learn-more/v-software-engineering-immersive-remote?utm_campaign=17614712393&utm_adgroup=136899141823&utm_matchtype=b&utm_device=c&utm_gclid=CjwKCAjw67ajBhAVEiwA2g_jEME0aHf7EswBJQSzFpD8J6ZEj3X01-J6zNSYOCucmK8JDdS7Kk56xxoCWmcQAvD_BwE&utm_creative=654018815472&utm_keyword=app%20development%20courses&utm_source=google&utm_medium=ppc&utm_adposition=&utm_placement=&utm_location=9129397&utm_network=g&gad=1&gclid=CjwKCAjw67ajBhAVEiwA2g_jEME0aHf7EswBJQSzFpD8J6ZEj3X01-J6zNSYOCucmK8JDdS7Kk56xxoCWmcQAvD_BwE">
                App Academy</a>,{' '} earlier this year,
                which truly amplified my enthusiasm for comprehending tasks at a deeper level and crafting solutions that enhance convenience.
                I actively engage in numerous coding challenges, practice data structures and algorithms, and attend seminars to
                 continuously sharpen my skills and stay up-to-date with the latest industry trends. When im not coding 
                 you can catch me either playing sports or shooting a music video. 
            </p>

            <p>Education:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/myimg.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
