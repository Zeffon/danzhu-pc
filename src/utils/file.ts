export const download = (url: string, filename: string) => {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    });
};
