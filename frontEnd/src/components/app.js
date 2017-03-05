import React, {Component} from 'react';
import Proyectos from './proyecto/proyectos';
import Navib from './navbar';
import About from './about';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //Rellenar para pruebas
      proyectos: [
        {
          id:1,
          name: "Mi primer proyecto",
          summary: "soy lo mega max",
          description: "Me gustaria que todos me ayudaran en mi proyecto que busca ser un proyecto chevere e innorvador",
          collaborator:"que sepa coser que sepa cantar",
          img: null,
          repo: {
            url:"http://github.com/cgarciahdez/cgarciahdez.github.io",
            stars:3,
            watches:5,
            forks:2,
            issues:1,
            language: "JavaScript"
          },
          webpage: "http://example.com",
          comments:[{text:"wash me encata"},{text:"que es esto tan play"},{text:"wow esta pesimo"}],
          author: "YO",
          ratings:[3.5]
        },
        {
          id:2,
          name: "Mi segundo proyecto",
          summary: "soy lo mega max",
          description: "Me gustaria que todos me ayudaran en mi proyecto que busca ser un proyecto chevere e innorvador",
          img: null,
          repo: {
            url:"http://github.com/cgarciahdez/cgarciahdez.github.io",
            stars:8,
            watches:5,
            forks:4,
            language: "Python"
          },
          webpage: "",
          comments:[{text:"wash me encata"},{text:"que es esto tan play"},{text:"wow esta pesimo"}],
          author: "Camis",
          ratings:[4.5]
        },
        {
          id:3,
          name: "Mi segundo proyecto",
          summary: "soy lo mega max",
          description: "Me gustaria que todos me ayudaran en mi proyecto que busca ser un proyecto chevere e innorvador",
          img: null,
          repo: {
            url:"http://github.com/cgarciahdez/cgarciahdez.github.io",
            stars:8,
            watches:5,
            forks:4,
            language: "Python"
          },
          webpage: "http://example.com",
          comments:[{text:"wash me encata"},{text:"que es esto tan play"},{text:"wow esta pesimo"}],
          author: "Camis",
          ratings:[3.5]
        },
        {
          id:4,
          name: "Mi segundo proyecto",
          summary: "soy lo mega max",
          description: "Me gustaria que todos me ayudaran en mi proyecto que busca ser un proyecto chevere e innorvador",
          img: null,
          repo: {
            url:"http://github.com/cgarciahdez/cgarciahdez.github.io",
            stars:8,
            watches:5,
            forks:4,
            language: "Python"
          },
          webpage: "http://example.com",
          comments:[{text:"wash me encata"},{text:"que es esto tan play"},{text:"wow esta pesimo"}],
          author: "Cami",
          ratings:[2]
        }
      ]
    }
  }

  render(){
    return(
      <div>
        <Navib/>
        <About/>
        <Proyectos proyectos={this.state.proyectos}/>
      </div>
    )

  }
}

export default App;
