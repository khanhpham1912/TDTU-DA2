import { Form } from "antd";
import { useBoolean } from "usehooks-ts";

export default function useItemForm() {
    const { value: showItemForm, setTrue: openItemForm, setFalse: closeItemForm, } = useBoolean(false);
    const [itemForm] = Form.useForm();
    const handleCloseItemForm = () => {
        itemForm.resetFields();
        closeItemForm();
    }
    const handleSubmitItemForm = () => {
        console.log("Submit item form")
    }
    return {itemForm, showItemForm, openItemForm, handleCloseItemForm, handleSubmitItemForm}
}
