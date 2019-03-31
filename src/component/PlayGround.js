import React, { Component } from "react";
import Card from "./Card";

export default class PlayGround extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frameworks: [
        "angular2",
        "vue",
        "react",
        "grunt",
        "phantomjs",
        "ember",
        "babel",
        "ionic",
        "gulp",
        "meteor",
        "yeoman",
        "yarn",
        "nodejs",
        "bower",
        "browserify"
      ],
      duplicatedFrameworks: [],
      randomizedFrameworks: [],
      finalizedFrameworks: [],
      openedFrameworks: []
    };
  }

  componentDidMount() {
    this.start();
  }

  handleClick(name, index) {
    if (this.state.openedFrameworks.length === 2) {
      setTimeout(() => {
        this.check();
      }, 750);
    } else {
      let framework = {
        name,
        index
      };
      let final = this.state.finalizedFrameworks;
      console.log(final);
      let frameworks = this.state.openedFrameworks;
      console.log(frameworks);
      console.log(frameworks[0]);
      final[index].close = false;
      frameworks.push(framework);
      this.setState({
        openedFrameworks: frameworks,
        finalizedFrameworks: final
      });
      if (this.state.openedFrameworks.length === 2) {
        setTimeout(() => {
          this.check();
        }, 750);
      }
    }
  }
  check() {
    let finalizedFrameworks = this.state.finalizedFrameworks;
    if (
      this.state.openedFrameworks[0].name ===
        this.state.openedFrameworks[1].name &&
      this.state.openedFrameworks[0].index !==
        this.state.openedFrameworks[1].index
    ) {
      finalizedFrameworks[this.state.openedFrameworks[0].index].complete = true;
      finalizedFrameworks[this.state.openedFrameworks[1].index].complete = true;
    } else {
      finalizedFrameworks[this.state.openedFrameworks[0].index].close = true;
      finalizedFrameworks[this.state.openedFrameworks[1].index].close = true;
    }
    this.setState({
      finalizedFrameworks,
      openedFrameworks: []
    });
  }
  start() {
    let duplicate = this.state.frameworks.concat(this.state.frameworks);
    console.log(duplicate);
    let randomized = this.shuffle(duplicate);
    console.log(randomized);
    let final = randomized.map((name, index) => {
      return {
        name,
        close: true,
        complete: false,
        fail: false
      };
    });
    console.log(final);
    this.setState({
      duplicatedFrameworks: duplicate,
      randomizedFrameworks: randomized,
      finalizedFrameworks: final
    });
  }
  shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  render() {
    let showOnScreen = this.state.finalizedFrameworks.map(
      (framework, index) => (
        <Card
          framework={framework.name}
          click={() => {
            this.handleClick(framework.name, index);
          }}
          close={framework.close}
          complete={framework.complete}
        />
      )
    );

    return <div className="playground">{showOnScreen}</div>;
  }
}
