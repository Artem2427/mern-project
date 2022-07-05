import { useCallback } from "react";
import { notification } from "antd";
import { TypeNotification } from "../Utils/enums";

export const useMessage = () => {
  return useCallback((message: string, type: TypeNotification) => {
    switch (type) {
      case TypeNotification.erorr:
        notification.error({
          message: "Error",
          description: message,
          duration: 3,
        });
        return;
      case TypeNotification.success:
        notification.success({
          message: "Success",
          description: message,
          duration: 3,
        });
        return;
    }
  }, []);
};
