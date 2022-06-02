<script lang="ts">
  import dayjs from "dayjs";
  import TouchFish from "./lib/TouchFish.svelte";

  const getTN = (
    s: string,
    defaultN: number,
    invalider: (n: number) => boolean = () => true
  ): number => {
    if (!s) {
      return defaultN;
    }
    if (!/^\d+$/.test(s)) {
      return defaultN;
    }
    const n = parseInt(s);
    if (isNaN(n)) {
      return defaultN;
    }
    if (!invalider(n)) {
      return defaultN;
    }
    return n;
  };

  const queries = new URLSearchParams(location.search);

  const dh = getTN(queries.get("dh"), 18, (n) => n >= 0 && n <= 23);
  const dm = getTN(queries.get("dm"), 0, (n) => n >= 0 && n <= 59);

  const goOffWorkTime = dayjs(Date.now())
    .set("hours", dh)
    .set("minute", dm)
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

  $: timeTip =
    dh <= 18
      ? dh <= 17
        ? "你下班好早！！！"
        : "还算可以的下班时间"
      : "兄弟996要注意身体";
</script>

<svelte:head>
  <title>{working ? "等等就下班了！！！" : "下班啦！！！"}</title>
</svelte:head>

<div
  class="w-full h-full bg-blue-300 fixed flex items-center justify-center flex-col select-none"
>
  {#if working}
    <div class="font-bold text-light-50 text-[2.23rem]">
      距离下班<span
        class="text-blue-800 underline ml-2 mr-2 cursor-pointer"
        title={timeTip}>({padZero(dh)}:{padZero(dm)})</span
      >还有
    </div>
    <div
      class="font-bold text-blue-600 lg:text-[12rem] md:text-[10rem] mt-10 text-[5rem]"
    >
      {padZero(hour)}:{padZero(minute)}:{padZero(second)}
    </div>
  {:else}
    <div
      class="font-bold text-blue-800 lg:text-[12rem] md:text-[10rem] text-[4rem] text-center"
    >
      已经下班啦！！！
    </div>
  {/if}
</div>
<TouchFish />
