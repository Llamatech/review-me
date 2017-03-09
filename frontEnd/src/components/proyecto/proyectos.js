import React, {Component} from 'react';
import Proyecto from './proyecto';
import {chunk} from 'lodash'
import Search from './search'

class Proyectos extends Component{

  organize(){
    var arr=[]
    this.props.proyectos.map((proyecto)=>{
      arr.push(<div className="col-md-4"><Proyecto key={proyecto.id} proyecto={proyecto}/></div>);
    })
    var chu = chunk(arr,3);
    return chu;
  }

  render(){
    if (this.props.proyectos){
      return(
        <div>
          <div className="tit text-center">
            <h1>
              Current projects
            </h1>
            <hr></hr>
          </div>
          <Search buscarAdv={this.props.buscarAdv}></Search>

          {this.organize().map((grupo,index)=>{
            console.log(grupo);
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
