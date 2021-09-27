import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { withAuth0 } from "@auth0/auth0-react";

class UpdateFormModal extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update a Flower</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Modal.Body>
              <Form onSubmit={this.props.updateFlower}>
                <Form.Group className="title" controlId="title">
                  <Form.Label>instructions</Form.Label>
                  <Form.Control
                    type="text"
                    name="instructions"
                    defaultValue={this.props.instructions}
                  />
                </Form.Group>
                <Form.Group className="description" controlId="description">
                  <Form.Label>photo</Form.Label>
                  <Form.Control
                    type="text"
                    name="photo"
                    defaultValue={this.props.photo}
                  />
                </Form.Group>
                <Form.Group className="description" controlId="description">
                  <Form.Label>name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    defaultValue={this.props.name}
                  />
                </Form.Group>
                <Button variant="info" type="submit">
                  Update
                </Button>{" "}
              </Form>
            </Modal.Body>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withAuth0(UpdateFormModal);
