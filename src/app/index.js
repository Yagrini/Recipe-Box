import React from 'react';
import ReactDOM from 'react-dom';

let i=0;
class App extends React.Component{
    constructor(props){
        super(props);
        let myrecipes = [{name : 'Raw Avocado & Brocc Salad', ingredient :['Broccoli','Avocado','Olive Oil','Lemon Juice','Cheese and Nuts (optional)']},{name : 'Potato Onion Mushroom Bake', ingredient :['50 oz potatoes','7 oz mushrooms','3 onions','1 cup water','1/2 cup olive oil','1 teaspoon salt','1/2 teaspoon pepper']},{name : 'Nutella Brownies', ingredient :['1 cup Nutella - Microwave for a few seconds to soften','2 eggs','10 Tbs all purpose flour (or 1/2 cup plus 2 Tbs)','1/4 tsp salt (optional)','1/4 cup chocolate chips (optional)']}];
        let recipes = JSON.parse(localStorage.getItem("Youness_Recipes")) || myrecipes;
        this.state = {
            recipename:'',
            ingredients:'',
            data:myrecipes};
    }
    addrecipe(arg){
        for (var i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].name === arg.recipename) return;
        }
       if( arg.recipename=='' || arg.ingredients.split(',').join('')=='') return;
       else{
           let arrayvar = this.state.data.slice();
           arrayvar.push({name : arg.recipename , ingredient:arg.ingredients.split(',')});
           this.setState({data : arrayvar});
       }
       this.setState({recipename:'', ingredients:''});
    }
    deleterecipe(arg){
        let arr = this.state.data.filter(function(el) {
            return el.name !== arg;
        });
        this.setState({data : arr});
    }
    updateRecipe(arg1,arg2,arg3) {
        let index = this.state.data.findIndex(x => x.name==arg1);
        let arr = this.state.data;
        if(arg2=='' || arg3.split(',').join('') =='') return ;
        arr[index].name = arg2;
        arr[index].ingredient=arg3.split(',');
        this.setState({data : arr});
    }
    render(){
        localStorage.setItem("Youness_Recipes",JSON.stringify(this.state.data));
        const mypanel = this.state.data.map((item)=>{
            const ingredients = item.ingredient.map((ing) => {
                let number = i++;
                return <li className="list-group-item" key={number}>{ing}</li>;
            });
            let number = i++;
            let name = item.name.split(' ').join('');
            let myid = name + 'i';
            let myid1 = '#' + name + 'i';
            let myidfortext = name + 't';
            let myidfortext2 = name + 'a';

            return(
                <div className="panel panel-primary item" key={number}>
                    <div className="panel-heading myhead"  onClick={()=>{
                        if(document.getElementById(name).className.indexOf("classtwo")==-1)
                        {
                            $('.ingredient').addClass('classone').removeClass('classtwo');
                            document.getElementById(name).className="list-group  ingredient classtwo";
                        }
                        else $('.ingredient').addClass('classone').removeClass('classtwo');

                    }}>{item.name}</div>
                    <div className= " ingredient classone" id={name}>
                        <h4 className="text-center">Ingredients</h4><hr/>
                        <ul className="list-group inggg">
                             {ingredients}
                        </ul>
                        <div className="modal-footer mybuttons" >
                        <button className="btn btn-danger" onClick={() => this.deleterecipe(item.name)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                        <button type="button" className="btn btn-default"  data-toggle="modal" data-target={myid1}><i className="fa fa-pencil" aria-hidden="true"></i>
                             </button>
                        </div>
                    </div>
                    <div className="modal fade" id={myid} role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Edit Recipe</h4>
                                </div>
                                <div className="modal-body">
                                    <label >Recipe Name:</label>
                                    <input type="text" id={myidfortext} value={item.name} onChange={() => {value =  event.target.value}} className="form-control"  />
                                </div>
                                <div className="modal-body">
                                    <label >Ingredients:</label>
                                    <input  type="text" id={myidfortext2} value={item.ingredient.join(',')} onChange={() => {value =  event.target.value}} className="form-control" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.updateRecipe(item.name,document.getElementById(myidfortext).value,document.getElementById(myidfortext2).value)}>Save</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            )
        });
        return(
            <nav className="navbar navbar-inverse">
                <p className="text-center mynav">Recipe Box</p>
            <div className="container all">
                <div className="panel-group">
                 {mypanel}
                </div>
                <div className= "myadd"><button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Recipe</button></div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add a Recipe</h4>
                            </div>
                            <div className="modal-body">
                                <label >Recipe Name:</label>
                                <input type="text" className="form-control" value={this.state.recipename} id="recipename" onChange={(event)=>{this.setState({recipename : event.target.value})}}/>
                            </div>
                            <div className="modal-body">
                                <label >Ingredients:</label>
                                <input placeholder="Enter Ingredients,Separated,By Commas" value={this.state.ingredients} type="text" onChange={(event)=>{this.setState({ingredients : event.target.value});}} className="form-control" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => {this.addrecipe(this.state)}}>Save</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </nav>
        );
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));
