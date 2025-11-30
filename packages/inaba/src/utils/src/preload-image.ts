class PreloadImage {
  private ImageCache: Map<string, Promise<HTMLImageElement>>

  constructor() {
    this.ImageCache = new Map();
  }

  preload(src: string): Promise<HTMLImageElement> {
    const { ImageCache } = this

    const imgPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });

    ImageCache.set(src, imgPromise);
    return imgPromise;
  }

  getImage(src: string): Promise<HTMLImageElement> {
    const { ImageCache } = this
    if (ImageCache.has(src)) {
      return ImageCache.get(src)!
    }
    return this.preload(src)
  }

  batchPreload(srcList: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(srcList.map((src) => this.getImage(src)));
  }
}

export const preloadImage = new PreloadImage();