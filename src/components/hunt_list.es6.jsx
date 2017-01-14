import React, { Component, PropTypes } from 'react';

export default class HuntList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hunts: []
    };
    this.handleUpVote = this.handleUpVote.bind(this)
  }

  componentDidMount() {
    this.setState({hunts: this.props.hunts})
  }

  handleUpVote(id) {
    var hunt = this.props.hunts.filter(function(e) {
      return e.id == id;
    });
    alert("new votes is " + (hunt[0].votes + 1))
  }

  render () {
    var divs = [];
    this.props.hunts.forEach((hunt) => {
      divs.push(<Hunt
          key={'product-' + hunt.id}
          id={hunt.id}
          title={hunt.title}
          description={hunt.description}
          url={hunt.url}
          votes={hunt.votes}
          submitter_avatar_url={hunt.submitter_avatar_url}
          product_image_url={hunt.product_image_url}
          onVote={this.handleUpVote}
        />
      )
    });

    return (
      <div className="ui items">
        <h2>Hi</h2>
        {divs}
      </div>
    );
  }
}

