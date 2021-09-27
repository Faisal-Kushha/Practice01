import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import axios from "axios";
import UpdateFormModal from "./UpdateFormModal";

class MyFav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowerArr: [],
      showFlag: false,
      instructions: "",
      photo: "",
      name: "",
      flowerId: "",
    };
  }

  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .get(`https://testpractice01.herokuapp.com/getFlower?email=${email}`)
      .then((result) => {
        this.setState({
          flowerArr: result.data,
        });
      })
      .catch((err) => {
        console.log("error");
      });
  };

  deleteBook = (id) => {
    const { user } = this.props.auth0;
    const email = user.email;
    axios
      .delete(
        `https://testpractice01.herokuapp.com/deleteFlower/${id}?email=${email}`
      )
      .then((result) => {
        this.setState({
          flowerArr: result.data,
        });
      })
      .catch((err) => {
        console.log("Error on deleting");
      });
  };
  handleClose = () => {
    this.setState({
      showFlag: false,
    });
  };
  showUpdateFormModal = (item) => {
    this.setState({
      showFlag: true,
      instructions: item.instructions,
      photo: item.photo,
      name: item.name,
      flowerId: item._id,
    });
  };

  updateFlower = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const email = user.email;
    const obj = {
      instructions: event.target.instructions.value,
      photo: event.target.photo.value,
      name: event.target.name.value,
      email: email,
    };
    axios
      .put(
        `https://testpractice01.herokuapp.com/updateFlower/${this.state.flowerId}`,
        obj
      )
      .then((result) => {
        this.setState({
          flowerArr: result.data,
          showFlag: false,
        });
      })
      .catch((err) => {
        console.log("Error in updating");
      });
  };

  render() {
    return (
      <>
        <h1>My Favorite Flower</h1>
        <p>This is a collection of my favorite Flowers</p>

        <Row xs={1} md={3} className="g-4">
          {this.state.flowerArr.map((item) => {
            return (
              <>
                <Card>
                  <Card.Body>
                    <Card.Title>instructions: {item.instructions}</Card.Title>
                    <Card.Img variant="top" src={item.photo} alt="" />
                    <Card.Text>name: {item.name}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => this.deleteBook(item._id)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      variant="warning"
                      onClick={() => this.showUpdateFormModal(item)}
                    >
                      Update
                    </Button>{" "}
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Row>
        <UpdateFormModal
          show={this.state.showFlag}
          handleClose={this.handleClose}
          instructions={this.state.instructions}
          photo={this.state.photo}
          name={this.state.name}
          updateFlower={this.updateFlower}
        />
      </>
    );
  }
}

export default withAuth0(MyFav);
