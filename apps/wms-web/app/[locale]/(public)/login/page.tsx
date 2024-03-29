"use client";
import styles from "./styles.module.scss";

// components
import { Form, Row, Col, Input, Button, Spin } from "antd";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

// services
import { login } from "@/services/authenticate.service";

// hooks
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

// utils
import { pushNotify } from "@/utils/toast";

// contexts

const LoginPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const [token, setToken] = useState<string>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const loginResponse = await login(values);

      if (loginResponse?.access_token) {
        localStorage.setItem("userInfo", values?.username);
        localStorage.setItem("token", loginResponse.access_token);
        if (searchParams?.callbackUrl) {
          router.push(decodeURIComponent(searchParams?.callbackUrl as string));
        } else {
          router.push("/items");
        }
      } else {
        pushNotify(loginResponse?.message, { type: "error" });
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-content"]}>
        <div className={styles["login-form"]}>
          <div className="flex flex-col gap-3 items-center">
            <span className="text-3xl font-medium">{t("Welcome back")}</span>
            <span className="text-base text-gray-500">
              {t("WMS - Warehouse Management System")}
            </span>
          </div>
          <Spin spinning={loading}>
            <Form form={form} layout="vertical" requiredMark={false}>
              <Row>
                <Col xs={24}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      { required: true, message: t("Please enter username") },
                    ]}
                  >
                    <Input
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Type your email"
                      addonBefore={<FontAwesomeIcon icon={faEnvelope} />}
                      onPressEnter={handleLogin}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: t("Please enter password") },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="•••••••••"
                      addonBefore={<FontAwesomeIcon icon={faLock} />}
                      onPressEnter={handleLogin}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item noStyle>
                    <Button
                      size="large"
                      type="primary"
                      block
                      onClick={handleLogin}
                      className="mb-12"
                    >
                      {t("Login")}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </div>
        {/* <BackGround /> */}
      </div>
    </div>
  );
};

export default LoginPage;
