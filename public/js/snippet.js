function ApiCall(choice){
    if(choice == "posts"){
        return fetch("https://jsonplaceholder.typicode.com/posts").then(response => {
           return response.json()
        }).catch(error => console.log(error));
    }

    if(choice == "photos"){
        return fetch("https://jsonplaceholder.typicode.com/photos").then(response => {
           return response.json()
        }).catch(error => console.log(error));        
    }

    if(choice == "users"){
        return fetch("https://jsonplaceholder.typicode.com/users").then(response => {
           return response.json()
        }).catch(error => console.log(error));        
        }
    
    }

//Chained API calls with no return. 
ApiCall("photos").then(data => {
    console.log(data)
    ApiCall("users").then(res => {
        console.log(res)
    })
})

//Chain API calls in series 
ApiCall("photos").then(data => {
    console.log(data)
    return ApiCall("users")
})
.then(data => {
    console.log(data)
    return ApiCall("posts")
})
.then(data => {
    console.log(data)
})

//make multiple API Calls at the same time
const choices = ['users', 'posts', 'photos'];
const apiCalls = choices.map(ApiCall);
Promise.all(apiCalls).then(data => console.log(data));

