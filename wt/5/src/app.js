import React from 'react';
import StyleEditor from './styleEditor';
import Heart from './heart';
import HeartRain from './heartRain';

const isPc = (function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}());

export default class App extends React.Component {

    fullStyle = [
        `/*
* Hi my baeee ❤️
* Let me show you what I do 🌺
* I'm your boyfriend 💝
* I hope every day brings you happiness and a smile 😍
* Keep going, you’re doing great — I’m always here for you 💕
* My job is to make it alive ✨
* You're currently using: ${isPc ? 'PC 💻' : 'Mobile 📱'}
*/

/* Add smooth transition for all elements */
* {
  -webkit-transition: all .5s;
  transition: all .5s;
}

/* Set background */
body, html {
  color: #fff;
  background-color: darkslategray;
}

/* Code editor style */
.styleEditor {
  overflow: auto;
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;` }
  border: 1px solid;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
}

/* Syntax highlight */
.token.selector{ color: rgb(133,153,0) }
.token.property{ color: rgb(187,137,0) }
.token.punctuation{ color: yellow }
.token.function{ color: rgb(42,161,152) }
.token.comment{ color: rgb(177,177,177) }

/* Add 3D perspective */
html{
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

.styleEditor {
  ${ isPc ? `transform: rotateY(10deg) translateZ(-100px) ;
  -webkit-transform: rotateY(10deg) translateZ(-100px);` : `transform: rotateX(-10deg) translateZ(-100px);
  -webkit-transform: rotateX(-10deg) translateZ(-100px);` } ${ isPc ? '' : `
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;` }
}

/*
* Now, let's draw a heart using CSS ❤️
*/

/* Title */
.title {
  text-align: center;
  font-size: 28px;
  color: pink;
  margin: 20px 0;
  animation: fadeIn 1.5s ease;
}

/* Message */
.message {
  position: fixed;
  bottom: 30px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #ff8fa3;
  animation: fadeIn 2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Create canvas */
.heartWrapper {
  ${ isPc ? `width: 48vw;
  height: 96vh;` : `width: 96vw;
  height: 48vh;`}
  position: relative;
  border: 1px solid;
  background-color: white;
  ${ isPc ?
  `transform: rotateY(-10deg) translateZ(-100px);
  -webkit-transform: rotateY(-10deg) translateZ(-100px);` :
  `transform: rotateX(10deg) translateZ(-100px);
  -webkit-transform: rotateX(10deg) translateZ(-100px);`}${ isPc ? '' :`
  transform-origin: 50% 0% 0;
  -webkit-transform-origin: 50% 0% 0;`}
}

/* Main heart shape (center square rotated) */
.heart {
  width: 120px;
  height: 120px;
  position: absolute;

  /* center the heart */
  top: 50%;
  left: 50%;
  margin: -60px 0 0 -60px;
  transform: rotate(45deg);
  background: linear-gradient(135deg, #ff4d6d, #ff8fa3);
  border-radius: 25px;
  box-shadow: 
    0 0 20px rgba(255, 77, 109, 0.6),
    0 0 40px rgba(255, 77, 109, 0.4);

  /* heartbeat animation */
  animation: heartbeat 1.2s infinite;
}

/* Left circle (top-left part of heart) */
.heart::before {
  content: '';
  position: absolute;

  width: 120px;
  height: 120px;

  /* inherit gradient color */
  background: inherit;

  border-radius: 50%;

  left: -60px;
  top: 0;
}

/* Right circle (top-right part of heart) */
.heart::after {
  content: '';
  position: absolute;

  width: 120px;
  height: 120px;

  /* inherit gradient color */
  background: inherit;

  border-radius: 50%;

  top: -60px;
  left: 0;
}

/* Heartbeat animation (smooth pulse effect) */
@keyframes heartbeat {
  0% {
    transform: scale(1) rotate(45deg);
  }
  25% {
    transform: scale(1.1) rotate(45deg);
  }
  40% {
    transform: scale(0.95) rotate(45deg);
  }
  60% {
    transform: scale(1.15) rotate(45deg);
  }
  100% {
    transform: scale(1) rotate(45deg);
  }
}

/* Heart beat animation */
@keyframes throb {
  0% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }

  100% {
    transform: scale(1.65) rotate(45deg);
    opacity: 0
  }
}

.bounce {
  opacity: 0.3;
  animation: throb 1.5s infinite ease-out;
}

/*
* Done!
* Have a good day 🌸
* No matter what happens, keep going 😊
* Because you’re not alone — you have me 💖
* I love you so much ❤️
*/
`
    ]

    state = {
        currentStyleCode: '',
        finished: false,
        heartRains: [],
        showTitle: false,
        showMessage: false
    }

    interval = 30;

    /**
     * Show code progressively (typing effect)
     */
    async progressiveShowStyle(n = 0) {
        const { interval, fullStyle } = this;

        const showStyle = i => new Promise((resolve) => {
            const style = fullStyle[n];
            const char = style[i];

            if (!style || !char) {
                resolve();
                return;
            }

            let { currentStyleCode } = this.state;
            currentStyleCode += char;

            this.setState({ currentStyleCode });

            if (char === '\n' && this.styleEditor) {
                this.styleEditor.toBottom();
            }

            setTimeout(() => {
                resolve(showStyle(i + 1))
            }, interval);
        });

        return showStyle(0);
    }

    async componentDidMount() {
        await this.progressiveShowStyle(0);

        this.setState({ showTitle: true });

        setTimeout(() => {
            this.setState({ finished: true });

            setTimeout(() => {
                this.setState({ showMessage: true });
                this.rain();
            }, 1500);

        }, 1000);
    }

    saveStyleEditorRef = child => this.styleEditor = child;

    /**
     * Create heart rain effect
     */
    rain = () => {
        let { heartRains } = this.state;
        const rainNum = 30;
        const stayTime = rainNum * 200 + 1000 + 4000;
        const time = (new Date()).getTime();

        if (!heartRains.length || (time - heartRains[heartRains.length - 1].time > (stayTime / 2))) {
            heartRains.push({ time, rainNum });
            this.setState({ heartRains });

            setTimeout(() => {
                this.removeRain(time);
            }, stayTime);
        }
    }

    removeRain(time) {
        let { heartRains } = this.state;
        heartRains = heartRains.filter(item => item.time !== time);
        this.setState({ heartRains });
    }

    render() {
    const { currentStyleCode, finished, heartRains, showTitle, showMessage } = this.state;

    return <div>

        {/* TITLE */}
        {showTitle && (
            <div className="title">
                💌 Dear my love 💌
            </div>
        )}

        <div style={{ display: isPc ? 'flex' : '' }}>
            <StyleEditor ref={this.saveStyleEditorRef} code={currentStyleCode} />
            <Heart click={finished ? this.rain : null} />
        </div>

        {/* MESSAGE AFTER HEART */}
        {showMessage && (
            <div className="message">
                💖 Let’s always be happy and enjoy every moment together 💖 <br />
                💗 I love you, you love me — and together we make a happy couple 💗
            </div>
        )}

        {
            heartRains.map(item =>
                <HeartRain num={item.rainNum} key={item.time} />
            )
        }

    </div>;
}
}