
import { AxiosError, AxiosRequestConfig } from 'axios';
import http from '../http-common';

class HttpClientApi {
  private formatErrors(errors: AxiosError) {
    if (errors && errors.response) {
      const response = errors.response.data ? errors.response.data : errors.response;
      return Promise.reject(response);
    } else return Promise.reject(errors);
  }

  async httpGet(
    url: string,
    config?: AxiosRequestConfig<any> | undefined,
    finalizeHandler?: VoidFunction,
  ): Promise<any> {
    try {
      let response: any;
      try {
        response = await http.get<any>(url, config);
      } finally {
        if (typeof finalizeHandler === 'function') finalizeHandler();
      }
      return Promise.resolve(response.data);
    } catch (error: any) {
      return await this.formatErrors(error);
    }
  }

  async httpPost(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined,
    finalizeHandler?: VoidFunction,
  ): Promise<any> {
    try {
      let response: any;
      try {
        response = await http.post<any>(url, data, config);
      } finally {
        if (typeof finalizeHandler === 'function') finalizeHandler();
      }
      return Promise.resolve(response.data);
    } catch (error: any) {
      return await this.formatErrors(error);
    }
  }

  async httpPut(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined,
    finalizeHandler?: VoidFunction,
  ) {
    try {
      let response: any;
      try {
        response = await http.put<any>(url, data, config);
      } finally {
        if (typeof finalizeHandler === 'function') finalizeHandler();
      }
      return Promise.resolve(response.data);
    } catch (error: any) {
      return await this.formatErrors(error);
    }
  }

  async httpDelete(
    url: string,
    config?: AxiosRequestConfig<any> | undefined,
    finalizeHandler?: VoidFunction,
  ) {
    try {
      let response: any;
      try {
        response = await http.delete<any>(url, config);
      } finally {
        if (typeof finalizeHandler === 'function') finalizeHandler();
      }
      return Promise.resolve(response.data);
    } catch (error: any) {
      return await this.formatErrors(error);
    }
  }

  async httpRequest(
    config: AxiosRequestConfig<any>,
    finalizeHandler?: VoidFunction,
  ) {
    try {
      let response: any;
      try {
        response = await http.request<any>(config);
      } finally {
        if (typeof finalizeHandler === 'function') finalizeHandler();
      }
      return Promise.resolve(response.data);
    } catch (error: any) {
      return await this.formatErrors(error);
    }
  }
}

export default new HttpClientApi();
