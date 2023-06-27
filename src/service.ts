export async function getData() {
  const res = await fetch("/pulipuli/public/video.json");
  const data = await res.json();
  return data;
}
