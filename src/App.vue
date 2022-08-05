<template>
  <div class="nav-container">
    <nav id="navbar">
      <div>
        <a href="https://github.com/rohxnsxngh">
        <div class="link-container">
          <img
            src="./assets/github.png"
            style="width: 35px; height: 35px; margin-bottom: 15px;"
          /><img />
        </div>
        </a>
        <a href="https://www.linkedin.com/in/rohan-singh1122/">
        <div class="link-container">
          <img
            src="./assets/linkedin.png"
            style="width: 35px; height: 35px; margin-bottom: 15px;"
          /><img />
        </div>
        </a>
        <a href="mailto:rohan.singh.do@gmail.com">
        <div class="link-container">
          <img
            src="./assets/email.png"
            style="width: 35px; height: 35px; margin-bottom: 15px;"
          /><img />
        </div>
        </a>
        <a href="https://www.instagram.com/rohxnsxngh/">
        <div class="link-container">
          <img
            src="./assets/instagram.png"
            style="width: 35px; height: 35px; margin-bottom: 15px;"
          /><img />
        </div>
        </a>
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
