import React, { Component } from 'react';
import axios from 'axios'
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag  } from './utils';

import './App.css'

const containerStyle = {
    backgroundColor:'#C5C5C5'
};


export default class App extends Component {

       state = {
            items2: [
                {id: 1, data:'Can you tell me a little about yourself?'},
                {id: 2, data:'How did you hear about the position?'},
                {id: 3, data:'What do you know about the company?'},
                {id: 4, data:'Why do you want this job?'},
                {id: 5, data:'Why should we hire you?'},
                {id: 6, data:'What are your greatest professional strengths?'},
                {id: 7, data:'What do you consider to be your weaknesses?'},
                {id: 8, data:'What is your greatest professional achievement?'}
            ],
            items1: []

        };
     submit = ()=>{
           axios.post('https://httpbin.org/anything', this.state.items1)
               .then(function (response) {
                   let test  = document.getElementById('responseData')
                   let res = response.data.json
                   let myJSON = JSON.stringify(res)
                   test.innerText = myJSON
                   console.log(response);
               })
               .catch(function (error) {
                   console.log(error);
               });
       }
    render() {
         const { items1, items2} = this.state

        return (
            <div className='jumbotron'>
                <h2 style={{display: 'flex', justifyContent: "center"}}>Drag and Drop App</h2>
                <div className='mainContent'>
                    <div className="item-list list-group columnStyle">
                        <h5>List of selected questions</h5>
                        <Container style={containerStyle} groupName="1" getChildPayload={i => items1[i]} onDrop={e => this.setState({ items1: applyDrag(this.state.items1, e) })}>
                            {
                                this.state.items1.map(p => {
                                    return (
                                        <Draggable key={p.id}>
                                            <div className="draggable-item list-group-item card ">
                                                {p.data}
                                            </div>
                                        </Draggable>
                                    );
                                })
                            }
                        </Container>
                    </div>
                    <div className="item-list list-group columnStyle">
                        <h5>List of questions</h5>
                        <Container style={containerStyle} groupName="1" getChildPayload={i => items2[i]} onDrop={e => this.setState({ items2: applyDrag(this.state.items2, e) })}>
                            {
                                this.state.items2.map(p => {
                                    return (
                                        <Draggable key={p.id}>
                                            <div className="draggable-item list-group-item card ">
                                                {p.data}
                                            </div>
                                        </Draggable>
                                    );
                                })
                            }
                        </Container>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary buttonScs" onClick={this.submit}>Submit</button>
                <div className="buttonScs">
                    <h6>Respons Data</h6>
                    <div id='responseData'></div>
                </div>

            </div>
        );
    }
}



;