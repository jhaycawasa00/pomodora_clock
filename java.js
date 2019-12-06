class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        break:5,
        breakTime:300,
        session:25,
        current:1500,
        status:"Ready",
        button:'Start'
      };
      this.break = this.break.bind(this);
      this.breakIncrease = this.breakIncrease.bind(this);
      this.breakDecrease = this.breakDecrease.bind(this);
      this.sessionIncrease = this.sessionIncrease.bind(this);
      this.sessionDecrease = this.sessionDecrease.bind(this);
      this.countdown = this.countdown.bind(this);
      this.playSound = this.playSound.bind(this);
      this.reset = this.reset.bind(this);
    };
    
  
      breakIncrease(){
        if(this.state.break < 60){
           this.setState({
              break: this.state.break + 1,
              breakTime: this.state.breakTime + 60
           })   
        }
      };
  
      breakDecrease(){
        if(this.state.break > 1){
           this.setState({
            break: this.state.break - 1,
             breakTime: this.state.breakTime - 60
           });
          }
      };
  
      sessionIncrease(){
        if(this.state.session < 60){
           this.setState({
            session: this.state.session + 1,
            current: this.state.current + 60
           });
         }
      };
  
      sessionDecrease(){
        if(this.state.session > 1){
           this.setState({
            session: this.state.session - 1,
            current: this.state.current - 60
           });
          }
      };
    
    break(){
      this.setState({
        status:"Break"
      })
      var interval = setInterval(function(){
         if(this.state.breakTime==0){
           //At the end of breaktime, start countdown again
           clearInterval(interval);
           this.setState({
             breakTime:this.state.break * 60,
           })
           this.countdown()
         }else if(this.state.button=="Stop"){
           //Pause during break
           clearInterval(interval);
         }else{
           this.setState({
           breakTime:this.state.breakTime - 1
         })
         }  
       }.bind(this), 1000)
    }
  
     countdown(){
       if(this.state.status=="Break"){
          this.break()
     }else if(this.state.button=="Start"){
         this.setState({
         status:"Running",
         button:'Stop'
         });
         var interval = setInterval(function(){
         if(this.state.current==0){
           //When time runs out, go to break time and reset timer
           this.playSound();
           clearInterval(interval);
           this.setState({
             current:this.state.session*60
           })
           this.break()
         }else if(this.state.status=="Paused" || this.state.status=="Ready"){
           //Pause clock
           clearInterval(interval);
         }else{
           this.setState({
             current:this.state.current - 1
           })
         }
       }.bind(this), 1000)
       }else{
         //To pause the clock
         this.setState({
           status:"Paused",
           button:'Start'
         });
         clearInterval(interval);
       }
    };
    
    playSound(){
      var time = 0;
      var interval = setInterval(function() { 
        if (time <= 1000) { 
          document.getElementById("beep").play();
          time++;
        }
        else { 
          clearInterval(interval);
        }
      }, 1);
    };
    
    reset(){
      this.setState({
        break:5,
        breakTime:300,
        session:25,
        current:1500,
        status:"Ready",
        button:"Start"
      })
    };
     
    render() {
      let timeLeft = "";
      if(this.state.status=="Break"){
         timeLeft = <div id="time-left">{this.state.breakTime/60<10 ? "0"+ Math.floor((this.state.breakTime)/60):Math.floor((this.state.breakTime)/60)}:{this.state.breakTime%60<10 ? "0"+this.state.breakTime%60 : this.state.breakTime%60}</div>
         }else{
               timeLeft = <div id="time-left">{this.state.current/60<10 ? "0"+ Math.floor((this.state.current)/60):Math.floor((this.state.current)/60)}:{this.state.current%60<10 ? "0"+this.state.current%60 : this.state.current%60}</div>
         };
      return (
        <div>
          <h1>Clock</h1>
          <div className="row">
            <div className="col-6">
              <div id="break-label">Break Length</div>
              <div id="break-length">{this.state.break}</div>
              <button className="btn btn-default" id="break-increment" onClick={this.breakIncrease}>Up</button>
              <button className="btn btn-default" id="break-decrement" onClick={this.breakDecrease}>Down</button>
            </div>
            <div className="col-6">
              <div id="session-label">Session Length</div>
              <div id="session-length">{this.state.session}</div>
              <button className="btn btn-default" id="session-increment" onClick={this.sessionIncrease}>Up</button>
              <button className="btn btn-default" id="session-decrement" onClick={this.sessionDecrease}>Down</button>
            </div>
          </div>
          <div id="timer-label">{this.state.status}</div>
          {timeLeft}
          <button className="btn btn-primary" id="start_stop" onClick={this.countdown}>{this.state.button}</button>
          <button className="btn btn-danger" id="reset" onClick={this.reset}>Reset</button>
          <audio id="beep" preload="auto" 
            src="https://goo.gl/65cBl1"/>
         </div>
      );
    };
  };
  
  ReactDOM.render(
    <App />,
    document.getElementById('main')
  );