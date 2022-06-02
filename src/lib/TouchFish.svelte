<script lang="ts">
  let touching = false;
  let counter = 0;
</script>

<div
  class="fixed z-10 cursor-pointer fishing w-[300px] h-[300px] transform lg:scale-100 lg:right-2 lg:bottom-2 md:scale-100 md:right-2 md:bottom-2 scale-70 right-0 bottom-0"
  class:touching
  on:click={() => {
    touching = true;
    counter++;
  }}
  on:animationend={() => {
    touching = false;
  }}
  data-counter="摸鱼次数:{counter}"
/>

<style>
  @keyframes fish-jump {
    0% {
      background-image: url(/fish-cover.png);
    }
    50% {
      background-image: url(/fish-2.png);
    }
    100% {
      background-image: url(/fish-3.png);
    }
  }
  .fishing {
    background: url(/fish-cover.png) no-repeat center;
  }
  .fishing::before {
    content: attr(data-counter);
    text-align: center;
    display: block;
    color: #fff;
  }
  .fishing.touching {
    animation: fish-jump 0.3s 0s 2 linear;
  }
</style>
