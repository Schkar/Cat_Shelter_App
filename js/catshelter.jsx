import React from 'react';
import ReactDOM from 'react-dom';

//Main Component
    class CatShelterApp extends React.Component {
        constructor(props) {
            super(props)
            
            this.state = {
                catsDatabase: [
                    {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
                    {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
                    {category: "male", age: "2", likesKids: false, name: "Grumpy"},
                    {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
                    {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
                    {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
                ],
                catsToRender: [],
                catToSearch: "",
                catLikesKids: false,
                fontPicked: "normalfont"
            }
        }

        fontChanger = (e) =>{
            console.log(e);
            if (e === "catfont") {
                this.setState({
                    fontPicked: "catfont"
                })
                document.body.style.fontFamily = "CatFont";
                return
            }
            this.setState({
                fontPicked: "normalfont"
            })
            document.body.style.fontFamily = "Sans-Serif";
            return
        }

        searchInputChange = (e) => {
            let myCats = this.state.catsDatabase;
            let newCats = myCats.filter( (elem) => {
                if (this.state.catLikesKids){
                    if ((elem.name.toLowerCase().indexOf(e.toLowerCase()) >= 0) && (elem.likesKids===true)) {
                        return elem
                    }
                }
                else{
                    if (elem.name.toLowerCase().indexOf(e.toLowerCase()) >= 0) {
                        return elem
                    }
                } 
            })
            this.setState({
                catToSearch: e,
                catsToRender: newCats
            });
        }

        searchCheckboxChange = (e) => { //tu jest problem
            let myCats = this.state.catsDatabase;
            let newCats = myCats.filter( (elem) => {
                if (e){
                    if ((elem.name.toLowerCase().indexOf(this.state.catToSearch.toLowerCase()) >= 0) && (elem.likesKids===true)) {
                        return elem
                    }
                }
                else{
                    if (elem.name.toLowerCase().indexOf(this.state.catToSearch.toLowerCase()) >= 0) {
                        return elem
                    }
                } 
            })
            this.setState({
                catLikesKids: e,
                catsToRender: newCats
            });
        }


        render() {
            return (
                <div className="shelter_wrapper">
                    <h1 className="shelter_header">Adopt-a-kitty! 
                        <span className="shelter_header_mobile">Mobile version!</span>
                    </h1>
                    <CatSearchField fontChanger={this.fontChanger} fontPicked={this.state.fontPicked} catToSearch={this.state.catToSearch} catLikesKids={this.state.catLikesKids} inputChange={this.searchInputChange} checkboxChange={this.searchCheckboxChange}/>
                    <CatTable catsDatabase={this.state.catsDatabase} catsToRender={this.state.catsToRender}/>
                </div>
            )
        }
    }

//Main Component End

//Cat Search Field
    class CatSearchField extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                catToSearch: this.props.catToSearch,
                catLikesKids: this.props.catLikesKids,
                actualFont: this.props.fontPicked
            }
        }

        handleFontChange = (e) =>{
            if (typeof this.props.fontChanger === "function") {
                this.props.fontChanger(e.target.value)
            }
        }

        handleCheckboxChange = (e) => {
            this.setState({
                catLikesKids: e.target.checked
            })
            if (typeof this.props.checkboxChange === "function") {
                this.props.checkboxChange(e.target.checked)
            }
        }

        handleInputChange = (e) => {
            this.setState({
                catToSearch: e.target.value
            })
            if (typeof this.props.inputChange === "function") {
                
                this.props.inputChange(e.target.value)
            }
        }

        render(){
            return(
                <form className="search_form">
                    <label className="font_checker_label" htmlFor="font_checker">Pick your font!
                        <select className="font_checker" name="font_checker" value={this.state.fontPicked} onChange={this.handleFontChange}>
                            <option className="cat_option" value="catfont">Crazy cat font :)</option>
                            <option className="normal_option" value="normalfont">Sad normal font :(</option>
                        </select>
                    </label>
                    <input className="search_box" value={this.state.catToSearch} type="text" placeholder="Search" onChange={this.handleInputChange}/>
                    <label className="checkbox_label" htmlFor="catLikesKids">
                        <input className="checkbox_CatLikesKids" name="catLikesKids" type="checkbox" checked={this.state.catLikesKids} onChange={this.handleCheckboxChange}/> Only show cats that like kids
                    </label>
                </form>
            )
        }
    }
//Cat Search Field End

//Cat Table
    class CatTable extends React.Component {
        constructor(props) {
            super(props)
        }

        render(){
            let renderMe = (this.props.catsToRender.length === 0 ? this.props.catsDatabase : this.props.catsToRender)
            return (
                <table className="cat_table">
                    <CatTableHead/>
                    <tbody className="cat_table_body">
                        <CatTableSeparator category="male"/>
                        {renderMe.map( (e,i) => {
                            return (
                                e.category==="male" ? <SingleCat key={e.name} name={e.name} category={e.category} age={e.age} likesKids={e.likesKids} index={i}/> : null
                            )
                        })}
                        <CatTableSeparator category="female"/>
                        {renderMe.map( (e,i) => {
                            return (
                                e.category==="female" ? <SingleCat key={e.name} name={e.name} category={e.category} age={e.age} likesKids={e.likesKids} index={i}/> : null
                            )
                        })}
                    </tbody>
                </table>
            )
        }
    }
//Cat Table End

//Cat Table Head
    class CatTableHead extends React.Component {
        constructor(props) {
            super(props)
        }

        render(){
            return(
                <thead className="cat_table_head">
                    <tr className="cat_table_head_row">
                        <th className="cat_table_head_name">Name</th>
                        <th className="cat_table_head_age">Age</th>
                    </tr>
                </thead>
            )
        }
    }
//Cat Table Head End

//Cat Table Separatpr
    class CatTableSeparator extends React.Component {
        constructor(props) {
            super(props)
        }

        render(){
            return(
                <tr className="cat_separator_row">
                    <th className="cat_separator" colSpan="2">{this.props.category}</th>
                </tr>
            )
        }
    }
//Cat Table Separator End

//Single Cat
    class SingleCat extends React.Component {
        constructor(props){
            super(props)
        }

        render() {
            return (
                <tr className="single_cat_row">
                    <td className={this.props.likesKids ? "cat_likekids single_cat_name": "cat_dontlikekids single_cat_name"} data-index={this.props.index} data-name={this.props.name} data-age={this.props.age} data-category={this.props.category} data-likesKids={this.props.likesKids}>{this.props.name}</td>
                    <td className={this.props.likesKids ? "cat_likekids single_cat_age": "cat_dontlikekids single_cat_age"}>{this.props.age}</td>            
                </tr>
            )
        }
    }
//Single Cat End

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <div>
            <CatShelterApp/>
        </div>,
        document.getElementById('app')
    );
});