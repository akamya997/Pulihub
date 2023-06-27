export const GetUrlValue = (name: string) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substring(1).match(reg);
  if (r != null) {
    try {
      return decodeURIComponent(r[2]);
    } catch (e) {
      return null;
    }
  }
  return null;
};
