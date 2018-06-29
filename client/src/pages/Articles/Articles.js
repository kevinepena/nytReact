import React, { Component } from "react";
import AddBtn from "../../components/AddBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Typist from 'react-typist';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';


class Articles extends Component {



  state = {

    articles: [],
    q: "",
    start_year: "",
    end_year: "",
    saved: undefined,
    location: this.props.location.pathname
  };




  saveArticle = id => {

    const article = this.state.articles.find(article => article._id === id);

    const saved = {
      _id: article._id,
      title: article.headline.main,
      url: article.web_url
    }

    console.log(saved)
    API.saveArticle(saved).then(res => console.log(res)).catch(err => console.log(err));

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

    console.log()
    return (
      <Container fluid>
      <Fade>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <Typist>
                <Typist.Delay ms={1000} />
                <h1>Search NYT</h1>
              </Typist>
            </Jumbotron>
            <form>
              <Input
                value={this.state.q}
                onChange={this.handleInputChange}
                name="q"
                placeholder="Search (required)"
              />
              <Input
                value={this.state.start_year}
                onChange={this.handleInputChange}
                name="start_year"
                placeholder="Start Year (Optional)"
              />
              <Input
                value={this.state.end_year}
                onChange={this.handleInputChange}
                name="end_year"
                placeholder="End Year (Optional)"
              />
              <FormBtn
                disabled={!(this.state.q)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>{(this.state.q === "") ? ( <Typist> <Typist.Delay ms={2000} />Articles:</Typist>): `${this.state.q}`}</h1>
            </Jumbotron>

            {this.state.articles.length ? (
              
              <List>
                {this.state.articles.map(article => (
                  <Fade key={article._id}>
                  <ListItem >
                    <AddBtn onClick={() => this.saveArticle(article._id)} />
                    <a href={article.web_url}>

                      <strong>
                        {article.headline.main} <br />
                      </strong>
                    </a>
                    {article.snippet}


                  </ListItem>
                  </Fade>
                ))}
                
              </List>
              
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        </Fade>
      </Container>
    );
  }
}

export default Articles;
