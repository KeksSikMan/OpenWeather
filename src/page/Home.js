import * as React from "react";
import { Layout, Typography } from "antd";
import { Weather } from "../components/Weather";

const { Header, Footer, Content } = Layout;
const { Title, Paragraph } = Typography;

export const Home = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            width: "100%",
            height: "96px",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            color: "white",
            paddingLeft: "7%",
            paddingTop: "24px",
          }}
        >
          <Title> OpenWeather</Title>
        </Header>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10%",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Weather />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <Paragraph>by KeksSikMan</Paragraph>
        </Footer>
      </Layout>
    </>
  );
};
