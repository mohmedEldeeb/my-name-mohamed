import React, { Component } from "react"
import { Route } from "react-router-dom"
import SearchApp from "./searchApp"
// import App from "./App"
import { getAll,update ,search} from "./BooksAPI"
import './App.css'
import MyBook from "./myBook"
class Aapp extends Component{
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        date:[],
        searchDate:[],
        query: '',
      }

      async componentDidMount() {
         await getAll()
          .then((date) => {
            this.setState({date})
            console.log("data",this.state.date)
          })
      }
      handelSearchDate=(()=>{
        if(this.state.query === ""){
          this.setState({searchDate:[]})
        }
      })
      addShelfToSearchBook=(book)=>{

        book.map((item)=>{
          item.shelf= "none"

        })
        return book
      }
      updateQuery = (query) => {
        this.handelSearchDate()
        this.setState(() => ({
          query: query.trim()
        }))
        search(query)
          
          .then((d) => {
            let searchDate =[...d]

            // let date = this.state.date
            // let aaa = []
            // for(let a in searchDate){
            //   for(let b  in date){
            //     if(a.id == b.id){
            //       let o={...a}

            //       let bb= b.shelf
            //       o.shelf=bb
            //       // return aaa.push(o)
            //     }else{
            //       let oo ={...a}
            //       oo.shelf="none"

            //       // return aaa.push(oo)
            //     }
            //   }
            // }
            // console.log("all",aaa)
            this.setState(()=>({searchDate}))
        })
        .catch((err)=>{
          console.log(err)
        })
      }

      onupdeat = (e,x)=>{
        console.log("ee",e)
        const date = this.state.date
        const h = date.indexOf(x)


        date.find((a)=>{
          if(a.id===x.id){
            return a.shelf=e
          }else {
            let id = x.shelf
            id=e
            date.push(id)
          }
        })
        this.setState({date})
        console.log(h)
        console.log(e)
        update(x,e)
      }

      onupdeatMyBook = (e,x)=>{
        console.log("ee",e)
        const date = this.state.date
        const h = date.indexOf(x)

        if(h === -1){
          x.shelf=e
          date.push(x)
          this.setState({date})
        }else {
          date[h].shelf = e
          this.setState({date})
        }
        
        console.log(h)
        console.log(e)
        update(x,e)
      }

    render (){
        return (
            <div>
                <Route exact path = "/"  render={()=>(
                    <MyBook 
                    date={this.state.date}
                    onupdeat={this.onupdeatMyBook}
                    />
                    )} />
                <Route exact path = "/search"  render={()=>(
                    <SearchApp
                    searchDate={this.state.searchDate}
                    onupdeat={this.onupdeatMyBook}
                    updateQuery={this.updateQuery}
                    books={this.state.date}
                    />
                    )} />

            </div>
        )
    }
}

export default Aapp