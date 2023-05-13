import { BVG, Network, Pollution, Time, Weather } from '@/components';

export default function Home() {
  return (
    <main className="bg-white h-screen w-screen grid grid-cols-3 grid-rows-2 divide-x divide-y">
      <Weather />
      <Pollution />
      <button className="bg-red-100 active:shadow-inner active:bg-red-200 flex flex-col p-2 items-center justify-center space-y-2">
        <img src="/turn-off-svgrepo-com.svg" alt="turn off" className="h-10 w-10" />
        <span className="text-xs">Turn off all smart devices</span>
      </button>
      <BVG />
      <Time />
      <Network />
    </main>
  );
}
