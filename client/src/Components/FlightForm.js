import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/form";
import { ContractsContext } from "../Providers/ContractsProvider";

function FlightForm(props) {
  const { appInstance, appStatus, dataStatus } = useContext(ContractsContext);

  console.log(appStatus);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const value = event.target.elements.flightNumber.value;
    return value;
  }

  return (
    <div className="App-content-dashboard">
      <h4 className="Section-title"> Request oracle update </h4>
      <div className="App-content-dashboard-flight-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="flightNumber">
            <Form.Label>Flight number</Form.Label>
            <Form.Control type="text" placeholder="Your Flight number" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={appStatus !== true || dataStatus != true}
          >
            Submit to oracles
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FlightForm;
