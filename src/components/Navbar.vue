<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Tracking Pixel Creator</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link style="text-decoration: none; color: inherit;" to="/"><a class="nav-link active" aria-current="page">Home</a></router-link> 
          </li>
          <li class="nav-item">
            <router-link style="text-decoration: none; color: inherit;" to="/create"><a class="nav-link" href="#">Create Pixel Id</a></router-link>
          </li>
          <li class="nav-item">
            <router-link style="text-decoration: none; color: inherit;" to="/opens"><a class="nav-link" href="#">Track Pixel Id</a></router-link>
          </li>
        </ul>
        
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>
  #nav-container {
    margin-left: 0;
    width:500px;
  }
</style>