import { FormInstance } from "antd";
import { useInplace } from "common-ui/lib/hooks";
import { useEffect } from "react";

export const useCustomFieldInplace = ({
  initValue,
  onSubmit,
  form,
}: {
  form: FormInstance;
  initValue: any;
  onSubmit: (request: any, callback?: Function) => void;
}) => {
  useEffect(() => {
    form.setFieldsValue(initValue);
  }, [initValue]);

  const inplaceProps = useInplace({
    form,
    initialValues: initValue,
  });

  const handleClickOk = async (name: any) => {
    try {
      const request = await inplaceProps.onClickOk(name);

      if (request) {
        onSubmit(request, inplaceProps.onCloseEdit);
      } else {
        inplaceProps.onCloseEdit();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { inplaceProps, handleClickOk };
};
