import React, { Component } from 'react';
import logo from './logo.svg';
// import MessageView from './components/MessageView'
// import MessageInput from './components/MessageInput'
import { createStore } from 'redux'
import '../semantic/dist/semantic.css'
import '../vendor/uuid.js'


const reducer = (state, action) => {
  if (action.type === 'ADD_MESSAGE') {
    const message = {
      text: action.text,
      timestamp: Date.now(),
      id: Math.floor((Math.random() * 10000) + 1)
    }

    const threads = state.threads
    const threadIndex = threads.findIndex((t)=>t.id === action.threadID)
    const oldThread = state.threads[threadIndex]
    const newThread = {...oldThread, messages: oldThread.messages.concat(message)}

    return {
      ...state,
      threads: [
        ...state.threads.slice(0, threadIndex),
        newThread,
        ...state.threads.slice(threadIndex+1, state.threads.length)
      ]
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    const threads = state.threads
    const threadIndex = threads.findIndex((t)=>t.id === action.threadID)
    const oldThread = state.threads[threadIndex]
    const messages = oldThread.messages
    const messageIndex = messages.findIndex((m)=>m.id === action.id)

    const newMessages = [
        ...messages.slice(0, messageIndex),
        ...messages.slice(
          messageIndex + 1, messages.length
        ),
      ]

    const newThread = {...oldThread, messages: newMessages}

    return {
      ...state,
      threads: [
        ...state.threads.slice(0, threadIndex),
        newThread,
        ...state.threads.slice(threadIndex+1, state.threads.length)
      ]
    };
  } else if (action.type === 'OPEN_THREAD') {
    return {
      ...state,
      activeThreadID: action.id
    }
  } else {
    return state;
  }
}

const initialState = {
  activeThreadID: '1-fca2',
  threads: [    // Two threads in state
    {
      id: '1-fca2',    // hardcoded pseudo-UUID
      title: 'Buzz Aldrin',
      messages: [
        {   // This thread starts with a single message already
          text: 'Twelve minutes to ignition.',
          timestamp: Date.now(),
          id: Math.floor((Math.random() * 10000) + 1),
        },
      ],
    },
    {
      id: '2-be91',
      title: 'Michael Collins',
      messages: [],
    },
  ],
};

const store = createStore(reducer, initialState)

class App extends Component {
  componentDidMount() {
    store.subscribe(()=>this.forceUpdate())
  }
  render() {
    const threads = store.getState().threads
    const activeThreadID = store.getState().activeThreadID
    const activeThread = threads.find((t)=>t.id === activeThreadID)
    const tabs = threads.map((t)=>(
      {
        title: t.title,
        id: t.id,
        active: t.id === activeThreadID
      }
      ))
    return (
      <div className='ui segment'>
        <ThreadTab tabs={tabs} />
        <Thread thread={activeThread} />

      </div>
    );
  }
}

export default App;

class ThreadTab extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id){
    store.dispatch({
      type: 'OPEN_THREAD',
      id: id
    })
  }

  render(){
    return (
      <div className='ui top attached tabular menu'>
        {
          this.props.tabs.map((tab,index)=> (
            <div key={index} className={tab.active ? 'active item' : 'item'} onClick={()=>this.handleClick(tab.id)}>
              {tab.title}
            </div>
          ))
        }
      </div>
    )
  }
}

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id){
    store.dispatch({
      type: 'DELETE_MESSAGE',
      id: id,
      threadID: this.props.thread.id
    })
  }

  render(){
    const messages = this.props.thread.messages
    return (
      <div className='ui center aligned basic segment'>
        <div className='ui comments'>
          {messages.map((message, index) => (
            <div
              className='comment'
              key={index}
              onClick={() => this.handleClick(message.id)}
            >
              {message.text}
            </div>
          ))}
        </div>
        <MessageInput threadID={this.props.thread.id} />
      </div>
      )
  }
}

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(){
    store.dispatch({
      type: "ADD_MESSAGE",
      text: this.refs.messageInput.value,
      threadID: this.props.threadID
    })
    this.refs.messageInput.value = '';
  }


  render(){
    return (
      <div className='ui input'>
        <input
          ref='messageInput'
          type='text'
        >
        </input>
        <button
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        >
          Submit
        </button>
       </div>
    );
  }
}
