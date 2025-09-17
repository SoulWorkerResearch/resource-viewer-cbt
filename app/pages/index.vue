<template>
  <section class="flex place-content-center place-items-center overflow-clip">
    <img
      src="/app-icon.png"
      class="h-svh w-auto animate-wiggle opacity-25 aspect-square object-contain"
    >

    <header class="absolute text-center text-4xl leading-loose uppercase text-shadow-md">
      <NuxtLink
        to="item"
        class="text-sky-300/80 hover:bg-neutral-300 hover:text-neutral-900 px-2 py-1 transition-colors"
      >
        Items
      </NuxtLink>

      <NuxtLink
        to="table"
        class="text-amber-300/80 hover:bg-neutral-300 hover:text-neutral-900 px-2 py-1 transition-colors"
      >
        Tables
      </NuxtLink>
    </header>

    <footer class="absolute bottom-0 text-center text-sm uppercase text-shadow-md">
      <p class="text-pink-300/80">
        For Closed Beta Test Client
      </p>
    </footer>
  </section>
</template>
