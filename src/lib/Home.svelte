<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";
  import Profile from "./Profile.svelte";
  import UserList from "./UserList.svelte";
  import RepositoryList from './RepositoryList.svelte';
  export let viewStatus:string;
  export let userData;
  export let errorMsg:string;
  
  let current_url = "";
  
  function viewFollower(event:CustomEvent){
    console.log(event.detail)
    viewStatus = "follower";
    current_url = event.detail;
  }
  function viewRepositories(){
    viewStatus = "repositories";
  }
 
</script>


<div class="p-2 flex flex-col gap-4 items-center">
  <div class="w-full flex-1 min-h-[100px] flex justify-between">
    {#if userData.status=="loading"}
      <div class="flex mt-4 w-[100%] justify-center">
        <Loader/>
      </div>
    {:else if userData.status=="done"}
     <Profile data={userData.data} on:follower={viewFollower} on:repositories={viewRepositories}/>
    {:else if userData.status=="notFound"}
      <div class="text-center w-[100%] text-2xl capitalize">no user found</div>
      {:else if userData.status=="error"}
      <div class="text-center w-[100%] text-2xl capitalize">{errorMsg}</div>
    {/if}
    
    {#if viewStatus=="follower"}
    <UserList followers_url={current_url} on:getUser/>
    {:else if viewStatus=="repositories"}
    <RepositoryList repos_url={userData.data.repos_url}/>
    {/if}
  </div>
  
</div>