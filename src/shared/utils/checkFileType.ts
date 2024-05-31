export const checkFileType = (url) => {
  const isImage = (url) => {
    const isImage = url.match(/\.(jpeg|jpg|gif|png)$/i) != null;

    if (isImage) {
      return 'image';
    }
  };

  const isVideo = (url) => {
    const isVideo = url.match(/\.(mp4|webm|ogg)$/i) != null;

    if (isVideo) {
      return 'video';
    }
  };
  return isImage(url) || isVideo(url);
};