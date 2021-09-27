import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestFlower.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

class MyFavoriteFlower extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowerArr: [],
    };
  }
  componentDidMount = () => {
    const { user } = this.props.auth0;
    const email = user.email;

    axios
      .get(`https://testpractice01.herokuapp.com/flowerAPI`)
      .then((result) => {
        this.setState({
          flowerArr: result.data.flowerslist,
        });
      })

      .catch((err) => {
        console.log("error");
      });
  };

  addToFav = async (item) => {
    const obj = {
      email: this.props.auth0.user.email,
      instructions: item.instructions,
      photo: item.photo,
      name: item.name,
    };

    axios.post(`https://testpractice01.herokuapp.com/addflower`, obj);
  };
  render() {
    return (
      <>
        <h1>Choose Your Favorite Flower</h1>

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
                      variant="success"
                      onClick={() => this.addToFav(item)}
                    >
                      Add
                    </Button>{" "}
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Row>
      </>
    );
  }
}

export default withAuth0(MyFavoriteFlower);
