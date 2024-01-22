"use client";
import styles from "./styles.module.scss";

// components
import { Form, Row, Col, Input, Button, Spin } from "antd";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import BackGround from "@/icons/login/BackGround";

// services
import { getUserInfo, login } from "@/services/authenticate.service";

// hooks
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

// utils
import { pushNotify } from "@/utils/toast";

// contexts
import CommonContext from "@/contexts/CommonContext";

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
      if (loginResponse?.success) {
        setToken(loginResponse.token);
        localStorage.setItem("token", loginResponse.token);
        if (searchParams?.callback) {
          router.push(searchParams?.callback as string);
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
          <div className="d-flex column gap-8 align-center">
            <span className="text-h2 text-500 color-character-primary">
              {t("Welcome back")}
            </span>
            <span className="text-body color-neutral-700">
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
        <BackGround />
      </div>
    </div>
  );
};

export default LoginPage;
