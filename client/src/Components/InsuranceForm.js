import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/form";
import { ContractsContext } from "../Providers/ContractsProvider";

function InsuranceForm(props) {
  const { appInstance, appStatus, dataStatus } = useContext(ContractsContext);

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const value = event.target.elements.flightNumber.value;
    return value;
  }

  return (
    <div className="App-content-dashboard">
      <h4 className="Section-title"> Request insurance </h4>
      <div className="App-content-dashboard-flight-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="flightNumber">
            <Form.Label>Flight number</Form.Label>
            <Form.Control type="text" placeholder="Your Flight number" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="insuranceValue">
            <Form.Label>Insurance value</Form.Label>
            <Form.Control type="number" placeholder="1 ETH" />
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

export default InsuranceForm;
