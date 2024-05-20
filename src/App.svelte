<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Router, Link, Route } from "svelte-routing";
  import Header from './lib/Header.svelte';
  import Home from './lib/Home.svelte';
  type UserData = {status: "none" | "loading" | "done" | "error" | "notFound", data: any};
  
  let userData:UserData = {status:"none", data:null};
  let search = "";
  let viewStatus = "none";
  let errorMsg = "";
  async function getUser(){
    userData.status = "loading";
    viewStatus = "none";
    try {
      let res = await fetch(`https://api.github.com/users/${search}`);
      if(res.status==404){
        userData.status = "notFound";
      } else if(res.status==403){
        let data = await res.json();
        userData.status = "error";
        console.log(data.message)
        errorMsg = data.message.split("(")[0];
      } else if(res.status==200){
        let data = await res.json();
        console.log(data);
        userData.status = "done";
        userData.data = data;
      }
    } catch (error) {
      console.log(error);
      userData.status = "error";
    } 
  }
  function searchUser(event:CustomEvent){
    search = event.detail.username;
    getUser();
  }
</script>
  

<Router >
  <Header on:getUser={getUser} bind:search/>
  <div class="bg-gray-200 min-h-[calc(100vh-76px)]">
    <Route path="/blog/:id" >
      <div>this blog</div>
    </Route>
    <Route path="/blog" >This is blog</Route>
    <Route path="/about" >About</Route>
    <Route path="/" >
      <Home bind:viewStatus bind:userData  bind:errorMsg={errorMsg} on:getUser={searchUser}/>
    </Route>
  </div>
</Router>


