import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './App.css';
import 'brain.js';
import { encode } from 'punycode';

// JavaScript构建的第一个神经网络,这只是一个简单的demo 
// https://github.com/BrainJS/brain.js/

class Brain extends Component {
    constructor(props) {
        super(props);

        this.net = new brain.NeuralNetwork();
    }

    encode(arg) {
        return arg.split('').map(x => (x.charCodeAt(0) / 255));
    }

    preTrainingData(data) {
        return data.map((d) => {
            return {
                'input': this.encode(d.input),
                'output': d.output
            }
        });
    }

    train(data) {
        this.net.train(this.preTrainingData(data));
        this.trainedNet = this.net.toFunction();
    }

    execute(input) {
        let results = this.trainedNet(this.encode(input));
        console.log(results);
        let output;
        results.trump > results.kardashian ? output = 'Trump' : output = 'Kardashian';
        return output;
    }

    componentWillMount() {
        this.train(
            [
                {
                    input: "Inside Chi's nursery",
                    output: { kardashian: 1 }
                }, {
                    input: "Why I dyed my hair pink",
                    output: { kardashian: 1 }
                }, {
                    input: "Feeling Blue (wearing @kkwbeauty powder contour in medium & dark contour kit as eye shadow, & a new lip coming soon)",
                    output: { kardashian: 1 }
                }, {
                    input: "I will be interviewed by @JudgeJeanine on @FoxNews at 9:00 P.M. Enjoy!",
                    output: { trump: 1 }
                }, {
                    input: "Dem Memo: FBI did not disclose who the clients were - the Clinton Campaign and the DNC. Wow!",
                    output: { trump: 1 }
                }, {
                    input: "Thank you to the great men and women of the United States @SecretService for a job well done!",
                    output: { trump: 1 }
                }, {
                    input: "North Korea has just launched another missile. Does this guy have anything better to do with his life? Hard to believe that South Korea.....",
                    output: { trump: 1 }
                }
            ]  
        );

        console.log(this.execute("Does this guy have anything better to do with his life? Hard to believe that South Korea, North Korea has just launched another missile. "));
    }

    render() {
        return (
            <div>
                test
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(Brain);