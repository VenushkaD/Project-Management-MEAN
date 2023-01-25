import { environment } from 'src/environments/environment';

export function getImageURL(imageUrl: string): string {
  // if (environment.production) {
  //   let url = '';
  //   for (let i = 3; i < imageUrl.split('/').length; i++) {
  //     url += imageUrl.split('/')[i] + '/';
  //   }
  //   url = '/' + url;
  //   url = url.slice(0, -1);
  //   return url;
  // }
  return imageUrl;
}
