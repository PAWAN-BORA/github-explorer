<script lang="ts">
  import { fade } from 'svelte/transition';
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import { Router, Link, Route } from "svelte-routing";
</script>


<Router >
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/blog">Blog</Link>
  </nav>
  <div>
    <Route path="/blog/:id" >
      <div>this blog</div>
    </Route>
    <Route path="/blog" >This is blog</Route>
    <Route path="/about" >About</Route>
    <Route path="/"><div class="bg-blue-500">this is home</div></Route>
  </div>
</Router>


