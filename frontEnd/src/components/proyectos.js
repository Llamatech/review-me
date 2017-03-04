import React, {Component} from 'react';
import Proyecto from './proyecto';

class Proyectos extends Component{
  render(){
    if (this.props.proyectos){
      return(
        <div>
          {this.props.proyectos.map((proyecto)=>{
            return(
              <div className="col-md-4">
                <Proyecto key={proyecto.id} proyecto={proyecto}/>
              </div>
            )
          })}
        </div>
      )
    }
    else{
      <div></div>
    }

  }

}

export default Proyectos;
