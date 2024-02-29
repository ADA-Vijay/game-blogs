import React from "react";
import Container from "react-bootstrap/Container";

const notFound = () => {
  return (
    <Container>
      <h4>No data Found</h4>
      <img src="https://eldritch.qodeinteractive.com/wp-content/themes/eldritch/assets/img/404.png" />
    </Container>
  );
};

export default notFound;
