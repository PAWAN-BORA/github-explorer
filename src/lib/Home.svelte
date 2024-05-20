<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";
  import Profile from "./Profile.svelte";
  import UserList from "./UserList.svelte";
  import RepositoryList from './RepositoryList.svelte';
  export let viewStatus:string;
  // export let search:string;
  export let userData;
  export let errorMsg:string;
  
  let current_url = "";
  
  onMount(()=>{
    
  });
  

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
  <!-- <div class="max-w-screen-md">
    <form on:submit|preventDefault={getUser}>
      <div class="flex gap-2 items-center justify-center">
        <input 
          placeholder="User Name"
          class="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          bind:value={search}
          >
        <button class="w-64 bg-gray-500 text-white py-1.5 px-1 rounded font-bold uppercase  hover:text-gray-300 hover:before:animate-ping transition-all duration-300">
          Search
        </button>
      </div>
    </form>
  </div> -->
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