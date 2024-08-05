import { Meta } from "@storybook/react";
import { Row, Col } from "./grid";

const meta: Meta<typeof Col> = {
  component: Row,
  title: "Organisms/Grid/Col",
  tags: ["autodocs"],
};

export default meta;

export const Default = () => (
  <Row>
    <Col>
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col>
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
    <Col>
      <div className="bg-blue-500 text-white text-center py-4">Col-3</div>
    </Col>
    <Col>
      <div className="bg-blue-500 text-white text-center py-4">Col-4</div>
    </Col>
  </Row>
);

export const WithSpan = () => (
  <Row>
    <Col span={6}>
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col span={6}>
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
    <Col span={6}>
      <div className="bg-blue-500 text-white text-center py-4">Col-3</div>
    </Col>
    <Col span={6}>
      <div className="bg-blue-500 text-white text-center py-4">Col-4</div>
    </Col>
  </Row>
);

export const WithOffset = () => (
  <Row>
    <Col span={6} offset={6}>
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col span={6} offset={3}>
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
  </Row>
);

export const WithPullPush = () => (
  <Row>
    <Col span={6} push={8}>
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col span={6} pull={4}>
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
  </Row>
);

export const WithOrder = () => (
  <Row>
    <Col span={6} order={4}>
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col span={6} order={3}>
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
    <Col span={6} order={2}>
      <div className="bg-blue-500 text-white text-center py-4">Col-3</div>
    </Col>

    <Col span={6} order={1}>
      <div className="bg-blue-500 text-white text-center py-4">Col-4</div>
    </Col>
  </Row>
);

export const WithFlex = () => (
  <Row>
    <Col flex={2}>
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col flex={1}>
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
    <Col flex={1}>
      <div className="bg-blue-500 text-white text-center py-4">Col-3</div>
    </Col>
  </Row>
);

export const WithFlexAuto = () => (
  <Row>
    <Col flex={"100px"}>
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col flex={"auto"}>
      <div className="bg-blue-500 text-white text-center py-4">Flex fill</div>
    </Col>
  </Row>
);

export const ResponsiveCols = () => (
  <Row>
    <Col xs={24} md={12} xl={8}>
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col xs={24} md={12} xl={8}>
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
    <Col xs={24} md={12} xl={8}>
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
  </Row>
);

export const FlexResponsiveCols = () => (
  <Row>
    <Col
      xs={{ flex: "100%" }}
      sm={{ flex: "50%" }}
      md={{ flex: "40%" }}
      lg={{ flex: "20%" }}
    >
      <div className="bg-blue-500 text-white text-center py-4">Col-1</div>
    </Col>
    <Col
      xs={{ flex: "100%" }}
      sm={{ flex: "50%" }}
      md={{ flex: "40%" }}
      lg={{ flex: "20%" }}
    >
      <div className="bg-blue-500 text-white text-center py-4">Col-2</div>
    </Col>
    <Col
      xs={{ flex: "100%" }}
      sm={{ flex: "50%" }}
      md={{ flex: "40%" }}
      lg={{ flex: "20%" }}
    >
      <div className="bg-blue-500 text-white text-center py-4">Col-3</div>
    </Col>
    <Col
      xs={{ flex: "100%" }}
      sm={{ flex: "50%" }}
      md={{ flex: "40%" }}
      lg={{ flex: "20%" }}
    >
      <div className="bg-blue-500 text-white text-center py-4">Col-4</div>
    </Col>
    <Col
      xs={{ flex: "100%" }}
      sm={{ flex: "50%" }}
      md={{ flex: "40%" }}
      lg={{ flex: "20%" }}
    >
      <div className="bg-blue-500 text-white text-center py-4">Col-5</div>
    </Col>
  </Row>
);
