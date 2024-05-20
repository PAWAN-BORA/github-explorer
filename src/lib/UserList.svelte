<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import {fade, fly} from 'svelte/transition';
  import Loader from "./Loader.svelte";

  export let followers_url:string;

  const dispatch = createEventDispatcher();
  let followersList: any = [];
  let loading = true;
  // let rendered = false;
  // onMount(async () => {
  //   rendered = true;
  // });

  async function getData(url:string){
    loading = true;
    followersList = [];
    try {
      let response = await fetch(url);
      if (response.status == 200) {
        let data = await response.json();
        console.log(data);
        followersList = data;
        loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  $:getData(followers_url);
  type itemType = {
    login:string,

  }
  function viewUser(item:itemType){
    dispatch('getUser', {
			username: item.login
		});
  }
</script>

<div class="flex-1">
  {#if loading}
    <div class="flex justify-center mt-4">
      <Loader />
    </div>
  {/if}
  {#if followersList.length>0}
    <div class="container">
      {#each followersList as item}
        <div class="basic-card basic-card-lips">
          <div class="card-content">
            <div class="flex gap-4 items-center">
              <div class="w-16 rounded-full overflow-clip">
                <img src={item.avatar_url} alt="img" />
              </div>
              <h2 class="text-2xl">{item.login}</h2>
            </div>
          </div>

          <div class="card-link">
            <button title="View" on:click={()=>{viewUser(item)}} class="p-0">
              <span>View User</span>
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    padding: 12px;
    max-height: calc(100vh - 120px);
    overflow: auto;
    justify-content: center;
  }
  .basic-card {
    width: 350px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
    -o-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  }

  .basic-card .card-content {
    padding: 30px;
  }

  .basic-card .card-title {
    font-size: 25px;
    font-family: "Open Sans", sans-serif;
  }

  .basic-card .card-text {
    line-height: 1.6;
  }

  .basic-card .card-link {
    padding: 12px 25px;
    width: -webkit-fill-available;
  }

  .basic-card .card-link button {
    text-decoration: none;
    position: relative;
    padding: 10px 0px;
  }

  .basic-card .card-link button:after {
    top: 30px;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    width: 0;

    -webkit-transition:
      width 0.3s ease 0s,
      left 0.3s ease 0s;
    -moz-transition:
      width 0.3s ease 0s,
      left 0.3s ease 0s;
    -o-transition:
      width 0.3s ease 0s,
      left 0.3s ease 0s;
    transition:
      width 0.3s ease 0s,
      left 0.3s ease 0s;
  }

  .basic-card .card-link button:hover:after {
    width: 100%;
    left: 0;
  }

  .basic-card-lips {
    background-image: linear-gradient(to bottom right, #3282F6, #99a3d4);
  }

  .basic-card-lips .card-content {
    color: #fff;
  }
  

  .basic-card-lips .card-link {
    border-top: 1px solid #3282F6;
    color:#fff;
  }

  .basic-card-lips .card-link button:after {
    background: #fff; 
    /* 3282F6  #8B5CF6*/
  }
</style>
