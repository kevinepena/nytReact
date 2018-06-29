import React, { Component } from "react";
import AddBtn from "../../components/AddBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import Typist from "react-typist";
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

class Saved extends Component {
  state = {
    articles: [],
    q: "",
    start_year: "",
    end_year: ""
  };

  componentDidMount() {
    this.loadArticles();

  }

  loadArticles = () => {
    API.getArticles()
      .then(res => {
        console.log(res.data)
        this.setState({ articles: res.data })
      }
      )
      .catch(err => console.log(err));
  };

  delete = id => {
    API.deleteArticle(id).then(res => this.loadArticles());
  };



  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.q) {
      console.log(this.state.q)
      API.search({
        q: this.state.q,
        start_year: this.state.start_year,
        end_year: this.state.end_year
      })
        .then(res => {
          this.setState({ articles: res.data });
          // loadArticles();
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
      <Fade>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <Typist>
              <h1>Saved Articles </h1>
              </Typist>
            </Jumbotron>
            {this.state.articles.length ? (
              <Zoom>
              <List>
                {this.state.articles.map(article => (

                <ListItem key={article._id}>
                  <DeleteBtn onClick={() => this.delete(article._id)} />
                  <a href={article.url}>

                    <strong>
                      {article.title} <br />
                    </strong>
                  </a>
                  


                </ListItem>
                ))}
              </List>
              </Zoom>
            ) : (
                <Fade><h3>No Results to Display</h3></Fade>
              )}
          </Col>
        </Row>
        </Fade>
      </Container>
    );
  }
}

export default Saved;
