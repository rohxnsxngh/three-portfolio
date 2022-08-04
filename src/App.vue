<template>
  <div class="nav-container">
    <nav id="navbar">
      <div>
        <div class="link-container">
          <img
            src="./assets/github.png"
            style="width: 35px; height: 35px; margin-bottom: 15px;"
          /><img />
        </div>
        <div class="link-container">
          <img
            src="./assets/linkedin.png"
            style="width: 35px; height: 35px; margin-bottom: 15px;"
          /><img />
        </div>
        <div class="link-container">
          <img
            src="./assets/email.png"
            style="width: 35px; height: 35px; margin-bottom: 15px;"
          /><img />
        </div>
        <div class="link-container">
          <img
            src="./assets/instagram.png"
            style="width: 35px; height: 35px; margin-bottom: 15px;"
          /><img />
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
#navbar {
  display: flex;
  background-color: transparent;
  transform: translateY(-100%);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
#navbar a {
  color: rgb(255, 255, 255);
  text-decoration: none;
}
#navbar > * {
  padding: 1rem;
}
.nav-container:hover #navbar {
  transform: translateY(0);
}
</style>
