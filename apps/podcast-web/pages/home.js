import Head from "next/head";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import PodCard from "../components/PodCard";
import axios from "axios";
import grainImg from "../public/grain-dark.png";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Home - CBS Podcast</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeWrapper>
        {/* <Navbar /> */}
        <PodWrapper>
          <PodContainer>
            <PodTitle>Podcasts</PodTitle>
            <PodList>
              {data.data.map((pod, index) => (
                <PodCard key={index} podcast={pod} index={index} />
              ))}
            </PodList>
          </PodContainer>
        </PodWrapper>
      </HomeWrapper>
    </>
  );
}

export async function getServerSideProps() {
  const ENDPOINT = process.env.ENDPOINT || 'localhost:1337';
  const data = await axios
    .get(`http://${ENDPOINT}/api/podcasts?populate=*`, {
      headers: {
        Authorization: "Bearer " + process.env.STRAPI_SECRET,
      },
    })
    .catch((err) => {
      return { notFound: false };
    });
  if (data === undefined || data.data === undefined || data.data === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data: data.data },
  };
}

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #100f0f;
  background-image: url(${grainImg.src});
`;

const PodWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const PodContainer = styled.div`
  margin-top: 6rem;
  width: 50%;
  min-height: 50vh;
  /* backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125); */
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  color: #000;
  box-shadow: 0 0 100px 0 rgba(255, 255, 255, 0.2);
`;

const PodTitle = styled.h1`
  font-family: "Space Grotesk", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #000;
`;

const PodList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
