import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  steps?: {
    id: number;
    Description: React.ReactNode;
  }[];
  links?: string[];
}

const PropDefaults: WelcomeEmailProps = {
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Get the calendar invite.</strong>{" "}
          If you&apos;re seeing this, we haven&apos;t added it yet, but soon all new 
          members will receive google calendar invites to each weekly event 
          (Sunday from 12pm to 2pm) for scheduling convenience.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Time to be on online.</strong>{" "}
          You won&apos;t be able to join before or after the event timeframe, so
          there&apos;s only a limited time to join <Link href="https://builderfive.com/connect">BuilderFive</Link>
          for the week!
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Join interesting calls.</strong>{" "}
          Set your radius and topic discussion preferences to join an ongoing 
          call with people of interest.
        </li>
      ),
    },
    {
      id: 4,
      Description: (
        <li className="mb-20" key={4}>
          <strong>Want to meetup?</strong> {" "}
          You might be interested in meeting in person with the people you called with.
          If so, BuilderFive helps you locate safe and convenient coffee shops to meetup at.
          Plus you get free coupons for coffee! All you need to do is send a meetup request
          for a timeslot on one of the coffee shops you&apos;ll find on the map. Once your recipients
          accept the request, you&apos;ll each get redeemable coupon codes for just that scheduled time.
        </li>
      ),
    },
  ],
  links: ["Visit the forums", "Read the docs", "Contact an expert"],
};

export const WelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>BuilderFive Welcome</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Img
            src={`https://builderfive.com/static/logos/logo-image.png`}
            width="75"
            height="75"
            alt="BuilderFive"
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              Welcome to BuilderFive
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Happy to have you on board! You&apos;re joining an audio and meetup 
                  platform where you&apos;ll meet local like-minded people in voice calls 
                  for just a few hours every week. 
                </Text>

                <Text className="text-base">Here&apos;s how it works:</Text>
              </Row>
            </Section>

            <ul>{PropDefaults.steps?.map(({ Description }) => Description)}</ul>

            <Section className="text-center">
              <Button href="https://builderfive.com/connect" className="bg-brand text-white rounded-lg py-3 px-[18px]"> 
                Visit the map
              </Button>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="text-right">
                  <Link href={'https://www.linkedin.com/company/builderfive/'}>LinkedIn</Link>
                </Column>
              </Row>
            </Section>
            <Text className="text-center text-gray-400 mb-45">
              BuilderFive, make real friends every week
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
