import React, { Component } from 'react';
import './styles.css'
import Block from './components/Block.js'
import Overlay from './components/Overlay.js'
import Header from './components/Header.js'
import dataSource from './utils/dataSource.js'


/**
 * Container for the main application
 * @type {Object}
 */
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        messages: [
                      "COPIED!",
                      "GOT IT!",
                      "PASTE ME!",
                      "IT'LL ROCK!",
                      "RIGHT ONE!",
                      "WILL DO!"
                    ],
        message: null,
        overlayBackgroundColor: null,
        value: "hex",
        overlayHidden: true,
        data: []
        };  // end state

    }


    /**
     * Fake the Ajax Call here,
     * Set additional data for the Blocks component
     */
    componentDidMount(){

        var data =  dataSource.dataSource();

        var updatedData = data.map(function(index){
            index.rgb = dataSource.convertToRGB(index.hex);
            return index;
        });

        this.setState({
           data: updatedData
       })
    }


    /**
     * Set the color format for each Block on change
     * @return {hex|rgb}
     */
    onChange(e) {
      this.setState({ value: e.target.value });
    }


    /**
     * Opens modal window, triggers copy to clipboard method
     * @param  {[type]} item  [description]
     * @param  {[type]} event [description]
     */
    handleClick(item, event) {
        this.setState({
            overlayBackgroundColor: item.hex,
            overlayHidden: false,
            message: this.randomMessage() },
            () => {

                if(this.state.value === "rgb"){
                    this.clipboard(item.rgb);
                }
                if(this.state.value === "hex"){
                    this.clipboard(item.hex);
                }

            }
        );
    }


    /**
     * Copies selected value ot the clipboard, cross browser support is dodgy
     * http://caniuse.com/#feat=document-execcommand
     * @param  {string}
     * @return {null}
     */
    clipboard(value) {
        var textArea = document.createElement("textarea");

        document.body.appendChild(textArea);

        textArea.value = value;
        textArea.select();

            try {
                document.execCommand("copy");
            } catch (err) {
                console.log("error");
            }

        document.body.removeChild(textArea);
    }


    /**
     * Closes modal window on click
     */
    closeOverlay(e){
      this.setState({overlayHidden: true});
    }


    /**
     * returns a random message from messages
     * @return {string}
     */
    randomMessage(){
      var index = 0;
      index = Math.floor(Math.random() * (5 - 0 + 1)) + 0;
      return this.state.messages[index];
    }


    render() {
        return (
            <div>
                <Header value = {this.state.value}
                        onAction = { e => this.onChange(e)}
                />
                <div className="wrapper-block">
                     {this.state.data.map(item =>
                       <Block
                         key = {item.hex}
                         name = {item.name}
                         hex  = {item.hex}
                         rgb  = {item.rgb}
                         value = {this.state.value}
                         onAction = {e => this.handleClick(item, e)}
                       />
                     )}
                </div>
                    { !this.state.overlayHidden !== false &&
                    <Overlay
                        bg = {this.state.overlayBackgroundColor}
                        message = {this.state.message}
                        onAction = {e => this.closeOverlay(e)}
                    />}
                }

            </div>
        )
    }
}

export default App
