<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";
  import {fade} from 'svelte/transition';


  export let repos_url;
  let reposList:any = [];
  let loading = true;
  onMount(async () => {
    loading = true;
    try {
      let response = await fetch(repos_url)
      if(response.status==200){
        let data = await response.json();
        console.log(data);
        reposList = data;
        loading = false;
      }
    } catch (err) {
      console.log(err);
    }
    
  });
</script>
<div class="flex-1">
  {#if loading}
    <div class="flex justify-center mt-4">
      <Loader/>
    </div>
  {/if}


  {#if reposList.length>0}
    <div class="container" transition:fade>
      {#each reposList as item}
    
        <div class="basic-card basic-card-aqua">
          <div class="card-content">
              <span class="card-title">{item.name}</span>
              <div class="card-text">created at {new Date(item.created_at).toLocaleString()} </div>
              <div class="card-text">{item.description==null?"":item.description} </div>
          </div>
    
          <div class="card-link">
              <a href={item.html_url} title="View" target="_blank"><span>View Repository</span></a>
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
    max-height: calc(100vh - 90px);
    overflow: auto;
    justify-content: center;
  }
  .basic-card {
        width:350px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3);
        -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3);
        -o-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3);
        box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.3);
    }
    
        .basic-card .card-content {
            padding: 30px;
        }

        .basic-card .card-title {
            font-size: 25px;
            font-family: 'Open Sans', sans-serif;
        }

        .basic-card .card-text {
            line-height: 1.6;
        }

        .basic-card .card-link {
            padding: 12px 25px;
            width: -webkit-fill-available;
        }

            .basic-card .card-link a {
                text-decoration: none;
                position: relative;
                padding: 10px 0px;
            }

            .basic-card .card-link a:after {
                top: 30px;
                content: "";
                display: block;
                height: 2px;
                left: 50%;
                position: absolute;
                width: 0;

                -webkit-transition: width 0.3s ease 0s, left 0.3s ease 0s;
                -moz-transition: width 0.3s ease 0s, left 0.3s ease 0s;
                -o-transition: width 0.3s ease 0s, left 0.3s ease 0s;
                transition: width 0.3s ease 0s, left 0.3s ease 0s;
            }

            .basic-card .card-link a:hover:after { 
                width: 100%; 
                left: 0; 
            }
    
    
    .basic-card-aqua {
        background-image: linear-gradient(to bottom right, #8B5CF6, #99a3d4);
    }
  

    .basic-card-aqua .card-content, .basic-card .card-link a {
        color: #fff;
    }
    
    .basic-card-aqua .card-link {
        border-top:1px solid #8B5CF6;
    }

    .basic-card-aqua .card-link a:after {
        background:#fff;
    }
</style>