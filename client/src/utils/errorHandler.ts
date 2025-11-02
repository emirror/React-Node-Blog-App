import { notification } from "antd";

export function handleError(error: any): void {
  console.log(error);
  
  const message = error?.response?.data?.message || error?.message || "An error occurred";
  const description = error?.response?.data?.error || error?.response?.statusText || "Please try again later";

  notification.error({
    message,
    description,
    placement: "topRight",
    duration: 3,
  });
}

export function handleSuccess(message: string, description?: string): void {
  notification.success({
    message,
    description,
    placement: "topRight",
    duration: 3,
  });
}

