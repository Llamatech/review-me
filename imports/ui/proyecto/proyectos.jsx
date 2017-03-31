import React, {Component} from 'react';
import Proyecto from './proyecto';
import {chunk} from 'lodash'
import AdvSearch from './search'
import {  Button } from 'react-bootstrap';


class Proyectos extends Component{

  organize(){
    var arr=[]
    this.props.proyectos.map((proyecto)=>{
      arr.push(<div className="col-md-4"><Proyecto login={this.props.login} eraseProject={this.props.eraseProject} key={proyecto.id} proyecto={proyecto}/></div>);
    })
    var chu = chunk(arr,3);
    return chu;
  }

  render(){
    if (this.props.proyectos){
      return(
        <div>

          <div className="tit text-center">
            {this.props.mine?
              <div className="about">

              <h1>
                My projects
              </h1>
              <Button bsSize="sm" onClick={()=>this.props.backHome()}>Back to Dashboard</Button>
              </div>
              :
              <h1>
                Current projects
              </h1>
            }
            <hr></hr>
          </div>
          {!this.props.mine?
            <AdvSearch buscarAdv={this.props.buscarAdv}></AdvSearch>
            :null
          }
          {this.organize().map((grupo,index)=>{
              return(
                <div className="row">
                  {grupo}
                </div>
              )


          })}
        </div>
      )
    }
    else{
      return(<div></div>);
    }

  }

}

export default Proyectos;
