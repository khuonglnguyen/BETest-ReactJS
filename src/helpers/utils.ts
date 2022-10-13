
import { FORMAT_DATETIME } from '@constants/date';
import moment from 'moment';

export default class Utils {
  static apiUrl = '';
  static successCode = '0';
  static existedCode = '0';
  static invalidSessionCode = '1';
  static popupWidth = '500px';
  static defaultAvatarSrc = './assets/images/users/icon-user.png';
  static role = {
    View: 'View',
    Update: 'Update',
    Create: 'Create',
    Delete: 'Delete',
    Upload: 'Upload',
    Confirm: 'Confirm',
  }
  static userLS = 'user';
  static userAccessTokenLS = 'userAccessToken';
  static userMenuLS = 'userMenus';
  static userAccessLS = 'userAccess';
  static loginUrl = '/login';
  static pageSizeOption = [5, 10, 20, 50];
  static defaultPage = 1;
  static defaultPagesize = 10;
  static defaultPaginatorRange = 5;
  static defaultErrorTitle = 'Error';
  static defaultErrorBody = 'Something went wrong !';
  static defaultPopupCancel = 'Cancel';
  static defaultPopupConfirm = 'OK';
  static homePageKey = 'home';
  static clipboardLimitted = 10;
}

export const capitalizeStr = (text: string): string => {
  if (!text || !text.trim()) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export const rangeItemStr = (pageIndex: number | undefined, totalPage: number | undefined, totalItem: number | undefined, pageSize: number | undefined): string => {
  if (!pageIndex) pageIndex = 0;
  if (!totalPage) totalPage = 0;
  if (!totalItem) totalItem = 0;
  if (!pageSize) pageSize = 0;
  const maxCurrentItem = pageIndex === totalPage ? totalItem : pageSize * pageIndex;
  const str = ((pageSize * pageIndex) - pageSize + 1) + '-' + maxCurrentItem + ' of ' + totalItem;
  return str;
};

export const genPaginator = (pageIndex: number, paginatorRange: number, totalPage: number) => {
  const showedPages = [];
  const range = paginatorRange % 2 > 0 ? (paginatorRange - 1) / 2 : paginatorRange / 2;
  let firstPage = 1;
  if (pageIndex > range + 1) {
    firstPage = pageIndex - range;
  }
  let temp = 0;
  if (totalPage - pageIndex < range) {
    temp = range - (totalPage - pageIndex);
  }
  if (temp > 0) {
    firstPage = firstPage - temp;
  }
  firstPage = firstPage < 1 ? 1 : firstPage;
  let lastPage = (firstPage + paginatorRange - 1);
  lastPage = lastPage > totalPage ? totalPage : lastPage;
  for (let i = firstPage; i <= lastPage; i++) {
    showedPages.push(i);
  }
  return showedPages;
};

export const checkDate = (date: string) => {
  date = !date || date.includes('Invalid') ? '' : date;
  return date;
};

export const getDate = (date: Date | string, format?: string): string => {
  if (!date) return '';
  if (!format) format = FORMAT_DATETIME.SHORT_DATE;
  return moment(date).format(format);
}

export const imageResize = (file: File, maxW = 500, maxH = 500) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  if (file) {
    reader.onload = function (e: any) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const MAX_WIDTH = maxW;
        const MAX_HEIGHT = maxH;
        let width = img.width;
        let height = img.height;

        // Resize
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if(ctx) ctx.drawImage(img, 0, 0, width, height);

        const dataurl = canvas.toDataURL(file.type);
        resolve(dataurl);
      };
    };
    reader.readAsDataURL(file);
  }
  reader.onerror = (error) => reject(error);
});

export const parseJWT = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};

export const addLoading = () => {
  const loadingAreas = document.querySelectorAll('.sidenav-container');
  if (loadingAreas.length > 0) {
    loadingAreas.forEach((el) => {
      el.classList.add('loading');
    });
  }
};

export const removeLoading = () => {
  const loadingAreas = document.querySelectorAll('.sidenav-container');
  if (loadingAreas.length > 0) {
    loadingAreas.forEach((el) => {
      el.classList.remove('loading');
    });
  }
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};