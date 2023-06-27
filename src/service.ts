export async function getData() {
  const res = await fetch("/public/video.json");
  const data = await res.json();
  return data;
}
