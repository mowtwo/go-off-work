<script lang="ts">
  import dayjs from "dayjs";

  const goOffWorkTime = dayjs(Date.now())
    .set("hours", 18)
    .set("minute", 0)
    .set("second", 0);
  let now = dayjs(Date.now());
  setInterval(() => {
    now = dayjs(Date.now());
  }, 300);
  $: hour = goOffWorkTime.diff(now, "hour");
  $: minute = goOffWorkTime.diff(now, "minute") - hour * 60;
  $: second = goOffWorkTime.diff(now, "second") - hour * 3600 - minute * 60;

  const padZero = (n: number) => (n > 9 ? n : `0${n}`);

  $: working = hour > 0 || minute > 0 || second > 0;
</script>

<svelte:head>
  <title>{working ? "等等就下班了！！！" : "下班啦！！！"}</title>
</svelte:head>

<div
  class="w-full h-full bg-blue-300 fixed flex items-center justify-center flex-col"
>
  {#if working}
    <div class="font-bold text-light-50 text-[2.23rem]">距离下班还有</div>
    <div class="font-bold text-blue-600 lg:text-[12rem] md:text-[10rem] mt-10 text-[5rem]">
      {padZero(hour)}:{padZero(minute)}:{padZero(second)}
    </div>
  {:else}
    <div class="font-bold text-blue-800 lg:text-[12rem] md:text-[10rem] text-[4rem] text-center">已经下班啦！！！</div>
  {/if}
</div>
