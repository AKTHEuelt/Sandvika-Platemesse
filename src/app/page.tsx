// src/app/page.tsx
"use client";

import styled, { keyframes, css } from "styled-components";
import Image from "next/image";
import { useState } from "react";
import Toolbar from "../components/Toolbar";

// Spinning animation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled Components (unchanged)
const PageContainer = styled.div`
  background-color: #ffd781;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HeroSection = styled.section`
  min-height: 60vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Section = styled.section`
  min-height: 60vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h1`
  color: #ffd781;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.h2`
  color: #ffd781;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// FIX 1: Defined props interface for VinylImage to include 'isSpinning'.
// The 'isSpinning' prop is now correctly filtered and won't be passed to the underlying <img> element.
interface VinylImageProps {
  isSpinning: boolean;
}

const VinylImage = styled(Image).withConfig({
  shouldForwardProp: (prop) => prop !== "isSpinning",
})<VinylImageProps>`
  width: 350px;
  height: 350px;
  cursor: pointer;
  transition: transform 0.3s ease;

  ${({ isSpinning }) =>
    isSpinning &&
    css`
      animation: ${spin} 2s linear infinite;
    `}

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const ContentContainer = styled.div`
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.5rem;
`;

const ContentWord = styled.span`
  color: #000000;
  line-height: 1.4;
  display: inline-block;
  transition: color 0.3s ease;
  font-size: 2.5rem;

  &:hover {
    color: #ffd781;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const FestivalWordsSection = styled.section`
  min-height: 60vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const FestivalWordsTitle = styled.h2`
  color: #ffd781;
  background-color: #000000;
  padding: 0.5rem 1rem;
  font-size: 4.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const KeywordsContainer = styled.div`
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.5rem;
`;

// FIX 2: Defined a proper interface for KeywordProps to avoid ambiguity.
interface KeywordProps {
  style?: {
    fontSize?: string;
  };
}

const Keyword = styled.span<KeywordProps>`
  color: #000000;
  line-height: 1.4;
  display: inline-block;
  transition: color 0.3s ease;
  font-size: ${({ style }) => style?.fontSize ?? '1rem'}; // Provide a default value

  &:hover {
    color: #ffd781;
  }

  // FIX 3: Used optional chaining (?.) and the nullish coalescing operator (??)
  // to safely access style.fontSize and provide a default if it's missing.
  @media (max-width: 768px) {
    font-size: ${({ style }) => `calc(${style?.fontSize ?? '1rem'} * 0.8)`};
  }
  @media (max-width: 480px) {
    font-size: ${({ style }) => `calc(${style?.fontSize ?? '1rem'} * 0.6)`};
  }
`;

const Footer = styled.footer`
  background-color: #ffd781;
  padding: 1rem;
  color: #000000;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  margin: 2rem 0;
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

interface WordItem {
  word: string;
  size: string;
}

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);

  const festivalWords: WordItem[] = [
    { word: "sandvika", size: "2.5rem" },
    { word: "platemesse", size: "2.0rem" },
    { word: "31. August", size: "1.8rem" },
    { word: "kl. 11-16.00", size: "1.6rem" },
    { word: "høl i cv'en", size: "2.3rem" },
    { word: "k18", size: "1.9rem" },
    { word: "kadettangen 18", size: "2.2rem" },
    { word: "hyggelig stemning", size: "2.0rem" },
    { word: "kule artister", size: "2.4rem" },
    { word: "bra servering", size: "1.9rem" },
    { word: "afterparty", size: "1.8rem" },
    { word: "folkebadet", size: "1.6rem" },
    { word: "spinning av skiver", size: "2.2rem" },
    { word: "gratis bord", size: "1.9rem" },
    { word: "musikk", size: "2.3rem" },
    { word: "vinyl", size: "2.0rem" },
    { word: "kultur", size: "1.8rem" },
    { word: "retro", size: "1.7rem" },
    { word: "samler", size: "2.2rem" },
    { word: "plater", size: "2.5rem" },
    { word: "lokal", size: "1.9rem" },
    { word: "kunst", size: "2.0rem" },
    { word: "samfunn", size: "2.2rem" },
    { word: "arrangement", size: "1.8rem" },
    { word: "nostalgi", size: "2.2rem" },
    { word: "entusiast", size: "2.5rem" },
    { word: "opplevelse", size: "2.0rem" },
    { word: "vintage", size: "1.9rem" },
    { word: "atmosfære", size: "2.2rem" },
    { word: "lidenskap", size: "1.7rem" },
    { word: "talentfulle", size: "2.5rem" },
    { word: "lokale", size: "2.0rem" },
    { word: "feiring", size: "2.3rem" },
    { word: "samleobjekter", size: "2.5rem" },
    { word: "stemning", size: "2.0rem" },
    { word: "tradisjon", size: "2.2rem" },
    { word: "glede", size: "1.9rem" },
  ].sort((a, b) => a.word.localeCompare(b.word, "no"));

  const homeWords: WordItem[] = [
    { word: "sandvika platemesse", size: "2.5rem" },
    { word: "31. August", size: "2.0rem" },
    { word: "kl. 11-16.00", size: "1.8rem" },
    { word: "høl i cv'en", size: "2.2rem" },
    { word: "k18", size: "1.7rem" },
    { word: "kadettangen 18", size: "2.3rem" },
  ];

  const aboutWords: WordItem[] = [
    { word: "sandvika platemesse", size: "2.5rem" },
    { word: "topp stemning", size: "2.0rem" },
    { word: "hyggelige folk", size: "1.9rem" },
    { word: "kule artister", size: "2.3rem" },
    { word: "bra servering", size: "1.8rem" },
    { word: "musikk og kultur", size: "2.2rem" },
    { word: "vinylplater", size: "2.0rem" },
    { word: "lokal opplevelse", size: "1.9rem" },
  ];

  const eventsWords: WordItem[] = [
    { word: "31. August", size: "2.5rem" },
    { word: "kl. 11-16.00", size: "1.8rem" },
    { word: "høl i cv'en", size: "2.2rem" },
    { word: "k18", size: "1.6rem" },
    { word: "flere kule artister", size: "2.0rem" },
    { word: "spinning av skiver", size: "1.8rem" },
    { word: "DJ-Jon Snurrer Skiver", size: "1.7rem" },
  ];

  const contactWords: WordItem[] = [
    { word: "meld deg på", size: "2.5rem" },
    { word: "91755657", size: "2.0rem" },
    { word: "gratis bord", size: "1.8rem" },
    { word: "høl i cv'en", size: "2.2rem" },
    { word: "sandvika platemesse", size: "2.3rem" },
    { word: "kontakt oss", size: "1.9rem" },
  ];

  return (
    <PageContainer>
      <Toolbar />
      <MainContent>
        <SectionContainer>
          {/* Home Section (Hero) */}
          <HeroSection id="home">
            <Title>Sandvika Platemesse</Title>
            <ContentContainer>
              {homeWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
            <VinylImage
              src="/image/vinyl.png"
              alt="Vinylplate"
              width={200}
              height={200}
              isSpinning={isSpinning}
              onClick={() => setIsSpinning(!isSpinning)}
              onMouseEnter={() => setIsSpinning(true)}
              onMouseLeave={() => setIsSpinning(false)}
            />
          </HeroSection>

          {/* About Section */}
          <Section id="about">
            <SubTitle>Om Oss</SubTitle>
            <ContentContainer>
              {aboutWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
          </Section>

          {/* Events Section */}
          <Section id="events">
            <SubTitle>Arrangementer</SubTitle>
            <ContentContainer>
              {eventsWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
          </Section>

          {/* Contact Section */}
          <Section id="contact">
            <SubTitle>Kontakt</SubTitle>
            <ContentContainer>
              {contactWords.map((word, index) => (
                <ContentWord key={index}>{word.word}</ContentWord>
              ))}
            </ContentContainer>
          </Section>

          {/* YouTube Video Section */}
          <Section id="video">
            <SubTitle>Stemningsvideo</SubTitle>
            <VideoContainer>
              <ResponsiveIframe
                // FIX 4: Replaced the broken link with a working placeholder video.
                src="https://www.youtube.com/embed/b1L4YgD7MgQ?si=ulVlmFkK-aGHz0__"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></ResponsiveIframe>
            </VideoContainer>
          </Section>

          {/* Festival Words Section */}
          <FestivalWordsSection id="festival-words">
            <FestivalWordsTitle>Festivalord</FestivalWordsTitle>
            <KeywordsContainer>
              {festivalWords.map((item, index) => (
                <Keyword key={index} style={{ fontSize: item.size }}>
                  {item.word}
                </Keyword>
              ))}
            </KeywordsContainer>
          </FestivalWordsSection>
        </SectionContainer>
      </MainContent>
      <Footer>Meld deg på: 91755657 | Drevet av Høl i CV´en Platemesse</Footer>
    </PageContainer>
  );
}