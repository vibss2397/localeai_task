import React, {Component} from 'react';
import axios from 'axios';
import readXlsxFile, {parseExcelDate} from 'read-excel-file'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const header=[];
const rows=[];

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        header: "Header from state...",
        content: "Content from state...",
        users: [],
        isData: false,
        isLoading: false,
        cols: [], 
        rows: [] ,
        selectedCols:[]

    }
  }

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  }

  convertDate(dat){
    return new Date((dat - (25567 + 1))*86400*1000)
  }
  //iterate through the csv and store rows in an array
  fileChangedHandler = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    let fileObj = event.target.files[0];
    readXlsxFile(fileObj).then((rows) => {
        var stri=[]
        for(var i = 0; i<rows.length;i++){
          
          if(i===0){
            var stri_temp=[]
            for(var j=0;j<rows[i].length;j++){
              stri_temp.push(rows[i][j]);
            }
            this.setState({
              cols: stri_temp
            });
          } else{
            var stri3 =[];
            for(var j=0;j<rows[i].length;j++){
              if(i===11111){
              stri3.push(this.convertDate(rows[i][j])); 
              }
              else{
                stri3.push(rows[i][j])
              }
            }
            stri.push(stri3);
          }
          this.setState({
            rows: stri,
            isData: true,
            isLoading: false
          });
        } 
  })
    // Initially i was thinking of sending a post request to an express server to download it there and
   // Send the results back in a json form but i found a component react-excel-renderer which was more effective

    // this.setState({ selectedFile: event.target.files[0] });
    // const data = new FormData();
    // data.append('file', event.target.files[0]);
    
    // axios.post("http://localhost:9000/users/upload", data, { // receive two parameter endpoint url ,form data 
    // })
    // .then(res => { // then print response status
    //   console.log(res.data)
    //   this.setState({selectedFile: 'http://localhost:9000/users/upload/'+res.data.filename});
    //   console.log(excel.readFile('data.csv'));
    // })
  }
  getComponent(e, index) {
    console.log(index);
  }
  getColumn(e, index){
    if(document.getElementById(index).className==='table-success'){
      document.getElementById(index).className=''
      var temp = this.state.selectedCols;
      if (temp[0]===index){
        temp.splice(0, 1);
      }else{
        temp.splice(1, 1);
      }
      this.setState({
        selectedCols: temp
      })
      console.log(this.state.selectedCols)
    }
    else{
      document.getElementById(index).className='table-success';
      temp = this.state.selectedCols;
      temp.push(index)
      temp.sort();
      this.setState({
        selectedCols: temp
      })
      console.log(temp);

    }
    if(this.state.selectedCols.length===2){
      document.getElementById('butt').style.display='block';
    }
    else{
      document.getElementById('butt').style.display='none';
    }


  }
  navigat(){
    var temp = []

    let rows = this.state.rows;
    let cols = this.state.cols;
    rows.forEach(function(ele, ind){
      let dic = {}
      for(var i =0; i< cols.length;i++){
        dic[cols[i]]=ele[i];
      }
      temp.push(dic);
    })
    console.log(temp);
    this.props.history.push({
      pathname: '/map',
      state:{
        coord: temp
      }
    });
  }
  render(){
  return (
    <div className="container-fluid" style={{height: '100vh'}} >
      <br />
      {this.state.isLoading?<div>Loading Data...</div>:this.state.isData?
      <div class="col-12" >
      <div style={{display: 'inline'}}><h3>Select the Latitude and longitude column to display on Map</h3></div>
      <div style={{display: 'inline'}}><button id="butt" className="btn btn-success" style={{display:'none'}} onClick={(e)=> this.navigat()}>Next</button></div>
      <br />
        <div class="panel-body table-responsive">
        <table class="table table-bordered table-hover table-striped">
          <thead>
          <tr>
            {this.state.cols.map((h, i) => <th key={i} id={i} onClick={(e)=>this.getColumn(e, i)}>{h}</th>)}
          </tr>
          </thead>
          <tbody>
          {this.state.rows.map((h, i) => <tr onClick={(e) => this.getComponent(e, h)} key={i}>{h.map((a, b)=><td key={b}>{a}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
      </div>:      
        <div className=" h-100 row justify-content-center align-items-center" >
          <div><input type="file" onChange={this.fileChangedHandler} ref={input => this.inputElement = input} style={{display: 'none'}}/>
          <a href="#" className="btn btn-default btn-circle btn-xl effect1" onClick={() => this.inputElement.click()}>
          <i  style={{color: '#ffffff'}}className="fa fa-upload fa-2x"></i></a></div><br/>
          <div><p className="text-muted">Select a file to upload</p></div>
        </div>
      }
      
      </div>
  ); }
}

export default App;
