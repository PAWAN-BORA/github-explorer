<script lang="ts">
  import {Link} from 'svelte-routing'
  import logo from '../assets/github-logo.png';
  import { createEventDispatcher } from "svelte";
  export let search:string;
  const dispatch = createEventDispatcher();
  
</script>

<header class="bg-white drop-shadow-sm">
  <nav class="flex items-center justify-between p-4" >
    <div class="flex">
      <Link to="/" class="p-1">
        <img class="h-8 w-auto" src={logo} alt="">
      </Link>
    </div>
    <div>
      <form on:submit|preventDefault={()=>{ dispatch("getUser")}}>
        <div class="flex gap-2 items-center justify-center">
          <input 
            placeholder="User Name"
            class="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            bind:value={search}
            >
          <button class="w-64 bg-gray-500 text-white py-1.5 px-1 rounded font-bold uppercase  hover:text-gray-300 hover:before:animate-ping transition-all duration-300 ">
            Search
          </button>
        </div>
      </form>
    </div>
    <div class="flex gap-x-12" >
        
      <div class="text-sm font-semibold leading-6 text-gray-900 ">Git Explorer</div>
      <!-- <Link to="/about" class="text-sm font-semibold leading-6 text-gray-900">Features</Link>
      <Link to="/blog" class="text-sm font-semibold leading-6 text-gray-900">Marketplace</Link>
      <Link to="/blog/:id" class="text-sm font-semibold leading-6 text-gray-900">Company</Link> -->
    </div>
  </nav>
</header>