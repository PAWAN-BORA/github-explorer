<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let data;
  const dispatch = createEventDispatcher();
</script>
<div class="max-w-[400px] p-2 mt-3 place-self-start bg-white rounded">
  <div class="flex gap-4 items-center">
    <div class="w-32 rounded-full overflow-clip">
      <img src={data.avatar_url} alt="img" />
    </div>
    <h2 class="text-4xl">{data.name}</h2>
  </div>
  <div class="bg-gray-100 grid grid-cols-3 gap-2 p-2 mt-4">
    <div>
      Following 
    </div>
    <div class="font-bold">{data.following}</div>
    <button class="btn btn-sm btn-info" on:click={()=>{dispatch("follower", data.following_url.split('{/')[0])}}>view</button>

    <div>
      followers
    </div>
    <div class="font-bold" >{data.followers}</div>
    <button class="btn btn-sm" on:click={()=>{dispatch("follower", data.followers_url)}} >view</button>
    <div >
      repositories
    </div>
    <div class="font-bold">{data.public_repos}</div>
    <button class="btn btn-sm btn-primary" on:click={()=>{dispatch("repositories", data.followers_url)}}>view</button>
  </div>
  <!-- <div class="text-right">
    <button type="button" on:click={()=>{dispatch("follower", data.followers_url)}} class="btn">
      view followers
    </button>
    <button type="button" on:click={()=>{dispatch("repositories", data.followers_url)}} class="btn btn-primary">
      view repositories
    </button>
  </div> -->
</div>