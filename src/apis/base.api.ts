import { showError } from '@components/Notification/Notification';
import Utils from '@helpers/utils';

abstract class BaseApi {

  /**
   * Get error message
   * @param error any
   * @returns string
   */
  protected static getServerErrorMessage(errors: any): string | null {
    let errMsg: string | null;
    if (errors.status === 400) {
      // The response body may contain clues as to what went wrong,
      if (typeof errors.error === 'object') {
        errMsg = errors.error.message
          ? errors.errors.message
          : errors.error.error
          ? errors.error.error
          : Utils.defaultErrorBody;
      } else errMsg = errors.error;
    } else {
      if (errors.status === 401) {
        errMsg = null;
      } else {
        if (errors.error && typeof errors.error === 'object') {
          errMsg = errors.error.ExceptionMessage
            ? errors.error.ExceptionMessage
            : errors.error.message
            ? errors.error.message
            : errors.error.error
            ? errors.error.error
            : Utils.defaultErrorBody;
        } else {
          errMsg = errors.error
            ? errors.error
            : errors.status
            ? `${errors.status} - ${errors.statusText}`
            : Utils.defaultErrorBody;
        }
      }
    }
    return errMsg;
  }

  /**
   * Handle HTTP error
   */
  protected handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      const errMsg = error.statusText
        ? error.statusText
        : error.status
        ? `${error.status} - ${error.statusText}`
        : Utils.defaultErrorBody;
      return showError(errMsg);
    } else {
      // The backend returned an unsuccessful response code.
      const errMsg = BaseApi.getServerErrorMessage(error);
      return showError(errMsg);
    }
  }

}

export default BaseApi;
